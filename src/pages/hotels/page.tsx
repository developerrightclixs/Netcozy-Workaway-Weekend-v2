import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import ContactSection from '../../components/feature/ContactSection';

interface Hotel {
  id: string;
  name: string;
  image: string;
  location: string;
  rating: number;
  price: number;
  amenities: string[];
  description: string;
}

export default function HotelsPage() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [errorStatus, setErrorStatus] = useState('');
  const [destination, setDestination] = useState('New York');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [searchLoading, setSearchLoading] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);

  useEffect(() => {
    // Set default dates (today + 7 days for check-in, +8 days for check-out)
    const today = new Date();
    const checkInDate = new Date(today);
    checkInDate.setDate(today.getDate() + 7);
    const checkOutDate = new Date(today);
    checkOutDate.setDate(today.getDate() + 8);
    
    setCheckIn(checkInDate.toISOString().split('T')[0]);
    setCheckOut(checkOutDate.toISOString().split('T')[0]);
    
    // Load initial hotels
    searchHotels('New York', checkInDate.toISOString().split('T')[0], checkOutDate.toISOString().split('T')[0], 2);
  }, []);

  const searchHotels = async (dest: string, checkInDate: string, checkOutDate: string, guestCount: number) => {
    setSearchLoading(true);
    setError('');
    setErrorStatus('');
    
    try {
      const supabaseUrl = import.meta.env.VITE_PUBLIC_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY;

      const response = await fetch(`${supabaseUrl}/functions/v1/search-hotels`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseAnonKey}`
        },
        body: JSON.stringify({
          destination: dest,
          checkIn: checkInDate,
          checkOut: checkOutDate,
          adults: guestCount,
          children: 0
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorStatus(data.status || 'error');
        
        // Handle configuration/service errors gracefully without throwing
        if (data.status === 'configuration_pending' || data.status === 'auth_error' || data.status === 'service_error') {
          setError(data.suggestion || data.error || 'Service temporarily unavailable');
          setHotels([]);
          return;
        }
        
        // For other errors, throw to be caught below
        throw new Error(data.suggestion || data.error || 'Failed to search hotels');
      }

      if (!data.hotels || data.hotels.length === 0) {
        setHotels([]);
        setError(data.message || `No hotels available in ${dest} for the selected dates. Try different dates or another destination.`);
        setErrorStatus('no_results');
        return;
      }

      const parsedHotels: Hotel[] = data.hotels.map((hotel: any) => ({
        id: hotel.id,
        name: hotel.name,
        image: hotel.image,
        location: hotel.address || dest,
        rating: hotel.rating || 4.0,
        price: Math.round(hotel.price),
        amenities: hotel.amenities || ['WiFi', 'Air Conditioning', 'Room Service'],
        description: hotel.description || `Experience comfort at ${hotel.name}`
      }));

      setHotels(parsedHotels);
      
    } catch (err: any) {
      console.error('Hotel search error:', err);
      setError(err.message || 'Failed to load hotels. Please try again.');
      setHotels([]);
    } finally {
      setLoading(false);
      setSearchLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!destination || !checkIn || !checkOut) {
      setError('Please fill in all search fields');
      return;
    }

    setLoading(true);
    await searchHotels(destination, checkIn, checkOut, guests);
  };

  const handleViewDetails = (hotel: Hotel) => {
    setSelectedHotel(hotel);
  };

  const closeModal = () => {
    setSelectedHotel(null);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section with Search */}
      <section className="relative bg-gradient-to-br from-[#1990FF] to-[#0070E0] text-white pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">Find Your Perfect Stay</h1>
            <p className="text-xl text-blue-50">
              Discover amazing hotels worldwide with exclusive member rates
            </p>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-2xl p-6 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Destination
                </label>
                <div className="relative">
                  <i className="ri-map-pin-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="City or hotel name"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1990FF] focus:border-transparent text-sm text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Check-in
                </label>
                <div className="relative">
                  <i className="ri-calendar-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1990FF] focus:border-transparent text-sm text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Check-out
                </label>
                <div className="relative">
                  <i className="ri-calendar-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    min={checkIn}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1990FF] focus:border-transparent text-sm text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Guests
                </label>
                <div className="relative">
                  <i className="ri-user-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1990FF] focus:border-transparent text-sm text-gray-900 cursor-pointer"
                  >
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={searchLoading}
              className="w-full mt-6 bg-[#1990FF] text-white py-4 rounded-lg font-semibold hover:bg-[#0070E0] transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
            >
              {searchLoading ? (
                <>
                  <i className="ri-loader-4-line animate-spin mr-2"></i>
                  Searching...
                </>
              ) : (
                <>
                  <i className="ri-search-line mr-2"></i>
                  Search Hotels
                </>
              )}
            </button>
          </form>
        </div>
      </section>

      {/* Hotels Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          {error && (
            <div className={`mb-8 p-6 rounded-xl border ${
              errorStatus === 'configuration_pending' || errorStatus === 'auth_error' || errorStatus === 'service_error'
                ? 'bg-yellow-50 border-yellow-200'
                : 'bg-red-50 border-red-200'
            }`}>
              <div className="flex items-start gap-4">
                <i className={`${
                  errorStatus === 'configuration_pending' || errorStatus === 'auth_error' || errorStatus === 'service_error'
                    ? 'ri-information-line text-yellow-600'
                    : 'ri-error-warning-line text-red-600'
                } text-2xl flex-shrink-0 mt-1`}></i>
                <div className="flex-1">
                  <h3 className={`font-semibold mb-2 ${
                    errorStatus === 'configuration_pending' || errorStatus === 'auth_error' || errorStatus === 'service_error'
                      ? 'text-yellow-900'
                      : 'text-red-900'
                  }`}>
                    {errorStatus === 'configuration_pending' && 'Service Configuration in Progress'}
                    {errorStatus === 'auth_error' && 'Service Authentication Required'}
                    {errorStatus === 'service_error' && 'Temporary Service Issue'}
                    {errorStatus === 'no_results' && 'No Hotels Found'}
                    {!errorStatus && 'Search Error'}
                  </h3>
                  <p className={`text-sm leading-relaxed ${
                    errorStatus === 'configuration_pending' || errorStatus === 'auth_error' || errorStatus === 'service_error'
                      ? 'text-yellow-800'
                      : 'text-red-800'
                  }`}>
                    {error}
                  </p>
                  {(errorStatus === 'configuration_pending' || errorStatus === 'auth_error') && (
                    <div className="mt-4 p-4 bg-white rounded-lg border border-yellow-200">
                      <p className="text-sm text-gray-700 mb-3">
                        <strong>We're setting up partnerships with:</strong>
                      </p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li className="flex items-center gap-2">
                          <i className="ri-check-line text-green-600"></i>
                          Hotelbeds - Global hotel distribution platform
                        </li>
                        <li className="flex items-center gap-2">
                          <i className="ri-time-line text-gray-400"></i>
                          Hotels.com - Expedia Group partner
                        </li>
                        <li className="flex items-center gap-2">
                          <i className="ri-time-line text-gray-400"></i>
                          Booking.com - Worldwide accommodations
                        </li>
                      </ul>
                      <p className="text-xs text-gray-500 mt-3">
                        Contact support for priority access or assistance
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {loading ? (
            <div className="text-center py-20">
              <i className="ri-loader-4-line text-5xl text-[#1990FF] animate-spin"></i>
              <p className="text-gray-600 mt-4">Loading hotels...</p>
            </div>
          ) : hotels.length === 0 ? (
            <div className="text-center py-20">
              <i className="ri-hotel-line text-6xl text-gray-300 mb-4"></i>
              <p className="text-gray-600">No hotels found. Try a different search.</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900">
                  {hotels.length} Hotels in {destination}
                </h2>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <i className="ri-information-line"></i>
                  <span>Member exclusive rates available</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {hotels.map((hotel, index) => (
                  <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={hotel.image} 
                        alt={hotel.name}
                        className="w-full h-full object-cover object-top hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://readdy.ai/api/search-image?query=luxury%20hotel%20exterior%20architecture%2C%20professional%20hotel%20photography%2C%20modern%20hospitality%20design%2C%20simple%20clean%20background&width=400&height=300&seq=hotel-fallback-${index}&orientation=landscape`;
                        }}
                      />
                      <div className="absolute top-4 right-4 bg-white px-3 py-1.5 rounded-full shadow-lg">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <i key={i} className={`${i < Math.floor(hotel.rating) ? 'ri-star-fill text-yellow-400' : 'ri-star-line text-gray-300'} text-sm`}></i>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{hotel.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                        <i className="ri-map-pin-line"></i>
                        <span>{hotel.location}</span>
                      </div>

                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {hotel.description}
                      </p>

                      {hotel.amenities.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {hotel.amenities.slice(0, 3).map((amenity, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                            >
                              {amenity}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <div>
                          <p className="text-sm text-gray-600">From</p>
                          <p className="text-2xl font-bold text-[#1990FF]">
                            ${hotel.price}
                            <span className="text-sm text-gray-600 font-normal">/night</span>
                          </p>
                        </div>
                        <button 
                          onClick={() => handleViewDetails(hotel)}
                          className="bg-[#1990FF] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#0070E0] transition-colors whitespace-nowrap cursor-pointer"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Hotel Details Modal */}
      {selectedHotel && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              {/* Hotel Image */}
              <div className="relative h-80 overflow-hidden">
                <img 
                  src={selectedHotel.image} 
                  alt={selectedHotel.name}
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
                      <i key={i} className={`${i < Math.floor(selectedHotel.rating) ? 'ri-star-fill text-yellow-400' : 'ri-star-line text-gray-300'} text-lg`}></i>
                    ))}
                    <span className="ml-2 font-semibold text-gray-900">{selectedHotel.rating}</span>
                  </div>
                </div>
              </div>

              {/* Hotel Details */}
              <div className="p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedHotel.name}</h2>
                <div className="flex items-center gap-2 text-gray-600 mb-6">
                  <i className="ri-map-pin-line text-xl"></i>
                  <span className="text-lg">{selectedHotel.location}</span>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">About This Hotel</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {selectedHotel.description}
                  </p>
                </div>

                {/* Amenities */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Amenities</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {selectedHotel.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center gap-3 text-gray-700">
                        <i className="ri-check-line text-[#1990FF] text-xl"></i>
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Booking Info */}
                <div className="bg-gray-50 rounded-xl p-6 mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Check-in</p>
                      <p className="font-semibold text-gray-900">{checkIn}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Check-out</p>
                      <p className="font-semibold text-gray-900">{checkOut}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Guests</p>
                      <p className="font-semibold text-gray-900">{guests} {guests === 1 ? 'Guest' : 'Guests'}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Total Price</p>
                      <p className="text-3xl font-bold text-[#1990FF]">
                        ${selectedHotel.price}
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

                {/* Member Benefits */}
                <div className="bg-blue-50 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <i className="ri-vip-crown-line text-2xl text-[#1990FF]"></i>
                    <h3 className="text-lg font-bold text-gray-900">Member Benefits</h3>
                  </div>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center gap-2">
                      <i className="ri-check-line text-[#1990FF]"></i>
                      <span>Save up to 30% with member rates</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <i className="ri-check-line text-[#1990FF]"></i>
                      <span>Free room upgrade (subject to availability)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <i className="ri-check-line text-[#1990FF]"></i>
                      <span>Late checkout until 2 PM</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <i className="ri-check-line text-[#1990FF]"></i>
                      <span>Complimentary breakfast</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Member Benefits */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Member Exclusive Benefits</h2>
            <p className="text-gray-600">
              Join Netcozy and unlock special rates and perks at thousands of hotels
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-price-tag-3-line text-3xl text-[#1990FF]"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Exclusive Rates</h3>
              <p className="text-gray-600">
                Save up to 30% on hotel bookings with member-only pricing
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-vip-crown-line text-3xl text-[#1990FF]"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">VIP Treatment</h3>
              <p className="text-gray-600">
                Enjoy room upgrades, late checkout, and special amenities
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-customer-service-2-line text-3xl text-[#1990FF]"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">24/7 Support</h3>
              <p className="text-gray-600">
                Get help anytime with our dedicated concierge service
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              to="/pricing"
              className="inline-flex items-center gap-2 bg-[#1990FF] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#0070E0] transition-colors whitespace-nowrap cursor-pointer"
            >
              View Membership Plans
              <i className="ri-arrow-right-line"></i>
            </Link>
          </div>
        </div>
      </section>

      <ContactSection category="Hotels & Resorts" />

      <Footer />
    </div>
  );
}