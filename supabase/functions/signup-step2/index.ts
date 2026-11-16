import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

const hashCode = async (value: string) => {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
};

const codeEmailHtml = (fullName: string, code: string) => `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;padding:32px;color:#1f2937">
    <h2 style="margin:0 0 16px;font-size:22px;color:#0f766e">Verify your email</h2>
    <p style="margin:0 0 16px;font-size:15px;line-height:1.6">Hi ${fullName || 'there'},</p>
    <p style="margin:0 0 24px;font-size:15px;line-height:1.6">Use the code below to finish creating your Netcozy account.</p>
    <div style="background:#f3f4f6;border-radius:12px;padding:24px;text-align:center">
      <div style="font-size:34px;font-weight:700;letter-spacing:8px;font-family:'Courier New',monospace;color:#0f766e">${code}</div>
    </div>
    <p style="margin:24px 0 0;font-size:13px;color:#6b7280">This code expires in 15 minutes. If you did not request it, you can ignore this email.</p>
  </div>`;

const sendCode = async (email: string, fullName: string, code: string) => {
  const apiKey = Deno.env.get('RESEND_API_KEY');
  const fromDomain = Deno.env.get('RESEND_FROM_DOMAIN');
  if (!apiKey || !fromDomain) return { sent: false, reason: 'Email service is not configured yet.' };

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: `Netcozy <noreply@${fromDomain}>`,
        to: [email],
        subject: 'Your Netcozy verification code',
        html: codeEmailHtml(fullName, code),
      }),
    });
    if (!res.ok) return { sent: false, reason: await res.text() };
    return { sent: true, reason: '' };
  } catch (err) {
    return { sent: false, reason: (err as Error)?.message || 'Email delivery failed' };
  }
};

const requiredFields: Array<[string, string]> = [
  ['fullName', 'Full name'],
  ['phoneNumber', 'Phone number'],
  ['cellNumber', 'Cell number'],
  ['sex', 'Sex'],
  ['streetAddress', 'Street address'],
  ['city', 'City'],
  ['state', 'State'],
  ['zipCode', 'Zip code'],
  ['country', 'Country'],
  ['dateOfBirth', 'Date of birth'],
  ['nationality', 'Nationality'],
  ['passportNumber', 'Passport number'],
];

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const admin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { autoRefreshToken: false, persistSession: false } },
    );

    let body: Record<string, unknown> = {};
    try {
      body = await req.json();
    } catch {
      body = {};
    }

    const userId = String(body.userId ?? '');
    if (!userId) return json({ error: 'Missing account reference' }, 400);

    const missing = requiredFields
      .filter(([key]) => !String(body[key] ?? '').trim())
      .map(([, label]) => label);
    if (missing.length) return json({ error: `Please complete: ${missing.join(', ')}` }, 400);

    const { data: userData, error: userError } = await admin.auth.admin.getUserById(userId);
    if (userError || !userData?.user) return json({ error: 'Account not found' }, 400);

    const user = userData.user;
    const existing = (user.app_metadata?.profile ?? {}) as Record<string, unknown>;

    const code = String(Math.floor(100000 + Math.random() * 900000));
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString();
    const fullName = String(body.fullName).trim();

    const profile = {
      ...existing,
      email: (user.email ?? String(body.email ?? '')).toLowerCase(),
      full_name: fullName,
      phone_number: String(body.phoneNumber).trim(),
      cell_number: String(body.cellNumber).trim(),
      sex: String(body.sex).trim(),
      street_address: String(body.streetAddress).trim(),
      city: String(body.city).trim(),
      state: String(body.state).trim(),
      zip_code: String(body.zipCode).trim(),
      country: String(body.country).trim(),
      date_of_birth: String(body.dateOfBirth).trim(),
      nationality: String(body.nationality).trim(),
      passport_number: String(body.passportNumber).trim(),
      verification_code_hash: await hashCode(code),
      verification_expires_at: expiresAt,
      verification_attempts: 0,
    };

    const { error: updateError } = await admin.auth.admin.updateUserById(userId, {
      app_metadata: { ...(user.app_metadata ?? {}), profile },
    });
    if (updateError) return json({ error: updateError.message }, 400);

    const delivery = await sendCode(String(profile.email), fullName, code);

    return json({
      success: true,
      emailSent: delivery.sent,
      message: delivery.sent
        ? 'Verification code sent to your email.'
        : 'Your details were saved, but the verification email could not be sent yet.',
      emailIssue: delivery.sent ? '' : delivery.reason,
    });
  } catch (err) {
    return json({ error: (err as Error)?.message || 'Unexpected error' }, 500);
  }
});
