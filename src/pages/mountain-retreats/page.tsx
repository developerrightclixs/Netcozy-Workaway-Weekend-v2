import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';

interface MountainRetreat {
  id: string;
  name: string;
  image: string;
  location: string;
  rating: number;
  price: number;
  amenities: string[];
  description: string;
  elevation: string;
}

const mountainRetreats: MountainRetreat[] = [
  {
    id: '1',
    name: 'Swiss Alps Chalet Resort',
    image: 'https://readdy.ai/api/search-image?query=luxury%20wooden%20chalet%20resort%20in%20Swiss%20Alps%20with%20snow%20capped%20mountains%20background%2C%20cozy%20fireplace%2C%20panoramic%20mountain%20views%2C%20winter%20wonderland%20setting%2C%20professional%20hotel%20photography%2C%20warm%20lighting&width=400&height=300&seq=mountain1&orientation=landscape',
    location: 'Zermatt, Switzerland',
    rating: 4.9,
    price: 520,
    amenities: ['Ski-in/Ski-out', 'Hot Tub', 'Fireplace', 'Mountain Guide'],
    description: 'Experience the magic of the Swiss Alps in our luxurious chalets with breathtaking views of the Matterhorn.',
    elevation: '5,315 ft'
  },
  {
    id: '2',
    name: 'Rocky Mountain Lodge',
    image: 'https://readdy.ai/api/search-image?query=luxury%20mountain%20lodge%20in%20Colorado%20Rocky%20Mountains%20with%20log%20cabin%20architecture%2C%20surrounded%20by%20pine%20trees%2C%20mountain%20peaks%20in%20background%2C%20rustic%20elegance%2C%20professional%20photography%2C%20golden%20hour%20lighting&width=400&height=300&seq=mountain2&orientation=landscape',
    location: 'Aspen, Colorado',
    rating: 4.8,
    price: 450,
    amenities: ['Spa & Wellness', 'Hiking Trails', 'Fine Dining', 'Ski Valet'],
    description: 'A premier mountain retreat offering world-class skiing, hiking, and unparalleled Rocky Mountain hospitality.',
    elevation: '7,908 ft'
  },
  {
    id: '3',
    name: 'Japanese Onsen Ryokan',
    image: 'https://readdy.ai/api/search-image?query=traditional%20Japanese%20ryokan%20inn%20in%20mountains%20with%20hot%20spring%20onsen%2C%20zen%20garden%2C%20wooden%20architecture%2C%20misty%20mountain%20backdrop%2C%20autumn%20foliage%2C%20professional%20photography%2C%20serene%20atmosphere&width=400&height=300&seq=mountain3&orientation=landscape',
    location: 'Hakone, Japan',
    rating: 4.9,
    price: 380,
    amenities: ['Natural Hot Springs', 'Kaiseki Cuisine', 'Tatami Rooms', 'Tea Ceremony'],
    description: 'Immerse yourself in Japanese tradition at this serene mountain ryokan with natural hot spring baths.',
    elevation: '2,460 ft'
  },
  {
    id: '4',
    name: 'Patagonia Wilderness Resort',
    image: 'https://readdy.ai/api/search-image?query=luxury%20eco%20lodge%20in%20Patagonia%20Argentina%20with%20dramatic%20mountain%20peaks%2C%20glacial%20lake%2C%20modern%20sustainable%20architecture%2C%20wilderness%20setting%2C%20professional%20photography%2C%20dramatic%20clouds&width=400&height=300&seq=mountain4&orientation=landscape',
    location: 'Torres del Paine, Chile',
    rating: 4.7,
    price: 490,
    amenities: ['Glacier Tours', 'Wildlife Safari', 'Eco-Friendly', 'Stargazing'],
    description: 'An eco-luxury retreat at the edge of the world, surrounded by glaciers, peaks, and pristine wilderness.',
    elevation: '1,312 ft'
  },
  {
    id: '5',
    name: 'Austrian Alpine Spa Hotel',
    image: 'https://readdy.ai/api/search-image?query=luxury%20spa%20hotel%20in%20Austrian%20Alps%20with%20infinity%20pool%20overlooking%20mountains%2C%20modern%20alpine%20architecture%2C%20snow%20peaks%2C%20wellness%20retreat%2C%20professional%20photography%2C%20blue%20sky&width=400&height=300&seq=mountain5&orientation=landscape',
    location: 'Tyrol, Austria',
    rating: 4.8,
    price: 420,
    amenities: ['Infinity Pool', 'Alpine Spa', 'Gourmet Restaurant', 'Yoga Retreat'],
    description: 'Where Alpine tradition meets modern luxury, featuring world-class spa facilities and stunning mountain panoramas.',
    elevation: '4,593 ft'
  },
  {
    id: '6',
    name: 'Canadian Rockies Hideaway',
    image: 'https://readdy.ai/api/search-image?query=luxury%20mountain%20resort%20in%20Canadian%20Rockies%20Banff%20with%20turquoise%20lake%2C%20snow%20capped%20peaks%2C%20rustic%20luxury%20lodge%2C%20pine%20forest%2C%20professional%20photography%2C%20pristine%20nature&width=400&height=300&seq=mountain6&orientation=landscape',
    location: 'Banff, Canada',
    rating: 4.9,
    price: 480,
    amenities: ['Lake Access', 'Wildlife Tours', 'Canoe Rentals', 'Mountain Biking'],
    description: 'Discover the untamed beauty of the Canadian Rockies from this exclusive lakeside mountain retreat.',
    elevation: '4,537 ft'
  }
];

