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
    <h2 style="margin:0 0 16px;font-size:22px;color:#0f766e">Your new verification code</h2>
    <p style="margin:0 0 16px;font-size:15px;line-height:1.6">Hi ${fullName || 'there'},</p>
    <div style="background:#f3f4f6;border-radius:12px;padding:24px;text-align:center">
      <div style="font-size:34px;font-weight:700;letter-spacing:8px;font-family:'Courier New',monospace;color:#0f766e">${code}</div>
    </div>
    <p style="margin:24px 0 0;font-size:13px;color:#6b7280">This code expires in 15 minutes.</p>
  </div>`;

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

    const { data: userData, error: userError } = await admin.auth.admin.getUserById(userId);
    if (userError || !userData?.user) return json({ error: 'Account not found' }, 400);

    const user = userData.user;
    const existing = (user.app_metadata?.profile ?? {}) as Record<string, unknown>;
    const email = (user.email ?? String(existing.email ?? '')).toLowerCase();
    if (!email) return json({ error: 'Account has no email address' }, 400);

    const code = String(Math.floor(100000 + Math.random() * 900000));
    const profile = {
      ...existing,
      verification_code_hash: await hashCode(code),
      verification_expires_at: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
      verification_attempts: 0,
    };

    const { error: updateError } = await admin.auth.admin.updateUserById(userId, {
      app_metadata: { ...(user.app_metadata ?? {}), profile },
    });
    if (updateError) return json({ error: updateError.message }, 400);

    const apiKey = Deno.env.get('RESEND_API_KEY');
    const fromDomain = Deno.env.get('RESEND_FROM_DOMAIN');
    if (!apiKey || !fromDomain) {
      return json({ error: 'Email service is not configured yet, so the code could not be sent.' }, 503);
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: `Netcozy <noreply@${fromDomain}>`,
        to: [email],
        subject: 'Your new Netcozy verification code',
        html: codeEmailHtml(String(existing.full_name ?? ''), code),
      }),
    });

    if (!res.ok) {
      return json({ error: 'The code was created but the email could not be delivered.' }, 502);
    }

    return json({ success: true, message: 'A new verification code has been emailed to you.' });
  } catch (err) {
    return json({ error: (err as Error)?.message || 'Unexpected error' }, 500);
  }
});
