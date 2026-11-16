
import { Link } from 'react-router-dom';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';

export default function WorkawayPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=vibrant%20festival%20crowd%20enjoying%20live%20music%20concert%20with%20colorful%20stage%20lights%20and%20energetic%20atmosphere%20modern%20entertainment%20venue%20with%20excited%20people%20celebrating%20weekend%20getaway%20experience&width=1920&height=800&seq=workaway-hero-001&orientation=landscape"
            alt="Workaway Weekend Experience"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/50"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-teal-500/90 backdrop-blur-sm text-white px-6 py-2 rounded-full text-sm font-medium mb-6">
            <i className="ri-calendar-event-line"></i>
            Free Events & Travel Service
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Netcozy Workaway Weekend
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
            Your weekend away from work during the work week or on the weekend
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 bg-teal-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-teal-600 transition-colors whitespace-nowrap cursor-pointer"
            >
              Get Started Free
              <i className="ri-arrow-right-line"></i>
            </Link>
            <Link
              to="/pricing"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-colors whitespace-nowrap cursor-pointer border border-white/30"
            >
              View Membership Levels
            </Link>
          </div>
        </div>
      </section>

      {/* What is Workaway Weekend */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">
              What is Workaway Weekend?
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
              <p>
                Netcozy Workaway Weekend is a <strong>free social media event ticket and travel service</strong> - think of it as your weekend away from work during the work week or on the weekend.
              </p>
              <p>
                Attend <strong>free concerts and festivals</strong> with international chart-topping artists and sporting events including <strong>NBA, NFL, MLB, MLS</strong>, or any international sporting, cultural or other event of your choice.
              </p>
              <p>
                Plus enjoy travel including <strong>airfare, cruises, rental cars, and hotels or resorts</strong> or a separate getaway across the <strong>US, Mexico, Europe, the Caribbean or Bahamas</strong> or to any international destination of your choice for you and your coworkers or friends and family.
              </p>
              <p className="text-2xl font-bold text-teal-600">
                All for free based upon the level that you qualify.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
            Getting started is simple - all you need is a qualifying social media account
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mb-6">
                <i className="ri-user-add-line text-3xl text-teal-600"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">1. Sign Up</h3>
              <p className="text-gray-600 leading-relaxed">
                Create your account or connect your existing social media account. Don't have one? We can help you set one up today.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mb-6">
                <i className="ri-shield-check-line text-3xl text-teal-600"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">2. Qualify</h3>
              <p className="text-gray-600 leading-relaxed">
                Your qualification level determines your benefits - from basic level (event tickets OR travel) to all-access VIP packages.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mb-6">
                <i className="ri-gift-line text-3xl text-teal-600"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">3. Enjoy</h3>
              <p className="text-gray-600 leading-relaxed">
                Start booking your free events and travel experiences. The more you engage, the more benefits you unlock.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Don't Have a Qualifying Account?</h3>
            <p className="text-lg text-teal-50 mb-6 max-w-2xl mx-auto">
              No problem! Start with our basic level which gets you either event tickets or travel. We'll help you set up your account and get started today.
            </p>
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 bg-white text-teal-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer"
            >
              Get Started Now
              <i className="ri-arrow-right-line"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* What You Can Experience */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">
            What You Can Experience
          </h2>
          <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
            From world-class events to dream destinations
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Events */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <div className="relative h-64">
                <img
                  src="https://readdy.ai/api/search-image?query=spectacular%20live%20concert%20performance%20with%20international%20chart%20topping%20artist%20on%20stage%20massive%20crowd%20enjoying%20music%20festival%20with%20professional%20lighting%20and%20sound%20system%20entertainment%20venue&width=800&height=600&seq=workaway-events-001&orientation=landscape"
                  alt="Events"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="p-8">
                <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-4">
                  <i className="ri-ticket-2-line text-2xl text-teal-600"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Events & Entertainment</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <i className="ri-check-line text-teal-500 text-xl flex-shrink-0 mt-0.5"></i>
                    <span className="text-gray-700">Concerts with international chart-topping artists</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="ri-check-line text-teal-500 text-xl flex-shrink-0 mt-0.5"></i>
                    <span className="text-gray-700">Music festivals and cultural events</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="ri-check-line text-teal-500 text-xl flex-shrink-0 mt-0.5"></i>
                    <span className="text-gray-700">NBA, NFL, MLB, MLS sporting events</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="ri-check-line text-teal-500 text-xl flex-shrink-0 mt-0.5"></i>
                    <span className="text-gray-700">International sporting and cultural events</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Travel */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <div className="relative h-64">
                <img
                  src="https://readdy.ai/api/search-image?query=luxury%20tropical%20beach%20resort%20with%20crystal%20clear%20turquoise%20water%20white%20sand%20beach%20palm%20trees%20modern%20hotel%20building%20vacation%20paradise%20destination%20caribbean%20style%20relaxation%20getaway&width=800&height=600&seq=workaway-travel-001&orientation=landscape"
                  alt="Travel"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="p-8">
                <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-4">
                  <i className="ri-plane-line text-2xl text-teal-600"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Travel & Getaways</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <i className="ri-check-line text-teal-500 text-xl flex-shrink-0 mt-0.5"></i>
                    <span className="text-gray-700">Airfare to destinations worldwide</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="ri-check-line text-teal-500 text-xl flex-shrink-0 mt-0.5"></i>
                    <span className="text-gray-700">Luxury cruises and ocean adventures</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="ri-check-line text-teal-500 text-xl flex-shrink-0 mt-0.5"></i>
                    <span className="text-gray-700">Hotels, resorts, and rental cars</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="ri-check-line text-teal-500 text-xl flex-shrink-0 mt-0.5"></i>
                    <span className="text-gray-700">US, Mexico, Europe, Caribbean, Bahamas & beyond</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Levels */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">
            Membership Levels
          </h2>
          <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
            Choose the level that fits your lifestyle
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Basic */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:border-teal-500 transition-colors">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Basic</h3>
                <p className="text-gray-600">Event tickets OR travel</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <i className="ri-check-line text-teal-500 flex-shrink-0 mt-0.5"></i>
                  <span>Event tickets</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <i className="ri-check-line text-teal-500 flex-shrink-0 mt-0.5"></i>
                  <span>Travel services</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <i className="ri-check-line text-teal-500 flex-shrink-0 mt-0.5"></i>
                  <span>Basic support</span>
                </li>
              </ul>
              <Link
                to="/pricing"
                className="block w-full text-center bg-gray-100 text-gray-900 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors whitespace-nowrap cursor-pointer"
              >
                Learn More
              </Link>
            </div>

            {/* Mid Level */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:border-teal-500 transition-colors">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Mid Level</h3>
                <p className="text-gray-600">Events + expanded travel</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <i className="ri-check-line text-teal-500 flex-shrink-0 mt-0.5"></i>
                  <span>Event tickets</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <i className="ri-check-line text-teal-500 flex-shrink-0 mt-0.5"></i>
                  <span>Airfare & cruises</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <i className="ri-check-line text-teal-500 flex-shrink-0 mt-0.5"></i>
                  <span>Rental cars</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <i className="ri-check-line text-teal-500 flex-shrink-0 mt-0.5"></i>
                  <span>Hotels & resorts</span>
                </li>
              </ul>
              <Link
                to="/pricing"
                className="block w-full text-center bg-gray-100 text-gray-900 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors whitespace-nowrap cursor-pointer"
              >
                Learn More
              </Link>
            </div>

            {/* All Access */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border-2 border-teal-500 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="bg-teal-500 text-white px-4 py-1 rounded-full text-sm font-medium whitespace-nowrap">
                  Most Popular
                </span>
              </div>
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">All Access</h3>
                <p className="text-gray-600">Everything + VIP perks</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <i className="ri-check-line text-teal-500 flex-shrink-0 mt-0.5"></i>
                  <span>All travel services</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <i className="ri-check-line text-teal-500 flex-shrink-0 mt-0.5"></i>
                  <span>VIP giveaways</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <i className="ri-check-line text-teal-500 flex-shrink-0 mt-0.5"></i>
                  <span>Priority support</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <i className="ri-check-line text-teal-500 flex-shrink-0 mt-0.5"></i>
                  <span>Exclusive events</span>
                </li>
              </ul>
              <Link
                to="/pricing"
                className="block w-full text-center bg-teal-500 text-white py-3 rounded-lg font-medium hover:bg-teal-600 transition-colors whitespace-nowrap cursor-pointer"
              >
                Learn More
              </Link>
            </div>

            {/* VIP */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 shadow-sm text-white">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">All Access VIP</h3>
                <p className="text-gray-300">Ultimate luxury experience</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2 text-sm text-gray-200">
                  <i className="ri-check-line text-teal-400 flex-shrink-0 mt-0.5"></i>
                  <span>All benefits</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-200">
                  <i className="ri-check-line text-teal-400 flex-shrink-0 mt-0.5"></i>
                  <span>Five-star resorts</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-200">
                  <i className="ri-check-line text-teal-400 flex-shrink-0 mt-0.5"></i>
                  <span>Luxury travel</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-200">
                  <i className="ri-check-line text-teal-400 flex-shrink-0 mt-0.5"></i>
                  <span>Concierge service</span>
                </li>
              </ul>
              <Link
                to="/pricing"
                className="block w-full text-center bg-white text-gray-900 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors whitespace-nowrap cursor-pointer"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-teal-500 to-teal-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-teal-50 mb-8 leading-relaxed">
            Join thousands of members already enjoying free events and travel experiences. Sign up today and start qualifying for your benefits.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 bg-white text-teal-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer"
            >
              Create Free Account
              <i className="ri-arrow-right-line"></i>
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-colors whitespace-nowrap cursor-pointer border border-white/30"
            >
              Learn More About Netcozy
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
