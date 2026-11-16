import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';

interface CityBreak {
  id: string;
  name: string;
  image: string;
  location: string;
  rating: number;
  price: number;
  highlights: string[];
  description: string;
  bestFor: string;
}

const cityBreaks: CityBreak[] = [
  {
    id: '1',
    name: 'New York City Experience',
    image: 'https://readdy.ai/api/search-image?query=stunning%20New%20York%20City%20skyline%20at%20sunset%20with%20Empire%20State%20Building%20and%20Manhattan%20skyscrapers%2C%20yellow%20taxi%20cabs%20on%20busy%20street%2C%20vibrant%20urban%20atmosphere%2C%20professional%20photography%2C%20warm%20golden%20hour%20lighting&width=400&height=300&seq=city1&orientation=landscape',
    location: 'New York, USA',
    rating: 4.9,
    price: 380,
    highlights: ['Broadway Shows', 'Central Park', 'Times Square', 'Museum Mile'],
    description: 'Experience the city that never sleeps with world-class entertainment, iconic landmarks, and endless culinary adventures.',
    bestFor: 'Culture & Entertainment'
  },
  {
    id: '2',
    name: 'Paris Romance Package',
    image: 'https://readdy.ai/api/search-image?query=beautiful%20Paris%20cityscape%20with%20Eiffel%20Tower%20at%20twilight%2C%20charming%20Parisian%20streets%20with%20cafes%2C%20romantic%20atmosphere%2C%20Seine%20River%20view%2C%20professional%20photography%2C%20soft%20evening%20lighting&width=400&height=300&seq=city2&orientation=landscape',
    location: 'Paris, France',
    rating: 4.9,
    price: 420,
    highlights: ['Eiffel Tower', 'Louvre Museum', 'Champs-Elysees', 'Seine Cruise'],
    description: 'Discover the City of Light with its romantic boulevards, world-renowned art, and exquisite French cuisine.',
    bestFor: 'Romance & Art'
  },
  {
    id: '3',
    name: 'Tokyo Adventure',
    image: 'https://readdy.ai/api/search-image?query=vibrant%20Tokyo%20cityscape%20at%20night%20with%20neon%20lights%20in%20Shibuya%20crossing%2C%20modern%20skyscrapers%20mixed%20with%20traditional%20temples%2C%20bustling%20urban%20energy%2C%20professional%20photography%2C%20colorful%20night%20scene&width=400&height=300&seq=city3&orientation=landscape',
    location: 'Tokyo, Japan',
    rating: 4.8,
    price: 450,
    highlights: ['Shibuya Crossing', 'Senso-ji Temple', 'Harajuku', 'Tsukiji Market'],
    description: 'Immerse yourself in the perfect blend of ancient traditions and cutting-edge technology in this fascinating metropolis.',
    bestFor: 'Culture & Technology'
  },
  {
    id: '4',
    name: 'London Classic Tour',
    image: 'https://readdy.ai/api/search-image?query=iconic%20London%20cityscape%20with%20Big%20Ben%20and%20Houses%20of%20Parliament%2C%20red%20double%20decker%20bus%20crossing%20Westminster%20Bridge%2C%20Thames%20River%2C%20classic%20British%20architecture%2C%20professional%20photography%2C%20dramatic%20sky&width=400&height=300&seq=city4&orientation=landscape',
    location: 'London, UK',
    rating: 4.8,
    price: 360,
    highlights: ['Big Ben', 'Tower of London', 'West End Shows', 'British Museum'],
    description: 'Explore centuries of history, royal heritage, and vibrant culture in one of the world\'s most iconic cities.',
    bestFor: 'History & Theatre'
  },
  {
    id: '5',
    name: 'Barcelona Getaway',
    image: 'https://readdy.ai/api/search-image?query=stunning%20Barcelona%20cityscape%20with%20Sagrada%20Familia%20cathedral%2C%20colorful%20Gaudi%20architecture%2C%20Mediterranean%20coastal%20city%2C%20palm%20trees%20and%20blue%20sky%2C%20professional%20photography%2C%20warm%20sunny%20atmosphere&width=400&height=300&seq=city5&orientation=landscape',
    location: 'Barcelona, Spain',
    rating: 4.7,
    price: 320,
    highlights: ['Sagrada Familia', 'Park Guell', 'La Rambla', 'Gothic Quarter'],
    description: 'Experience Gaudi\'s architectural masterpieces, Mediterranean beaches, and vibrant Catalan culture.',
    bestFor: 'Architecture & Beach'
  },
  {
    id: '6',
    name: 'Dubai Luxury Escape',
    image: 'https://readdy.ai/api/search-image?query=spectacular%20Dubai%20skyline%20with%20Burj%20Khalifa%20at%20sunset%2C%20modern%20futuristic%20architecture%2C%20luxury%20hotels%20and%20skyscrapers%2C%20desert%20city%20oasis%2C%20professional%20photography%2C%20golden%20hour%20lighting&width=400&height=300&seq=city6&orientation=landscape',
    location: 'Dubai, UAE',
    rating: 4.9,
    price: 520,
    highlights: ['Burj Khalifa', 'Dubai Mall', 'Desert Safari', 'Palm Jumeirah'],
    description: 'Indulge in ultimate luxury with stunning architecture, world-class shopping, and unforgettable desert experiences.',
    bestFor: 'Luxury & Shopping'
  }
];

