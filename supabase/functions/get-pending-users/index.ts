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

    // Get status from request body, with fallback to 'pending'
    let status = 'pending';
    
    try {
      const contentType = req.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const body = await req.json();
        status = body.status || 'pending';
      }
    } catch (e) {
      // If no body or invalid JSON, use default 'pending'
      console.log('Using default status: pending');
    }

    console.log('Fetching users with status:', status);

    // Get user profiles filtered by approval_status
    const { data: profiles, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('approval_status', status)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Database error:', error);
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Found ${profiles?.length || 0} users with status: ${status}`);

    return new Response(
      JSON.stringify({ users: profiles || [] }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('Function error:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Unknown error occurred' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});