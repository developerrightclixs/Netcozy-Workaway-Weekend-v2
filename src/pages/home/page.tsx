import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { getCurrentUser } from '../../lib/api';
import Header from '../../components/feature/Header';

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [user, setUser] = useState<any>(null);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 11);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const checkUser = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    };
    checkUser();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const hotels = [
    { name: 'Oceanview Resort & Spa', location: 'Malibu, California', rating: 4.9, image: 'https://readdy.ai/api/search-image?query=luxury%20oceanview%20resort%20with%20infinity%20pool%20overlooking%20pacific%20ocean%20at%20sunset%2C%20modern%20architecture%2C%20palm%20trees%2C%20elegant%20outdoor%20lounge%20areas%2C%20warm%20lighting%2C%20simple%20clean%20background%2C%20professional%20hotel%20photography%20style&width=480&height=360&seq=hotel1&orientation=landscape' },
    { name: 'Mountain Peak Lodge', location: 'Aspen, Colorado', rating: 4.8, image: 'https://readdy.ai/api/search-image?query=luxury%20mountain%20lodge%20with%20snow-capped%20peaks%2C%20wooden%20architecture%2C%20cozy%20fireplace%20lounge%2C%20ski%20resort%20atmosphere%2C%20winter%20wonderland%20setting%2C%20simple%20clean%20background%2C%20professional%20hotel%20photography%20style&width=480&height=360&seq=hotel2&orientation=landscape' },
    { name: 'Urban Boutique Hotel', location: 'New York City', rating: 4.7, image: 'https://readdy.ai/api/search-image?query=modern%20boutique%20hotel%20rooftop%20terrace%20with%20city%20skyline%20views%2C%20contemporary%20design%2C%20stylish%20furniture%2C%20evening%20ambiance%2C%20urban%20sophistication%2C%20simple%20clean%20background%2C%20professional%20hotel%20photography%20style&width=480&height=360&seq=hotel3&orientation=landscape' },
    { name: 'Desert Oasis Resort', location: 'Scottsdale, Arizona', rating: 4.9, image: 'https://readdy.ai/api/search-image?query=luxury%20desert%20resort%20with%20cactus%20gardens%2C%20southwestern%20architecture%2C%20turquoise%20pool%2C%20sunset%20colors%2C%20adobe%20style%20buildings%2C%20simple%20clean%20background%2C%20professional%20hotel%20photography%20style&width=480&height=360&seq=hotel4&orientation=landscape' },
    { name: 'Coastal Paradise Inn', location: 'Miami Beach, Florida', rating: 4.8, image: 'https://readdy.ai/api/search-image?query=beachfront%20hotel%20with%20white%20sand%20beach%2C%20turquoise%20ocean%20waters%2C%20palm%20trees%2C%20modern%20tropical%20architecture%2C%20beach%20cabanas%2C%20simple%20clean%20background%2C%20professional%20hotel%20photography%20style&width=480&height=360&seq=hotel5&orientation=landscape' },
    { name: 'Historic Grand Hotel', location: 'Charleston, South Carolina', rating: 4.9, image: 'https://readdy.ai/api/search-image?query=historic%20grand%20hotel%20with%20colonial%20architecture%2C%20elegant%20entrance%2C%20southern%20charm%2C%20manicured%20gardens%2C%20classic%20luxury%20design%2C%20simple%20clean%20background%2C%20professional%20hotel%20photography%20style&width=480&height=360&seq=hotel6&orientation=landscape' },
    { name: 'Lakeside Retreat', location: 'Lake Tahoe, Nevada', rating: 4.7, image: 'https://readdy.ai/api/search-image?query=lakeside%20luxury%20hotel%20with%20crystal%20clear%20blue%20water%2C%20mountain%20backdrop%2C%20wooden%20dock%2C%20serene%20natural%20setting%2C%20pine%20trees%2C%20simple%20clean%20background%2C%20professional%20hotel%20photography%20style&width=480&height=360&seq=hotel7&orientation=landscape' },
    { name: 'Wine Country Estate', location: 'Napa Valley, California', rating: 4.9, image: 'https://readdy.ai/api/search-image?query=luxury%20vineyard%20estate%20hotel%20with%20rolling%20hills%2C%20grapevines%2C%20tuscan-style%20architecture%2C%20wine%20tasting%20terrace%2C%20golden%20hour%20lighting%2C%20simple%20clean%20background%2C%20professional%20hotel%20photography%20style&width=480&height=360&seq=hotel8&orientation=landscape' },
    { name: 'Tropical Island Resort', location: 'Maui, Hawaii', rating: 5.0, image: 'https://readdy.ai/api/search-image?query=tropical%20island%20resort%20with%20overwater%20bungalows%2C%20crystal%20clear%20lagoon%2C%20lush%20palm%20trees%2C%20hawaiian%20paradise%20setting%2C%20volcanic%20mountains%20in%20distance%2C%20simple%20clean%20background%2C%20professional%20hotel%20photography%20style&width=480&height=360&seq=hotel9&orientation=landscape' },
    { name: 'Metropolitan Luxury Suites', location: 'Chicago, Illinois', rating: 4.8, image: 'https://readdy.ai/api/search-image?query=luxury%20metropolitan%20hotel%20suite%20with%20floor-to-ceiling%20windows%2C%20modern%20interior%20design%2C%20city%20lights%20view%2C%20contemporary%20elegance%2C%20sophisticated%20atmosphere%2C%20simple%20clean%20background%2C%20professional%20hotel%20photography%20style&width=480&height=360&seq=hotel10&orientation=landscape' },
    { name: 'Riverside Boutique Hotel', location: 'Portland, Oregon', rating: 4.7, image: 'https://readdy.ai/api/search-image?query=boutique%20hotel%20along%20river%20with%20modern%20pacific%20northwest%20design%2C%20natural%20wood%20elements%2C%20riverside%20terrace%2C%20green%20surroundings%2C%20contemporary%20architecture%2C%20simple%20clean%20background%2C%20professional%20hotel%20photography%20style&width=480&height=360&seq=hotel11&orientation=landscape' }
  ];

  const categories = [
    { name: 'Museums & Galleries', icon: 'ri-gallery-line', count: '150+', image: 'https://readdy.ai/api/search-image?query=modern%20art%20museum%20interior%20with%20contemporary%20sculptures%20and%20paintings%2C%20bright%20gallery%20space%2C%20minimalist%20design%2C%20cultural%20atmosphere%2C%20simple%20clean%20background&width=400&height=280&seq=cat1&orientation=landscape', link: '/museums', type: 'entertainment' },
    { name: 'Hotels & Resorts', icon: 'ri-hotel-line', count: 'Unlimited', image: 'https://readdy.ai/api/search-image?query=luxury%20resort%20pool%20area%20with%20cabanas%20and%20palm%20trees%2C%20tropical%20paradise%20setting%2C%20elegant%20hospitality%20design%2C%20simple%20clean%20background&width=400&height=280&seq=cat2&orientation=landscape', link: '/hotels', type: 'travel' },
    { name: 'Consumers', icon: 'ri-user-smile-line', count: '5000+', image: 'https://readdy.ai/api/search-image?query=diverse%20group%20of%20happy%20consumers%20enjoying%20premium%20experiences%2C%20lifestyle%20photography%2C%20modern%20social%20setting%2C%20simple%20clean%20background&width=400&height=280&seq=cat3&orientation=landscape', link: '/consumers', type: 'business' },
    { name: 'Businesses', icon: 'ri-building-line', count: '300+', image: 'https://readdy.ai/api/search-image?query=modern%20business%20office%20with%20professionals%20networking%2C%20corporate%20environment%2C%20contemporary%20workspace%20design%2C%20simple%20clean%20background&width=400&height=280&seq=cat4&orientation=landscape', link: '/business', type: 'business' },
    { name: 'Influencers', icon: 'ri-star-smile-line', count: '800+', image: 'https://readdy.ai/api/search-image?query=content%20creator%20filming%20with%20professional%20camera%20equipment%2C%20social%20media%20influencer%20workspace%2C%20modern%20creative%20studio%2C%20simple%20clean%20background&width=400&height=280&seq=cat5&orientation=landscape', link: '/influencers', type: 'entertainment' },
    { name: 'Music Industry', icon: 'ri-music-line', count: '250+', image: 'https://readdy.ai/api/search-image?query=professional%20music%20recording%20studio%20with%20mixing%20console%2C%20modern%20audio%20equipment%2C%20creative%20music%20production%20space%2C%20simple%20clean%20background&width=400&height=280&seq=cat6&orientation=landscape', link: '/music-industry', type: 'entertainment' },
    { name: 'Politicians', icon: 'ri-government-line', count: '100+', image: 'https://readdy.ai/api/search-image?query=professional%20political%20networking%20event%2C%20formal%20government%20setting%2C%20elegant%20conference%20atmosphere%2C%20simple%20clean%20background&width=400&height=280&seq=cat7&orientation=landscape', link: '/politicians', type: 'business' },
    { name: 'Real Estate', icon: 'ri-home-smile-line', count: '400+', image: 'https://readdy.ai/api/search-image?query=luxury%20real%20estate%20property%20showcase%2C%20modern%20architectural%20design%2C%20premium%20residential%20development%2C%20simple%20clean%20background&width=400&height=280&seq=cat8&orientation=landscape', link: '/real-estate', type: 'business' },
    { name: 'Sports & Entertainment', icon: 'ri-trophy-line', count: '180+', image: 'https://readdy.ai/api/search-image?query=premium%20sports%20stadium%20with%20entertainment%20event%2C%20modern%20venue%20atmosphere%2C%20exciting%20crowd%20experience%2C%20simple%20clean%20background&width=400&height=280&seq=cat9&orientation=landscape', link: '/sports-entertainment', type: 'entertainment' },
    { name: 'Colleges & Universities', icon: 'ri-graduation-cap-line', count: '500+', image: 'https://readdy.ai/api/search-image?query=vibrant%20university%20campus%20quad%20with%20historic%20brick%20buildings%20and%20diverse%20students%20walking%20together%2C%20green%20lawns%20and%20leafy%20trees%2C%20collegiate%20atmosphere%2C%20education%20and%20community%20spirit%2C%20simple%20clean%20background&width=400&height=280&seq=cat-colleges&orientation=landscape', link: '/colleges-universities', type: 'business' }
  ];

  const filteredCategories = selectedCategoryFilter === 'all'
    ? categories
    : categories.filter(cat => cat.type === selectedCategoryFilter);

  const services = [
    {
      title: 'Netcozy Workaway Weekend',
      badge: 'FEATURED',
      badgeColor: 'bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53]',
      description: 'Premium weekend experiences combining work and leisure in exclusive destinations',
      image: 'https://readdy.ai/api/search-image?query=professional%20travelers%20working%20remotely%20at%20luxury%20resort%20poolside%20with%20laptops%2C%20modern%20digital%20nomad%20lifestyle%2C%20tropical%20paradise%20setting%20with%20palm%20trees%20and%20ocean%20views%2C%20elegant%20workspace%20design%2C%20simple%20clean%20background%2C%20lifestyle%20photography%20style&width=360&height=288&seq=service1&orientation=landscape',
      icons: ['ri-calendar-check-line', 'ri-map-pin-line', 'ri-group-line', 'ri-star-line'],
      link: '/services/workaway',
      logo: null
    },
    {
      title: 'LI3K',
      badge: 'FOR BUSINESS',
      badgeColor: 'bg-gradient-to-r from-[#2563EB] to-[#3B82F6]',
      description: 'Professional networking solutions for businesses, colleges, influencers, and sports organizations',
      image: 'https://readdy.ai/api/search-image?query=professional%20business%20networking%20event%20with%20diverse%20professionals%20exchanging%20business%20cards%2C%20modern%20corporate%20setting%2C%20linkedin%20style%20professional%20photography%2C%20elegant%20conference%20atmosphere%2C%20simple%20clean%20background&width=360&height=288&seq=service2&orientation=landscape',
      icons: ['ri-links-line', 'ri-line-chart-line', 'ri-rocket-line', 'ri-shake-hands-line'],
      link: '/li3k',
      logo: 'https://static.readdy.ai/image/9d57dd046cda14fcb6be190d172e7cc4/6d3ed20a7ff37af3768dfec9fd369cdd.png'
    },
    {
      title: 'MONI',
      badge: 'MONETIZE',
      badgeColor: 'bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA]',
      description: 'Turn your influence into revenue streams for celebrities, artists, and athletes',
      image: 'https://storage.readdy-site.link/project_files/029ac680-786b-4603-9848-08fb20ae4f30/2452e949-e382-4850-9c45-eeea97912c09_image-7.png?v=7c35bf3f4fdf1d96c8913d589c39e989',
      icons: ['ri-money-dollar-circle-line', 'ri-arrow-up-line', 'ri-user-follow-line', 'ri-verified-badge-line'],
      link: '/moni',
      logo: 'https://static.readdy.ai/image/9d57dd046cda14fcb6be190d172e7cc4/6d3ed20a7ff37af3768dfec9fd369cdd.png'
    },
    {
      title: 'BLOCK PARTY',
      badge: 'COMING SOON',
      badgeColor: 'bg-gradient-to-r from-[#F59E0B] to-[#FBBF24]',
      description: 'Build online communities by creating or joining groups centered around professional needs, hobbies, and special interests.',
      image: 'https://readdy.ai/api/search-image?query=futuristic%20social%20networking%20concept%20with%20holographic%20interface%2C%20modern%20technology%20visualization%2C%20community%20connection%20theme%2C%20innovative%20digital%20platform%20design%2C%20simple%20clean%20background%20with%20soft%20blur%20effect&width=360&height=288&seq=service4&orientation=landscape',
      icons: ['ri-lock-line', 'ri-notification-line', 'ri-global-line', 'ri-chat-smile-3-line'],
      link: '/services/block-party',
      logo: null
    }
  ];

  const isLoggedIn = user !== null;

  return (
    <div className="min-h-screen bg-white">

      {/* Header / Navbar */}
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1990FF] via-[#1990FF] to-[#FF6B6B]">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2h-4zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
            }}
          ></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/30"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-24 sm:py-32 w-full">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
            <div className="flex-1 max-w-3xl text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
                Discover Your Next<br />
                <span className="italic font-serif">Workaway Weekend</span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 sm:mb-12 leading-relaxed">
                Connect, Travel, Experience — Your Premium Access to Exclusive Events &amp; Destinations
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <a
                  href="#services"
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-[#1990FF] rounded-full text-base sm:text-lg font-semibold transition-all hover:shadow-2xl hover:scale-105 whitespace-nowrap cursor-pointer text-center"
                >
                  Browse Services
                </a>
                <a
                  href="#categories"
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-white text-white rounded-full text-base sm:text-lg font-semibold transition-all hover:bg-white/10 whitespace-nowrap cursor-pointer text-center"
                >
                  Explore Categories
                </a>
              </div>
            </div>

            <div className="hidden lg:block relative w-80 xl:w-96 h-72 xl:h-80">
              <div className="absolute top-0 left-0 w-64 xl:w-72 h-48 xl:h-56 rounded-3xl overflow-hidden shadow-2xl" style={{ transform: 'rotate(-2deg)' }}>
                <img
                  src="https://readdy.ai/api/search-image?query=luxury%20resort%20infinity%20pool%20overlooking%20ocean%20at%20golden%20hour%2C%20modern%20tropical%20architecture%20with%20palm%20trees%2C%20elegant%20outdoor%20lounge%20furniture%2C%20warm%20sunset%20lighting%2C%20paradise%20vacation%20destination%2C%20simple%20clean%20background&width=320&height=240&seq=hero1&orientation=landscape"
                  alt="Featured Destination"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="absolute bottom-0 right-0 w-64 xl:w-72 h-48 xl:h-56 rounded-3xl overflow-hidden shadow-2xl" style={{ transform: 'rotate(2deg)' }}>
                <img
                  src="https://readdy.ai/api/search-image?query=elegant%20beachfront%20resort%20with%20white%20sand%20beach%20and%20turquoise%20water%2C%20luxury%20cabanas%20and%20umbrellas%2C%20tropical%20paradise%20setting%2C%20premium%20vacation%20destination%2C%20simple%20clean%20background&width=320&height=240&seq=hero3&orientation=landscape"
                  alt="Beach Resort"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <i className="ri-arrow-down-line text-3xl sm:text-4xl text-white"></i>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A2540] mb-4">Our Premium Services</h2>
            <p className="text-lg sm:text-xl text-gray-600">Tailored experiences for every professional journey</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {services.map((service, index) => (
              <Link
                key={index}
                to={service.link}
                className="group bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
              >
                <div className="relative h-56 sm:h-64 lg:h-72 overflow-hidden">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  <div className={`absolute top-4 left-4 px-3 sm:px-4 py-1.5 ${service.badgeColor} text-white text-xs font-bold rounded-full whitespace-nowrap`}>
                    {service.badge}
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl sm:text-2xl font-bold text-[#0A2540]">{service.title}</h3>
                  </div>
                  <p className="text-sm sm:text-base text-gray-600 mb-4 line-clamp-2">{service.description}</p>
                  <div className="flex items-center gap-3 mb-4">
                    {service.icons.map((icon, idx) => (
                      <div key={idx} className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center">
                        <i className={`${icon} text-lg sm:text-xl text-[#1990FF]`}></i>
                      </div>
                    ))}
                  </div>
                  <button className="w-full py-2.5 sm:py-3 bg-[#1990FF] text-white rounded-xl font-semibold transition-all group-hover:bg-[#0070E0] whitespace-nowrap text-sm sm:text-base">
                    Learn More
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-12 sm:py-16 lg:py-20 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A2540]">Explore by Category</h2>
            <select
              value={selectedCategoryFilter}
              onChange={(e) => setSelectedCategoryFilter(e.target.value)}
              className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 border-2 border-gray-300 rounded-xl text-gray-700 font-medium cursor-pointer hover:border-[#1990FF] transition-colors text-sm sm:text-base"
            >
              <option value="all">All Categories</option>
              <option value="travel">Travel &amp; Hospitality</option>
              <option value="business">Business &amp; Professional</option>
              <option value="entertainment">Entertainment &amp; Arts</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {filteredCategories.map((category, index) => (
              <Link
                key={index}
                to={category.link}
                className="group relative h-56 sm:h-64 lg:h-72 rounded-2xl overflow-hidden cursor-pointer"
              >
                <div className="absolute inset-0 w-full h-full">
                  <img src={category.image} alt={category.name} className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20 group-hover:from-black/60 group-hover:via-black/30 transition-all duration-300"></div>

                <div className="absolute top-4 sm:top-6 left-4 sm:left-6 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
                  <i className={`${category.icon} text-3xl sm:text-4xl text-white`}></i>
                </div>

                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">{category.name}</h3>
                  <p className="text-white/80 text-sm sm:text-base">{category.count} experiences</p>
                </div>

                <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center">
                  <i className="ri-arrow-right-line text-xl sm:text-2xl text-white"></i>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Destinations Carousel */}
      <section id="destinations" className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A2540] text-center mb-8 sm:mb-12">Featured Destinations</h2>

          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex gap-3 sm:gap-4 transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * (100 / 3.5)}%)` }}
              >
                {hotels.map((hotel, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-[85%] sm:w-[45%] lg:w-[calc(100%/3.5-12px)] group cursor-pointer"
                  >
                    <div className="relative h-72 sm:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                      <div className="w-full h-full">
                        <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                      <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{hotel.name}</h3>
                        <div className="flex items-center gap-2 text-white mb-2">
                          <i className="ri-map-pin-line text-base sm:text-lg"></i>
                          <span className="text-sm sm:text-base">{hotel.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <i key={i} className="ri-star-fill text-yellow-400 text-xs sm:text-sm"></i>
                          ))}
                          <span className="text-white ml-2 text-xs sm:text-sm font-semibold">{hotel.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setCurrentSlide((prev) => (prev - 1 + 11) % 11)}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-14 sm:h-14 bg-white rounded-full shadow-xl flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer z-10"
            >
              <i className="ri-arrow-left-line text-xl sm:text-2xl text-[#0A2540]"></i>
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % 11)}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-14 sm:h-14 bg-white rounded-full shadow-xl flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer z-10"
            >
              <i className="ri-arrow-right-line text-xl sm:text-2xl text-[#0A2540]"></i>
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 mt-6 sm:mt-8">
            {[...Array(11)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  currentSlide === index ? 'w-8 bg-[#1990FF]' : 'w-2 bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-[#1990FF] to-[#0070E0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">Ready to Start Your Journey?</h2>
          <p className="text-lg sm:text-xl text-white/90 mb-6 sm:mb-8">Join thousands of professionals experiencing premium travel and networking opportunities</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/signup" className="w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-4 bg-white text-[#1990FF] rounded-full text-base sm:text-lg font-bold transition-all hover:shadow-2xl hover:scale-105 whitespace-nowrap text-center">
              Create Account
            </Link>
            <Link to="/about" className="w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-4 border-2 border-white text-white rounded-full text-base sm:text-lg font-bold transition-all hover:bg-white/10 whitespace-nowrap text-center">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-12 mb-8 sm:mb-12">
            {/* Brand */}
            <div className="lg:col-span-2">
              <Link to="/" className="flex items-center gap-3 mb-6">
                <img
                  src="https://storage.readdy-site.link/project_files/029ac680-786b-4603-9848-08fb20ae4f30/d786ac2c-4121-45c7-b4ed-371b6f8287d1_image-12.png?v=6f4af2e64a06407323df94a323e44b9e"
                  alt="Netcozy Logo"
                  className="h-10 sm:h-12 w-auto"
                />
              </Link>
              <p className="text-[#0000007D] mb-6 leading-relaxed text-sm sm:text-base">
                Your trusted partner for unforgettable travel experiences. From luxury hotels to exclusive events, we make every journey extraordinary.
              </p>
              <div className="flex items-center gap-4">
                <a href="https://www.facebook.com/netcozyworkawayweekend" target="_blank" rel="noopener noreferrer nofollow" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[#1990FF] hover:text-white transition-colors cursor-pointer">
                  <i className="ri-facebook-fill"></i>
                </a>
                <a href="https://twitter.com/netcozy" target="_blank" rel="noopener noreferrer nofollow" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[#1990FF] hover:text-white transition-colors cursor-pointer">
                  <i className="ri-twitter-fill"></i>
                </a>
                <a href="https://www.instagram.com/exe.desk/" target="_blank" rel="noopener noreferrer nofollow" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[#1990FF] hover:text-white transition-colors cursor-pointer">
                  <i className="ri-instagram-fill"></i>
                </a>
                <a href="https://www.linkedin.com/company/netcozy" target="_blank" rel="noopener noreferrer nofollow" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[#1990FF] hover:text-white transition-colors cursor-pointer">
                  <i className="ri-linkedin-fill"></i>
                </a>
              </div>
            </div>

            {/* Explore */}
            <div>
              <h3 className="font-bold text-black mb-4 sm:mb-6 text-base sm:text-lg">Explore</h3>
              <ul className="space-y-3 sm:space-y-4">
                <li><Link to="/" className="text-[#0000007D] hover:text-[#1990FF] transition-colors cursor-pointer text-sm sm:text-base">Home</Link></li>
                <li><Link to="/hotels" className="text-[#0000007D] hover:text-[#1990FF] transition-colors cursor-pointer text-sm sm:text-base">Hotels &amp; Resorts</Link></li>
                <li><Link to="/museums" className="text-[#0000007D] hover:text-[#1990FF] transition-colors cursor-pointer text-sm sm:text-base">Museums</Link></li>
                <li><Link to="/concerts" className="text-[#0000007D] hover:text-[#1990FF] transition-colors cursor-pointer text-sm sm:text-base">Concerts &amp; Events</Link></li>
                <li><Link to="/beach-resorts" className="text-[#0000007D] hover:text-[#1990FF] transition-colors cursor-pointer text-sm sm:text-base">Destinations</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-bold text-black mb-4 sm:mb-6 text-base sm:text-lg">Support</h3>
              <ul className="space-y-3 sm:space-y-4">
                <li><Link to="/about" className="text-[#0000007D] hover:text-[#1990FF] transition-colors cursor-pointer text-sm sm:text-base">About Us</Link></li>
                <li><Link to="/contact" className="text-[#0000007D] hover:text-[#1990FF] transition-colors cursor-pointer text-sm sm:text-base">Help Center</Link></li>
                <li><Link to="/terms" className="text-[#0000007D] hover:text-[#1990FF] transition-colors cursor-pointer text-sm sm:text-base">Terms of Service</Link></li>
                <li><Link to="/terms" className="text-[#0000007D] hover:text-[#1990FF] transition-colors cursor-pointer text-sm sm:text-base">Privacy Policy</Link></li>
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h3 className="font-bold text-black mb-4 sm:mb-6 text-base sm:text-lg">Connect</h3>
              <ul className="space-y-3 sm:space-y-4">
                <li>
                  <a href="tel:+12136310859" className="text-[#0000007D] hover:text-[#1990FF] transition-colors cursor-pointer flex items-center gap-2 text-sm sm:text-base">
                    <i className="ri-phone-line"></i>213-631-0859
                  </a>
                </li>
                <li>
                  <a href="mailto:exe.desk@netcozyworkawayweekend.com" className="text-[#0000007D] hover:text-[#1990FF] transition-colors cursor-pointer flex items-center gap-2 text-sm sm:text-base">
                    <i className="ri-mail-line"></i>exe.desk@netcozyworkawayweekend.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=1900+Camden+Avenue+San+Jose+California+95124"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-[#0000007D] hover:text-[#1990FF] transition-colors cursor-pointer flex items-start gap-2 text-sm sm:text-base"
                  >
                    <i className="ri-map-pin-line mt-1"></i>
                    <span>1900 Camden Avenue<br />San Jose, CA 95124</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-6 sm:pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[#0000007D] text-xs sm:text-sm text-center sm:text-left">
              &copy; {new Date().getFullYear()} Netcozy. All rights reserved.
            </p>
            <a
              href="https://readdy.ai/?ref=logo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0000007D] text-xs sm:text-sm hover:text-[#1990FF] transition-colors cursor-pointer"
            >
              Powered by Readdy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
