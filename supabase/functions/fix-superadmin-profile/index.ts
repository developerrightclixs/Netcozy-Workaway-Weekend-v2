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

    const adminEmail = 'admin@netcozy.com';
    const adminUserId = '9affb7c0-1ad9-4795-88fc-24951b0255eb';

    console.log('Step 1: Deleting ALL profiles with this email...');

    // Delete ALL profiles with this email first
    const { error: deleteAllError } = await supabase
      .from('user_profiles')
      .delete()
      .eq('email', adminEmail);

    if (deleteAllError) {
      console.error('Error deleting all profiles:', deleteAllError);
    } else {
      console.log('✅ All existing profiles deleted');
    }

    console.log('Step 2: Creating fresh profile...');

    // Now insert a completely fresh profile
    const profileData = {
      id: adminUserId,
      user_id: adminUserId,
      email: adminEmail,
      full_name: 'Super Admin',
      phone_number: '+1234567890',
      cell_number: '+1234567890',
      sex: 'male',
      street_address: '123 Admin Street',
      city: 'Admin City',
      state: 'Admin State',
      zip_code: '12345',
      country: 'United States',
      date_of_birth: '1990-01-01',
      nationality: 'American',
      passport_number: 'ADMIN123456',
      role: 'superadmin',
      approval_status: 'approved',
      approved_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const { data: profile, error: insertError } = await supabase
      .from('user_profiles')
      .insert(profileData)
      .select()
      .single();

    if (insertError) {
      console.error('Error inserting profile:', insertError);
      return new Response(
        JSON.stringify({ error: 'Failed to create profile', details: insertError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('✅ Fresh profile created successfully:', profile);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Superadmin profile fixed successfully',
        profile: profile
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('Unexpected error:', error);
    return new Response(
      JSON.stringify({ error: 'Unexpected error', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});