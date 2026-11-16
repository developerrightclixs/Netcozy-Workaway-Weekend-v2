import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { getCurrentUser } from '../../lib/api';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';

export default function PricingPage() {
  const [user, setUser] = useState<any>(null);
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');

  useEffect(() => {
    const checkUser = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    };
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      description: 'Perfect for getting started with event tickets or travel',
      monthlyPrice: 15,
      yearlyPrice: 150,
      features: [
        'Event tickets OR travel services (based on qualification)',
        'Access to concerts and festivals',
        'Basic hotel bookings',
        'Email support',
        'Social media account setup assistance'
      ],
      highlight: false
    },
    {
      id: 'mid',
      name: 'Mid Level',
      description: 'Enhanced access to both events and travel services',
      monthlyPrice: 35,
      yearlyPrice: 350,
      features: [
        'Event tickets AND travel services',
        'Airfare included',
        'Cruise options',
        'Rental car access',
        'Hotels & resorts across US, Mexico, Caribbean',
        'Priority email support'
      ],
      highlight: false
    },
    {
      id: 'all',
      name: 'All Access',
      description: 'Full access to all Netcozy services and perks',
      monthlyPrice: 75,
      yearlyPrice: 750,
      features: [
        'All travel services included',
        'VIP event access',
        'International destinations (Europe, Bahamas, etc.)',
        'Bring coworkers, friends, or family',
        'VIP giveaways and promotions',
        'Priority phone & email support',
        'Personalized travel planning'
      ],
      highlight: true
    },
    {
      id: 'vip',
      name: 'All Access VIP',
      description: 'The ultimate premium experience with luxury perks',
      monthlyPrice: 250,
      yearlyPrice: 2500,
      features: [
        'Everything in All Access',
        'Five-star luxury resorts',
        'First-class airfare options',
        'Premium cruise suites',
        'Luxury car rentals',
        'Dedicated concierge service',
        'Exclusive VIP events & backstage access',
        '24/7 priority support'
      ],
      highlight: false
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 bg-gradient-to-br from-teal-500 to-teal-600">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">Membership Levels</h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto mb-3 sm:mb-4">
            Choose the level that fits your lifestyle and start enjoying free events and travel
          </p>
          <p className="text-sm sm:text-base md:text-lg text-white/80 max-w-2xl mx-auto">
            All you need is a qualifying social media account to get started
          </p>
        </div>
      </section>

      {/* Free Service Banner */}
      <section className="py-4 sm:py-6 bg-gradient-to-r from-amber-400 to-orange-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm sm:text-base md:text-lg font-semibold text-white">
            <i className="ri-gift-line mr-2"></i>
            All services are FREE based on your qualification level! Membership fees only apply for premium upgrades.
          </p>
        </div>
      </section>

      {/* Billing Toggle */}
      <section className="pt-12 sm:pt-16 pb-6 sm:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            <span className={`text-sm sm:text-base md:text-lg font-medium ${billing === 'monthly' ? 'text-gray-900' : 'text-gray-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBilling(billing === 'monthly' ? 'yearly' : 'monthly')}
              className={`relative w-14 sm:w-16 h-7 sm:h-8 rounded-full transition-colors cursor-pointer ${billing === 'yearly' ? 'bg-teal-500' : 'bg-gray-300'}`}
            >
              <div className={`absolute top-0.5 sm:top-1 w-5 sm:w-6 h-5 sm:h-6 bg-white rounded-full shadow-md transition-transform ${billing === 'yearly' ? 'translate-x-8 sm:translate-x-9' : 'translate-x-1'}`}></div>
            </button>
            <span className={`text-sm sm:text-base md:text-lg font-medium ${billing === 'yearly' ? 'text-gray-900' : 'text-gray-500'}`}>
              Yearly
            </span>
            {billing === 'yearly' && (
              <span className="ml-1 sm:ml-2 px-2 sm:px-3 py-0.5 sm:py-1 bg-green-100 text-green-700 text-xs sm:text-sm font-semibold rounded-full">
                Save 17%
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-xl sm:rounded-2xl p-4 sm:p-6 transition-all hover:shadow-xl ${
                  plan.highlight
                    ? 'bg-gradient-to-br from-teal-500 to-teal-600 text-white shadow-xl lg:scale-105 z-10'
                    : 'bg-white border-2 border-gray-100 hover:border-teal-200'
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 px-3 sm:px-4 py-0.5 sm:py-1 bg-amber-400 text-amber-900 text-xs sm:text-sm font-bold rounded-full whitespace-nowrap">
                    MOST POPULAR
                  </div>
                )}

                <div className="mb-4 sm:mb-6">
                  <h3 className={`text-xl sm:text-2xl font-bold mb-1 sm:mb-2 ${plan.highlight ? 'text-white' : 'text-gray-900'}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-sm ${plan.highlight ? 'text-white/80' : 'text-gray-600'}`}>
                    {plan.description}
                  </p>
                </div>

                <div className="mb-4 sm:mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className={`text-2xl sm:text-3xl md:text-4xl font-bold ${plan.highlight ? 'text-white' : 'text-gray-900'}`}>
                      Free
                    </span>
                  </div>
                </div>

                <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <i className={`ri-check-line text-base sm:text-lg flex-shrink-0 mt-0.5 ${plan.highlight ? 'text-white' : 'text-teal-500'}`}></i>
                      <span className={`text-sm ${plan.highlight ? 'text-white/90' : 'text-gray-600'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {user ? (
                  <Link
                    to={`/checkout?plan=${plan.id}&billing=${billing}`}
                    className={`block w-full py-2.5 sm:py-3 rounded-lg font-semibold text-center transition-all whitespace-nowrap cursor-pointer text-sm sm:text-base ${
                      plan.highlight
                        ? 'bg-white text-teal-600 hover:bg-gray-100'
                        : 'bg-teal-500 text-white hover:bg-teal-600'
                    }`}
                  >
                    Get Started
                  </Link>
                ) : (
                  <Link
                    to={`/signup?plan=${plan.id}&billing=${billing}`}
                    className={`block w-full py-2.5 sm:py-3 rounded-lg font-semibold text-center transition-all whitespace-nowrap cursor-pointer text-sm sm:text-base ${
                      plan.highlight
                        ? 'bg-white text-teal-600 hover:bg-gray-100'
                        : 'bg-teal-500 text-white hover:bg-teal-600'
                    }`}
                  >
                    Sign Up & Get Started
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included Comparison */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">What's Included</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">Compare features across all membership levels</p>
          </div>

          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="min-w-[640px] px-4 sm:px-0">
              <table className="w-full bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden">
                <thead>
                  <tr className="bg-gray-900 text-white">
                    <th className="text-left py-3 sm:py-4 px-3 sm:px-6 font-semibold text-xs sm:text-sm md:text-base">Feature</th>
                    <th className="text-center py-3 sm:py-4 px-2 sm:px-4 font-semibold text-xs sm:text-sm md:text-base">Basic</th>
                    <th className="text-center py-3 sm:py-4 px-2 sm:px-4 font-semibold text-xs sm:text-sm md:text-base">Mid Level</th>
                    <th className="text-center py-3 sm:py-4 px-2 sm:px-4 font-semibold bg-teal-600 text-xs sm:text-sm md:text-base">All Access</th>
                    <th className="text-center py-3 sm:py-4 px-2 sm:px-4 font-semibold text-xs sm:text-sm md:text-base">VIP</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="py-3 sm:py-4 px-3 sm:px-6 text-gray-700 text-xs sm:text-sm md:text-base">Event Tickets</td>
                    <td className="text-center py-3 sm:py-4 px-2 sm:px-4"><i className="ri-check-line text-teal-500 text-base sm:text-xl"></i></td>
                    <td className="text-center py-3 sm:py-4 px-2 sm:px-4"><i className="ri-check-line text-teal-500 text-base sm:text-xl"></i></td>
                    <td className="text-center py-3 sm:py-4 px-2 sm:px-4 bg-teal-50"><i className="ri-check-line text-teal-500 text-base sm:text-xl"></i></td>
                    <td className="text-center py-3 sm:py-4 px-2 sm:px-4"><i className="ri-check-line text-teal-500 text-base sm:text-xl"></i></td>
                  </tr>
                  <tr>
                    <td className="py-3 sm:py-4 px-3 sm:px-6 text-gray-700 text-xs sm:text-sm md:text-base">Hotel Bookings</td>
                    <td className="text-center py-3 sm:py-4 px-2 sm:px-4"><i className="ri-check-line text-teal-500 text-base sm:text-xl"></i></td>
                    <td className="text-center py-3 sm:py-4 px-2 sm:px-4"><i className="ri-check-line text-teal-500 text-base sm:text-xl"></i></td>
                    <td className="text-center py-3 sm:py-4 px-2 sm:px-4 bg-teal-50"><i className="ri-check-line text-teal-500 text-base sm:text-xl"></i></td>
                    <td className="text-center py-3 sm:py-4 px-2 sm:px-4"><i className="ri-check-line text-teal-500 text-base sm:text-xl"></i></td>
                  </tr>
                  <tr>
                    <td className="py-3 sm:py-4 px-3 sm:px-6 text-gray-700 text-xs sm:text-sm md:text-base">Airfare</td>
                    <td className="text-center py-3 sm:py-4 px-2 sm:px-4"><i className="ri-close-line text-gray-300 text-base sm:text-xl"></i></td>
                    <td className="text-center py-3 sm:py-4 px-2 sm:px-4"><i className="ri-check-line text-teal-500 text-base sm:text-xl"></i></td>
                    <td className="text-center py-3 sm:py-4 px-2 sm:px-4 bg-teal-50"><i className="ri-check-line text-teal-500 text-base sm:text-xl"></i></td>
                    <td className="text-center py-3 sm:py-4 px-2 sm:px-4"><i className="ri-check-line text-teal-500 text-base sm:text-xl"></i></td>
                  </tr>
                  <tr>
                    <td className="py-3 sm:py-4 px-3 sm:px-6 text-gray-700 text-xs sm:text-sm md:text-base">Cruises</td>
                    <td className="text-center py-3 sm:py-4 px-2 sm:px-4"><i className="ri-close-line text-gray-300 text-base sm:text-xl"></i></td>
                    <td className="text-center py-3 sm:py-4 px-2 sm:px-4"><i className="ri-check-line text-teal-500 text-base sm:text-xl"></i></td>
                    <td className="text-center py-3 sm:py-4 px-2 sm:px-4 bg-teal-50"><i className="ri-check-line text-teal-500 text-base sm:text-xl"></i></td>
                    <td className="text-center py-3 sm:py-4 px-2 sm:px-4"><i className="ri-check-line text-teal-500 text-base sm:text-xl"></i></td>
                  </tr>
                  <tr>
                    <td className="py-3 sm:py-4 px-3 sm:px-6 text-gray-700 text-xs sm:text-sm md:text-base">Rental Cars</td>
                    <td className="text-center py-3 sm:py-4 px-2 sm:px-4"><i className="ri-close-line text-gray-300 text-base sm:text-xl"></i></td>
                    <td className="text-center py-3 sm:py-4 px-2 sm:px-4"><i className="ri-check-line text-teal-500 text-base sm:text-xl"></i></td>
                    <td className="text-center py-3 sm:py-4 px-2 sm:px-4 bg-teal-50"><i className="ri-check-line text-teal-500 text-base sm:text-xl"></i></td>
                    <td className="text-center py-3 sm:py-4 px-2 sm:px-4"><i className="ri-check-line text-teal-500 text-base sm:text-xl"></i></td>
                  </tr>
                  <tr>
                    <td className="py-3 sm:py-4 px-3 sm:px-6 text-gray-700 text-xs sm:text-sm md:text-base">International Destinations</td>
                    <td className="text-center py-3 sm:py-4 px-2 sm:px-4"><i className="ri-close-line text-gray-300 text-base sm:text-xl"></i></td>
                    <td className="text-center py-3 sm:py-4 px-2 sm:px-4"><i className="ri-close-line text-gray-300 text-base sm:text-xl"></i></td>
                    <td className="text-center py-3 sm:py-4 px-2 sm:px-4 bg-teal-50"><i className="ri-check-line text-teal-500 text-base sm:text-xl"></i></td>
                    <td className="text-center py-3 sm:py-4 px-2 sm:px-4"><i className="ri-check-line text-teal-500 text-base sm:text-xl"></i></td>
                  </tr>
                  <tr>
                    <td className="py-3 sm:py-4 px-3 sm:px-6 text-gray-700 text-xs sm:text-sm md:text-base">Bring Friends & Family</td>
                    <td className="text-center py-3 sm:py-4 px-2 sm:px-4"><i className="ri-close-line text-gray-300 text-base sm:text-xl"></i></td>
                    <td className="text-center py-3 sm:py-4 px-2 sm:px-4"><i className="ri-close-line text-gray-300 text-base sm:text-xl"></i></td>
                    <td className="text-center py-3 sm:py-4 px-2 sm:px-4 bg-teal-50"><i className="ri-check-line text-teal-500 text-base sm:text-xl"></i></td>
                    <td className="text-center py-3 sm:py-4 px-2 sm:px-4"><i className="ri-check-line text-teal-500 text-base sm:text-xl"></i></td>
                  </tr>
                  <tr>
                    <td className="py-3 sm:py-4 px-3 sm:px-6 text-gray-700 text-xs sm:text-sm md:text-base">Five-Star Luxury Resorts</td>
                    <td className="text-center py-3 sm:py-4 px-2 sm:px-4"><i className="ri-close-line text-gray-300 text-base sm:text-xl"></i></td>
                    <td className="text-center py-3 sm:py-4 px-2 sm:px-4"><i className="ri-close-line text-gray-300 text-base sm:text-xl"></i></td>
                    <td className="text-center py-3 sm:py-4 px-2 sm:px-4 bg-teal-50"><i className="ri-close-line text-gray-300 text-base sm:text-xl"></i></td>
                    <td className="text-center py-3 sm:py-4 px-2 sm:px-4"><i className="ri-check-line text-teal-500 text-base sm:text-xl"></i></td>
                  </tr>
                  <tr>
                    <td className="py-3 sm:py-4 px-3 sm:px-6 text-gray-700 text-xs sm:text-sm md:text-base">First-Class Airfare</td>
                    <td className="text-center py-3 sm:py-4 px-2 sm:px-4"><i className="ri-close-line text-gray-300 text-base sm:text-xl"></i></td>
                    <td className="text-center py-3 sm:py-4 px-2 sm:px-4"><i className="ri-close-line text-gray-300 text-base sm:text-xl"></i></td>
                    <td className="text-center py-3 sm:py-4 px-2 sm:px-4 bg-teal-50"><i className="ri-close-line text-gray-300 text-base sm:text-xl"></i></td>
                    <td className="text-center py-3 sm:py-4 px-2 sm:px-4"><i className="ri-check-line text-teal-500 text-base sm:text-xl"></i></td>
                  </tr>
                  <tr>
                    <td className="py-3 sm:py-4 px-3 sm:px-6 text-gray-700 text-xs sm:text-sm md:text-base">Concierge Service</td>
                    <td className="text-center py-3 sm:py-4 px-2 sm:px-4"><i className="ri-close-line text-gray-300 text-base sm:text-xl"></i></td>
                    <td className="text-center py-3 sm:py-4 px-2 sm:px-4"><i className="ri-close-line text-gray-300 text-base sm:text-xl"></i></td>
                    <td className="text-center py-3 sm:py-4 px-2 sm:px-4 bg-teal-50"><i className="ri-close-line text-gray-300 text-base sm:text-xl"></i></td>
                    <td className="text-center py-3 sm:py-4 px-2 sm:px-4"><i className="ri-check-line text-teal-500 text-base sm:text-xl"></i></td>
                  </tr>
                  <tr>
                    <td className="py-3 sm:py-4 px-3 sm:px-6 text-gray-700 text-xs sm:text-sm md:text-base">VIP & Backstage Access</td>
                    <td className="text-center py-3 sm:py-4 px-2 sm:px-4"><i className="ri-close-line text-gray-300 text-base sm:text-xl"></i></td>
                    <td className="text-center py-3 sm:py-4 px-2 sm:px-4"><i className="ri-close-line text-gray-300 text-base sm:text-xl"></i></td>
                    <td className="text-center py-3 sm:py-4 px-2 sm:px-4 bg-teal-50"><i className="ri-close-line text-gray-300 text-base sm:text-xl"></i></td>
                    <td className="text-center py-3 sm:py-4 px-2 sm:px-4"><i className="ri-check-line text-teal-500 text-base sm:text-xl"></i></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">How It Works</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">Get started in three simple steps</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span className="text-2xl sm:text-3xl font-bold text-teal-600">1</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Sign Up</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Create your account and connect your qualifying social media account (or let us help you set one up)
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span className="text-2xl sm:text-3xl font-bold text-teal-600">2</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Get Qualified</h3>
              <p className="text-sm sm:text-base text-gray-600">
                We'll determine your qualification level based on your social media presence and unlock your benefits
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span className="text-2xl sm:text-3xl font-bold text-teal-600">3</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Enjoy</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Start booking free events, concerts, travel, and more based on your membership level
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-teal-500 to-teal-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">Ready to Get Started?</h2>
          <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-10">
            Join thousands of members enjoying free events and travel experiences
          </p>
          {user ? (
            <Link
              to="/profile"
              className="inline-block px-8 sm:px-10 py-3 sm:py-4 bg-white text-teal-600 rounded-full text-sm sm:text-base md:text-lg font-bold hover:shadow-2xl transition-all hover:scale-105 whitespace-nowrap cursor-pointer"
            >
              Go to My Profile
            </Link>
          ) : (
            <Link
              to="/signup"
              className="inline-block px-8 sm:px-10 py-3 sm:py-4 bg-white text-teal-600 rounded-full text-sm sm:text-base md:text-lg font-bold hover:shadow-2xl transition-all hover:scale-105 whitespace-nowrap cursor-pointer"
            >
              Sign Up Now
            </Link>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
