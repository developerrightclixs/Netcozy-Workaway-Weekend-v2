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

    const { email } = await req.json();

    if (!email) {
      return new Response(
        JSON.stringify({ error: 'Email is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const emailLower = email.trim().toLowerCase();

    // Step 1: Check if auth account exists
    const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();
    
    if (listError) {
      return new Response(
        JSON.stringify({ error: 'Failed to check auth account', details: listError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const authUser = users?.find(u => u.email?.toLowerCase() === emailLower);

    // Step 2: Check if profile exists
    const { data: profile, error: profileError } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('email', emailLower)
      .single();

    // Build diagnostic response
    const diagnosticInfo: any = {
      authExists: !!authUser,
      profileExists: !!profile,
      profile: profile || null,
    };

    // Step 3: Fix issues if found
    if (authUser && !profile) {
      // Auth exists but profile missing - CREATE IT
      const { error: createError } = await supabase
        .from('user_profiles')
        .insert({
          user_id: authUser.id,
          email: emailLower,
          full_name: authUser.user_metadata?.full_name || authUser.user_metadata?.name || 'User',
          role: 'user',
          approval_status: 'approved', // Auto-approve since they were trying to log in
          service_level: 'basic',
          signup_completed: true
        });

      if (createError) {
        return new Response(
          JSON.stringify({
            ...diagnosticInfo,
            error: 'Failed to create profile',
            message: 'Your auth account exists but we could not create your profile. Please contact support.',
            details: createError.message
          }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({
          success: true,
          authExists: true,
          profileExists: true,
          fixed: true,
          message: '✅ Profile created successfully! You can now log in with your password.',
          nextStep: 'Please try logging in again with your password.'
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (authUser && profile && profile.user_id !== authUser.id) {
      // Profile exists but user_id mismatch - FIX IT
      const { error: updateError } = await supabase
        .from('user_profiles')
        .update({ user_id: authUser.id })
        .eq('email', emailLower);

      if (updateError) {
        return new Response(
          JSON.stringify({
            ...diagnosticInfo,
            error: 'Failed to fix user_id mismatch',
            message: 'Your profile exists but has a user_id mismatch. Please contact support.',
            details: updateError.message
          }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({
          success: true,
          authExists: true,
          profileExists: true,
          fixed: true,
          profile: { ...profile, user_id: authUser.id },
          message: '✅ Account fixed! User ID mismatch resolved.',
          nextStep: 'Please try logging in again with your password.'
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!authUser && profile) {
      return new Response(
        JSON.stringify({
          ...diagnosticInfo,
          error: 'Auth account missing',
          message: '⚠️ Your profile exists but your authentication account is missing. Please sign up again or contact support.'
        }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!authUser && !profile) {
      return new Response(
        JSON.stringify({
          ...diagnosticInfo,
          error: 'Account not found',
          message: '⚠️ No account found with this email. Please sign up first.'
        }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Everything is fine
    return new Response(
      JSON.stringify({
        success: true,
        ...diagnosticInfo,
        message: '✅ Your account looks good!',
        nextStep: profile?.approval_status === 'approved' 
          ? 'You can log in with your password.' 
          : `Your account status is: ${profile?.approval_status}. ${profile?.approval_status === 'pending' ? 'Please wait for admin approval.' : 'Please contact support.'}`
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Diagnostic error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});