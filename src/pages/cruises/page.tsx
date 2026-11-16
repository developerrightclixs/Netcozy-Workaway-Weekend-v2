
import { useState } from 'react';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';

interface Cruise {
  id: number;
  name: string;
  cruiseLine: string;
  image: string;
  destination: string;
  duration: string;
  departurePort: string;
  ship: string;
  rating: number;
  reviews: number;
  priceFrom: number;
  highlights: string[];
  inclusions: string[];
  departureDate: string;
  cabinTypes: { type: string; price: number }[];
}

const cruises: Cruise[] = [
  {
    id: 1,
    name: 'Caribbean Paradise Voyage',
    cruiseLine: 'Royal Caribbean',
    image: 'https://readdy.ai/api/search-image?query=Luxury%20cruise%20ship%20sailing%20through%20crystal%20clear%20turquoise%20Caribbean%20waters%20with%20tropical%20islands%20in%20background%20sunny%20day%20white%20ship%20elegant%20design%20professional%20travel%20photography&width=600&height=400&seq=cruise1&orientation=landscape',
    destination: 'Eastern Caribbean',
    duration: '7 Nights',
    departurePort: 'Miami, FL',
    ship: 'Symphony of the Seas',
    rating: 4.9,
    reviews: 2847,
    priceFrom: 899,
    highlights: ['Private Island Visit', 'Snorkeling', 'Beach Day'],
    inclusions: ['All Meals', 'Entertainment', 'Pool Access'],
    departureDate: 'Mar 15, 2025',
    cabinTypes: [
      { type: 'Interior', price: 899 },
      { type: 'Ocean View', price: 1199 },
      { type: 'Balcony', price: 1499 },
      { type: 'Suite', price: 2499 }
    ]
  },
  {
    id: 2,
    name: 'Mediterranean Discovery',
    cruiseLine: 'Norwegian Cruise Line',
    image: 'https://readdy.ai/api/search-image?query=Elegant%20cruise%20ship%20sailing%20along%20stunning%20Mediterranean%20coastline%20with%20historic%20European%20villages%20on%20cliffs%20azure%20blue%20sea%20sunny%20weather%20professional%20travel%20photography&width=600&height=400&seq=cruise2&orientation=landscape',
    destination: 'Western Mediterranean',
    duration: '10 Nights',
    departurePort: 'Barcelona, Spain',
    ship: 'Norwegian Epic',
    rating: 4.8,
    reviews: 1923,
    priceFrom: 1299,
    highlights: ['Rome Tour', 'French Riviera', 'Greek Islands'],
    inclusions: ['All Meals', 'Shore Excursions', 'Spa Access'],
    departureDate: 'Apr 8, 2025',
    cabinTypes: [
      { type: 'Interior', price: 1299 },
      { type: 'Ocean View', price: 1699 },
      { type: 'Balcony', price: 2099 },
      { type: 'Suite', price: 3499 }
    ]
  },
  {
    id: 3,
    name: 'Alaska Glacier Adventure',
    cruiseLine: 'Princess Cruises',
    image: 'https://readdy.ai/api/search-image?query=Majestic%20cruise%20ship%20sailing%20through%20Alaska%20fjords%20with%20massive%20blue%20glaciers%20snow%20capped%20mountains%20wildlife%20pristine%20wilderness%20professional%20travel%20photography&width=600&height=400&seq=cruise3&orientation=landscape',
    destination: 'Alaska Inside Passage',
    duration: '7 Nights',
    departurePort: 'Seattle, WA',
    ship: 'Royal Princess',
    rating: 4.9,
    reviews: 3156,
    priceFrom: 1099,
    highlights: ['Glacier Viewing', 'Whale Watching', 'Juneau Tour'],
    inclusions: ['All Meals', 'Naturalist Guides', 'Hot Tub'],
    departureDate: 'May 20, 2025',
    cabinTypes: [
      { type: 'Interior', price: 1099 },
      { type: 'Ocean View', price: 1399 },
      { type: 'Balcony', price: 1799 },
      { type: 'Suite', price: 2999 }
    ]
  },
  {
    id: 4,
    name: 'Hawaiian Island Hopper',
    cruiseLine: 'Holland America',
    image: 'https://readdy.ai/api/search-image?query=Beautiful%20cruise%20ship%20anchored%20near%20Hawaiian%20island%20with%20lush%20green%20mountains%20tropical%20beaches%20palm%20trees%20volcanic%20landscape%20sunset%20colors%20professional%20travel%20photography&width=600&height=400&seq=cruise4&orientation=landscape',
    destination: 'Hawaiian Islands',
    duration: '14 Nights',
    departurePort: 'San Diego, CA',
    ship: 'Koningsdam',
    rating: 4.7,
    reviews: 1654,
    priceFrom: 1899,
    highlights: ['4 Islands', 'Luau Experience', 'Volcano Tour'],
    inclusions: ['All Meals', 'Cultural Shows', 'Lei Greeting'],
    departureDate: 'Jun 5, 2025',
    cabinTypes: [
      { type: 'Interior', price: 1899 },
      { type: 'Ocean View', price: 2399 },
      { type: 'Balcony', price: 2899 },
      { type: 'Suite', price: 4499 }
    ]
  },
  {
    id: 5,
    name: 'Bahamas Getaway',
    cruiseLine: 'Carnival Cruise Line',
    image: 'https://readdy.ai/api/search-image?query=Fun%20colorful%20cruise%20ship%20sailing%20to%20Bahamas%20with%20crystal%20clear%20turquoise%20waters%20white%20sand%20beaches%20tropical%20paradise%20sunny%20day%20professional%20travel%20photography&width=600&height=400&seq=cruise5&orientation=landscape',
    destination: 'Bahamas',
    duration: '4 Nights',
    departurePort: 'Port Canaveral, FL',
    ship: 'Carnival Mardi Gras',
    rating: 4.6,
    reviews: 4521,
    priceFrom: 449,
    highlights: ['Nassau Visit', 'Private Island', 'Water Slides'],
    inclusions: ['All Meals', 'Entertainment', 'Kids Club'],
    departureDate: 'Mar 1, 2025',
    cabinTypes: [
      { type: 'Interior', price: 449 },
      { type: 'Ocean View', price: 599 },
      { type: 'Balcony', price: 799 },
      { type: 'Suite', price: 1299 }
    ]
  },
  {
    id: 6,
    name: 'Northern Europe Explorer',
    cruiseLine: 'Celebrity Cruises',
    image: 'https://readdy.ai/api/search-image?query=Luxurious%20cruise%20ship%20sailing%20through%20Norwegian%20fjords%20with%20dramatic%20cliffs%20waterfalls%20northern%20lights%20aurora%20borealis%20scenic%20Scandinavian%20landscape%20professional%20travel%20photography&width=600&height=400&seq=cruise6&orientation=landscape',
    destination: 'Scandinavia & Russia',
    duration: '12 Nights',
    departurePort: 'Southampton, UK',
    ship: 'Celebrity Apex',
    rating: 4.8,
    reviews: 1287,
    priceFrom: 2199,
    highlights: ['St. Petersburg', 'Norwegian Fjords', 'Copenhagen'],
    inclusions: ['All Meals', 'Premium Drinks', 'WiFi'],
    departureDate: 'Jul 10, 2025',
    cabinTypes: [
      { type: 'Interior', price: 2199 },
      { type: 'Ocean View', price: 2799 },
      { type: 'Balcony', price: 3399 },
      { type: 'Suite', price: 5499 }
    ]
  }
];

