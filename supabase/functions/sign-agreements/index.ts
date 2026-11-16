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
    if (body.agreementSigned !== true || body.licenseSigned !== true) {
      return json({ error: 'Both agreements must be accepted' }, 400);
    }

    const { data: userData, error: userError } = await admin.auth.admin.getUserById(userId);
    if (userError || !userData?.user) return json({ error: 'Account not found' }, 400);

    const user = userData.user;
    const existing = (user.app_metadata?.profile ?? {}) as Record<string, unknown>;
    const now = new Date().toISOString();

    const profile = {
      ...existing,
      agreements_signed_at: now,
      signup_completed: true,
      approval_status: 'pending',
    };

    const { error: updateError } = await admin.auth.admin.updateUserById(userId, {
      app_metadata: { ...(user.app_metadata ?? {}), profile },
    });
    if (updateError) return json({ error: updateError.message }, 400);

    return json({
      success: true,
      message: 'Agreements signed. Your application is pending approval.',
    });
  } catch (err) {
    return json({ error: (err as Error)?.message || 'Unexpected error' }, 500);
  }
});
