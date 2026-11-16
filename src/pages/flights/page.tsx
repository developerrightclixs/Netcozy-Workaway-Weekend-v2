
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';

interface Flight {
  id: number;
  airline: string;
  airlineLogo: string;
  departure: string;
  departureCode: string;
  arrival: string;
  arrivalCode: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: number;
  price: number;
  class: string;
  aircraft: string;
}

const flights: Flight[] = [
  {
    id: 1,
    airline: 'Delta Airlines',
    airlineLogo: 'https://readdy.ai/api/search-image?query=Delta%20Airlines%20logo%20minimalist%20clean%20design%20on%20white%20background%20professional%20aviation%20branding%20simple%20elegant%20corporate%20identity&width=120&height=60&seq=flight1&orientation=landscape',
    departure: 'Los Angeles',
    departureCode: 'LAX',
    arrival: 'New York',
    arrivalCode: 'JFK',
    departureTime: '08:00 AM',
    arrivalTime: '04:30 PM',
    duration: '5h 30m',
    stops: 0,
    price: 299,
    class: 'Economy',
    aircraft: 'Boeing 737-800'
  },
  {
    id: 2,
    airline: 'United Airlines',
    airlineLogo: 'https://readdy.ai/api/search-image?query=United%20Airlines%20logo%20minimalist%20clean%20design%20on%20white%20background%20professional%20aviation%20branding%20simple%20elegant%20corporate%20identity&width=120&height=60&seq=flight2&orientation=landscape',
    departure: 'San Francisco',
    departureCode: 'SFO',
    arrival: 'Miami',
    arrivalCode: 'MIA',
    departureTime: '10:15 AM',
    arrivalTime: '06:45 PM',
    duration: '5h 30m',
    stops: 0,
    price: 349,
    class: 'Economy',
    aircraft: 'Airbus A320'
  },
  {
    id: 3,
    airline: 'American Airlines',
    airlineLogo: 'https://readdy.ai/api/search-image?query=American%20Airlines%20logo%20minimalist%20clean%20design%20on%20white%20background%20professional%20aviation%20branding%20simple%20elegant%20corporate%20identity&width=120&height=60&seq=flight3&orientation=landscape',
    departure: 'Chicago',
    departureCode: 'ORD',
    arrival: 'Las Vegas',
    arrivalCode: 'LAS',
    departureTime: '02:00 PM',
    arrivalTime: '04:15 PM',
    duration: '4h 15m',
    stops: 0,
    price: 189,
    class: 'Economy',
    aircraft: 'Boeing 787'
  },
  {
    id: 4,
    airline: 'Southwest Airlines',
    airlineLogo: 'https://readdy.ai/api/search-image?query=Southwest%20Airlines%20logo%20minimalist%20clean%20design%20on%20white%20background%20professional%20aviation%20branding%20simple%20elegant%20corporate%20identity&width=120&height=60&seq=flight4&orientation=landscape',
    departure: 'Dallas',
    departureCode: 'DFW',
    arrival: 'Denver',
    arrivalCode: 'DEN',
    departureTime: '06:30 AM',
    arrivalTime: '08:00 AM',
    duration: '2h 30m',
    stops: 0,
    price: 129,
    class: 'Economy',
    aircraft: 'Boeing 737 MAX'
  },
  {
    id: 5,
    airline: 'JetBlue Airways',
    airlineLogo: 'https://readdy.ai/api/search-image?query=JetBlue%20Airways%20logo%20minimalist%20clean%20design%20on%20white%20background%20professional%20aviation%20branding%20simple%20elegant%20corporate%20identity&width=120&height=60&seq=flight5&orientation=landscape',
    departure: 'Boston',
    departureCode: 'BOS',
    arrival: 'Los Angeles',
    arrivalCode: 'LAX',
    departureTime: '11:00 AM',
    arrivalTime: '02:30 PM',
    duration: '6h 30m',
    stops: 0,
    price: 279,
    class: 'Economy',
    aircraft: 'Airbus A321'
  },
  {
    id: 6,
    airline: 'Alaska Airlines',
    airlineLogo: 'https://readdy.ai/api/search-image?query=Alaska%20Airlines%20logo%20minimalist%20clean%20design%20on%20white%20background%20professional%20aviation%20branding%20simple%20elegant%20corporate%20identity&width=120&height=60&seq=flight6&orientation=landscape',
    departure: 'Seattle',
    departureCode: 'SEA',
    arrival: 'Phoenix',
    arrivalCode: 'PHX',
    departureTime: '09:45 AM',
    arrivalTime: '01:00 PM',
    duration: '3h 15m',
    stops: 0,
    price: 159,
    class: 'Economy',
    aircraft: 'Boeing 737-900'
  }
];