const cruiseLines = ['All Lines', 'Royal Caribbean', 'Norwegian Cruise Line', 'Princess Cruises', 'Holland America', 'Carnival Cruise Line', 'Celebrity Cruises'];
const destinations = ['All Destinations', 'Caribbean', 'Mediterranean', 'Alaska', 'Hawaii', 'Bahamas', 'Europe'];
const durations = ['Any Duration', '3-5 Nights', '6-8 Nights', '9-12 Nights', '13+ Nights'];

export default function CruisesPage() {
  const [selectedCruise, setSelectedCruise] = useState<Cruise | null>(null);
  const [selectedCruiseLine, setSelectedCruiseLine] = useState('All Lines');
  const [selectedDestination, setSelectedDestination] = useState('All Destinations');
  const [selectedDuration, setSelectedDuration] = useState('Any Duration');
  const [selectedCabinType, setSelectedCabinType] = useState<string>('');

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={i} className="ri-star-fill text-amber-400"></i>);
    }
    if (hasHalfStar) {
      stars.push(<i key="half" className="ri-star-half-fill text-amber-400"></i>);
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="ri-star-line text-amber-400"></i>);
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-20">
        <div className="absolute inset-0 h-[500px]">
          <img
            src="https://readdy.ai/api/search-image?query=Stunning%20panoramic%20view%20of%20luxury%20cruise%20ship%20sailing%20through%20beautiful%20ocean%20at%20sunset%20with%20golden%20light%20reflecting%20on%20calm%20waters%20dramatic%20sky%20professional%20travel%20photography%20cinematic&width=1920&height=600&seq=cruisehero&orientation=landscape"
            alt="Cruise Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-32">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Ocean Adventures Await</h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Discover the world from the comfort of luxury cruise ships. Explore exotic destinations, enjoy world-class dining, and create unforgettable memories.
            </p>

            {/* Search Filters */}
            <div className="bg-white rounded-2xl p-6 shadow-xl max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 text-left">Cruise Line</label>
                  <select
                    value={selectedCruiseLine}
                    onChange={(e) => setSelectedCruiseLine(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1990FF] cursor-pointer"
                  >
                    {cruiseLines.map((line) => (
                      <option key={line} value={line}>{line}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 text-left">Destination</label>
                  <select
                    value={selectedDestination}
                    onChange={(e) => setSelectedDestination(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1990FF] cursor-pointer"
                  >
                    {destinations.map((dest) => (
                      <option key={dest} value={dest}>{dest}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 text-left">Duration</label>
                  <select
                    value={selectedDuration}
                    onChange={(e) => setSelectedDuration(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1990FF] cursor-pointer"
                  >
                    {durations.map((dur) => (
                      <option key={dur} value={dur}>{dur}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-end">
                  <button className="w-full bg-[#0A2540] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0A2540]/90 transition-colors cursor-pointer whitespace-nowrap">
                    <i className="ri-search-line mr-2"></i>
                    Search Cruises
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#0A2540] mb-2">50+</div>
              <div className="text-gray-600">Cruise Lines</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#0A2540] mb-2">200+</div>
              <div className="text-gray-600">Destinations</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#0A2540] mb-2">1M+</div>
              <div className="text-gray-600">Happy Cruisers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#0A2540] mb-2">4.8</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Cruises Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0A2540] mb-4">Featured Cruise Packages</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our handpicked selection of cruise adventures, from tropical Caribbean escapes to majestic Alaskan expeditions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cruises.map((cruise) => (
              <div
                key={cruise.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
                onClick={() => setSelectedCruise(cruise)}
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={cruise.image}
                    alt={cruise.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white/95 px-3 py-1 rounded-full text-sm font-medium text-[#0A2540]">
                    {cruise.cruiseLine}
                  </div>
                  <div className="absolute top-4 right-4 bg-[#0A2540] px-3 py-1 rounded-full text-sm font-medium text-white">
                    {cruise.duration}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#0A2540] mb-2">{cruise.name}</h3>
                  <div className="flex items-center gap-2 text-gray-600 mb-3">
                    <i className="ri-map-pin-line"></i>
                    <span className="text-sm">{cruise.destination}</span>
                  </div>

                  <div className="flex items-center gap-1 mb-3">
                    {renderStars(cruise.rating)}
                    <span className="text-sm text-gray-600 ml-2">
                      {cruise.rating} ({cruise.reviews.toLocaleString()} reviews)
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {cruise.highlights.map((highlight, idx) => (
                      <span
                        key={idx}
                        className="bg-[#1990FF]/10 text-[#1990FF] px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <span className="text-sm text-gray-500">From</span>
                      <div className="text-2xl font-bold text-[#0A2540]">
                        ${cruise.priceFrom.toLocaleString()}
                        <span className="text-sm font-normal text-gray-500">/person</span>
                      </div>
                    </div>
                    <button className="bg-[#0A2540] text-white px-5 py-2 rounded-lg font-medium hover:bg-[#0A2540]/90 transition-colors cursor-pointer whitespace-nowrap">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Cruise Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0A2540] mb-4">Why Choose a Cruise Vacation?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience the ultimate all-inclusive vacation with unmatched convenience and endless entertainment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-[#1990FF]/5 transition-colors">
              <div className="w-16 h-16 bg-[#1990FF]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <i className="ri-restaurant-line text-3xl text-[#1990FF]"></i>
              </div>
              <h3 className="text-lg font-bold text-[#0A2540] mb-2">World-Class Dining</h3>
              <p className="text-gray-600 text-sm">
                Enjoy gourmet cuisine from around the world with multiple dining venues and 24/7 room service.
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-[#1990FF]/5 transition-colors">
              <div className="w-16 h-16 bg-[#1990FF]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <i className="ri-movie-line text-3xl text-[#1990FF]"></i>
              </div>
              <h3 className="text-lg font-bold text-[#0A2540] mb-2">Entertainment</h3>
              <p className="text-gray-600 text-sm">
                Broadway shows, live music, casinos, and activities for all ages throughout your voyage.
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-[#1990FF]/5 transition-colors">
              <div className="w-16 h-16 bg-[#1990FF]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <i className="ri-compass-3-line text-3xl text-[#1990FF]"></i>
              </div>
              <h3 className="text-lg font-bold text-[#0A2540] mb-2">Multiple Destinations</h3>
              <p className="text-gray-600 text-sm">
                Visit several destinations in one trip without the hassle of packing and unpacking.
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-[#1990FF]/5 transition-colors">
              <div className="w-16 h-16 bg-[#1990FF]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <i className="ri-price-tag-3-line text-3xl text-[#1990FF]"></i>
              </div>
              <h3 className="text-lg font-bold text-[#0A2540] mb-2">All-Inclusive Value</h3>
              <p className="text-gray-600 text-sm">
                One price covers accommodations, meals, entertainment, and transportation between ports.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Routes */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0A2540] mb-4">Popular Cruise Routes</h2>
            <p className="text-gray-600">Discover our most sought-after sailing destinations</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="relative h-64 rounded-2xl overflow-hidden group cursor-pointer">
              <img
                src="https://readdy.ai/api/search-image?query=Beautiful%20Caribbean%20beach%20with%20turquoise%20water%20white%20sand%20palm%20trees%20tropical%20paradise%20sunny%20day%20professional%20travel%20photography&width=400&height=300&seq=route1&orientation=landscape"
                alt="Caribbean"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold">Caribbean</h3>
                <p className="text-white/80 text-sm">From $449</p>
              </div>
            </div>

            <div className="relative h-64 rounded-2xl overflow-hidden group cursor-pointer">
              <img
                src="https://readdy.ai/api/search-image?query=Stunning%20Mediterranean%20coastal%20town%20with%20colorful%20buildings%20on%20cliffs%20azure%20sea%20Italian%20Riviera%20style%20professional%20travel%20photography&width=400&height=300&seq=route2&orientation=landscape"
                alt="Mediterranean"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold">Mediterranean</h3>
                <p className="text-white/80 text-sm">From $1,299</p>
              </div>
            </div>

            <div className="relative h-64 rounded-2xl overflow-hidden group cursor-pointer">
              <img
                src="https://readdy.ai/api/search-image?query=Majestic%20Alaska%20glacier%20with%20blue%20ice%20snow%20capped%20mountains%20pristine%20wilderness%20dramatic%20landscape%20professional%20travel%20photography&width=400&height=300&seq=route3&orientation=landscape"
                alt="Alaska"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold">Alaska</h3>
                <p className="text-white/80 text-sm">From $1,099</p>
              </div>
            </div>

            <div className="relative h-64 rounded-2xl overflow-hidden group cursor-pointer">
              <img
                src="https://readdy.ai/api/search-image?query=Beautiful%20Norwegian%20fjord%20with%20dramatic%20cliffs%20waterfalls%20calm%20blue%20water%20Scandinavian%20landscape%20professional%20travel%20photography&width=400&height=300&seq=route4&orientation=landscape"
                alt="Northern Europe"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold">Northern Europe</h3>
                <p className="text-white/80 text-sm">From $2,199</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#0A2540]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Set Sail?</h2>
          <p className="text-white/80 mb-8 text-lg">
            Contact our cruise specialists today and let us help you plan the perfect ocean adventure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+12136310859"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#0A2540] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-phone-line"></i>
              Call 213-631-0859
            </a>
            <button className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors cursor-pointer whitespace-nowrap">
              <i className="ri-mail-line"></i>
              Request Quote
            </button>
          </div>
        </div>
      </section>

      <Footer />

      {/* Cruise Detail Modal */}
      {selectedCruise && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative h-72">
              <img
                src={selectedCruise.image}
                alt={selectedCruise.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedCruise(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <i className="ri-close-line text-xl text-gray-700"></i>
              </button>
              <div className="absolute bottom-4 left-4 bg-white/95 px-4 py-2 rounded-lg">
                <span className="font-semibold text-[#0A2540]">{selectedCruise.cruiseLine}</span>
              </div>
            </div>

            <div className="p-8">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-[#0A2540] mb-2">{selectedCruise.name}</h2>
                  <div className="flex items-center gap-4 text-gray-600">
                    <span className="flex items-center gap-1">
                      <i className="ri-ship-line"></i>
                      {selectedCruise.ship}
                    </span>
                    <span className="flex items-center gap-1">
                      <i className="ri-time-line"></i>
                      {selectedCruise.duration}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {renderStars(selectedCruise.rating)}
                  <span className="text-gray-600 ml-2">
                    {selectedCruise.rating} ({selectedCruise.reviews.toLocaleString()} reviews)
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="font-semibold text-[#0A2540] mb-3">Cruise Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <i className="ri-map-pin-line text-[#1990FF]"></i>
                      <span className="text-gray-700">Destination: {selectedCruise.destination}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <i className="ri-anchor-line text-[#1990FF]"></i>
                      <span className="text-gray-700">Departure: {selectedCruise.departurePort}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <i className="ri-calendar-line text-[#1990FF]"></i>
                      <span className="text-gray-700">Date: {selectedCruise.departureDate}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-[#0A2540] mb-3">Included</h3>
                  <div className="space-y-2">
                    {selectedCruise.inclusions.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <i className="ri-check-line text-green-500"></i>
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="font-semibold text-[#0A2540] mb-3">Select Cabin Type</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {selectedCruise.cabinTypes.map((cabin) => (
                    <button
                      key={cabin.type}
                      onClick={() => setSelectedCabinType(cabin.type)}
                      className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                        selectedCabinType === cabin.type
                          ? 'border-[#1990FF] bg-[#1990FF]/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-medium text-[#0A2540]">{cabin.type}</div>
                      <div className="text-lg font-bold text-[#1990FF]">${cabin.price.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">per person</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-100">
                <div>
                  <span className="text-gray-500">Starting from</span>
                  <div className="text-3xl font-bold text-[#0A2540]">
                    ${selectedCruise.priceFrom.toLocaleString()}
                    <span className="text-base font-normal text-gray-500">/person</span>
                  </div>
                </div>
                <button className="w-full sm:w-auto bg-[#0A2540] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#0A2540]/90 transition-colors cursor-pointer whitespace-nowrap">
                  Book This Cruise
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
