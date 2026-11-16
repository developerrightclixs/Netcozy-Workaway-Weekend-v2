
import { useState } from 'react';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';

interface CarRental {
  id: number;
  name: string;
  category: string;
  image: string;
  seats: number;
  transmission: string;
  fuelType: string;
  luggage: number;
  pricePerDay: number;
  company: string;
  companyLogo: string;
  features: string[];
  rating: number;
  reviews: number;
}

const carRentals: CarRental[] = [
  {
    id: 1,
    name: 'Toyota Camry',
    category: 'Sedan',
    image: 'https://readdy.ai/api/search-image?query=A%20sleek%20silver%20Toyota%20Camry%20sedan%20parked%20in%20a%20clean%20modern%20parking%20lot%20with%20simple%20white%20background%2C%20professional%20car%20photography%2C%20side%20angle%20view%20showing%20the%20elegant%20body%20lines%20and%20chrome%20details%2C%20high%20quality%20automotive%20photography&width=400&height=250&seq=car1&orientation=landscape',
    seats: 5,
    transmission: 'Automatic',
    fuelType: 'Hybrid',
    luggage: 3,
    pricePerDay: 45,
    company: 'Hertz',
    companyLogo: 'https://readdy.ai/api/search-image?query=Hertz%20car%20rental%20company%20logo%20yellow%20and%20black%20simple%20clean%20design%20on%20white%20background%20minimalist%20corporate%20branding&width=80&height=40&seq=hertz1&orientation=landscape',
    features: ['GPS Navigation', 'Bluetooth', 'Backup Camera', 'Cruise Control'],
    rating: 4.8,
    reviews: 324
  },
  {
    id: 2,
    name: 'Ford Mustang',
    category: 'Sports',
    image: 'https://readdy.ai/api/search-image?query=A%20stunning%20red%20Ford%20Mustang%20sports%20car%20parked%20on%20clean%20asphalt%20with%20simple%20light%20gray%20background%2C%20professional%20automotive%20photography%2C%20dynamic%20angle%20showing%20muscular%20body%20design%20and%20aggressive%20front%20grille%2C%20high%20quality%20car%20photo&width=400&height=250&seq=car2&orientation=landscape',
    seats: 4,
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    luggage: 2,
    pricePerDay: 89,
    company: 'Enterprise',
    companyLogo: 'https://readdy.ai/api/search-image?query=Enterprise%20rent%20a%20car%20company%20logo%20green%20simple%20clean%20design%20on%20white%20background%20minimalist%20corporate%20branding&width=80&height=40&seq=enterprise1&orientation=landscape',
    features: ['Sport Mode', 'Premium Sound', 'Leather Seats', 'Apple CarPlay'],
    rating: 4.9,
    reviews: 256
  },
  {
    id: 3,
    name: 'Jeep Wrangler',
    category: 'SUV',
    image: 'https://readdy.ai/api/search-image?query=A%20rugged%20black%20Jeep%20Wrangler%20SUV%20parked%20outdoors%20with%20simple%20clean%20background%2C%20professional%20automotive%20photography%2C%20three%20quarter%20front%20view%20showing%20iconic%20grille%20and%20removable%20top%2C%20adventure%20vehicle%20photography&width=400&height=250&seq=car3&orientation=landscape',
    seats: 5,
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    luggage: 4,
    pricePerDay: 75,
    company: 'Avis',
    companyLogo: 'https://readdy.ai/api/search-image?query=Avis%20car%20rental%20company%20logo%20red%20simple%20clean%20design%20on%20white%20background%20minimalist%20corporate%20branding&width=80&height=40&seq=avis1&orientation=landscape',
    features: ['4x4 Drive', 'Removable Top', 'All-Terrain Tires', 'Tow Package'],
    rating: 4.7,
    reviews: 412
  },
  {
    id: 4,
    name: 'Mercedes-Benz E-Class',
    category: 'Luxury',
    image: 'https://readdy.ai/api/search-image?query=An%20elegant%20black%20Mercedes%20Benz%20E%20Class%20luxury%20sedan%20parked%20in%20upscale%20setting%20with%20clean%20simple%20background%2C%20professional%20automotive%20photography%2C%20sophisticated%20angle%20showing%20premium%20design%20and%20chrome%20accents%2C%20luxury%20car%20photography&width=400&height=250&seq=car4&orientation=landscape',
    seats: 5,
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    luggage: 3,
    pricePerDay: 129,
    company: 'National',
    companyLogo: 'https://readdy.ai/api/search-image?query=National%20car%20rental%20company%20logo%20green%20simple%20clean%20design%20on%20white%20background%20minimalist%20corporate%20branding&width=80&height=40&seq=national1&orientation=landscape',
    features: ['Heated Seats', 'Panoramic Roof', 'Premium Audio', 'Driver Assist'],
    rating: 4.9,
    reviews: 189
  },
  {
    id: 5,
    name: 'Honda CR-V',
    category: 'SUV',
    image: 'https://readdy.ai/api/search-image?query=A%20modern%20white%20Honda%20CRV%20compact%20SUV%20parked%20with%20clean%20simple%20background%2C%20professional%20automotive%20photography%2C%20family%20friendly%20vehicle%20showing%20spacious%20design%20and%20modern%20styling%2C%20high%20quality%20car%20photo&width=400&height=250&seq=car5&orientation=landscape',
    seats: 5,
    transmission: 'Automatic',
    fuelType: 'Hybrid',
    luggage: 4,
    pricePerDay: 55,
    company: 'Budget',
    companyLogo: 'https://readdy.ai/api/search-image?query=Budget%20car%20rental%20company%20logo%20orange%20simple%20clean%20design%20on%20white%20background%20minimalist%20corporate%20branding&width=80&height=40&seq=budget1&orientation=landscape',
    features: ['Lane Assist', 'Adaptive Cruise', 'Wireless Charging', 'Cargo Space'],
    rating: 4.6,
    reviews: 567
  },
  {
    id: 6,
    name: 'Chevrolet Suburban',
    category: 'Full-Size SUV',
    image: 'https://readdy.ai/api/search-image?query=A%20large%20black%20Chevrolet%20Suburban%20full%20size%20SUV%20parked%20with%20clean%20simple%20background%2C%20professional%20automotive%20photography%2C%20impressive%20size%20and%20commanding%20presence%2C%20family%20and%20group%20vehicle%20photography&width=400&height=250&seq=car6&orientation=landscape',
    seats: 8,
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    luggage: 6,
    pricePerDay: 99,
    company: 'Hertz',
    companyLogo: 'https://readdy.ai/api/search-image?query=Hertz%20car%20rental%20company%20logo%20yellow%20and%20black%20simple%20clean%20design%20on%20white%20background%20minimalist%20corporate%20branding&width=80&height=40&seq=hertz2&orientation=landscape',
    features: ['Third Row Seating', 'Entertainment System', 'Power Liftgate', 'Towing'],
    rating: 4.7,
    reviews: 298
  }
];

