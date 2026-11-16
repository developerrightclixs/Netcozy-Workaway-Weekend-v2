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

    const form = await req.formData();
    const userId = String(form.get('userId') ?? '');
    const file = form.get('file');

    if (!userId) return json({ error: 'Missing account reference' }, 400);
    if (!(file instanceof File)) return json({ error: 'No file was received' }, 400);
    if (file.size > 8 * 1024 * 1024) return json({ error: 'Please upload a file smaller than 8 MB' }, 400);

    const { data: userData, error: userError } = await admin.auth.admin.getUserById(userId);
    if (userError || !userData?.user) return json({ error: 'Account not found' }, 400);

    const extension = (file.name.split('.').pop() ?? 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '');
    const path = `${userId}/${Date.now()}-document.${extension || 'jpg'}`;

    const arrayBuffer = await file.arrayBuffer();
    const { error: uploadError } = await admin.storage
      .from('id-documents')
      .upload(path, new Blob([arrayBuffer], { type: file.type || 'application/octet-stream' }), {
        contentType: file.type || 'application/octet-stream',
        upsert: true,
      });

    if (uploadError) return json({ error: `Could not store the document: ${uploadError.message}` }, 400);

    const user = userData.user;
    const existing = (user.app_metadata?.profile ?? {}) as Record<string, unknown>;
    const profile = {
      ...existing,
      id_document_path: path,
      id_document_name: file.name,
      id_document_uploaded_at: new Date().toISOString(),
    };

    const { error: updateError } = await admin.auth.admin.updateUserById(userId, {
      app_metadata: { ...(user.app_metadata ?? {}), profile },
    });
    if (updateError) return json({ error: updateError.message }, 400);

    return json({
      success: true,
      path,
      fileName: file.name,
      message: 'ID document uploaded successfully.',
    });
  } catch (err) {
    return json({ error: (err as Error)?.message || 'Upload failed' }, 500);
  }
});
