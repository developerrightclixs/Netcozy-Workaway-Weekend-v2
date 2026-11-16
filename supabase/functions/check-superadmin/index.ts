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
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing environment variables');
      return new Response(
        JSON.stringify({ 
          success: false,
          error: 'Server configuration error',
          details: 'Missing environment variables',
          isSuperAdmin: false 
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      console.log('No authorization header');
      return new Response(
        JSON.stringify({ 
          success: false,
          error: 'Not authenticated',
          details: 'Please login first',
          isSuperAdmin: false 
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      console.error('Auth error:', authError?.message);
      return new Response(
        JSON.stringify({ 
          success: false,
          error: 'Invalid authentication',
          details: authError?.message || 'Token verification failed. Please logout and login again.',
          isSuperAdmin: false 
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Checking user:', user.email, 'ID:', user.id);

    const { data: profile, error: profileError } = await supabase
      .from('user_profiles')
      .select('role, approval_status')
      .eq('user_id', user.id)
      .single();

    if (profileError) {
      console.error('Profile error:', profileError.message);
      return new Response(
        JSON.stringify({ 
          success: false,
          error: 'Profile not found',
          details: `No profile found for ${user.email}. Please complete signup or contact support.`,
          userId: user.id,
          email: user.email,
          isSuperAdmin: false 
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const isSuperAdmin = profile?.role === 'superadmin';
    
    console.log('Access check:', {
      email: user.email,
      role: profile?.role,
      isSuperAdmin
    });

    if (!isSuperAdmin) {
      return new Response(
        JSON.stringify({ 
          success: false,
          error: 'Access denied',
          details: `Your role is "${profile?.role}". Superadmin access required.`,
          userId: user.id,
          email: user.email,
          currentRole: profile?.role,
          isSuperAdmin: false 
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        isSuperAdmin: true,
        userId: user.id,
        email: user.email,
        role: profile.role
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('Unexpected error:', error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: 'Server error',
        details: error.message || 'An unexpected error occurred',
        isSuperAdmin: false 
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});