const categories = ['All', 'Sedan', 'SUV', 'Sports', 'Luxury', 'Full-Size SUV'];

export default function CarRentalsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [dropoffDate, setDropoffDate] = useState('');
  const [selectedCar, setSelectedCar] = useState<CarRental | null>(null);

  const filteredCars = selectedCategory === 'All' 
    ? carRentals 
    : carRentals.filter(car => car.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-20">
        <div className="absolute inset-0 h-[500px]">
          <img
            src="https://readdy.ai/api/search-image?query=A%20scenic%20highway%20road%20stretching%20into%20beautiful%20mountains%20with%20sunset%20golden%20hour%20lighting%2C%20travel%20and%20adventure%20concept%2C%20cinematic%20wide%20angle%20photography%2C%20warm%20orange%20and%20teal%20color%20tones%2C%20professional%20landscape%20photography%20with%20motion%20blur%20effect&width=1920&height=500&seq=carhero1&orientation=landscape"
            alt="Car Rentals Hero"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-32">
          <div className="text-center text-white mb-12">
            <h1 className="text-5xl font-bold mb-4">Find Your Perfect Ride</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Explore our wide selection of vehicles for every journey. From economy to luxury, we have the perfect car for you.
            </p>
          </div>

          {/* Search Form */}
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pick-up Location</label>
                <div className="relative">
                  <i className="ri-map-pin-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                  <input
                    type="text"
                    placeholder="City or Airport"
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1990FF] focus:border-transparent text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Drop-off Location</label>
                <div className="relative">
                  <i className="ri-map-pin-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                  <input
                    type="text"
                    placeholder="Same as pick-up"
                    value={dropoffLocation}
                    onChange={(e) => setDropoffLocation(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1990FF] focus:border-transparent text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pick-up Date</label>
                <div className="relative">
                  <i className="ri-calendar-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                  <input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1990FF] focus:border-transparent text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Drop-off Date</label>
                <div className="relative">
                  <i className="ri-calendar-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                  <input
                    type="date"
                    value={dropoffDate}
                    onChange={(e) => setDropoffDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1990FF] focus:border-transparent text-sm"
                  />
                </div>
              </div>
            </div>
            <button className="w-full bg-[#0A2540] text-white py-3 rounded-lg font-semibold hover:bg-[#0A2540]/90 transition-colors cursor-pointer whitespace-nowrap">
              <i className="ri-search-line mr-2"></i>
              Search Available Cars
            </button>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="max-w-7xl mx-auto px-6 -mt-8 relative z-20">
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === category
                  ? 'bg-[#0A2540] text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Car Listings */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            {selectedCategory === 'All' ? 'All Vehicles' : selectedCategory} 
            <span className="text-gray-500 font-normal ml-2">({filteredCars.length} available)</span>
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Sort by:</span>
            <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#1990FF] cursor-pointer">
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Rating</option>
              <option>Most Popular</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <div
              key={car.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-full object-cover object-center"
                />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700">
                  {car.category}
                </span>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">{car.name}</h3>
                    <p className="text-sm text-gray-500">by {car.company}</p>
                  </div>
                  <div className="flex items-center gap-1 text-amber-500">
                    <i className="ri-star-fill text-sm"></i>
                    <span className="text-sm font-medium text-gray-700">{car.rating}</span>
                    <span className="text-xs text-gray-400">({car.reviews})</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <i className="ri-user-line"></i>
                    <span>{car.seats}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <i className="ri-settings-3-line"></i>
                    <span>{car.transmission}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <i className="ri-gas-station-line"></i>
                    <span>{car.fuelType}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <i className="ri-luggage-cart-line"></i>
                    <span>{car.luggage}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {car.features.slice(0, 3).map((feature, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <span className="text-2xl font-bold text-[#0A2540]">${car.pricePerDay}</span>
                    <span className="text-sm text-gray-500">/day</span>
                  </div>
                  <button
                    onClick={() => setSelectedCar(car)}
                    className="bg-[#0A2540] text-white px-5 py-2 rounded-lg font-medium hover:bg-[#0A2540]/90 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Rent With Us */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Rent With Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience hassle-free car rentals with our premium service and unbeatable benefits
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#0A2540]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <i className="ri-price-tag-3-line text-3xl text-[#0A2540]"></i>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Best Price Guarantee</h3>
              <p className="text-sm text-gray-600">
                Find a lower price? We will match it and give you an extra 10% off
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#0A2540]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <i className="ri-shield-check-line text-3xl text-[#0A2540]"></i>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Full Insurance Coverage</h3>
              <p className="text-sm text-gray-600">
                Drive with peace of mind with our comprehensive insurance options
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#0A2540]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <i className="ri-customer-service-2-line text-3xl text-[#0A2540]"></i>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">24/7 Support</h3>
              <p className="text-sm text-gray-600">
                Our dedicated team is available around the clock to assist you
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#0A2540]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <i className="ri-map-pin-line text-3xl text-[#0A2540]"></i>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Flexible Locations</h3>
              <p className="text-sm text-gray-600">
                Pick up and drop off at 500+ locations worldwide
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Popular Rental Destinations</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { city: 'Los Angeles', image: 'https://readdy.ai/api/search-image?query=Los%20Angeles%20city%20skyline%20with%20palm%20trees%20and%20sunny%20weather%2C%20travel%20destination%20photography%2C%20warm%20golden%20hour%20lighting%2C%20iconic%20LA%20cityscape%20with%20mountains%20in%20background&width=300&height=200&seq=dest1&orientation=landscape' },
            { city: 'Miami', image: 'https://readdy.ai/api/search-image?query=Miami%20Beach%20oceanfront%20with%20art%20deco%20buildings%20and%20palm%20trees%2C%20vibrant%20travel%20destination%20photography%2C%20turquoise%20water%20and%20sunny%20skies%2C%20iconic%20South%20Beach%20scene&width=300&height=200&seq=dest2&orientation=landscape' },
            { city: 'Las Vegas', image: 'https://readdy.ai/api/search-image?query=Las%20Vegas%20strip%20at%20dusk%20with%20neon%20lights%20and%20famous%20hotels%2C%20travel%20destination%20photography%2C%20vibrant%20entertainment%20city%2C%20iconic%20Vegas%20skyline&width=300&height=200&seq=dest3&orientation=landscape' },
            { city: 'San Francisco', image: 'https://readdy.ai/api/search-image?query=San%20Francisco%20Golden%20Gate%20Bridge%20with%20city%20skyline%2C%20travel%20destination%20photography%2C%20iconic%20red%20bridge%20with%20fog%2C%20beautiful%20bay%20area%20scenery&width=300&height=200&seq=dest4&orientation=landscape' }
          ].map((dest, index) => (
            <div key={index} className="relative rounded-xl overflow-hidden group cursor-pointer">
              <div className="h-40">
                <img
                  src={dest.image}
                  alt={dest.city}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <h3 className="text-white font-semibold text-lg">{dest.city}</h3>
                <p className="text-white/80 text-sm">From $29/day</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#0A2540] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-white/70">Locations Worldwide</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">50K+</div>
              <div className="text-white/70">Vehicles Available</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">2M+</div>
              <div className="text-white/70">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">4.8</div>
              <div className="text-white/70">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Car Detail Modal */}
      {selectedCar && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative h-64">
              <img
                src={selectedCar.image}
                alt={selectedCar.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedCar(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="bg-[#0A2540]/10 text-[#0A2540] px-3 py-1 rounded-full text-sm font-medium">
                    {selectedCar.category}
                  </span>
                  <h2 className="text-2xl font-bold text-gray-900 mt-2">{selectedCar.name}</h2>
                  <p className="text-gray-500">Provided by {selectedCar.company}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-amber-500 mb-1">
                    <i className="ri-star-fill"></i>
                    <span className="font-semibold text-gray-900">{selectedCar.rating}</span>
                    <span className="text-gray-400 text-sm">({selectedCar.reviews} reviews)</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
                <div className="text-center">
                  <i className="ri-user-line text-2xl text-[#0A2540] mb-1"></i>
                  <p className="text-sm text-gray-600">{selectedCar.seats} Seats</p>
                </div>
                <div className="text-center">
                  <i className="ri-settings-3-line text-2xl text-[#0A2540] mb-1"></i>
                  <p className="text-sm text-gray-600">{selectedCar.transmission}</p>
                </div>
                <div className="text-center">
                  <i className="ri-gas-station-line text-2xl text-[#0A2540] mb-1"></i>
                  <p className="text-sm text-gray-600">{selectedCar.fuelType}</p>
                </div>
                <div className="text-center">
                  <i className="ri-luggage-cart-line text-2xl text-[#0A2540] mb-1"></i>
                  <p className="text-sm text-gray-600">{selectedCar.luggage} Bags</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Features Included</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCar.features.map((feature, index) => (
                    <span
                      key={index}
                      className="flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm"
                    >
                      <i className="ri-check-line"></i>
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div>
                  <span className="text-3xl font-bold text-[#0A2540]">${selectedCar.pricePerDay}</span>
                  <span className="text-gray-500">/day</span>
                  <p className="text-sm text-gray-400">Taxes & fees included</p>
                </div>
                <button className="bg-[#0A2540] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#0A2540]/90 transition-colors cursor-pointer whitespace-nowrap">
                  Reserve Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
