import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { getCurrentUser } from '../../lib/api';

const SUPABASE_URL = import.meta.env.VITE_PUBLIC_SUPABASE_URL;

// Plan configurations
const PLANS = {
  basic: {
    name: 'Basic',
    monthlyPrice: 15,
    yearlyPrice: 150,
    features: ['Event tickets', 'Travel services', 'Basic support']
  },
  mid: {
    name: 'Mid Level',
    monthlyPrice: 35,
    yearlyPrice: 350,
    features: ['Event tickets', 'Airfare', 'Cruises', 'Rental cars', 'Hotels & resorts']
  },
  all: {
    name: 'All Access',
    monthlyPrice: 75,
    yearlyPrice: 750,
    features: ['All travel services', 'VIP giveaways', 'Priority support']
  },
  vip: {
    name: 'All Access VIP',
    monthlyPrice: 250,
    yearlyPrice: 2500,
    features: ['All benefits', 'Five-star resorts', 'Luxury travel', 'Concierge service']
  }
};

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Get plan and billing from URL
  const planParam = searchParams.get('plan') || '';
  const billingParam = searchParams.get('billing') || 'monthly';

  // Validate plan
  const plan = PLANS[planParam as keyof typeof PLANS];
  // Ensure billing is exactly 'monthly' or 'yearly'
  const billing = (billingParam === 'yearly' ? 'yearly' : 'monthly') as 'monthly' | 'yearly';

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const currentUser = await getCurrentUser();
      setIsLoggedIn(!!currentUser);
    } catch (err) {
      console.error('Auth check error:', err);
      setIsLoggedIn(false);
    }
  };

  const handleCheckout = async () => {
    if (!plan) {
      setError('Invalid plan selected');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Check if user is logged in
      const authUser = await getCurrentUser();
      
      if (!authUser) {
        // Redirect to signup with plan info
        navigate(`/signup?plan=${planParam}&billing=${billing}`);
        return;
      }

      // Create checkout session
      const { data: { session } } = await supabase.auth.getSession();
      
      // Log what we're sending
      console.log('=== FRONTEND REQUEST ===');
      console.log('Sending to Stripe:', {
        planId: planParam,
        billing: billing
      });

      const response = await fetch(`${SUPABASE_URL}/functions/v1/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token}`
        },
        body: JSON.stringify({
          planId: planParam,
          billing: billing
        })
      });

      console.log('=== RESPONSE STATUS ===');
      console.log('Status:', response.status);
      console.log('Status Text:', response.statusText);

      const data = await response.json();
      
      console.log('=== RESPONSE DATA ===');
      console.log('Full response:', JSON.stringify(data, null, 2));

      if (!response.ok) {
        console.error('=== ERROR RESPONSE ===');
        console.error('Error:', data.error);
        console.error('Details:', data.details);
        console.error('Param:', data.param);
        console.error('Type:', data.type);
        
        // Build detailed error message for user
        let errorMessage = data.error || 'Failed to create checkout session';
        
        // Add technical details for debugging
        const technicalDetails = [];
        if (data.details) technicalDetails.push(data.details);
        if (data.param) technicalDetails.push(`Parameter: ${data.param}`);
        if (data.type) technicalDetails.push(`Type: ${data.type}`);
        
        if (technicalDetails.length > 0) {
          errorMessage += '\n\nTechnical details: ' + technicalDetails.join(', ');
        }
        
        throw new Error(errorMessage);
      }

      // Redirect to Stripe checkout
      if (data.url) {
        console.log('=== REDIRECTING TO STRIPE ===');
        console.log('URL:', data.url);
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received from Stripe');
      }
    } catch (err: any) {
      console.error('=== CHECKOUT ERROR ===');
      console.error('Error message:', err.message);
      console.error('Error stack:', err.stack);
      setError(err.message || 'Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  // If no plan selected, show error state
  if (!plan) {
    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center">
                <i className="ri-building-4-line text-xl text-white"></i>
              </div>
              <span className="text-xl font-semibold text-gray-900">Netcozy</span>
            </Link>
          </div>
        </header>

        {/* Error State */}
        <div className="max-w-2xl mx-auto px-6 py-20 text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="ri-error-warning-line text-4xl text-red-500"></i>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">No Plan Selected</h1>
          <p className="text-gray-600 mb-8">
            Please select a membership plan first
          </p>
          <Link
            to="/pricing"
            className="inline-flex items-center gap-2 bg-teal-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-teal-600 transition-colors whitespace-nowrap cursor-pointer"
          >
            View Pricing Plans
          </Link>
        </div>
      </div>
    );
  }

  const price = billing === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice;
  const savings = billing === 'yearly' ? (plan.monthlyPrice * 12 - plan.yearlyPrice) : 0;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center">
              <i className="ri-building-4-line text-xl text-white"></i>
            </div>
            <span className="text-xl font-semibold text-gray-900">Netcozy</span>
          </Link>
          {isLoggedIn && (
            <Link to="/profile" className="text-sm text-gray-600 hover:text-teal-500 transition-colors cursor-pointer">
              My Account
            </Link>
          )}
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-8">
          <Link to="/pricing" className="inline-flex items-center gap-2 text-gray-600 hover:text-teal-500 transition-colors cursor-pointer">
            <i className="ri-arrow-left-line"></i>
            Back to Pricing
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Complete Your Purchase</h1>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-start gap-3">
            <i className="ri-error-warning-line text-xl flex-shrink-0 mt-0.5"></i>
            <div>
              <p className="font-medium mb-1">Payment Error</p>
              <p>{error}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-200 rounded-2xl p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-6">
                {/* Plan Details */}
                <div className="flex items-start justify-between pb-6 border-b border-gray-200">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{plan.name} Membership</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Billed {billing === 'yearly' ? 'annually' : 'monthly'}
                    </p>
                    <ul className="mt-4 space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                          <i className="ri-check-line text-teal-500"></i>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">${price}</p>
                    <p className="text-sm text-gray-600">/{billing === 'yearly' ? 'year' : 'month'}</p>
                  </div>
                </div>

                {/* Savings Badge */}
                {billing === 'yearly' && savings > 0 && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center gap-2">
                      <i className="ri-price-tag-3-line text-green-600"></i>
                      <p className="text-sm font-medium text-green-800">
                        You save ${savings} with annual billing!
                      </p>
                    </div>
                  </div>
                )}

                {/* Payment Info */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-start gap-3">
                    <i className="ri-shield-check-line text-2xl text-teal-500 mt-1"></i>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Secure Payment</h4>
                      <p className="text-sm text-gray-600">
                        Your payment is processed securely through Stripe. We never store your card details.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Card */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl p-8 text-white sticky top-8">
              <h3 className="text-lg font-semibold mb-6">Payment Details</h3>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-teal-100">Subtotal</span>
                  <span className="font-semibold">${price}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-teal-100">Tax</span>
                  <span className="font-semibold">$0</span>
                </div>
                <div className="border-t border-teal-400 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-2xl font-bold">${price}</span>
                  </div>
                  <p className="text-xs text-teal-100 mt-1">
                    {billing === 'yearly' ? 'per year' : 'per month'}
                  </p>
                </div>
              </div>

              {!isLoggedIn && (
                <div className="bg-white/10 rounded-lg p-4 mb-6">
                  <p className="text-sm text-white">
                    <i className="ri-information-line mr-2"></i>
                    You'll need to create an account to complete your purchase
                  </p>
                </div>
              )}

              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full bg-white text-teal-600 py-4 rounded-lg font-bold hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
              >
                {loading ? (
                  <>
                    <i className="ri-loader-4-line animate-spin mr-2"></i>
                    Processing...
                  </>
                ) : isLoggedIn ? (
                  <>
                    <i className="ri-secure-payment-line mr-2"></i>
                    Proceed to Payment
                  </>
                ) : (
                  <>
                    <i className="ri-user-add-line mr-2"></i>
                    Create Account & Pay
                  </>
                )}
              </button>

              <p className="text-xs text-teal-100 text-center mt-4">
                Cancel anytime. No hidden fees.
              </p>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <i className="ri-lock-line text-2xl text-gray-600"></i>
            <div>
              <p className="font-medium text-gray-900 text-sm">Secure Payment</p>
              <p className="text-xs text-gray-600">256-bit SSL encryption</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <i className="ri-refresh-line text-2xl text-gray-600"></i>
            <div>
              <p className="font-medium text-gray-900 text-sm">Cancel Anytime</p>
              <p className="text-xs text-gray-600">No long-term commitment</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <i className="ri-customer-service-2-line text-2xl text-gray-600"></i>
            <div>
              <p className="font-medium text-gray-900 text-sm">24/7 Support</p>
              <p className="text-xs text-gray-600">We're here to help</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
