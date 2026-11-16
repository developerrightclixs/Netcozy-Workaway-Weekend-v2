import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';

interface CorporatePackage {
  id: string;
  name: string;
  image: string;
  location: string;
  rating: number;
  price: number;
  features: string[];
  description: string;
  capacity: string;
}

const corporatePackages: CorporatePackage[] = [
  {
    id: '1',
    name: 'Executive Conference Center',
    image: 'https://readdy.ai/api/search-image?query=modern%20executive%20conference%20room%20with%20large%20windows%20overlooking%20city%20skyline%2C%20sleek%20furniture%2C%20professional%20business%20meeting%20setup%2C%20high%20tech%20presentation%20equipment%2C%20corporate%20atmosphere%2C%20professional%20photography&width=400&height=300&seq=biz1&orientation=landscape',
    location: 'New York, USA',
    rating: 4.9,
    price: 299,
    features: ['Meeting Rooms', 'Video Conferencing', 'Catering', 'Airport Transfer'],
    description: 'State-of-the-art conference facilities in the heart of Manhattan with panoramic city views and premium amenities.',
    capacity: 'Up to 200 guests'
  },
  {
    id: '2',
    name: 'Global Business Hub',
    image: 'https://readdy.ai/api/search-image?query=luxury%20business%20hotel%20lobby%20with%20modern%20design%2C%20professional%20atmosphere%2C%20business%20travelers%2C%20elegant%20corporate%20interior%2C%20marble%20floors%2C%20contemporary%20furniture%2C%20professional%20photography&width=400&height=300&seq=biz2&orientation=landscape',
    location: 'London, UK',
    rating: 4.8,
    price: 349,
    features: ['Executive Lounge', 'Private Offices', '24/7 Support', 'Concierge'],
    description: 'Premium business accommodations in Canary Wharf with dedicated workspaces and networking opportunities.',
    capacity: 'Up to 150 guests'
  },
  {
    id: '3',
    name: 'Tech Innovation Campus',
    image: 'https://readdy.ai/api/search-image?query=modern%20tech%20company%20campus%20with%20open%20workspace%2C%20collaborative%20areas%2C%20startup%20atmosphere%2C%20glass%20walls%2C%20contemporary%20office%20design%2C%20natural%20lighting%2C%20professional%20photography&width=400&height=300&seq=biz3&orientation=landscape',
    location: 'San Francisco, USA',
    rating: 4.7,
    price: 279,
    features: ['Co-working Space', 'Tech Setup', 'Networking Events', 'Wellness Center'],
    description: 'Silicon Valley\'s premier corporate retreat combining innovation spaces with world-class hospitality.',
    capacity: 'Up to 100 guests'
  },
  {
    id: '4',
    name: 'Asia Pacific Business Center',
    image: 'https://readdy.ai/api/search-image?query=modern%20Asian%20business%20center%20with%20sleek%20design%2C%20corporate%20meeting%20room%2C%20city%20skyline%20view%20through%20floor%20to%20ceiling%20windows%2C%20professional%20atmosphere%2C%20contemporary%20furniture%2C%20professional%20photography&width=400&height=300&seq=biz4&orientation=landscape',
    location: 'Singapore',
    rating: 4.9,
    price: 319,
    features: ['Boardrooms', 'Translation Services', 'VIP Lounge', 'Helipad Access'],
    description: 'Gateway to Asian markets with multilingual support and premium facilities for international business.',
    capacity: 'Up to 250 guests'
  },
  {
    id: '5',
    name: 'European Corporate Retreat',
    image: 'https://readdy.ai/api/search-image?query=elegant%20European%20business%20hotel%20with%20classic%20architecture%2C%20modern%20interior%2C%20professional%20conference%20setup%2C%20chandelier%20lighting%2C%20sophisticated%20corporate%20atmosphere%2C%20professional%20photography&width=400&height=300&seq=biz5&orientation=landscape',
    location: 'Frankfurt, Germany',
    rating: 4.8,
    price: 289,
    features: ['Conference Halls', 'Business Center', 'Fine Dining', 'Spa Access'],
    description: 'Central European hub combining traditional elegance with modern business infrastructure.',
    capacity: 'Up to 300 guests'
  },
  {
    id: '6',
    name: 'Middle East Executive Tower',
    image: 'https://readdy.ai/api/search-image?query=luxury%20Dubai%20business%20tower%20interior%20with%20modern%20Arabic%20design%20elements%2C%20executive%20boardroom%2C%20panoramic%20desert%20and%20city%20views%2C%20gold%20accents%2C%20professional%20corporate%20atmosphere%2C%20professional%20photography&width=400&height=300&seq=biz6&orientation=landscape',
    location: 'Dubai, UAE',
    rating: 4.9,
    price: 399,
    features: ['Private Suites', 'Chauffeur Service', 'Event Spaces', 'Rooftop Venue'],
    description: 'Ultra-luxury corporate facilities with unparalleled service and stunning architectural design.',
    capacity: 'Up to 500 guests'
  }
];

