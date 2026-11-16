import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import Stripe from 'https://esm.sh/stripe@14.10.0?target=deno';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Check Stripe key
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
    if (!stripeKey) {
      console.error('STRIPE_SECRET_KEY not found');
      return new Response(
        JSON.stringify({ error: 'Payment system not configured' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500,
        }
      );
    }

    // Initialize Stripe
    const stripe = new Stripe(stripeKey, {
      apiVersion: '2023-10-16',
      httpClient: Stripe.createFetchHttpClient(),
    });

    // Initialize Supabase
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    // Verify user
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser();

    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Authentication required' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 401,
        }
      );
    }

    // Parse request
    const { planId, billing } = await req.json();

    console.log('=== EDGE FUNCTION REQUEST ===');
    console.log('Received:', { planId, billing, userId: user.id, email: user.email });

    // Validate inputs
    if (!planId || !billing) {
      console.error('Missing parameters:', { planId, billing });
      return new Response(
        JSON.stringify({ error: 'Missing required parameters: planId and billing are required' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      );
    }

    if (billing !== 'monthly' && billing !== 'yearly') {
      console.error('Invalid billing:', billing);
      return new Response(
        JSON.stringify({ error: `Invalid billing cycle: ${billing}. Must be 'monthly' or 'yearly'` }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      );
    }

    // Define pricing (in cents) - MUST be integers
    const plans: Record<string, { monthly: number; yearly: number; name: string }> = {
      basic: { monthly: 1500, yearly: 15000, name: 'Basic' },
      mid: { monthly: 3500, yearly: 35000, name: 'Mid Level' },
      all: { monthly: 7500, yearly: 75000, name: 'All Access' },
      vip: { monthly: 25000, yearly: 250000, name: 'All Access VIP' }
    };

    const selectedPlan = plans[planId];
    if (!selectedPlan) {
      console.error('Invalid plan:', planId);
      return new Response(
        JSON.stringify({ error: `Invalid plan: ${planId}` }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      );
    }

    // Calculate amount - ensure it's an integer
    const rawAmount = billing === 'yearly' ? selectedPlan.yearly : selectedPlan.monthly;
    const amount = Math.round(Number(rawAmount));
    
    // Validate amount
    if (!Number.isInteger(amount) || amount < 50) {
      console.error('Invalid amount:', { rawAmount, amount, billing });
      return new Response(
        JSON.stringify({ error: `Invalid amount calculated: ${amount}. Must be an integer >= 50 cents` }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      );
    }

    console.log('=== CREATING STRIPE SESSION ===');
    console.log('Plan:', selectedPlan.name);
    console.log('Billing:', billing);
    console.log('Amount (cents):', amount);
    console.log('Amount (dollars):', amount / 100);

    // Get origin
    const origin = req.headers.get('origin') || 'http://localhost:5173';

    // Create line items with explicit typing
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        price_data: {
          currency: 'usd',
          unit_amount: amount,
          product_data: {
            name: `Netcozy ${selectedPlan.name} Membership`,
            description: `${billing === 'yearly' ? 'Annual' : 'Monthly'} subscription`,
          },
        },
        quantity: 1,
      },
    ];

    console.log('=== LINE ITEMS ===');
    console.log(JSON.stringify(lineItems, null, 2));

    // Create checkout session with explicit parameters
    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      customer_email: user.email || undefined,
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: lineItems,
      success_url: `${origin}/payment-success?session_id={CHECKOUT_SESSION_ID}&plan=${planId}&billing=${billing}`,
      cancel_url: `${origin}/checkout?plan=${planId}&billing=${billing}`,
      metadata: {
        user_id: user.id,
        plan_id: planId,
        billing_cycle: billing,
      },
    };

    console.log('=== SESSION PARAMS ===');
    console.log(JSON.stringify(sessionParams, null, 2));

    const session = await stripe.checkout.sessions.create(sessionParams);

    console.log('=== SESSION CREATED ===');
    console.log('Session ID:', session.id);
    console.log('Session URL:', session.url);

    return new Response(
      JSON.stringify({ 
        sessionId: session.id, 
        url: session.url
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error: any) {
    console.error('=== ERROR ===');
    console.error('Message:', error.message);
    console.error('Type:', error.type);
    console.error('Param:', error.param);
    console.error('Code:', error.code);
    console.error('Stack:', error.stack);
    
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Payment failed',
        details: error.type || 'unknown_error',
        param: error.param || 'unknown',
        code: error.code || 'unknown'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});