export default function CityBreaksPage() {
  const [selectedCity, setSelectedCity] = useState<CityBreak | null>(null);

  const closeModal = () => {
    setSelectedCity(null);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[400px] sm:h-[450px] md:h-[500px] overflow-hidden">
        <img
          src="https://readdy.ai/api/search-image?query=stunning%20panoramic%20view%20of%20modern%20city%20skyline%20at%20night%20with%20illuminated%20skyscrapers%2C%20vibrant%20urban%20lights%20reflecting%20on%20water%2C%20metropolitan%20cityscape%2C%20professional%20photography%2C%20dramatic%20night%20atmosphere&width=1920&height=600&seq=city-hero&orientation=landscape"
          alt="City Breaks"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl px-4 sm:px-6 w-full">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">City Breaks</h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-6 sm:mb-8">
              Discover the world's most exciting urban destinations for unforgettable adventures
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
                href="#cities"
                className="w-full sm:w-auto bg-white/20 backdrop-blur-sm text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-white/30 transition-colors whitespace-nowrap cursor-pointer text-center text-sm sm:text-base"
              >
                Explore Cities
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
                <i className="ri-building-line text-2xl sm:text-3xl text-[#1990FF]"></i>
              </div>
              <h3 className="font-bold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Iconic Landmarks</h3>
              <p className="text-xs sm:text-sm text-gray-600">World-famous attractions and monuments</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#1990FF]/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <i className="ri-restaurant-line text-2xl sm:text-3xl text-[#1990FF]"></i>
              </div>
              <h3 className="font-bold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Culinary Delights</h3>
              <p className="text-xs sm:text-sm text-gray-600">Local cuisine and fine dining</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#1990FF]/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <i className="ri-palette-line text-2xl sm:text-3xl text-[#1990FF]"></i>
              </div>
              <h3 className="font-bold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Arts & Culture</h3>
              <p className="text-xs sm:text-sm text-gray-600">Museums, galleries, and shows</p>
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

      {/* Cities Grid */}
      <section id="cities" className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Featured City Destinations</h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              Explore our handpicked selection of the world's most vibrant cities, 
              each offering unique experiences, rich culture, and unforgettable memories.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {cityBreaks.map((city) => (
              <div 
                key={city.id} 
                className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                  <img
                    src={city.image}
                    alt={city.name}
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-lg">
                    <div className="flex items-center gap-1">
                      <i className="ri-star-fill text-yellow-400 text-xs sm:text-sm"></i>
                      <span className="font-semibold text-gray-900 text-xs sm:text-sm">{city.rating}</span>
                    </div>
                  </div>
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-[#1990FF] text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium">
                    Member Exclusive
                  </div>
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 bg-black/60 backdrop-blur-sm text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium">
                    <i className="ri-heart-line mr-1"></i>
                    {city.bestFor}
                  </div>
                </div>

                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">{city.name}</h3>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                    <i className="ri-map-pin-line"></i>
                    <span>{city.location}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 line-clamp-2">
                    {city.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                    {city.highlights.slice(0, 3).map((highlight, index) => (
                      <span
                        key={index}
                        className="px-2 sm:px-3 py-0.5 sm:py-1 bg-gray-100 text-gray-700 text-[10px] sm:text-xs rounded-full"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-200">
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600">From</p>
                      <p className="text-xl sm:text-2xl font-bold text-[#1990FF]">
                        ${city.price}
                        <span className="text-xs sm:text-sm text-gray-600 font-normal">/night</span>
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedCity(city)}
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

      {/* City Details Modal */}
      {selectedCity && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <div className="relative h-80 overflow-hidden">
                <img
                  src={selectedCity.image}
                  alt={selectedCity.name}
                  className="w-full h-full object-cover object-top"
                />
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <i className="ri-close-line text-2xl text-gray-700"></i>
                </button>
                <div className="absolute bottom-4 left-4 flex items-center gap-3">
                  <div className="bg-white px-4 py-2 rounded-full shadow-lg">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <i
                          key={i}
                          className={`${
                            i < Math.floor(selectedCity.rating)
                              ? 'ri-star-fill text-yellow-400'
                              : 'ri-star-line text-gray-300'
                          } text-lg`}
                        ></i>
                      ))}
                      <span className="ml-2 font-semibold text-gray-900">{selectedCity.rating}</span>
                    </div>
                  </div>
                  <div className="bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-full">
                    <i className="ri-heart-line mr-1"></i>
                    {selectedCity.bestFor}
                  </div>
                </div>
              </div>

              <div className="p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedCity.name}</h2>
                <div className="flex items-center gap-2 text-gray-600 mb-6">
                  <i className="ri-map-pin-line text-xl"></i>
                  <span className="text-lg">{selectedCity.location}</span>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">About This Destination</h3>
                  <p className="text-gray-600 leading-relaxed">{selectedCity.description}</p>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Top Highlights</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {selectedCity.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center gap-3 text-gray-700">
                        <i className="ri-check-line text-[#1990FF] text-xl"></i>
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Starting From</p>
                      <p className="text-3xl font-bold text-[#1990FF]">
                        ${selectedCity.price}
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
                      <span>Complimentary room upgrade when available</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <i className="ri-check-line text-[#1990FF]"></i>
                      <span>Free city walking tour</span>
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
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Ready for Your Urban Adventure?</h2>
          <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8">
            Join Netcozy today and unlock exclusive member rates at the world's most exciting city destinations.
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
