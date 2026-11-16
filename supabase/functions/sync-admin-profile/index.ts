import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log('🔍 Looking for admin@netcozy.com profile...');

    // Find the profile by email
    const { data: profile, error: profileError } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('email', 'admin@netcozy.com')
      .single();

    if (profileError || !profile) {
      console.error('❌ Profile not found:', profileError);
      return new Response(
        JSON.stringify({ error: 'Profile not found', details: profileError }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('✅ Profile found:', profile);

    // Find the auth user by email
    const { data: { users }, error: usersError } = await supabase.auth.admin.listUsers();

    if (usersError) {
      console.error('❌ Error listing users:', usersError);
      return new Response(
        JSON.stringify({ error: 'Failed to list users', details: usersError }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const authUser = users.find(u => u.email === 'admin@netcozy.com');

    if (!authUser) {
      console.error('❌ Auth user not found');
      return new Response(
        JSON.stringify({ error: 'Auth user not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('✅ Auth user found:', authUser.id);

    // Update the profile with the correct user_id
    const { error: updateError } = await supabase
      .from('user_profiles')
      .update({ user_id: authUser.id })
      .eq('email', 'admin@netcozy.com');

    if (updateError) {
      console.error('❌ Failed to update profile:', updateError);
      return new Response(
        JSON.stringify({ error: 'Failed to update profile', details: updateError }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('✅ Profile synced successfully!');

    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Profile synced successfully',
        authUserId: authUser.id,
        profileEmail: profile.email
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('❌ Unexpected error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});