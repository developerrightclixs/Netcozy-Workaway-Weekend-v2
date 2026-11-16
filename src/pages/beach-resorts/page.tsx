import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';

interface BeachResort {
  id: string;
  name: string;
  image: string;
  location: string;
  rating: number;
  price: number;
  amenities: string[];
  description: string;
}

const beachResorts: BeachResort[] = [
  {
    id: '1',
    name: 'Maldives Paradise Resort',
    image: 'https://readdy.ai/api/search-image?query=luxury%20overwater%20bungalow%20resort%20in%20Maldives%20with%20crystal%20clear%20turquoise%20water%2C%20white%20sandy%20beach%2C%20palm%20trees%2C%20tropical%20paradise%20setting%2C%20professional%20hotel%20photography%2C%20bright%20sunny%20day&width=400&height=300&seq=beach1&orientation=landscape',
    location: 'Maldives',
    rating: 4.9,
    price: 450,
    amenities: ['Private Beach', 'Overwater Villa', 'Spa', 'Diving Center'],
    description: 'Experience ultimate luxury in our overwater villas with direct ocean access and stunning sunset views.'
  },
  {
    id: '2',
    name: 'Bali Oceanfront Retreat',
    image: 'https://readdy.ai/api/search-image?query=luxury%20beachfront%20resort%20in%20Bali%20Indonesia%20with%20infinity%20pool%20overlooking%20ocean%2C%20tropical%20gardens%2C%20traditional%20Balinese%20architecture%2C%20palm%20trees%2C%20professional%20photography&width=400&height=300&seq=beach2&orientation=landscape',
    location: 'Bali, Indonesia',
    rating: 4.8,
    price: 320,
    amenities: ['Infinity Pool', 'Beach Club', 'Yoga Studio', 'Restaurant'],
    description: 'A serene Balinese escape featuring traditional architecture, lush gardens, and breathtaking ocean views.'
  },
  {
    id: '3',
    name: 'Caribbean Blue Waters Resort',
    image: 'https://readdy.ai/api/search-image?query=luxury%20Caribbean%20beach%20resort%20with%20white%20sand%20beach%2C%20turquoise%20water%2C%20palm%20trees%2C%20beachfront%20cabanas%2C%20tropical%20paradise%2C%20professional%20hotel%20photography%2C%20sunny%20day&width=400&height=300&seq=beach3&orientation=landscape',
    location: 'Turks and Caicos',
    rating: 4.7,
    price: 380,
    amenities: ['Private Cabanas', 'Water Sports', 'Fine Dining', 'Golf Course'],
    description: 'Pristine white sand beaches meet crystal-clear Caribbean waters at this exclusive island retreat.'
  },
  {
    id: '4',
    name: 'Santorini Seaside Villa',
    image: 'https://readdy.ai/api/search-image?query=luxury%20white%20villa%20resort%20in%20Santorini%20Greece%20with%20blue%20domed%20roofs%2C%20infinity%20pool%20overlooking%20Aegean%20Sea%2C%20Mediterranean%20architecture%2C%20sunset%20view%2C%20professional%20photography&width=400&height=300&seq=beach4&orientation=landscape',
    location: 'Santorini, Greece',
    rating: 4.9,
    price: 420,
    amenities: ['Caldera View', 'Private Pool', 'Wine Tasting', 'Sunset Terrace'],
    description: 'Iconic whitewashed villas perched on cliffs with panoramic views of the stunning Aegean Sea.'
  },
  {
    id: '5',
    name: 'Phuket Tropical Haven',
    image: 'https://readdy.ai/api/search-image?query=luxury%20beach%20resort%20in%20Phuket%20Thailand%20with%20private%20beach%2C%20tropical%20jungle%20backdrop%2C%20infinity%20pool%2C%20Thai%20architecture%2C%20palm%20trees%2C%20professional%20hotel%20photography&width=400&height=300&seq=beach5&orientation=landscape',
    location: 'Phuket, Thailand',
    rating: 4.6,
    price: 280,
    amenities: ['Thai Spa', 'Beach Bar', 'Snorkeling', 'Cooking Classes'],
    description: 'Nestled between lush jungle and pristine beaches, experience authentic Thai hospitality and natural beauty.'
  },
  {
    id: '6',
    name: 'Fiji Island Paradise',
    image: 'https://readdy.ai/api/search-image?query=luxury%20private%20island%20resort%20in%20Fiji%20with%20overwater%20bungalows%2C%20coral%20reef%2C%20tropical%20beach%2C%20palm%20trees%2C%20crystal%20clear%20lagoon%2C%20professional%20photography&width=400&height=300&seq=beach6&orientation=landscape',
    location: 'Fiji Islands',
    rating: 4.8,
    price: 520,
    amenities: ['Private Island', 'Coral Reef', 'Butler Service', 'Seaplane Transfer'],
    description: 'Your own private island paradise with world-class diving, pristine beaches, and unmatched seclusion.'
  }
];

