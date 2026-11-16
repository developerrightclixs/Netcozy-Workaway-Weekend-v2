import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
const anonKey = Deno.env.get('SUPABASE_ANON_KEY') ?? '';

const diag = {
  hasUrl: Boolean(supabaseUrl),
  hasServiceKey: Boolean(serviceKey),
  hasAnonKey: Boolean(anonKey),
};

const defaultProfile = (email: string) => ({
  email,
  full_name: '',
  phone_number: '',
  cell_number: '',
  sex: '',
  street_address: '',
  city: '',
  state: '',
  zip_code: '',
  country: '',
  date_of_birth: null,
  nationality: '',
  passport_number: '',
  id_document_path: '',
  role: 'user',
  approval_status: 'pending',
  service_level: 'basic',
  signup_completed: false,
  email_verified: false,
  agreements_signed_at: null,
  approved_at: null,
});

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    let body: Record<string, unknown> = {};
    try {
      body = await req.json();
    } catch {
      body = {};
    }

    const email = String(body.email ?? '').trim().toLowerCase();
    const password = String(body.password ?? '');

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return json({ error: 'Please enter a valid email address', diagnostics: diag }, 400);
    }
    if (password.length < 6) {
      return json({ error: 'Password must be at least 6 characters', diagnostics: diag }, 400);
    }

    if (!supabaseUrl) {
      return json({ error: 'The account service is not configured yet.', diagnostics: diag }, 503);
    }

    if (serviceKey) {
      const admin = createClient(supabaseUrl, serviceKey, {
        auth: { autoRefreshToken: false, persistSession: false },
      });

      const { data, error } = await admin.auth.admin.createUser({
        email,
        password,
        email_confirm: false,
        app_metadata: { profile: defaultProfile(email) },
      });

      if (!error && data?.user) {
        return json({
          success: true,
          userId: data.user.id,
          accountSetup: 'admin',
          message: 'Account created. Continue with your details.',
          diagnostics: diag,
        });
      }

      const message = error?.message ?? 'Could not create account';
      if (/already|exist|registered|duplicate/i.test(message)) {
        return json(
          { error: 'This email is already registered. Please sign in instead.', diagnostics: diag },
          400,
        );
      }

      if (!/fetch|network|permission|unauthor|forbidden|invalid|key/i.test(message)) {
        return json({ error: message, diagnostics: diag }, 400);
      }
    }

    if (!anonKey) {
      return json(
        { error: 'The account service is not configured yet. Please contact support.', diagnostics: diag },
        503,
      );
    }

    const publicClient = createClient(supabaseUrl, anonKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const { data: signUpData, error: signUpError } = await publicClient.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      const message = signUpError.message ?? 'Could not create account';
      if (/already|exist|registered|duplicate/i.test(message)) {
        return json(
          { error: 'This email is already registered. Please sign in instead.', diagnostics: diag },
          400,
        );
      }
      return json({ error: message, diagnostics: diag }, 400);
    }

    const created = signUpData?.user;
    if (!created) {
      return json({ error: 'Could not create account. Please try again.', diagnostics: diag }, 400);
    }
    if (Array.isArray(created.identities) && created.identities.length === 0) {
      return json(
        { error: 'This email is already registered. Please sign in instead.', diagnostics: diag },
        400,
      );
    }

    return json({
      success: true,
      userId: created.id,
      accountSetup: 'standard',
      message: 'Account created. Continue with your details.',
      diagnostics: diag,
    });
  } catch (err) {
    return json(
      { error: (err as Error)?.message ?? 'Unexpected error', diagnostics: diag },
      500,
    );
  }
});
