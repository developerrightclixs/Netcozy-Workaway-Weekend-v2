import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { getCurrentUser } from '../../lib/api';
import ContactSection from '../../components/feature/ContactSection';

export default function MusicIndustryPage() {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const checkUser = async () => {
      const currentUser = await getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
      }
    };
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const isLoggedIn = user !== null;

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-white shadow-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center gap-3">
              <img 
                src="https://storage.readdy-site.link/project_files/029ac680-786b-4603-9848-08fb20ae4f30/d786ac2c-4121-45c7-b4ed-371b6f8287d1_image-12.png?v=6f4af2e64a06407323df94a323e44b9e" 
                alt="Netcozy Logo" 
                className="h-12 w-auto"
              />
            </Link>

            <div className="hidden lg:flex items-center gap-8">
              <Link to="/" className="text-[#0A2540] hover:text-[#1990FF] font-medium transition-colors whitespace-nowrap cursor-pointer">
                Home
              </Link>
              <Link to="/about" className="text-[#0A2540] hover:text-[#1990FF] font-medium transition-colors whitespace-nowrap cursor-pointer">
                About
              </Link>
              <Link to="/pricing" className="text-[#0A2540] hover:text-[#1990FF] font-medium transition-colors whitespace-nowrap cursor-pointer">
                Pricing
              </Link>
              <a href="tel:+12136310859" className="flex items-center gap-2 text-[#0A2540] hover:text-[#1990FF] font-medium transition-colors whitespace-nowrap cursor-pointer">
                <i className="ri-phone-line"></i>
                213-631-0859
              </a>
            </div>

            <div className="hidden lg:flex items-center gap-4">
              {isLoggedIn ? (
                <Link to="/profile" className="flex items-center gap-2 px-4 py-2 rounded-lg text-[#0A2540] hover:text-[#1990FF] font-medium transition-colors whitespace-nowrap cursor-pointer">
                  <i className="ri-user-line"></i>
                  My Account
                </Link>
              ) : (
                <>
                  <Link to="/login" className="px-6 py-2 rounded-lg border-2 border-[#0A2540] text-[#0A2540] hover:bg-[#0A2540] hover:text-white font-medium transition-colors whitespace-nowrap cursor-pointer">
                    Login
                  </Link>
                  <Link to="/signup" className="px-6 py-2 rounded-lg bg-[#0A2540] text-white hover:bg-[#0A2540]/90 font-medium transition-colors whitespace-nowrap cursor-pointer">
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#0A2540]"
            >
              <i className={`text-2xl ${mobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'}`}></i>
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="lg:hidden bg-white border-t border-gray-100">
              <div className="px-6 py-4 space-y-4">
                <Link to="/" className="block text-[#0A2540] font-medium cursor-pointer">Home</Link>
                <Link to="/about" className="block text-[#0A2540] font-medium cursor-pointer">About</Link>
                <Link to="/pricing" className="block text-[#0A2540] font-medium cursor-pointer">Pricing</Link>
                <a href="tel:+12136310859" className="flex items-center gap-2 text-[#0A2540] font-medium cursor-pointer">
                  <i className="ri-phone-line"></i>
                  213-631-0859
                </a>
                {isLoggedIn ? (
                  <Link to="/profile" className="block w-full bg-[#1990FF] text-white px-6 py-3 rounded-lg font-medium text-center cursor-pointer">
                    My Account
                  </Link>
                ) : (
                  <div className="space-y-2 pt-4 border-t border-gray-100">
                    <Link to="/login" className="block w-full border-2 border-[#1990FF] text-[#1990FF] px-6 py-3 rounded-lg font-medium text-center cursor-pointer">
                      Login
                    </Link>
                    <Link to="/signup" className="block w-full bg-[#1990FF] text-white px-6 py-3 rounded-lg font-medium text-center cursor-pointer">
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://readdy.ai/api/search-image?query=professional%20music%20recording%20studio%20with%20mixing%20console%20and%20audio%20equipment%2C%20modern%20production%20workspace%20with%20soundproofing%20panels%2C%20creative%20music%20industry%20atmosphere%2C%20warm%20studio%20lighting%2C%20simple%20clean%20background%2C%20professional%20photography%20style&width=1920&height=800&seq=musicindhero&orientation=landscape" 
            alt="Music Industry" 
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="max-w-4xl">
            <div className="inline-block px-4 py-2 bg-[#FF6B6B] text-white text-sm font-bold rounded-full mb-6 whitespace-nowrap">
              MUSIC INDUSTRY SOLUTIONS
            </div>
            <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
              The Future of Earnings in Music
            </h1>
            <p className="text-2xl text-white/90 mb-8 leading-relaxed">
              Harness the power of social media and turn your following into new revenue streams
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              First the 45, then MTV and the CD now SM is the focus of future of massive earnings in the music industry. One piece of data has a value that can grow exponentially with little to no cost when reaching audiences online. The same with SM engaging audiences and connections lead to ability to create new digital assets and extended revenue pools.
            </p>
            
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              Although royalties, and publishing rights bring artist and companies money. Live appearances, product endorsements and your image among other things are ways other than album sales to bring in money. Speak to a representative to see what ways we can make your SM make money for you.
            </p>

            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              Harness the power of SM and you're following with new innovative ways to make earnings from your music.
            </p>
          </div>
        </div>
      </section>

      {/* Monetization Section */}
      <section className="py-20 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-[#0A2540] mb-4">Monetize Your Events</h2>
            <p className="text-xl text-gray-600">Turn your concerts and shows into additional revenue streams</p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-12">
            <div className="flex items-start gap-8">
              <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-[#FF6B6B] to-[#FF8E53] rounded-2xl flex items-center justify-center">
                <i className="ri-money-dollar-circle-line text-4xl text-white"></i>
              </div>
              <div className="flex-1">
                <h3 className="text-3xl font-bold text-[#0A2540] mb-4">Earn 5-10% Commission</h3>
                <p className="text-xl text-gray-700 leading-relaxed mb-6">
                  Make tickets at your event new signups for Netcozy Workaway Weekend. In the future use app and online access to get data on what specific events and teams they like and then place requests with those upcoming shows.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Ask them for shows that they like within the next six to eight months or more if they would like to see those kind of events.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Revenue Streams Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-[#0A2540] text-center mb-16">Multiple Revenue Streams</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-[#1990FF] to-[#0070E0] rounded-xl flex items-center justify-center mb-6">
                <i className="ri-music-2-line text-3xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold text-[#0A2540] mb-3">Royalties</h3>
              <p className="text-gray-600">Traditional publishing rights and streaming revenue</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-[#8B5CF6] to-[#A78BFA] rounded-xl flex items-center justify-center mb-6">
                <i className="ri-mic-line text-3xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold text-[#0A2540] mb-3">Live Shows</h3>
              <p className="text-gray-600">Concert performances and tour appearances</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-[#FF6B6B] to-[#FF8E53] rounded-xl flex items-center justify-center mb-6">
                <i className="ri-shopping-bag-line text-3xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold text-[#0A2540] mb-3">Endorsements</h3>
              <p className="text-gray-600">Product partnerships and brand collaborations</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-[#F59E0B] to-[#FBBF24] rounded-xl flex items-center justify-center mb-6">
                <i className="ri-user-follow-line text-3xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold text-[#0A2540] mb-3">Fan Base</h3>
              <p className="text-gray-600">Monetize your social media following</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Integration */}
      <section className="py-20 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-[#0A2540] mb-4">Our Music Industry Services</h2>
            <p className="text-xl text-gray-600">Comprehensive solutions for artists and music professionals</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Netcozy Workaway Weekend */}
            <Link
              to="/services/workaway"
              className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src="https://readdy.ai/api/search-image?query=music%20festival%20crowd%20enjoying%20live%20concert%20performance%2C%20energetic%20atmosphere%20with%20stage%20lights%2C%20fans%20with%20hands%20up%2C%20exciting%20entertainment%20event%2C%20simple%20clean%20background&width=400&height=256&seq=musicserv1&orientation=landscape" 
                  alt="Workaway Weekend" 
                  className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-[#0A2540] mb-3">Netcozy Workaway Weekend</h3>
                <p className="text-gray-600 mb-4">Connect fans with exclusive concert experiences and travel packages</p>
                <div className="flex items-center gap-2 text-[#1990FF] font-semibold">
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
                  src="https://readdy.ai/api/search-image?query=professional%20music%20business%20networking%20event%2C%20industry%20professionals%20exchanging%20contacts%2C%20modern%20conference%20setting%2C%20corporate%20music%20industry%20atmosphere%2C%20simple%20clean%20background&width=400&height=256&seq=musicserv2&orientation=landscape" 
                  alt="LI3K" 
                  className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-[#0A2540]">LI3K</h3>
                <p className="text-gray-600 mb-4">Monetize your industry contacts and event attendance</p>
                <div className="flex items-center gap-2 text-[#1990FF] font-semibold">
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
                  src="https://readdy.ai/api/search-image?query=successful%20music%20artist%20with%20gold%20records%20and%20awards%2C%20celebrity%20lifestyle%2C%20luxury%20recording%20studio%20setting%2C%20achievement%20and%20success%20theme%2C%20simple%20clean%20background&width=400&height=256&seq=musicserv3&orientation=landscape" 
                  alt="MONI" 
                  className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-[#0A2540]">MONI</h3>
                <p className="text-gray-600 mb-4">Turn your fan base into substantial revenue streams</p>
                <div className="flex items-center gap-2 text-[#1990FF] font-semibold">
                  Learn More
                  <i className="ri-arrow-right-line"></i>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-[#1990FF] to-[#0070E0]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-white mb-2">250+</div>
              <div className="text-xl text-white/90">Music Partners</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-white mb-2">5-10%</div>
              <div className="text-xl text-white/90">Commission Rate</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-white mb-2">$30+</div>
              <div className="text-xl text-white/90">Per Fan Potential</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-white mb-2">24/7</div>
              <div className="text-xl text-white/90">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold text-[#0A2540] mb-6">Ready to Maximize Your Music Revenue?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Speak to a representative to see what ways we can make your social media make money for you
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a 
              href="tel:+12136310859" 
              className="px-10 py-4 bg-[#1990FF] text-white rounded-full text-lg font-bold transition-all hover:shadow-2xl hover:scale-105 whitespace-nowrap cursor-pointer inline-flex items-center gap-2"
            >
              <i className="ri-phone-line"></i>
              Call 213-631-0859
            </a>
            <Link 
              to="/signup" 
              className="px-10 py-4 border-2 border-[#1990FF] text-[#1990FF] rounded-full text-lg font-bold transition-all hover:bg-[#1990FF] hover:text-white whitespace-nowrap cursor-pointer"
            >
              Get Started Today
            </Link>
          </div>
        </div>
      </section>

      <ContactSection category="Music Industry" />

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
            <div className="lg:col-span-2">
              <Link to="/" className="flex items-center gap-3 mb-6">
                <img 
                  src="https://storage.readdy-site.link/project_files/029ac680-786b-4603-9848-08fb20ae4f30/d786ac2c-4121-45c7-b4ed-371b6f8287d1_image-12.png?v=6f4af2e64a06407323df94a323e44b9e" 
                  alt="Netcozy Logo" 
                  className="h-12 w-auto"
                />
              </Link>
              <p className="text-[#0000007D] mb-6 leading-relaxed">
                Your trusted partner for unforgettable travel experiences. From luxury hotels to exclusive events, we make every journey extraordinary.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[#1990FF] hover:text-white transition-colors cursor-pointer">
                  <i className="ri-facebook-fill"></i>
                </div>
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[#1990FF] hover:text-white transition-colors cursor-pointer">
                  <i className="ri-twitter-fill"></i>
                </div>
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[#1990FF] hover:text-white transition-colors cursor-pointer">
                  <i className="ri-instagram-fill"></i>
                </div>
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[#1990FF] hover:text-white transition-colors cursor-pointer">
                  <i className="ri-linkedin-fill"></i>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-black mb-6">Explore</h3>
              <ul className="space-y-4">
                <li>
                  <Link to="/hotels" className="text-[#0000007D] hover:text-[#1990FF] transition-colors cursor-pointer">
                    Hotels & Resorts
                  </Link>
                </li>
                <li>
                  <Link to="/museums" className="text-[#0000007D] hover:text-[#1990FF] transition-colors cursor-pointer">
                    Museums
                  </Link>
                </li>
                <li>
                  <Link to="/concerts" className="text-[#0000007D] hover:text-[#1990FF] transition-colors cursor-pointer">
                    Concerts & Events
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-black mb-6">Support</h3>
              <ul className="space-y-4">
                <li>
                  <Link to="/about" className="text-[#0000007D] hover:text-[#1990FF] transition-colors cursor-pointer">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-[#0000007D] hover:text-[#1990FF] transition-colors cursor-pointer">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-black mb-6">Connect</h3>
              <ul className="space-y-4">
                <li>
                  <a href="tel:+12136310859" className="text-[#0000007D] hover:text-[#1990FF] transition-colors cursor-pointer flex items-center gap-2">
                    <i className="ri-phone-line"></i>
                    213-631-0859
                  </a>
                </li>
                <li>
                  <a href="mailto:exe.desk@netcozyworkawayweekend.com" className="text-[#0000007D] hover:text-[#1990FF] transition-colors cursor-pointer flex items-center gap-2">
                    <i className="ri-mail-line"></i>
                    exe.desk@netcozyworkawayweekend.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[#0000007D] text-sm">
              © 2024 Netcozy. All rights reserved.
            </p>
            <a 
              href="https://readdy.ai/?ref=logo" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#0000007D] text-sm hover:text-[#1990FF] transition-colors cursor-pointer"
            >
              Powered by Readdy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
