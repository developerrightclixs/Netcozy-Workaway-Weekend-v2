import { Link } from 'react-router-dom';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="relative pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 bg-gradient-to-br from-[#1990FF] to-[#0070E0] overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
            About Netcozy Workaway Weekend
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed">
            Your weekend away from work during the work week or on the weekend - free events, travel, and innovative monetization solutions
          </p>
        </div>
      </section>

      {/* Main Service Overview */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center mb-12 sm:mb-16 md:mb-20">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0A2540] mb-4 sm:mb-6">
                Free Social Media Event Tickets &amp; Travel Service
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed mb-3 sm:mb-4">
                Netcozy Workaway Weekend is a <strong>free social media event ticket and travel service</strong> - think of it as your weekend away from work during the work week or on the weekend.
              </p>
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed mb-3 sm:mb-4">
                Attend <strong>free concerts and festivals</strong> with international chart-topping artists and sporting events like NBA, NFL, MLB, MLS, or any international sporting, cultural or other event of your choice along with travel airfare, cruise, rental car, and hotel or resort or a separate getaway across the US, Mexico, Europe, the Caribbean or Bahamas or to any international destination of your choice for you and your coworkers or friends and family.
              </p>
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
                <strong>All for free</strong> based upon the level that you qualify. All you need is a qualifying social media account. Don't have an account? You can set one up or have us set one up for you today and start with our basic level which gets you either event tickets or travel.
              </p>
            </div>
            <div className="relative h-64 sm:h-80 md:h-96 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://readdy.ai/api/search-image?query=diverse%20group%20of%20friends%20enjoying%20outdoor%20music%20festival%20with%20stage%20lights%20and%20crowd%2C%20vibrant%20concert%20atmosphere%2C%20people%20celebrating%20and%20having%20fun%2C%20warm%20golden%20hour%20lighting%2C%20simple%20clean%20background&width=600&height=400&seq=about-main1&orientation=landscape"
                alt="Free Events and Travel"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          {/* Premium Services Introduction */}
          <div className="bg-gradient-to-br from-[#F8F9FA] to-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0A2540] text-center mb-4 sm:mb-6">
              Premium Monetization Services
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 text-center max-w-4xl mx-auto leading-relaxed">
              Our premium services <strong>LI3K</strong> and <strong>MONI</strong> are innovative ways to finance or create new revenue streams using social media and online and brick and mortar visitors or past transactions.
            </p>
          </div>

          {/* LI3K Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center mb-12 sm:mb-16 md:mb-20">
            <div className="order-2 lg:order-1">
              <div className="relative h-64 sm:h-80 md:h-96 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://readdy.ai/api/search-image?query=professional%20business%20networking%20with%20linkedin%20connections%20visualization%2C%20modern%20corporate%20digital%20network%20concept%2C%20business%20people%20connecting%20online%2C%20teal%20and%20gold%20color%20scheme%2C%20simple%20clean%20background&width=600&height=400&seq=about-li3k1&orientation=landscape"
                  alt="LI3K Service"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="flex flex-wrap items-center gap-3 mb-4 sm:mb-6">
                <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#1990FF] text-white text-xs sm:text-sm font-bold rounded-full whitespace-nowrap">
                  BUSINESS SERVICE
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#0A2540] mb-3 sm:mb-4">
                LI3K - LI3K (pronounced “like”)
              </h3>
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed mb-3 sm:mb-4">
                <strong>LI3K</strong> (pronounced "like") stands for LinkedIn 3k. Businesses with <strong>3,000 contacts</strong> can get <strong>half a million dollars or more</strong> using our business process to create digital assets and monetize them, converting them into cash that they can access in as little as <strong>5 to 15 days</strong> and then receive additional amounts every <strong>30, or 60 to 90 days</strong>.
              </p>
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed mb-3 sm:mb-4">
                LI3K contacts, contracts and LI3K retreats allow businesses and entrepreneurs to monetize their in-house and online visitors, contacts, clients, and connect with other businesses to expand their network and customer base.
              </p>
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed mb-4 sm:mb-6">
                <strong>Get paid for being well connected</strong> in your local and online community. Cash for having your own contacts and past clients? Interesting concept.
              </p>
              <div className="bg-[#1990FF]/5 border border-[#1990FF]/20 rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  This is a <strong>free service</strong> that offers businesses an advantage of being able to have additional revenue for inventory, expansion, construction or other needs - making money available even when they would not be able to access it because they already have multiple loans, credit requirements, or lack of assets for collateral or down payment. Giving them an <strong>interest-free injection of capital</strong>.
                </p>
              </div>
              <Link
                to="/li3k"
                className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-[#1990FF] text-white rounded-full text-sm sm:text-base lg:text-lg font-bold hover:bg-[#0070E0] transition-all hover:shadow-xl whitespace-nowrap cursor-pointer"
              >
                Learn More About LI3K
              </Link>
            </div>
          </div>

          {/* MONI Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center mb-12 sm:mb-16 md:mb-20">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-4 sm:mb-6">
                <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#8B5CF6] text-white text-xs sm:text-sm font-bold rounded-full whitespace-nowrap">
                  CELEBRITY SERVICE
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#0A2540] mb-3 sm:mb-4">
                MONI - Monetization for Influencers
              </h3>
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed mb-3 sm:mb-4">
                <strong>MONI</strong> (short for monetization) is for celebrities, influencers, politicians etc. It allows them to monetize their fan base, following, and voter base.
              </p>
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed mb-3 sm:mb-4">
                Musicians, actors and artists among other performers can receive money to help supplement royalties or fill the lack of recurring payments from their past projects by tapping into money that comes from their audience they've built during their career as a performer.
              </p>
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed mb-3 sm:mb-4">
                Celebrities and influencers can receive <strong>higher potentially residual rates</strong> than they would from contracted royalty agreements or payments from ads, streaming (currently only <strong>$4,000 per every 1 million streams</strong> or 6,000 people) versus Netcozy MONI which they receive a minimum of <strong>$30 per person</strong>, album sales, or live appearances.
              </p>
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-2 sm:mb-3">
                  This is a <strong>free service</strong> and money can be made available to them in as little as <strong>5 to 15 days</strong> and they receive additional amounts every <strong>30 days, or 60 to 90 days</strong> until they receive the full amount that they have been approved for.
                </p>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  A celebrity, influencer, politician and any other media or public figure with <strong>a million fans, followers, contacts, or potential voters</strong> that is able to monetize all of their fan base would be eligible for as much as <strong>$30 million or more</strong> which they can receive all at once, half, a quarter or on a 30-day cycle giving them <strong>$2.5 million dollars a month</strong>.
                </p>
              </div>
              <Link
                to="/moni"
                className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-[#8B5CF6] text-white rounded-full text-sm sm:text-base lg:text-lg font-bold hover:bg-[#7C3AED] transition-all hover:shadow-xl whitespace-nowrap cursor-pointer"
              >
                Learn More About MONI
              </Link>
            </div>
            <div className="relative h-64 sm:h-80 md:h-96 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://readdy.ai/api/search-image?query=celebrity%20influencer%20with%20large%20audience%20at%20concert%20or%20event%2C%20famous%20performer%20on%20stage%20with%20crowd%20of%20fans%2C%20entertainment%20industry%20success%2C%20vibrant%20stage%20lighting%2C%20simple%20clean%20background&width=600&height=400&seq=about-moni1&orientation=landscape"
                alt="MONI Service"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          {/* Additional Services */}
          <div className="bg-gradient-to-br from-[#0A2540] to-[#1990FF] rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 text-white mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 sm:mb-6">
              Complete Financial Ecosystem
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/90 text-center max-w-4xl mx-auto leading-relaxed mb-8 sm:mb-12">
              All these things and more are possible with access to licensing our system and our services Netcozy Workaway Weekend, LI3K and MONI or Netcozy Holdings Inc and its subsidiaries other services for financing and financial products.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                  <i className="ri-steering-2-line text-xl sm:text-2xl text-white"></i>
                </div>
                <h4 className="text-base sm:text-lg font-bold mb-1 sm:mb-2">Netcozy 20/50 Motorsports</h4>
                <p className="text-white/80 text-xs sm:text-sm">Motorsports financing and services</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                  <i className="ri-home-4-line text-xl sm:text-2xl text-white"></i>
                </div>
                <h4 className="text-base sm:text-lg font-bold mb-1 sm:mb-2">Netcozy 50 Homes</h4>
                <p className="text-white/80 text-xs sm:text-sm">Luxury properties and real estate</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                  <i className="ri-briefcase-line text-xl sm:text-2xl text-white"></i>
                </div>
                <h4 className="text-base sm:text-lg font-bold mb-1 sm:mb-2">Financial Products</h4>
                <p className="text-white/80 text-xs sm:text-sm">Comprehensive financing solutions</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                  <i className="ri-building-line text-xl sm:text-2xl text-white"></i>
                </div>
                <h4 className="text-base sm:text-lg font-bold mb-1 sm:mb-2">Netcozy Holdings Inc</h4>
                <p className="text-white/80 text-xs sm:text-sm">Parent company and subsidiaries</p>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-12 sm:mb-16 md:mb-20">
            <div className="bg-gradient-to-br from-[#1990FF] to-[#0070E0] rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-white text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 mx-auto">
                <i className="ri-global-line text-2xl sm:text-4xl" />
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2">50+</h3>
              <p className="text-base sm:text-lg md:text-xl">Countries Worldwide</p>
            </div>
            <div className="bg-gradient-to-br from-[#8B5CF6] to-[#A78BFA] rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-white text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 mx-auto">
                <i className="ri-calendar-event-line text-2xl sm:text-4xl" />
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2">500+</h3>
              <p className="text-base sm:text-lg md:text-xl">Events Annually</p>
            </div>
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-white text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 mx-auto">
                <i className="ri-money-dollar-circle-line text-2xl sm:text-4xl" />
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2">$30M+</h3>
              <p className="text-base sm:text-lg md:text-xl">Monetization Potential</p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0A2540] mb-4 sm:mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-6 sm:mb-8">
              Just Google Netcozy to get started today
            </p>
            <Link
              to="/signup"
              className="inline-block px-8 sm:px-10 py-3 sm:py-4 bg-[#1990FF] text-white rounded-full text-sm sm:text-base lg:text-lg font-bold hover:bg-[#0070E0] transition-all hover:shadow-xl whitespace-nowrap cursor-pointer"
            >
              Sign Up Today
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