const popularRoutes = [
  { from: 'Los Angeles', to: 'New York', price: 199, image: 'https://readdy.ai/api/search-image?query=New%20York%20City%20skyline%20aerial%20view%20at%20sunset%20with%20Empire%20State%20Building%20and%20Manhattan%20skyscrapers%20beautiful%20golden%20hour%20lighting%20professional%20travel%20photography&width=400&height=300&seq=route1&orientation=landscape' },
  { from: 'San Francisco', to: 'Tokyo', price: 599, image: 'https://readdy.ai/api/search-image?query=Tokyo%20Japan%20cityscape%20at%20night%20with%20Tokyo%20Tower%20illuminated%20neon%20lights%20modern%20urban%20skyline%20professional%20travel%20photography&width=400&height=300&seq=route2&orientation=landscape' },
  { from: 'Miami', to: 'London', price: 449, image: 'https://readdy.ai/api/search-image?query=London%20England%20Big%20Ben%20and%20Westminster%20Bridge%20at%20twilight%20Thames%20River%20beautiful%20evening%20sky%20professional%20travel%20photography&width=400&height=300&seq=route3&orientation=landscape' },
  { from: 'Chicago', to: 'Paris', price: 529, image: 'https://readdy.ai/api/search-image?query=Paris%20France%20Eiffel%20Tower%20at%20golden%20hour%20with%20beautiful%20sky%20romantic%20cityscape%20professional%20travel%20photography&width=400&height=300&seq=route4&orientation=landscape' }
];

