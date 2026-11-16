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

    // Check table structure
    const { data: columns, error: columnsError } = await supabase
      .from('user_profiles')
      .select('*')
      .limit(1);

    if (columnsError) {
      return new Response(
        JSON.stringify({ 
          error: 'Table check failed',
          details: columnsError.message,
          hint: 'The user_profiles table might not exist or has incorrect structure'
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Try to create a test profile
    const testUserId = crypto.randomUUID();
    const testEmail = `test-${Date.now()}@example.com`;

    const { data: insertData, error: insertError } = await supabase
      .from('user_profiles')
      .insert({
        user_id: testUserId,
        email: testEmail,
        role: 'pending',
        status: 'pending'
      })
      .select();

    if (insertError) {
      return new Response(
        JSON.stringify({ 
          error: 'Profile creation failed',
          details: insertError.message,
          code: insertError.code,
          hint: insertError.hint,
          sqlToRun: `
-- Run these SQL commands in your Supabase SQL Editor:

-- 1. Check if table exists and view structure
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'user_profiles';

-- 2. If table is missing columns, add them:
ALTER TABLE user_profiles 
ADD COLUMN IF NOT EXISTS user_id UUID,
ADD COLUMN IF NOT EXISTS email TEXT,
ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW();

-- 3. Update RLS policies:
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Service role can insert" ON user_profiles;
CREATE POLICY "Service role can insert" ON user_profiles
FOR INSERT
WITH CHECK (true);

DROP POLICY IF EXISTS "Users can view own profile" ON user_profiles;
CREATE POLICY "Users can view own profile" ON user_profiles
FOR SELECT
USING (auth.uid() = user_id OR true);

DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;
CREATE POLICY "Users can update own profile" ON user_profiles
FOR UPDATE
USING (auth.uid() = user_id);
          `
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Clean up test data
    await supabase
      .from('user_profiles')
      .delete()
      .eq('user_id', testUserId);

    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Profile creation is working correctly!',
        tableStructure: columns ? Object.keys(columns[0] || {}) : []
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