import { Link } from 'react-router-dom';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import ContactSection from '../../components/feature/ContactSection';

export default function SportsEntertainmentPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <img 
            src="https://readdy.ai/api/search-image?query=packed%20sports%20stadium%20with%20enthusiastic%20fans%20cheering%20at%20major%20league%20game%2C%20electric%20atmosphere%20with%20bright%20lights%2C%20modern%20arena%20setting%2C%20exciting%20crowd%20energy%2C%20professional%20sports%20photography%20style%2C%20simple%20clean%20background&width=1920&height=800&seq=sportshero1&orientation=landscape" 
            alt="Sports Stadium" 
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
            Sports &amp; Entertainment
          </h1>
          <p className="text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            That's serious game time.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              An endless array of fans mid-season sold out stands success on the court and field is sometimes driven by the back office. But when it comes to ticket sales the problem might not be the number of interested fans or available tickets but the ability to put them in the seats.
            </p>

            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              Enter <strong className="text-[#1990FF]">Netcozy Workaway Weekend</strong> the social media event ticket and travel service that allows teams to provide free hotel and travel to its fan base with a qualifying or new LinkedIn account that lets them relax while they enjoy the city and the big game. Turn a Thursday concert and Friday game into a 3 Day weekend and still have Sunday to recover.
            </p>

            <p className="text-xl text-gray-700 leading-relaxed mb-12">
              Being able to offer them a premium service and athletes extra contract bonuses like fan base monetization in its service <strong className="text-[#8B5CF6]">MONI</strong> (pronounce money) as well as fan bonuses can only be made better with Netcozy Workaway Weekend premier service <strong className="text-[#2563EB]">LI3K</strong> (pronounced like) which allows teams to do the same thing make things better. Turn it's online and at game attendance into additional revenue streams (and actual streams of revenue not social media marketing) all with the power of SM. Netcozy Workaway Weekend LI3K and MONI that's serious game time.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-[#0A2540] text-center mb-4">
            Inquire With Us About
          </h2>
          <p className="text-xl text-gray-600 text-center mb-16">
            Three powerful services designed for sports teams, athletes, and fans
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Netcozy Workaway Weekend */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-[#FF6B6B] to-[#FF8E53] rounded-xl flex items-center justify-center mb-6">
                <i className="ri-calendar-check-line text-3xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold text-[#0A2540] mb-4">
                Netcozy Workaway Weekend
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Good for fans and sports teams
              </p>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Provide free hotel and travel to your fan base with qualifying LinkedIn accounts. Turn game day into a 3-day weekend experience that fills seats and creates unforgettable memories.
              </p>
              <Link
                to="/services/workaway"
                className="inline-flex items-center gap-2 text-[#FF6B6B] font-semibold hover:gap-3 transition-all cursor-pointer"
              >
                Learn More
                <i className="ri-arrow-right-line"></i>
              </Link>
            </div>

            {/* LI3K */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-[#2563EB] to-[#3B82F6] rounded-xl flex items-center justify-center mb-6">
                <i className="ri-links-line text-3xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold text-[#0A2540] mb-4">
                LI3K
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Sports teams can monetize online and in-house visitors as long as employees and team members
              </p>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Transform your online presence and stadium attendance into actual revenue streams. Monetize your digital and physical visitor base with the power of social media.
              </p>
              <Link
                to="/li3k"
                className="inline-flex items-center gap-2 text-[#2563EB] font-semibold hover:gap-3 transition-all cursor-pointer"
              >
                Learn More
                <i className="ri-arrow-right-line"></i>
              </Link>
            </div>

            {/* MONI */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-[#8B5CF6] to-[#A78BFA] rounded-xl flex items-center justify-center mb-6">
                <i className="ri-money-dollar-circle-line text-3xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold text-[#0A2540] mb-4">
                MONI
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Allows athletes to monetize their fan and sponsor base
              </p>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Athletes can receive extra contract bonuses through fan base monetization. Turn your following into financial opportunities that supplement your career earnings.
              </p>
              <Link
                to="/moni"
                className="inline-flex items-center gap-2 text-[#8B5CF6] font-semibold hover:gap-3 transition-all cursor-pointer"
              >
                Learn More
                <i className="ri-arrow-right-line"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-[#0A2540] text-center mb-16">
            Why Sports Teams Choose Netcozy
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-team-line text-4xl text-[#1990FF]"></i>
              </div>
              <h3 className="text-xl font-bold text-[#0A2540] mb-3">Fill More Seats</h3>
              <p className="text-gray-600">
                Overcome ticket sales challenges by making attendance accessible to more fans
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-line-chart-line text-4xl text-[#8B5CF6]"></i>
              </div>
              <h3 className="text-xl font-bold text-[#0A2540] mb-3">New Revenue Streams</h3>
              <p className="text-gray-600">
                Generate actual revenue from your online and in-stadium visitor base
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-user-star-line text-4xl text-[#10B981]"></i>
              </div>
              <h3 className="text-xl font-bold text-[#0A2540] mb-3">Athlete Benefits</h3>
              <p className="text-gray-600">
                Offer athletes extra contract bonuses through fan base monetization
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-trophy-line text-4xl text-[#F59E0B]"></i>
              </div>
              <h3 className="text-xl font-bold text-[#0A2540] mb-3">Premium Experience</h3>
              <p className="text-gray-600">
                Transform game day into a 3-day weekend getaway for your fans
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sports Imagery Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-[#0A2540] text-center mb-16">
            Major League Coverage
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="relative h-64 rounded-2xl overflow-hidden group cursor-pointer">
              <img 
                src="https://readdy.ai/api/search-image?query=NBA%20basketball%20game%20action%20shot%20with%20players%20on%20court%2C%20professional%20arena%20atmosphere%2C%20exciting%20sports%20moment%2C%20dynamic%20basketball%20photography%2C%20simple%20clean%20background&width=400&height=500&seq=nba1&orientation=portrait" 
                alt="NBA" 
                className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-2xl font-bold text-white">NBA</h3>
                <p className="text-white/80 text-sm">Basketball</p>
              </div>
            </div>

            <div className="relative h-64 rounded-2xl overflow-hidden group cursor-pointer">
              <img 
                src="https://readdy.ai/api/search-image?query=NFL%20football%20game%20with%20players%20in%20action%2C%20packed%20stadium%20with%20fans%2C%20professional%20sports%20photography%2C%20exciting%20game%20moment%2C%20simple%20clean%20background&width=400&height=500&seq=nfl1&orientation=portrait" 
                alt="NFL" 
                className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-2xl font-bold text-white">NFL</h3>
                <p className="text-white/80 text-sm">Football</p>
              </div>
            </div>

            <div className="relative h-64 rounded-2xl overflow-hidden group cursor-pointer">
              <img 
                src="https://readdy.ai/api/search-image?query=MLB%20baseball%20game%20with%20batter%20at%20plate%2C%20professional%20baseball%20stadium%2C%20exciting%20sports%20action%2C%20major%20league%20atmosphere%2C%20simple%20clean%20background&width=400&height=500&seq=mlb1&orientation=portrait" 
                alt="MLB" 
                className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-2xl font-bold text-white">MLB</h3>
                <p className="text-white/80 text-sm">Baseball</p>
              </div>
            </div>

            <div className="relative h-64 rounded-2xl overflow-hidden group cursor-pointer">
              <img 
                src="https://readdy.ai/api/search-image?query=MLS%20soccer%20match%20with%20players%20competing%2C%20professional%20soccer%20stadium%2C%20exciting%20game%20action%2C%20major%20league%20soccer%20atmosphere%2C%20simple%20clean%20background&width=400&height=500&seq=mls1&orientation=portrait" 
                alt="MLS" 
                className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-2xl font-bold text-white">MLS</h3>
                <p className="text-white/80 text-sm">Soccer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#1990FF] to-[#0070E0]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            Ready to Transform Your Game Day Experience?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Contact us today to learn how Netcozy can help your team fill more seats, generate new revenue, and create unforgettable fan experiences
          </p>
          <div className="flex items-center justify-center gap-4">
            <a 
              href="tel:+12136310859"
              className="px-10 py-4 bg-white text-[#1990FF] rounded-full text-lg font-bold transition-all hover:shadow-2xl hover:scale-105 whitespace-nowrap cursor-pointer"
            >
              <i className="ri-phone-line mr-2"></i>
              Call 213-631-0859
            </a>
            <Link 
              to="/about"
              className="px-10 py-4 border-2 border-white text-white rounded-full text-lg font-bold transition-all hover:bg-white/10 whitespace-nowrap cursor-pointer"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      <ContactSection category="Sports & Entertainment" />

      <Footer />
    </div>
  );
}
