import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { fetchMyProfile, getCurrentUser } from '@/lib/api';
import ShareButton from '../base/ShareButton';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);
  const [showCategoriesDropdown, setShowCategoriesDropdown] = useState(false);
  const [showDestinationsDropdown, setShowDestinationsDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);
  const [mobileDestinationsOpen, setMobileDestinationsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data, error } = await fetchMyProfile();
        if (error) throw new Error(error);
        if (data?.profile) setUserProfile(data.profile);
      } catch (err) {
        console.error('Failed to fetch user profile:', err);
        setUserProfile(null);
      }
    };

    const checkUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
          await fetchUserProfile();
        } else {
          setUser(null);
          setUserProfile(null);
        }
      } catch (err) {
        console.error('Error checking auth state:', err);
        setUser(null);
        setUserProfile(null);
      }
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
        fetchUserProfile();
      } else {
        setUser(null);
        setUserProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const isLoggedIn = user !== null;

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileServicesOpen(false);
    setMobileCategoriesOpen(false);
    setMobileDestinationsOpen(false);
  };

  const closeAllDropdowns = () => {
    setShowServicesDropdown(false);
    setShowCategoriesDropdown(false);
    setShowDestinationsDropdown(false);
  };

  return (
    <>
      {/* ── Top utility bar ── */}
      <div className="hidden md:block w-full bg-[#0A2540] text-white text-sm">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-9">
          <span className="text-white/70 text-xs tracking-wide">
            Netcozy Workaway Weekend — Premium Travel &amp; Networking
          </span>
          <div className="flex items-center gap-5">
            <a
              href="tel:+12136310859"
              className="flex items-center gap-1.5 text-white/80 hover:text-white transition-colors whitespace-nowrap cursor-pointer text-xs"
            >
              <i className="ri-phone-line text-xs"></i>
              213-631-0859
            </a>
            <a
              href="mailto:exe.desk@netcozyworkawayweekend.com"
              className="flex items-center gap-1.5 text-white/80 hover:text-white transition-colors whitespace-nowrap cursor-pointer text-xs"
            >
              <i className="ri-mail-line text-xs"></i>
              exe.desk@netcozyworkawayweekend.com
            </a>
            <ShareButton
              title="Netcozy - Premium Travel & Networking"
              text="Discover exclusive travel experiences and networking opportunities"
            />
          </div>
        </div>
      </div>

      {/* ── Main nav ── */}
      <nav
        className={`sticky top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-white shadow-md' : 'bg-white shadow-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link to="/" className="flex items-center flex-shrink-0">
              <img
                src="https://storage.readdy-site.link/project_files/029ac680-786b-4603-9848-08fb20ae4f30/d786ac2c-4121-45c7-b4ed-371b6f8287d1_image-12.png?v=6f4af2e64a06407323df94a323e44b9e"
                alt="Netcozy Logo"
                className="h-10 w-auto"
              />
            </Link>

            {/* Desktop nav links — centered */}
            <div className="hidden md:flex items-center gap-1">
              <Link
                to="/"
                className="px-3 py-2 rounded-md text-sm font-medium text-[#0A2540] hover:text-[#1990FF] hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer"
              >
                Home
              </Link>

              {/* Services */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowServicesDropdown(!showServicesDropdown);
                    setShowCategoriesDropdown(false);
                    setShowDestinationsDropdown(false);
                  }}
                  className="flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium text-[#0A2540] hover:text-[#1990FF] hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer"
                >
                  Services
                  <i className={`ri-arrow-down-s-line text-base transition-transform duration-200 ${showServicesDropdown ? 'rotate-180' : ''}`}></i>
                </button>
              </div>

              {/* Categories */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowCategoriesDropdown(!showCategoriesDropdown);
                    setShowServicesDropdown(false);
                    setShowDestinationsDropdown(false);
                  }}
                  className="flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium text-[#0A2540] hover:text-[#1990FF] hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer"
                >
                  Categories
                  <i className={`ri-arrow-down-s-line text-base transition-transform duration-200 ${showCategoriesDropdown ? 'rotate-180' : ''}`}></i>
                </button>
              </div>

              {/* Destinations */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowDestinationsDropdown(!showDestinationsDropdown);
                    setShowServicesDropdown(false);
                    setShowCategoriesDropdown(false);
                  }}
                  className="flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium text-[#0A2540] hover:text-[#1990FF] hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer"
                >
                  Destinations
                  <i className={`ri-arrow-down-s-line text-base transition-transform duration-200 ${showDestinationsDropdown ? 'rotate-180' : ''}`}></i>
                </button>
              </div>

              <Link to="/concerts" className="px-3 py-2 rounded-md text-sm font-medium text-[#0A2540] hover:text-[#1990FF] hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer">
                Concerts
              </Link>
              <Link to="/leads" className="px-3 py-2 rounded-md text-sm font-medium text-[#0A2540] hover:text-[#1990FF] hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer">
                Leads
              </Link>
              <Link to="/pricing" className="px-3 py-2 rounded-md text-sm font-medium text-[#0A2540] hover:text-[#1990FF] hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer">
                Pricing
              </Link>
              <Link to="/about" className="px-3 py-2 rounded-md text-sm font-medium text-[#0A2540] hover:text-[#1990FF] hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer">
                About
              </Link>
              <Link to="/contact" className="px-3 py-2 rounded-md text-sm font-medium text-[#0A2540] hover:text-[#1990FF] hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer">
                Contact
              </Link>
            </div>

            {/* Desktop auth buttons */}
            <div className="hidden md:flex items-center gap-3 flex-shrink-0">
              {isLoggedIn ? (
                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-[#0A2540] border border-[#0A2540] hover:bg-[#0A2540] hover:text-white transition-colors whitespace-nowrap cursor-pointer"
                >
                  <i className="ri-user-line"></i>
                  My Account
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-5 py-2 rounded-lg text-sm font-medium border border-[#0A2540] text-[#0A2540] hover:bg-[#0A2540] hover:text-white transition-colors whitespace-nowrap cursor-pointer"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="px-5 py-2 rounded-lg text-sm font-semibold bg-[#0A2540] text-white hover:bg-[#0A2540]/85 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex items-center justify-center w-10 h-10 text-[#0A2540] cursor-pointer"
              aria-label="Toggle menu"
            >
              <i className={`${mobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'} text-2xl`}></i>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={closeMobileMenu} />
      )}

      {/* Mobile slide-out menu */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white z-50 md:hidden transform transition-transform duration-300 ease-in-out overflow-y-auto shadow-2xl ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 h-16 border-b border-gray-100">
          <img
            src="https://storage.readdy-site.link/project_files/029ac680-786b-4603-9848-08fb20ae4f30/d786ac2c-4121-45c7-b4ed-371b6f8287d1_image-12.png?v=6f4af2e64a06407323df94a323e44b9e"
            alt="Netcozy Logo"
            className="h-8 w-auto"
          />
          <button onClick={closeMobileMenu} className="w-9 h-9 flex items-center justify-center text-gray-500 cursor-pointer">
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        <div className="flex flex-col py-3">
          <Link to="/" onClick={closeMobileMenu} className="flex items-center gap-3 px-6 py-3 text-sm font-medium text-[#0A2540] hover:text-[#1990FF] hover:bg-gray-50 transition-colors cursor-pointer">
            <i className="ri-home-line w-5 h-5 flex items-center justify-center"></i>
            Home
          </Link>

          {/* Services */}
          <button onClick={() => setMobileServicesOpen(!mobileServicesOpen)} className="flex items-center justify-between px-6 py-3 text-sm font-medium text-[#0A2540] cursor-pointer hover:bg-gray-50">
            <span className="flex items-center gap-3">
              <i className="ri-service-line w-5 h-5 flex items-center justify-center"></i>
              Services
            </span>
            <i className={`ri-arrow-down-s-line transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`}></i>
          </button>
          {mobileServicesOpen && (
            <div className="bg-gray-50 py-1">
              <Link to="/hotels" onClick={closeMobileMenu} className="flex items-center gap-3 px-10 py-2.5 text-sm text-gray-700 hover:text-[#1990FF] cursor-pointer"><i className="ri-hotel-line text-[#1990FF]"></i>Hotels &amp; Resorts</Link>
              <Link to="/flights" onClick={closeMobileMenu} className="flex items-center gap-3 px-10 py-2.5 text-sm text-gray-700 hover:text-[#1990FF] cursor-pointer"><i className="ri-flight-takeoff-line text-[#1990FF]"></i>Flights</Link>
              <Link to="/cruises" onClick={closeMobileMenu} className="flex items-center gap-3 px-10 py-2.5 text-sm text-gray-700 hover:text-[#1990FF] cursor-pointer"><i className="ri-ship-line text-[#1990FF]"></i>Cruises</Link>
              <Link to="/car-rentals" onClick={closeMobileMenu} className="flex items-center gap-3 px-10 py-2.5 text-sm text-gray-700 hover:text-[#1990FF] cursor-pointer"><i className="ri-car-line text-[#1990FF]"></i>Car Rentals</Link>
            </div>
          )}

          {/* Categories */}
          <button onClick={() => setMobileCategoriesOpen(!mobileCategoriesOpen)} className="flex items-center justify-between px-6 py-3 text-sm font-medium text-[#0A2540] cursor-pointer hover:bg-gray-50">
            <span className="flex items-center gap-3">
              <i className="ri-apps-line w-5 h-5 flex items-center justify-center"></i>
              Categories
            </span>
            <i className={`ri-arrow-down-s-line transition-transform ${mobileCategoriesOpen ? 'rotate-180' : ''}`}></i>
          </button>
          {mobileCategoriesOpen && (
            <div className="bg-gray-50 py-1">
              <Link to="/business-travel" onClick={closeMobileMenu} className="flex items-center gap-3 px-10 py-2.5 text-sm text-gray-700 hover:text-[#1990FF] cursor-pointer"><i className="ri-suitcase-line text-[#1990FF]"></i>Business Travel</Link>
              <Link to="/romantic-getaways" onClick={closeMobileMenu} className="flex items-center gap-3 px-10 py-2.5 text-sm text-gray-700 hover:text-[#1990FF] cursor-pointer"><i className="ri-heart-line text-[#1990FF]"></i>Romantic Getaways</Link>
              <Link to="/family-vacations" onClick={closeMobileMenu} className="flex items-center gap-3 px-10 py-2.5 text-sm text-gray-700 hover:text-[#1990FF] cursor-pointer"><i className="ri-team-line text-[#1990FF]"></i>Family Vacations</Link>
            </div>
          )}

          {/* Destinations */}
          <button onClick={() => setMobileDestinationsOpen(!mobileDestinationsOpen)} className="flex items-center justify-between px-6 py-3 text-sm font-medium text-[#0A2540] cursor-pointer hover:bg-gray-50">
            <span className="flex items-center gap-3">
              <i className="ri-map-pin-line w-5 h-5 flex items-center justify-center"></i>
              Destinations
            </span>
            <i className={`ri-arrow-down-s-line transition-transform ${mobileDestinationsOpen ? 'rotate-180' : ''}`}></i>
          </button>
          {mobileDestinationsOpen && (
            <div className="bg-gray-50 py-1">
              <Link to="/museums" onClick={closeMobileMenu} className="flex items-center gap-3 px-10 py-2.5 text-sm text-gray-700 hover:text-[#1990FF] cursor-pointer"><i className="ri-building-2-line text-[#1990FF]"></i>Museums</Link>
              <Link to="/beach-resorts" onClick={closeMobileMenu} className="flex items-center gap-3 px-10 py-2.5 text-sm text-gray-700 hover:text-[#1990FF] cursor-pointer"><i className="ri-sun-line text-[#1990FF]"></i>Beach Resorts</Link>
              <Link to="/mountain-retreats" onClick={closeMobileMenu} className="flex items-center gap-3 px-10 py-2.5 text-sm text-gray-700 hover:text-[#1990FF] cursor-pointer"><i className="ri-landscape-line text-[#1990FF]"></i>Mountain Retreats</Link>
              <Link to="/city-breaks" onClick={closeMobileMenu} className="flex items-center gap-3 px-10 py-2.5 text-sm text-gray-700 hover:text-[#1990FF] cursor-pointer"><i className="ri-building-line text-[#1990FF]"></i>City Breaks</Link>
            </div>
          )}

          <div className="border-t border-gray-100 my-2 mx-6"></div>

          <Link to="/concerts" onClick={closeMobileMenu} className="flex items-center gap-3 px-6 py-3 text-sm font-medium text-[#0A2540] hover:text-[#1990FF] hover:bg-gray-50 cursor-pointer"><i className="ri-music-line w-5 h-5 flex items-center justify-center"></i>Concerts</Link>
          <Link to="/leads" onClick={closeMobileMenu} className="flex items-center gap-3 px-6 py-3 text-sm font-medium text-[#0A2540] hover:text-[#1990FF] hover:bg-gray-50 cursor-pointer"><i className="ri-contacts-line w-5 h-5 flex items-center justify-center"></i>Leads</Link>
          <Link to="/pricing" onClick={closeMobileMenu} className="flex items-center gap-3 px-6 py-3 text-sm font-medium text-[#0A2540] hover:text-[#1990FF] hover:bg-gray-50 cursor-pointer"><i className="ri-price-tag-3-line w-5 h-5 flex items-center justify-center"></i>Pricing</Link>
          <Link to="/about" onClick={closeMobileMenu} className="flex items-center gap-3 px-6 py-3 text-sm font-medium text-[#0A2540] hover:text-[#1990FF] hover:bg-gray-50 cursor-pointer"><i className="ri-information-line w-5 h-5 flex items-center justify-center"></i>About</Link>
          <Link to="/contact" onClick={closeMobileMenu} className="flex items-center gap-3 px-6 py-3 text-sm font-medium text-[#0A2540] hover:text-[#1990FF] hover:bg-gray-50 cursor-pointer"><i className="ri-mail-line w-5 h-5 flex items-center justify-center"></i>Contact</Link>

          <div className="border-t border-gray-100 my-2 mx-6"></div>

          <a href="tel:+12136310859" className="flex items-center gap-3 px-6 py-3 text-sm font-medium text-[#0A2540] hover:text-[#1990FF] hover:bg-gray-50 cursor-pointer">
            <i className="ri-phone-line w-5 h-5 flex items-center justify-center"></i>
            213-631-0859
          </a>
          <a href="mailto:exe.desk@netcozyworkawayweekend.com" className="flex items-center gap-3 px-6 py-3 text-sm font-medium text-[#0A2540] hover:text-[#1990FF] hover:bg-gray-50 cursor-pointer">
            <i className="ri-mail-line w-5 h-5 flex items-center justify-center"></i>
            exe.desk@netcozyworkawayweekend.com
          </a>

          <div className="border-t border-gray-100 my-2 mx-6"></div>

          <div className="px-6 py-3 flex flex-col gap-3">
            <div className="mb-1">
              <ShareButton
                title="Netcozy - Premium Travel & Networking"
                text="Discover exclusive travel experiences and networking opportunities"
                className="w-full justify-center"
              />
            </div>
            {isLoggedIn ? (
              <Link to="/profile" onClick={closeMobileMenu} className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-[#0A2540] border border-[#0A2540] hover:bg-[#0A2540] hover:text-white transition-colors cursor-pointer">
                <i className="ri-user-line"></i>My Account
              </Link>
            ) : (
              <>
                <Link to="/login" onClick={closeMobileMenu} className="flex items-center justify-center px-4 py-2.5 rounded-lg text-sm font-medium border border-[#0A2540] text-[#0A2540] hover:bg-[#0A2540] hover:text-white transition-colors cursor-pointer">
                  Login
                </Link>
                <Link to="/signup" onClick={closeMobileMenu} className="flex items-center justify-center px-4 py-2.5 rounded-lg text-sm font-semibold bg-[#0A2540] text-white hover:bg-[#0A2540]/85 transition-colors cursor-pointer">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── Desktop Dropdown Menus ── */}
      {showServicesDropdown && (
        <div className="fixed top-[calc(36px+64px)] left-0 right-0 bg-white shadow-xl border-t border-gray-100 z-40 hidden md:block">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="grid grid-cols-4 gap-4">
              {[
                { to: '/hotels', icon: 'ri-hotel-line', title: 'Hotels & Resorts', desc: 'Luxury accommodations worldwide' },
                { to: '/flights', icon: 'ri-flight-takeoff-line', title: 'Flights', desc: 'Best airfare deals' },
                { to: '/cruises', icon: 'ri-ship-line', title: 'Cruises', desc: 'Ocean adventures' },
                { to: '/car-rentals', icon: 'ri-car-line', title: 'Car Rentals', desc: 'Flexible transportation' },
              ].map((item) => (
                <Link key={item.to} to={item.to} onClick={closeAllDropdowns}
                  className="flex items-start gap-3 p-4 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group">
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#0A2540]/5 group-hover:bg-[#1990FF]/10 transition-colors flex-shrink-0">
                    <i className={`${item.icon} text-xl text-[#1990FF]`}></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm mb-0.5">{item.title}</h3>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {showCategoriesDropdown && (
        <div className="fixed top-[calc(36px+64px)] left-0 right-0 bg-white shadow-xl border-t border-gray-100 z-40 hidden md:block">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="grid grid-cols-3 gap-4">
              {[
                { to: '/business-travel', icon: 'ri-suitcase-line', title: 'Business Travel', desc: 'Corporate solutions' },
                { to: '/romantic-getaways', icon: 'ri-heart-line', title: 'Romantic Getaways', desc: 'Perfect for couples' },
                { to: '/family-vacations', icon: 'ri-team-line', title: 'Family Vacations', desc: 'Fun for all ages' },
              ].map((item) => (
                <Link key={item.to} to={item.to} onClick={closeAllDropdowns}
                  className="flex items-start gap-3 p-4 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group">
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#0A2540]/5 group-hover:bg-[#1990FF]/10 transition-colors flex-shrink-0">
                    <i className={`${item.icon} text-xl text-[#1990FF]`}></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm mb-0.5">{item.title}</h3>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {showDestinationsDropdown && (
        <div className="fixed top-[calc(36px+64px)] left-0 right-0 bg-white shadow-xl border-t border-gray-100 z-40 hidden md:block">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="grid grid-cols-4 gap-4">
              {[
                { to: '/museums', icon: 'ri-building-2-line', title: 'Museums', desc: 'Cultural experiences' },
                { to: '/beach-resorts', icon: 'ri-sun-line', title: 'Beach Resorts', desc: 'Tropical paradise' },
                { to: '/mountain-retreats', icon: 'ri-landscape-line', title: 'Mountain Retreats', desc: 'Scenic getaways' },
                { to: '/city-breaks', icon: 'ri-building-line', title: 'City Breaks', desc: 'Urban adventures' },
              ].map((item) => (
                <Link key={item.to} to={item.to} onClick={closeAllDropdowns}
                  className="flex items-start gap-3 p-4 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group">
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#0A2540]/5 group-hover:bg-[#1990FF]/10 transition-colors flex-shrink-0">
                    <i className={`${item.icon} text-xl text-[#1990FF]`}></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm mb-0.5">{item.title}</h3>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
