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

    // Check if user exists
    const { data: authData, error: authError } = await supabase.auth.admin.listUsers();
    
    if (authError) {
      console.error('Auth error:', authError);
      return new Response(
        JSON.stringify({ error: 'Failed to verify user' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const user = authData.users.find(u => u.email === email);

    if (!user) {
      // Don't reveal if user exists or not for security
      return new Response(
        JSON.stringify({ success: true, message: 'If an account exists, a reset link has been sent' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Generate reset token
    const resetToken = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    // Save reset token
    const { error: tokenError } = await supabase
      .from('password_reset_tokens')
      .insert({
        user_id: user.id,
        email: email,
        token: resetToken,
        expires_at: expiresAt.toISOString()
      });

    if (tokenError) {
      console.error('Token error:', tokenError);
      return new Response(
        JSON.stringify({ error: 'Failed to create reset token' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get user's full name
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('full_name')
      .eq('user_id', user.id)
      .single();

    const fullName = profile?.full_name || 'User';
    const resetUrl = `https://netcozy.preliveview.com/reset-password?token=${resetToken}`;

    // Send reset email
    try {
      const emailResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'NetCozy <noreply@netcozy.preliveview.com>',
          to: email,
          subject: 'Reset Your Password',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #333;">Password Reset Request</h2>
              <p>Hello ${fullName},</p>
              <p>We received a request to reset your password. Click the button below to create a new password:</p>
              <div style="text-align: center; margin: 30px 0;">
                <a href="${resetUrl}" style="background: #14B8A6; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
                  Reset Password
                </a>
              </div>
              <p style="color: #666; font-size: 14px;">Or copy and paste this link into your browser:</p>
              <p style="color: #14B8A6; word-break: break-all; font-size: 14px;">${resetUrl}</p>
              <p style="color: #666; font-size: 14px;">This link will expire in 1 hour.</p>
              <p style="color: #666; font-size: 14px;">If you didn't request this password reset, please ignore this email.</p>
            </div>
          `
        })
      });

      if (!emailResponse.ok) {
        console.error('Email send failed:', await emailResponse.text());
      }
    } catch (emailError) {
      console.error('Email error:', emailError);
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Password reset link sent to your email'
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});