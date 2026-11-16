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
    const code = String(body.code ?? '').trim();
    if (!userId || code.length !== 6) return json({ error: 'Enter the complete 6-digit code' }, 400);

    const { data: userData, error: userError } = await admin.auth.admin.getUserById(userId);
    if (userError || !userData?.user) return json({ error: 'Account not found' }, 400);

    const user = userData.user;
    const profile = (user.app_metadata?.profile ?? {}) as Record<string, unknown>;

    if (!profile.verification_code_hash) {
      return json({ error: 'No verification code is active. Please request a new code.' }, 400);
    }
    if (profile.verification_expires_at && new Date(String(profile.verification_expires_at)) < new Date()) {
      return json({ error: 'Verification code has expired. Please request a new code.' }, 400);
    }
    if ((await hashCode(code)) !== profile.verification_code_hash) {
      const attempts = Number(profile.verification_attempts ?? 0) + 1;
      await admin.auth.admin.updateUserById(userId, {
        app_metadata: { ...(user.app_metadata ?? {}), profile: { ...profile, verification_attempts: attempts } },
      });
      return json({ error: 'That code is not correct. Please check and try again.' }, 400);
    }

    const { error: updateError } = await admin.auth.admin.updateUserById(userId, {
      email_confirm: true,
      app_metadata: {
        ...(user.app_metadata ?? {}),
        profile: {
          ...profile,
          email_verified: true,
          verification_code_hash: null,
          verification_expires_at: null,
          verification_attempts: 0,
        },
      },
    });
    if (updateError) return json({ error: updateError.message }, 400);

    return json({ success: true, message: 'Email verified successfully.' });
  } catch (err) {
    return json({ error: (err as Error)?.message || 'Unexpected error' }, 500);
  }
});
