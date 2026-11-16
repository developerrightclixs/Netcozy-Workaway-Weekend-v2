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

const emptyProfile = (email: string) => ({
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
    const url = Deno.env.get('SUPABASE_URL') ?? '';
    const anonKey = Deno.env.get('SUPABASE_ANON_KEY') ?? '';
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';

    const authHeader = req.headers.get('Authorization') ?? '';
    if (!authHeader.toLowerCase().startsWith('bearer ')) {
      return json({ error: 'You need to be signed in' }, 401);
    }
    const token = authHeader.slice(7).trim();

    const userClient = createClient(url, anonKey, {
      auth: { autoRefreshToken: false, persistSession: false },
      global: { headers: { Authorization: `Bearer ${token}` } },
    });

    const { data: authData, error: authError } = await userClient.auth.getUser(token);
    if (authError || !authData?.user) return json({ error: 'Your session has expired. Please sign in again.' }, 401);

    const user = authData.user;
    const admin = createClient(url, serviceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const appMetadata = (user.app_metadata ?? {}) as Record<string, unknown>;
    const existing = appMetadata.profile as Record<string, unknown> | undefined;
    const profile = { ...emptyProfile((user.email ?? '').toLowerCase()), ...(existing ?? {}) };

    if (!existing) {
      const { error: seedError } = await admin.auth.admin.updateUserById(user.id, {
        app_metadata: { ...appMetadata, profile },
      });
      if (seedError) return json({ error: seedError.message }, 500);
    }

    return json({
      success: true,
      profile: {
        ...profile,
        id: user.id,
        user_id: user.id,
        email: user.email ?? profile.email,
        id_document_url: profile.id_document_path || '',
        created_at: user.created_at,
        approved_at: profile.approved_at ?? null,
      },
    });
  } catch (err) {
    return json({ error: (err as Error)?.message || 'Unexpected error' }, 500);
  }
});