const corporateServices = [
  {
    icon: 'ri-team-line',
    title: 'Team Building Events',
    description: 'Customized activities to strengthen team bonds and boost morale'
  },
  {
    icon: 'ri-presentation-line',
    title: 'Conference Planning',
    description: 'End-to-end event management for meetings of any scale'
  },
  {
    icon: 'ri-flight-takeoff-line',
    title: 'Travel Management',
    description: 'Streamlined booking and expense tracking for your team'
  },
  {
    icon: 'ri-customer-service-2-line',
    title: 'Dedicated Support',
    description: '24/7 corporate travel assistance and emergency support'
  }
];

export default function BusinessTravelPage() {
  const [selectedPackage, setSelectedPackage] = useState<CorporatePackage | null>(null);

  const closeModal = () => {
    setSelectedPackage(null);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        <img
          src="https://readdy.ai/api/search-image?query=professional%20business%20travelers%20in%20modern%20airport%20lounge%2C%20corporate%20atmosphere%2C%20sleek%20design%2C%20business%20people%20with%20laptops%2C%20premium%20travel%20experience%2C%20city%20skyline%20through%20windows%2C%20professional%20photography&width=1920&height=600&seq=biz-hero&orientation=landscape"
          alt="Business Travel"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl px-4 md:px-6 w-full">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">Business Travel</h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-6 md:mb-8">
              Elevate your corporate travel with premium accommodations and seamless business solutions
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
              <Link
                to="/signup"
                className="w-full sm:w-auto bg-[#1990FF] text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold hover:bg-[#0070E0] transition-colors whitespace-nowrap cursor-pointer text-sm md:text-base"
              >
                <i className="ri-briefcase-line mr-2"></i>
                Corporate Membership
              </Link>
              <a
                href="#packages"
                className="w-full sm:w-auto bg-white/20 backdrop-blur-sm text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold hover:bg-white/30 transition-colors whitespace-nowrap cursor-pointer text-sm md:text-base"
              >
                View Packages
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Services */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">Corporate Travel Solutions</h2>
            <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto px-4">
              Comprehensive services designed to meet the unique needs of modern businesses
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {corporateServices.map((service, index) => (
              <div key={index} className="text-center">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-[#1990FF]/10 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <i className={`${service.icon} text-2xl md:text-3xl text-[#1990FF]`}></i>
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm md:text-base">{service.title}</h3>
                <p className="text-xs md:text-sm text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-16 bg-[#0A2540]">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 text-center">
            <div>
              <p className="text-3xl md:text-4xl font-bold text-white mb-2">500+</p>
              <p className="text-sm md:text-base text-gray-400">Corporate Partners</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-white mb-2">50K+</p>
              <p className="text-sm md:text-base text-gray-400">Business Trips Booked</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-white mb-2">120+</p>
              <p className="text-sm md:text-base text-gray-400">Countries Covered</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-white mb-2">98%</p>
              <p className="text-sm md:text-base text-gray-400">Client Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section id="packages" className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">Corporate Packages</h2>
            <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto px-4">
              Premium business destinations with world-class facilities for conferences, meetings, and corporate retreats.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {corporatePackages.map((pkg) => (
              <div 
                key={pkg.id} 
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="relative h-48 md:h-64 overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 md:top-4 right-3 md:right-4 bg-white px-2.5 md:px-3 py-1 md:py-1.5 rounded-full shadow-lg">
                    <div className="flex items-center gap-1">
                      <i className="ri-star-fill text-yellow-400 text-xs md:text-sm"></i>
                      <span className="font-semibold text-gray-900 text-xs md:text-sm">{pkg.rating}</span>
                    </div>
                  </div>
                  <div className="absolute top-3 md:top-4 left-3 md:left-4 bg-[#0A2540] text-white px-2.5 md:px-3 py-1 md:py-1.5 rounded-full text-xs font-medium">
                    Corporate
                  </div>
                </div>

                <div className="p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                  <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600 mb-2">
                    <i className="ri-map-pin-line"></i>
                    <span>{pkg.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600 mb-3 md:mb-4">
                    <i className="ri-group-line"></i>
                    <span>{pkg.capacity}</span>
                  </div>

                  <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4 line-clamp-2">
                    {pkg.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-3 md:mb-4">
                    {pkg.features.slice(0, 3).map((feature, index) => (
                      <span
                        key={index}
                        className="px-2.5 md:px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3 md:pt-4 border-t border-gray-200">
                    <div>
                      <p className="text-xs md:text-sm text-gray-600">From</p>
                      <p className="text-xl md:text-2xl font-bold text-[#1990FF]">
                        ${pkg.price}
                        <span className="text-xs md:text-sm text-gray-600 font-normal">/person</span>
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedPackage(pkg)}
                      className="w-full sm:w-auto bg-[#1990FF] text-white px-4 md:px-6 py-2.5 md:py-3 rounded-lg font-medium hover:bg-[#0070E0] transition-colors whitespace-nowrap cursor-pointer text-xs md:text-sm"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Package Details Modal */}
      {selectedPackage && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <div className="relative h-64 md:h-80 overflow-hidden">
                <img
                  src={selectedPackage.image}
                  alt={selectedPackage.name}
                  className="w-full h-full object-cover object-top"
                />
                <button
                  onClick={closeModal}
                  className="absolute top-3 md:top-4 right-3 md:right-4 w-9 h-9 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <i className="ri-close-line text-xl md:text-2xl text-gray-700"></i>
                </button>
                <div className="absolute bottom-3 md:bottom-4 left-3 md:left-4 bg-white px-3 md:px-4 py-1.5 md:py-2 rounded-full shadow-lg">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <i
                        key={i}
                        className={`${
                          i < Math.floor(selectedPackage.rating)
                            ? 'ri-star-fill text-yellow-400'
                            : 'ri-star-line text-gray-300'
                        } text-base md:text-lg`}
                      ></i>
                    ))}
                    <span className="ml-2 font-semibold text-gray-900 text-sm md:text-base">{selectedPackage.rating}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{selectedPackage.name}</h2>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4 text-gray-600 mb-4 md:mb-6">
                  <div className="flex items-center gap-2">
                    <i className="ri-map-pin-line text-lg md:text-xl"></i>
                    <span className="text-base md:text-lg">{selectedPackage.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="ri-group-line text-lg md:text-xl"></i>
                    <span className="text-sm md:text-base">{selectedPackage.capacity}</span>
                  </div>
                </div>

                <div className="mb-6 md:mb-8">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3">About This Venue</h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">{selectedPackage.description}</p>
                </div>

                <div className="mb-6 md:mb-8">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">Included Services</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                    {selectedPackage.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 md:gap-3 text-gray-700 text-sm md:text-base">
                        <i className="ri-check-line text-[#1990FF] text-lg md:text-xl"></i>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 md:p-6 mb-4 md:mb-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <p className="text-xs md:text-sm text-gray-600 mb-1">Starting From</p>
                      <p className="text-2xl md:text-3xl font-bold text-[#1990FF]">
                        ${selectedPackage.price}
                        <span className="text-base md:text-lg text-gray-600 font-normal">/person</span>
                      </p>
                    </div>
                    <Link
                      to="/signup"
                      className="w-full sm:w-auto bg-[#1990FF] text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold hover:bg-[#0070E0] transition-colors whitespace-nowrap cursor-pointer text-sm md:text-base"
                    >
                      <i className="ri-calendar-check-line mr-2"></i>
                      Request Quote
                    </Link>
                  </div>
                </div>

                <div className="bg-[#0A2540]/5 rounded-xl p-4 md:p-6">
                  <div className="flex items-center gap-3 mb-3 md:mb-4">
                    <i className="ri-briefcase-line text-xl md:text-2xl text-[#0A2540]"></i>
                    <h3 className="text-base md:text-lg font-bold text-gray-900">Corporate Benefits</h3>
                  </div>
                  <ul className="space-y-2 text-sm md:text-base text-gray-700">
                    <li className="flex items-center gap-2">
                      <i className="ri-check-line text-[#1990FF]"></i>
                      <span>Dedicated account manager</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <i className="ri-check-line text-[#1990FF]"></i>
                      <span>Flexible cancellation policies</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <i className="ri-check-line text-[#1990FF]"></i>
                      <span>Consolidated billing and reporting</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <i className="ri-check-line text-[#1990FF]"></i>
                      <span>Priority booking and upgrades</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Why Choose Us */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">Why Choose Netcozy for Business Travel?</h2>
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-[#1990FF]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className="ri-money-dollar-circle-line text-xl md:text-2xl text-[#1990FF]"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1 text-sm md:text-base">Cost Savings</h3>
                    <p className="text-xs md:text-sm text-gray-600">Negotiated corporate rates save your company up to 35% on travel expenses.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-[#1990FF]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className="ri-time-line text-xl md:text-2xl text-[#1990FF]"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1 text-sm md:text-base">Time Efficiency</h3>
                    <p className="text-xs md:text-sm text-gray-600">Streamlined booking process and dedicated support saves valuable time.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-[#1990FF]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className="ri-bar-chart-box-line text-xl md:text-2xl text-[#1990FF]"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1 text-sm md:text-base">Expense Tracking</h3>
                    <p className="text-xs md:text-sm text-gray-600">Comprehensive reporting and analytics for better budget management.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden">
              <img
                src="https://readdy.ai/api/search-image?query=professional%20business%20team%20having%20meeting%20in%20modern%20office%20with%20city%20view%2C%20diverse%20group%20of%20executives%2C%20collaborative%20atmosphere%2C%20contemporary%20corporate%20interior%2C%20natural%20lighting%2C%20professional%20photography&width=600&height=400&seq=biz-why&orientation=landscape"
                alt="Business Team"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-[#0A2540] to-[#1990FF] text-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">Ready to Streamline Your Corporate Travel?</h2>
          <p className="text-base md:text-xl text-white/90 mb-6 md:mb-8">
            Join hundreds of companies that trust Netcozy for their business travel needs.
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 bg-white text-[#0A2540] px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap cursor-pointer text-sm md:text-base"
          >
            Get Started Today
            <i className="ri-arrow-right-line"></i>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