export default function FlightsPage() {
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [departDate, setDepartDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState('1');
  const [tripType, setTripType] = useState('roundtrip');
  const [selectedClass, setSelectedClass] = useState('economy');
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-20">
        <div className="absolute inset-0 h-[500px]">
          <img
            src="https://readdy.ai/api/search-image?query=Airplane%20wing%20view%20from%20window%20at%20sunset%20with%20beautiful%20orange%20and%20pink%20clouds%20below%20stunning%20aerial%20photography%20commercial%20aviation%20travel%20concept%20professional%20high%20quality%20image&width=1920&height=500&seq=flighthero&orientation=landscape"
            alt="Flight Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-32">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Find Your Perfect Flight
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Compare prices from hundreds of airlines and book the best deals on airfare
            </p>
          </div>

          {/* Search Box */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            {/* Trip Type */}
            <div className="flex items-center gap-6 mb-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="tripType"
                  value="roundtrip"
                  checked={tripType === 'roundtrip'}
                  onChange={(e) => setTripType(e.target.value)}
                  className="w-4 h-4 text-[#1990FF]"
                />
                <span className="text-gray-700 font-medium">Round Trip</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="tripType"
                  value="oneway"
                  checked={tripType === 'oneway'}
                  onChange={(e) => setTripType(e.target.value)}
                  className="w-4 h-4 text-[#1990FF]"
                />
                <span className="text-gray-700 font-medium">One Way</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="tripType"
                  value="multicity"
                  checked={tripType === 'multicity'}
                  onChange={(e) => setTripType(e.target.value)}
                  className="w-4 h-4 text-[#1990FF]"
                />
                <span className="text-gray-700 font-medium">Multi-City</span>
              </label>
            </div>

            {/* Search Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-600 mb-2">From</label>
                <div className="relative">
                  <i className="ri-flight-takeoff-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                  <input
                    type="text"
                    placeholder="City or Airport"
                    value={fromCity}
                    onChange={(e) => setFromCity(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1990FF] focus:border-transparent text-sm"
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-600 mb-2">To</label>
                <div className="relative">
                  <i className="ri-flight-land-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                  <input
                    type="text"
                    placeholder="City or Airport"
                    value={toCity}
                    onChange={(e) => setToCity(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1990FF] focus:border-transparent text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Depart</label>
                <div className="relative">
                  <i className="ri-calendar-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                  <input
                    type="date"
                    value={departDate}
                    onChange={(e) => setDepartDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1990FF] focus:border-transparent text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Return</label>
                <div className="relative">
                  <i className="ri-calendar-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    disabled={tripType === 'oneway'}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1990FF] focus:border-transparent text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Passengers</label>
                <div className="relative">
                  <i className="ri-user-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                  <select
                    value={passengers}
                    onChange={(e) => setPassengers(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1990FF] focus:border-transparent text-sm appearance-none cursor-pointer"
                  >
                    <option value="1">1 Passenger</option>
                    <option value="2">2 Passengers</option>
                    <option value="3">3 Passengers</option>
                    <option value="4">4 Passengers</option>
                    <option value="5">5+ Passengers</option>
                  </select>
                  <i className="ri-arrow-down-s-line absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                </div>
              </div>
            </div>

            {/* Class Selection & Search Button */}
            <div className="flex flex-col md:flex-row items-center justify-between mt-6 gap-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-600">Class:</span>
                <div className="flex items-center gap-2">
                  {['economy', 'premium', 'business', 'first'].map((cls) => (
                    <button
                      key={cls}
                      onClick={() => setSelectedClass(cls)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                        selectedClass === cls
                          ? 'bg-[#1990FF] text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {cls.charAt(0).toUpperCase() + cls.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <button className="w-full md:w-auto px-8 py-3 bg-[#0A2540] text-white rounded-lg font-semibold hover:bg-[#0A2540]/90 transition-colors flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer">
                <i className="ri-search-line"></i>
                Search Flights
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Available Flights */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Available Flights</h2>
              <p className="text-gray-600">Best deals on domestic flights</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1990FF] cursor-pointer">
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Duration: Shortest</option>
                <option>Departure: Earliest</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            {flights.map((flight) => (
              <div
                key={flight.id}
                className={`bg-white border rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer ${
                  selectedFlight?.id === flight.id ? 'border-[#1990FF] shadow-lg' : 'border-gray-200'
                }`}
                onClick={() => setSelectedFlight(flight)}
              >
                <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                  {/* Airline Info */}
                  <div className="flex items-center gap-4 w-full lg:w-auto">
                    <div className="w-16 h-10 flex items-center justify-center">
                      <img
                        src={flight.airlineLogo}
                        alt={flight.airline}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{flight.airline}</p>
                      <p className="text-sm text-gray-500">{flight.aircraft}</p>
                    </div>
                  </div>

                  {/* Flight Details */}
                  <div className="flex items-center gap-8 flex-1 justify-center">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900">{flight.departureTime}</p>
                      <p className="text-sm text-gray-600">{flight.departureCode}</p>
                      <p className="text-xs text-gray-500">{flight.departure}</p>
                    </div>

                    <div className="flex flex-col items-center">
                      <p className="text-sm text-gray-500 mb-1">{flight.duration}</p>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#1990FF]"></div>
                        <div className="w-24 h-0.5 bg-gray-300 relative">
                          <i className="ri-plane-line absolute -top-2 left-1/2 -translate-x-1/2 text-[#1990FF]"></i>
                        </div>
                        <div className="w-2 h-2 rounded-full bg-[#1990FF]"></div>
                      </div>
                      <p className="text-xs text-green-600 mt-1">
                        {flight.stops === 0 ? 'Non-stop' : `${flight.stops} stop(s)`}
                      </p>
                    </div>

                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900">{flight.arrivalTime}</p>
                      <p className="text-sm text-gray-600">{flight.arrivalCode}</p>
                      <p className="text-xs text-gray-500">{flight.arrival}</p>
                    </div>
                  </div>

                  {/* Price & Book */}
                  <div className="flex items-center gap-6 w-full lg:w-auto justify-between lg:justify-end">
                    <div className="text-right">
                      <p className="text-sm text-gray-500">{flight.class}</p>
                      <p className="text-3xl font-bold text-[#1990FF]">${flight.price}</p>
                      <p className="text-xs text-gray-500">per person</p>
                    </div>
                    <button className="px-6 py-3 bg-[#0A2540] text-white rounded-lg font-semibold hover:bg-[#0A2540]/90 transition-colors whitespace-nowrap cursor-pointer">
                      Select
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Routes */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Routes</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our most booked flight routes with exclusive deals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularRoutes.map((route, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={route.image}
                    alt={route.to}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white font-semibold text-lg">{route.to}</p>
                    <p className="text-white/80 text-sm">from {route.from}</p>
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Starting from</p>
                    <p className="text-2xl font-bold text-[#1990FF]">${route.price}</p>
                  </div>
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-[#1990FF] hover:text-white transition-colors whitespace-nowrap cursor-pointer">
                    View Deals
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Book With Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience the best flight booking service with exclusive benefits
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#1990FF]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-price-tag-3-line text-3xl text-[#1990FF]"></i>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Best Price Guarantee</h3>
              <p className="text-gray-600 text-sm">
                Find a lower price? We&apos;ll match it and give you an extra 10% off
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#1990FF]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-calendar-check-line text-3xl text-[#1990FF]"></i>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Flexible Booking</h3>
              <p className="text-gray-600 text-sm">
                Change or cancel your flight with no hidden fees
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#1990FF]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-customer-service-2-line text-3xl text-[#1990FF]"></i>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">24/7 Support</h3>
              <p className="text-gray-600 text-sm">
                Our travel experts are available around the clock
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#1990FF]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-shield-check-line text-3xl text-[#1990FF]"></i>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Secure Payments</h3>
              <p className="text-gray-600 text-sm">
                Your payment information is always protected
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-[#0A2540]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-white mb-2">500+</p>
              <p className="text-white/70">Airlines Partners</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-white mb-2">10M+</p>
              <p className="text-white/70">Happy Travelers</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-white mb-2">200+</p>
              <p className="text-white/70">Destinations</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-white mb-2">98%</p>
              <p className="text-white/70">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Take Off?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Sign up for our newsletter and get exclusive flight deals delivered straight to your inbox
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1990FF] text-sm"
            />
            <button className="w-full sm:w-auto px-8 py-3 bg-[#1990FF] text-white rounded-lg font-semibold hover:bg-[#1990FF]/90 transition-colors whitespace-nowrap cursor-pointer">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
