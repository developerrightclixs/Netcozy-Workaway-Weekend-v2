import { Link } from 'react-router-dom';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import ContactSection from '../../components/feature/ContactSection';

export default function InfluencersPage() {
  const followerTiers = [
    {
      range: '3,000 – 90,000',
      title: 'LI3K',
      description:
        'Make your lifestyle comfortable with LI3K (LinkedIn 3K). Turn your mass appeal into a dependable new revenue stream.',
      icon: 'ri-user-follow-line',
      accent: 'from-[#FF6B6B] to-[#FF8E53]',
    },
    {
      range: '100,000 – Millions',
      title: 'LI3K & LI3K Retreats',
      description:
        'Command your wealth through LI3K and exclusive LI3K retreats — a premium path for top-tier influence on any platform.',
      icon: 'ri-vip-crown-line',
      accent: 'from-[#8B5CF6] to-[#A78BFA]',
    },
    {
      range: 'Sponsors',
      title: 'Sponsor Monetization',
      description:
        'Monetize your product endorsement deals as a liaison with your sponsors through sponsor following monetization deals.',
      icon: 'ri-shake-hands-line',
      accent: 'from-[#F59E0B] to-[#FBBF24]',
    },
  ];

  const monetizeFeatures = [
    {
      icon: 'ri-user-follow-line',
      title: 'Monetize Your Following',
      description:
        'Turn the audience you already have into an ongoing source of income without changing what makes you, you.',
    },
    {
      icon: 'ri-shake-hands-line',
      title: 'Monetize Your Endorsements',
      description:
        'Act as a liaison with your sponsors and turn your existing product endorsement deals into bigger revenue.',
    },
    {
      icon: 'ri-line-chart-line',
      title: 'New Revenue Streams',
      description:
        'Build income beyond one-off sponsorships with sustainable streams powered by Netcozy and LI3K.',
    },
    {
      icon: 'ri-pulse-line',
      title: 'Finger on the Pulse',
      description:
        'Stay ahead of trends from Amsterdam to Paris to LA while your brand keeps growing.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=confident%20content%20creator%20recording%20in%20a%20vibrant%20modern%20studio%20with%20ring%20light%20and%20professional%20camera%2C%20warm%20magenta%20and%20coral%20studio%20lighting%2C%20stylish%20influencer%20workspace%20with%20soft%20bokeh%20background%2C%20energetic%20social%20media%20creator%20lifestyle%2C%20premium%20editorial%20photography%2C%20simple%20clean%20background&width=1920&height=800&seq=influencer-hero-001&orientation=landscape"
            alt="Influencers"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-[#FF6B6B]/90 backdrop-blur-sm text-white px-6 py-2 rounded-full text-sm font-medium mb-6">
            <i className="ri-star-smile-line"></i>
            For Podcasters, Celebrities &amp; Creators
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Influencers
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
            The world is a collection of voices — and yours can make waves.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 bg-[#FF6B6B] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#FF5252] transition-colors whitespace-nowrap cursor-pointer"
            >
              Inquire With Us Today
              <i className="ri-arrow-right-line"></i>
            </Link>
            <Link
              to="/li3k"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-colors whitespace-nowrap cursor-pointer border border-white/30"
            >
              Explore LI3K
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              Podcasters, celebrities, psychiatrist and sex therapist. The world is a collection of
              voices — each with the ability to make waves within its own group and often within
              others.
            </p>

            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              Some may possess the gift to speak to the masses and have them return the words in a
              collection of colors that range from reds to yellows, green to greys. Those voices
              shape the face of society today — telling it to frown on gas only and smile on Bugatti.
            </p>

            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              Influencers have the ability to keep their finger on the pulse of trends — Amsterdam to
              Paris and LA. And they are already good at establishing their brand through things like
              product endorsement deals.
            </p>

            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              <strong className="text-[#FF6B6B]">Netcozy Workaway Weekend</strong> and its service{' '}
              <strong className="text-[#2563EB]">LI3K</strong> allow influencers the ability to make
              additional money through new revenue streams. Inquire with us today.
            </p>
          </div>
        </div>
      </section>

      {/* Follower Tiers Section */}
      <section className="py-20 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0A2540] mb-4">
              A Path for Every Stage of Influence
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From your first 3,000 followers to millions — there's a way to turn your reach into wealth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {followerTiers.map((tier, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${tier.accent} rounded-xl flex items-center justify-center mb-6`}
                >
                  <i className={`${tier.icon} text-3xl text-white`}></i>
                </div>
                <div className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-2">
                  {tier.range} followers
                </div>
                <h3 className="text-2xl font-bold text-[#0A2540] mb-4">{tier.title}</h3>
                <p className="text-gray-600 leading-relaxed">{tier.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Monetization Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-[#0A2540] text-center mb-16">
            Ways to Monetize Your Influence
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {monetizeFeatures.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-[#FF6B6B] to-[#FF8E53] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <i className={`${feature.icon} text-4xl text-white`}></i>
                </div>
                <h3 className="text-xl font-bold text-[#0A2540] mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0A2540] mb-4">
              Our Influencer Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive solutions to help you monetize your following and endorsements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Netcozy Workaway Weekend */}
            <Link
              to="/services/workaway"
              className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src="https://readdy.ai/api/search-image?query=influencer%20lifestyle%20at%20luxury%20resort%20getaway%2C%20content%20creator%20relaxing%20poolside%20with%20tropical%20scenery%2C%20premium%20travel%20and%20networking%20experience%2C%20warm%20golden%20hour%20lighting%2C%20simple%20clean%20background&width=400&height=256&seq=influencer-serv1&orientation=landscape"
                  alt="Workaway Weekend"
                  className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-[#0A2540] mb-3">Netcozy Workaway Weekend</h3>
                <p className="text-gray-600 mb-4">
                  Premium weekend experiences that blend work, travel, and exclusive networking.
                </p>
                <div className="flex items-center gap-2 text-[#FF6B6B] font-semibold">
                  Learn More
                  <i className="ri-arrow-right-line"></i>
                </div>
              </div>
            </Link>

            {/* LI3K */}
            <Link
              to="/li3k"
              className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src="https://readdy.ai/api/search-image?query=professional%20influencer%20networking%20and%20monetization%20concept%2C%20creator%20holding%20smartphone%20with%20follower%20growth%20analytics%2C%20modern%20digital%20revenue%20and%20branding%20theme%2C%20warm%20studio%20lighting%2C%20simple%20clean%20background&width=400&height=256&seq=influencer-serv2&orientation=landscape"
                  alt="LI3K"
                  className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-[#0A2540]">LI3K</h3>
                <p className="text-gray-600 mb-4">
                  Monetize your following — from 3,000 to millions of followers on any platform.
                </p>
                <div className="flex items-center gap-2 text-[#FF6B6B] font-semibold">
                  Learn More
                  <i className="ri-arrow-right-line"></i>
                </div>
              </div>
            </Link>

            {/* MONI */}
            <Link
              to="/moni"
              className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src="https://readdy.ai/api/search-image?query=celebrity%20influencer%20lifestyle%20with%20luxury%20brand%20collaborations%2C%20successful%20creator%20surrounded%20by%20premium%20products%20and%20awards%2C%20achievement%20and%20wealth%20theme%2C%20warm%20glamorous%20lighting%2C%20simple%20clean%20background&width=400&height=256&seq=influencer-serv3&orientation=landscape"
                  alt="MONI"
                  className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-[#0A2540]">MONI</h3>
                <p className="text-gray-600 mb-4">
                  Turn your influence into revenue streams for celebrities, artists, and creators.
                </p>
                <div className="flex items-center gap-2 text-[#FF6B6B] font-semibold">
                  Learn More
                  <i className="ri-arrow-right-line"></i>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-[#FF6B6B] to-[#FF3D8E]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-white mb-2">800+</div>
              <div className="text-xl text-white/90">Influencer Partners</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-white mb-2">3K+</div>
              <div className="text-xl text-white/90">Starting Followers</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-white mb-2">M+</div>
              <div className="text-xl text-white/90">Potential Reach</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-white mb-2">24/7</div>
              <div className="text-xl text-white/90">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold text-[#0A2540] mb-6">
            Ready to Monetize Your Voice?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Inquire with us today and discover new revenue streams for your following and endorsements.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="tel:+12136310859"
              className="inline-flex items-center gap-2 bg-[#FF6B6B] text-white px-10 py-4 rounded-full text-lg font-bold transition-all hover:shadow-2xl hover:scale-105 whitespace-nowrap cursor-pointer"
            >
              <i className="ri-phone-line"></i>
              Call 213-631-0859
            </a>
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 border-2 border-[#FF6B6B] text-[#FF6B6B] px-10 py-4 rounded-full text-lg font-bold transition-all hover:bg-[#FF6B6B] hover:text-white whitespace-nowrap cursor-pointer"
            >
              Get Started Today
              <i className="ri-arrow-right-line"></i>
            </Link>
          </div>
        </div>
      </section>

      <ContactSection category="Influencers" />

      <Footer />
    </div>
  );
}