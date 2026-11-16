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

    // Get user ID from request body
    const { userId } = await req.json();
    
    if (!userId) {
      throw new Error('User ID is required');
    }

    const email = 'admin@netcozy.com';

    console.log('🔧 Creating superadmin profile for user:', userId);

    // Check if profile already exists
    const { data: existingProfile } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    // Use only the essential fields that exist in your table
    const profileData = {
      user_id: userId,
      email,
      full_name: 'Super Admin',
      role: 'superadmin',
      approval_status: 'approved'
    };

    let profile;

    if (existingProfile) {
      console.log('📝 Updating existing profile...');
      const { data: updatedProfile, error: updateError } = await supabase
        .from('user_profiles')
        .update(profileData)
        .eq('user_id', userId)
        .select()
        .single();

      if (updateError) {
        console.error('❌ Update error:', updateError);
        throw new Error('Failed to update profile: ' + updateError.message);
      }
      profile = updatedProfile;
      console.log('✅ Profile updated');
    } else {
      console.log('➕ Creating new profile...');
      const { data: newProfile, error: insertError } = await supabase
        .from('user_profiles')
        .insert(profileData)
        .select()
        .single();

      if (insertError) {
        console.error('❌ Insert error:', insertError);
        throw new Error('Failed to create profile: ' + insertError.message);
      }
      profile = newProfile;
      console.log('✅ Profile created');
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Superadmin profile created successfully',
        profile,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('❌ Error:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Unknown error occurred',
        details: error.toString()
      }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});