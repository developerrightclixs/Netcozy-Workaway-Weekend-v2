import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

Deno.serve(async (req) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  };

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    const email = 'admin@netcozy.com';
    const newPassword = '123456';

    console.log('🔍 Looking for user with email:', email);

    // Get the user by email
    const { data: { users }, error: listError } = await supabaseAdmin.auth.admin.listUsers();
    
    if (listError) {
      throw listError;
    }

    const user = users.find(u => u.email === email);

    if (!user) {
      return new Response(
        JSON.stringify({ 
          error: 'User not found',
          message: 'No auth user found with email admin@netcozy.com'
        }),
        { 
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    console.log('✅ Found user:', user.id);

    // Update the password
    const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(
      user.id,
      { password: newPassword }
    );

    if (updateError) {
      throw updateError;
    }

    // Update the user_id in the profile to match
    const { error: profileError } = await supabaseAdmin
      .from('user_profiles')
      .update({ user_id: user.id })
      .eq('email', email);

    if (profileError) {
      console.error('Profile update error:', profileError);
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Password reset successfully!',
        user_id: user.id,
        email: email,
        new_password: newPassword
      }),
      { 
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
