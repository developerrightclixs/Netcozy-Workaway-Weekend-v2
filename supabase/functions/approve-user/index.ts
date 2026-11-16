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

    const { userId, action, serviceLevel, adminNotes } = await req.json();

    if (!userId || !action) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const isApproved = action === 'approve';
    const updateData: any = {
      approval_status: isApproved ? 'approved' : 'rejected',
      approved_at: isApproved ? new Date().toISOString() : null,
      updated_at: new Date().toISOString(),
    };

    if (isApproved && serviceLevel) {
      updateData.service_level = serviceLevel;
    }

    if (adminNotes) {
      updateData.admin_notes = adminNotes;
    }

    // Update user profile
    const { error: updateError } = await supabase
      .from('user_profiles')
      .update(updateData)
      .eq('id', userId);

    if (updateError) {
      return new Response(
        JSON.stringify({ error: updateError.message }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get user email for notification
    const { data: userData } = await supabase.auth.admin.getUserById(userId);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `User ${isApproved ? 'approved' : 'rejected'} successfully`,
        userEmail: userData?.user?.email 
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
