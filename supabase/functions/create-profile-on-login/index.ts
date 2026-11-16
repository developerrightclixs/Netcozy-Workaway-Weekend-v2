import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    console.log('🚀 Starting create-profile-on-login function');

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    const requestBody = await req.json();
    const { userId, email, full_name } = requestBody;

    console.log('📧 Email:', email);
    console.log('👤 User ID:', userId);
    console.log('👤 Full name:', full_name);

    if (!email || !userId) {
      console.error('❌ Missing required fields');
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Email and userId are required'
        }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const emailLower = email.toLowerCase();

    // Check if profile already exists by user_id
    console.log('🔍 Checking for existing profile by user_id...');
    const { data: existingProfile, error: existingError } = await supabaseClient
      .from('user_profiles')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (existingError) {
      console.error('❌ Error checking existing profile:', existingError);
    }

    if (existingProfile) {
      console.log('✅ Profile already exists by user_id');
      return new Response(
        JSON.stringify({ 
          success: true, 
          profile: existingProfile,
          message: 'Profile already exists'
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check if profile exists by email
    console.log('🔍 Checking for existing profile by email...');
    const { data: profileByEmail, error: emailError } = await supabaseClient
      .from('user_profiles')
      .select('*')
      .eq('email', emailLower)
      .maybeSingle();

    if (emailError) {
      console.error('❌ Error checking profile by email:', emailError);
    }

    if (profileByEmail) {
      console.log('✅ Profile found by email, updating user_id');
      const { data: updatedProfile, error: updateError } = await supabaseClient
        .from('user_profiles')
        .update({ user_id: userId })
        .eq('email', emailLower)
        .select()
        .single();

      if (updateError) {
        console.error('❌ Failed to update profile:', updateError);
        return new Response(
          JSON.stringify({ 
            success: false, 
            error: `Failed to update profile: ${updateError.message}`
          }),
          { 
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }

      console.log('✅ Profile updated successfully');
      return new Response(
        JSON.stringify({ 
          success: true, 
          profile: updatedProfile,
          message: 'Profile updated with user_id'
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Profile doesn't exist - CREATE IT NOW
    console.log('📝 Profile not found, creating new profile...');
    
    const newProfile = {
      user_id: userId,
      email: emailLower,
      full_name: full_name || 'User',
      phone_number: '',
      cell_number: '',
      sex: '',
      street_address: '',
      city: '',
      state: '',
      zip_code: '',
      country: '',
      role: 'user',
      approval_status: 'approved',
      service_level: 'basic'
    };

    console.log('📝 Creating profile with data:', newProfile);

    const { data: createdProfile, error: createError } = await supabaseClient
      .from('user_profiles')
      .insert(newProfile)
      .select()
      .single();

    if (createError) {
      console.error('❌ Failed to create profile:', createError);
      console.error('❌ Create error details:', JSON.stringify(createError, null, 2));
      
      // Return more detailed error information
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: `Failed to create profile: ${createError.message}`,
          details: createError,
          attemptedData: newProfile
        }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('✅ Profile created successfully:', createdProfile);
    return new Response(
      JSON.stringify({ 
        success: true, 
        profile: createdProfile,
        message: 'Profile created successfully'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('❌ Unexpected error:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : 'An unexpected error occurred',
        stack: error instanceof Error ? error.stack : undefined
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});