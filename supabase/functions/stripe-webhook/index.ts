import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import Stripe from 'https://esm.sh/stripe@14.10.0?target=deno';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
});

const cryptoProvider = Stripe.createSubtleCryptoProvider();

serve(async (req) => {
  const signature = req.headers.get('Stripe-Signature');
  const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');

  if (!signature || !webhookSecret) {
    return new Response('Webhook signature or secret missing', { status: 400 });
  }

  try {
    const body = await req.text();
    const event = await stripe.webhooks.constructEventAsync(
      body,
      signature,
      webhookSecret,
      undefined,
      cryptoProvider
    );

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.user_id;
        const planName = session.metadata?.plan_name;
        const billingCycle = session.metadata?.billing_cycle;

        if (userId && planName) {
          // Update user profile with subscription info
          const { error } = await supabaseAdmin
            .from('user_profiles')
            .update({
              membership_tier: planName,
              billing_cycle: billingCycle,
              subscription_status: 'active',
              stripe_customer_id: session.customer as string,
              stripe_subscription_id: session.subscription as string,
              subscription_start_date: new Date().toISOString(),
              updated_at: new Date().toISOString()
            })
            .eq('user_id', userId);

          if (error) {
            console.error('Error updating user profile:', error);
          }
        }
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        // Find user by stripe customer ID
        const { data: profile } = await supabaseAdmin
          .from('user_profiles')
          .select('user_id')
          .eq('stripe_customer_id', customerId)
          .single();

        if (profile) {
          await supabaseAdmin
            .from('user_profiles')
            .update({
              subscription_status: subscription.status,
              updated_at: new Date().toISOString()
            })
            .eq('user_id', profile.user_id);
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        const { data: profile } = await supabaseAdmin
          .from('user_profiles')
          .select('user_id')
          .eq('stripe_customer_id', customerId)
          .single();

        if (profile) {
          await supabaseAdmin
            .from('user_profiles')
            .update({
              subscription_status: 'cancelled',
              updated_at: new Date().toISOString()
            })
            .eq('user_id', profile.user_id);
        }
        break;
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Webhook error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});