export default function MountainRetreatsPage() {
  const [selectedRetreat, setSelectedRetreat] = useState<MountainRetreat | null>(null);

  const closeModal = () => {
    setSelectedRetreat(null);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[400px] sm:h-[450px] md:h-[500px] overflow-hidden">
        <img
          src="https://readdy.ai/api/search-image?query=stunning%20panoramic%20view%20of%20majestic%20snow%20capped%20mountain%20range%20at%20sunrise%2C%20alpine%20meadows%2C%20dramatic%20peaks%2C%20misty%20valleys%2C%20professional%20landscape%20photography%2C%20vibrant%20golden%20hour%20colors%2C%20epic%20scenery&width=1920&height=600&seq=mountain-hero&orientation=landscape"
          alt="Mountain Retreats"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl px-4 sm:px-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">Mountain Retreats</h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-6 sm:mb-8">
              Escape to breathtaking heights with our collection of scenic mountain getaways
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
                href="#retreats"
                className="w-full sm:w-auto bg-white/20 backdrop-blur-sm text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-white/30 transition-colors whitespace-nowrap cursor-pointer text-center text-sm sm:text-base"
              >
                Explore Retreats
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
                <i className="ri-mountain-line text-2xl sm:text-3xl text-[#1990FF]"></i>
              </div>
              <h3 className="font-bold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Scenic Locations</h3>
              <p className="text-xs sm:text-sm text-gray-600">World's most stunning mountain destinations</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#1990FF]/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <i className="ri-home-heart-line text-2xl sm:text-3xl text-[#1990FF]"></i>
              </div>
              <h3 className="font-bold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Cozy Retreats</h3>
              <p className="text-xs sm:text-sm text-gray-600">Luxurious chalets and lodges</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#1990FF]/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <i className="ri-compass-3-line text-2xl sm:text-3xl text-[#1990FF]"></i>
              </div>
              <h3 className="font-bold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Adventure Activities</h3>
              <p className="text-xs sm:text-sm text-gray-600">Skiing, hiking, and more</p>
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

      {/* Retreats Grid */}
      <section id="retreats" className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Featured Mountain Retreats</h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              Discover our curated selection of the world's most spectacular mountain destinations, 
              each offering unique experiences and unforgettable adventures.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {mountainRetreats.map((retreat) => (
              <div 
                key={retreat.id} 
                className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                  <img
                    src={retreat.image}
                    alt={retreat.name}
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-lg">
                    <div className="flex items-center gap-1">
                      <i className="ri-star-fill text-yellow-400 text-xs sm:text-sm"></i>
                      <span className="font-semibold text-gray-900 text-xs sm:text-sm">{retreat.rating}</span>
                    </div>
                  </div>
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-[#1990FF] text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium">
                    Member Exclusive
                  </div>
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 bg-black/60 backdrop-blur-sm text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium">
                    <i className="ri-arrow-up-line mr-1"></i>
                    {retreat.elevation}
                  </div>
                </div>

                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">{retreat.name}</h3>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                    <i className="ri-map-pin-line"></i>
                    <span>{retreat.location}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 line-clamp-2">
                    {retreat.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                    {retreat.amenities.slice(0, 3).map((amenity, index) => (
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
                        ${retreat.price}
                        <span className="text-xs sm:text-sm text-gray-600 font-normal">/night</span>
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedRetreat(retreat)}
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

      {/* Retreat Details Modal */}
      {selectedRetreat && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <div className="relative h-80 overflow-hidden">
                <img
                  src={selectedRetreat.image}
                  alt={selectedRetreat.name}
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
                            i < Math.floor(selectedRetreat.rating)
                              ? 'ri-star-fill text-yellow-400'
                              : 'ri-star-line text-gray-300'
                          } text-lg`}
                        ></i>
                      ))}
                      <span className="ml-2 font-semibold text-gray-900">{selectedRetreat.rating}</span>
                    </div>
                  </div>
                  <div className="bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-full">
                    <i className="ri-arrow-up-line mr-1"></i>
                    {selectedRetreat.elevation}
                  </div>
                </div>
              </div>

              <div className="p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedRetreat.name}</h2>
                <div className="flex items-center gap-2 text-gray-600 mb-6">
                  <i className="ri-map-pin-line text-xl"></i>
                  <span className="text-lg">{selectedRetreat.location}</span>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">About This Retreat</h3>
                  <p className="text-gray-600 leading-relaxed">{selectedRetreat.description}</p>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Amenities & Activities</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {selectedRetreat.amenities.map((amenity, index) => (
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
                        ${selectedRetreat.price}
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
                      <span>Free guided mountain tour</span>
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
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Ready for Your Mountain Adventure?</h2>
          <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8">
            Join Netcozy today and unlock exclusive member rates at the world's most breathtaking mountain retreats.
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