export default function BeachResortsPage() {
  const [selectedResort, setSelectedResort] = useState<BeachResort | null>(null);

  const closeModal = () => {
    setSelectedResort(null);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[400px] sm:h-[450px] md:h-[500px] overflow-hidden">
        <img
          src="https://readdy.ai/api/search-image?query=stunning%20aerial%20view%20of%20tropical%20beach%20resort%20with%20turquoise%20water%2C%20white%20sand%20beach%2C%20palm%20trees%2C%20overwater%20villas%2C%20paradise%20island%2C%20professional%20drone%20photography%2C%20vibrant%20colors&width=1920&height=600&seq=beach-hero&orientation=landscape"
          alt="Beach Resorts"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl px-4 sm:px-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">Beach Resorts</h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-6 sm:mb-8">
              Escape to paradise with our handpicked collection of world-class beach destinations
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Link
                to="/signup"
                className="w-full sm:w-auto bg-[#1990FF] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-[#0070E0] transition-colors whitespace-nowrap cursor-pointer text-center text-sm sm:text-base"
              >
                <i className="ri-vip-crown-line mr-2"></i>
                Become a Member
              </Link>
              <a
                href="#resorts"
                className="w-full sm:w-auto bg-white/20 backdrop-blur-sm text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-white/30 transition-colors whitespace-nowrap cursor-pointer text-center text-sm sm:text-base"
              >
                Explore Resorts
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#1990FF]/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <i className="ri-sun-line text-2xl sm:text-3xl text-[#1990FF]"></i>
              </div>
              <h3 className="font-bold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Tropical Destinations</h3>
              <p className="text-xs sm:text-sm text-gray-600">Handpicked paradise locations worldwide</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#1990FF]/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <i className="ri-home-smile-line text-2xl sm:text-3xl text-[#1990FF]"></i>
              </div>
              <h3 className="font-bold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Luxury Villas</h3>
              <p className="text-xs sm:text-sm text-gray-600">Private beachfront accommodations</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#1990FF]/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <i className="ri-service-line text-2xl sm:text-3xl text-[#1990FF]"></i>
              </div>
              <h3 className="font-bold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Premium Service</h3>
              <p className="text-xs sm:text-sm text-gray-600">24/7 concierge and butler service</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#1990FF]/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <i className="ri-price-tag-3-line text-2xl sm:text-3xl text-[#1990FF]"></i>
              </div>
              <h3 className="font-bold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Member Rates</h3>
              <p className="text-xs sm:text-sm text-gray-600">Exclusive discounts up to 40%</p>
            </div>
          </div>
        </div>
      </section>

      {/* Resorts Grid */}
      <section id="resorts" className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Featured Beach Resorts</h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              Discover our curated selection of the world's most stunning beach destinations, 
              each offering unique experiences and unforgettable memories.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {beachResorts.map((resort) => (
              <div 
                key={resort.id} 
                className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                  <img
                    src={resort.image}
                    alt={resort.name}
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-lg">
                    <div className="flex items-center gap-1">
                      <i className="ri-star-fill text-yellow-400 text-xs sm:text-sm"></i>
                      <span className="font-semibold text-gray-900 text-xs sm:text-sm">{resort.rating}</span>
                    </div>
                  </div>
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-[#1990FF] text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium">
                    Member Exclusive
                  </div>
                </div>

                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">{resort.name}</h3>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                    <i className="ri-map-pin-line"></i>
                    <span>{resort.location}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 line-clamp-2">
                    {resort.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                    {resort.amenities.slice(0, 3).map((amenity, index) => (
                      <span
                        key={index}
                        className="px-2 sm:px-3 py-0.5 sm:py-1 bg-gray-100 text-gray-700 text-[10px] sm:text-xs rounded-full"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-200">
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600">From</p>
                      <p className="text-xl sm:text-2xl font-bold text-[#1990FF]">
                        ${resort.price}
                        <span className="text-xs sm:text-sm text-gray-600 font-normal">/night</span>
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedResort(resort)}
                      className="bg-[#1990FF] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium hover:bg-[#0070E0] transition-colors whitespace-nowrap cursor-pointer text-xs sm:text-sm"
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

      {/* Resort Details Modal */}
      {selectedResort && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <div className="relative h-80 overflow-hidden">
                <img
                  src={selectedResort.image}
                  alt={selectedResort.name}
                  className="w-full h-full object-cover object-top"
                />
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <i className="ri-close-line text-2xl text-gray-700"></i>
                </button>
                <div className="absolute bottom-4 left-4 bg-white px-4 py-2 rounded-full shadow-lg">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <i
                        key={i}
                        className={`${
                          i < Math.floor(selectedResort.rating)
                            ? 'ri-star-fill text-yellow-400'
                            : 'ri-star-line text-gray-300'
                        } text-lg`}
                      ></i>
                    ))}
                    <span className="ml-2 font-semibold text-gray-900">{selectedResort.rating}</span>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedResort.name}</h2>
                <div className="flex items-center gap-2 text-gray-600 mb-6">
                  <i className="ri-map-pin-line text-xl"></i>
                  <span className="text-lg">{selectedResort.location}</span>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">About This Resort</h3>
                  <p className="text-gray-600 leading-relaxed">{selectedResort.description}</p>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Amenities</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {selectedResort.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center gap-3 text-gray-700">
                        <i className="ri-check-line text-[#1990FF] text-xl"></i>
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Starting From</p>
                      <p className="text-3xl font-bold text-[#1990FF]">
                        ${selectedResort.price}
                        <span className="text-lg text-gray-600 font-normal">/night</span>
                      </p>
                    </div>
                    <Link
                      to="/signup"
                      className="bg-[#1990FF] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#0070E0] transition-colors whitespace-nowrap cursor-pointer"
                    >
                      <i className="ri-calendar-check-line mr-2"></i>
                      Book Now
                    </Link>
                  </div>
                </div>

                <div className="bg-[#1990FF]/5 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <i className="ri-vip-crown-line text-2xl text-[#1990FF]"></i>
                    <h3 className="text-lg font-bold text-gray-900">Member Benefits</h3>
                  </div>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center gap-2">
                      <i className="ri-check-line text-[#1990FF]"></i>
                      <span>Save up to 40% with member rates</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <i className="ri-check-line text-[#1990FF]"></i>
                      <span>Complimentary room upgrade</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <i className="ri-check-line text-[#1990FF]"></i>
                      <span>Free airport transfers</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <i className="ri-check-line text-[#1990FF]"></i>
                      <span>Daily breakfast included</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-[#1990FF] to-[#0070E0] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Ready for Your Beach Getaway?</h2>
          <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8">
            Join Netcozy today and unlock exclusive member rates at the world's most beautiful beach resorts.
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 bg-white text-[#1990FF] px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap cursor-pointer text-sm sm:text-base"
          >
            Start Your Journey
            <i className="ri-arrow-right-line"></i>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
