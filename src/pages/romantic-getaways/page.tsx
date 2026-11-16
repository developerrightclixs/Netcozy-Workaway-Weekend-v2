import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';

interface RomanticDestination {
  id: string;
  name: string;
  image: string;
  location: string;
  rating: number;
  price: number;
  features: string[];
  description: string;
  bestFor: string;
}

const romanticDestinations: RomanticDestination[] = [
  {
    id: '1',
    name: 'Overwater Bungalow Paradise',
    image: 'https://readdy.ai/api/search-image?query=luxury%20overwater%20bungalow%20in%20Maldives%20with%20crystal%20clear%20turquoise%20water%2C%20romantic%20sunset%20view%2C%20private%20deck%20with%20infinity%20pool%2C%20tropical%20paradise%20for%20couples%2C%20honeymoon%20destination%2C%20professional%20photography&width=400&height=300&seq=rom1&orientation=landscape',
    location: 'Maldives',
    rating: 4.9,
    price: 899,
    features: ['Private Pool', 'Sunset Dinner', 'Spa for Two', 'Snorkeling'],
    description: 'Experience ultimate romance in a private overwater villa with glass floor panels, direct ocean access, and breathtaking sunset views.',
    bestFor: 'Honeymoons'
  },
  {
    id: '2',
    name: 'Tuscan Villa Retreat',
    image: 'https://readdy.ai/api/search-image?query=romantic%20Tuscan%20villa%20with%20vineyard%20views%2C%20Italian%20countryside%2C%20terracotta%20roof%2C%20cypress%20trees%2C%20golden%20sunset%20light%2C%20couple%20dining%20on%20terrace%2C%20rustic%20elegance%2C%20professional%20photography&width=400&height=300&seq=rom2&orientation=landscape',
    location: 'Tuscany, Italy',
    rating: 4.8,
    price: 649,
    features: ['Wine Tasting', 'Cooking Class', 'Private Chef', 'Vineyard Tour'],
    description: 'Escape to a charming Tuscan villa surrounded by rolling vineyards, olive groves, and centuries of Italian romance.',
    bestFor: 'Anniversaries'
  },
  {
    id: '3',
    name: 'Santorini Cliffside Suite',
    image: 'https://readdy.ai/api/search-image?query=romantic%20Santorini%20hotel%20suite%20with%20white%20architecture%2C%20blue%20domed%20church%20view%2C%20private%20terrace%20overlooking%20caldera%2C%20sunset%20colors%2C%20couple%20enjoying%20champagne%2C%20Greek%20island%20paradise%2C%20professional%20photography&width=400&height=300&seq=rom3&orientation=landscape',
    location: 'Santorini, Greece',
    rating: 4.9,
    price: 749,
    features: ['Caldera View', 'Private Jacuzzi', 'Sunset Cruise', 'Wine Tour'],
    description: 'Wake up to stunning caldera views in a whitewashed cave suite, where every moment feels like a dream.',
    bestFor: 'Proposals'
  },
  {
    id: '4',
    name: 'Parisian Love Escape',
    image: 'https://readdy.ai/api/search-image?query=romantic%20Paris%20hotel%20room%20with%20Eiffel%20Tower%20view%20through%20window%2C%20elegant%20French%20interior%2C%20champagne%20and%20roses%2C%20soft%20lighting%2C%20couple%20silhouette%2C%20city%20of%20love%20atmosphere%2C%20professional%20photography&width=400&height=300&seq=rom4&orientation=landscape',
    location: 'Paris, France',
    rating: 4.8,
    price: 599,
    features: ['Eiffel View', 'Seine Cruise', 'Michelin Dining', 'Louvre Tour'],
    description: 'Fall in love again in the City of Lights with stunning Eiffel Tower views and world-class French cuisine.',
    bestFor: 'Romantic Escapes'
  },
  {
    id: '5',
    name: 'Bali Jungle Hideaway',
    image: 'https://readdy.ai/api/search-image?query=romantic%20Bali%20jungle%20villa%20with%20infinity%20pool%20overlooking%20rice%20terraces%2C%20tropical%20flowers%2C%20couple%20relaxing%2C%20Ubud%20forest%20setting%2C%20luxury%20bamboo%20architecture%2C%20serene%20atmosphere%2C%20professional%20photography&width=400&height=300&seq=rom5&orientation=landscape',
    location: 'Ubud, Bali',
    rating: 4.7,
    price: 549,
    features: ['Couples Spa', 'Yoga Sessions', 'Waterfall Tour', 'Temple Visit'],
    description: 'Reconnect with your partner in a secluded jungle villa with private pool and traditional Balinese wellness rituals.',
    bestFor: 'Wellness Retreats'
  },
  {
    id: '6',
    name: 'Caribbean Beach Romance',
    image: 'https://readdy.ai/api/search-image?query=romantic%20Caribbean%20beach%20resort%20with%20white%20sand%2C%20turquoise%20water%2C%20couple%20walking%20at%20sunset%2C%20palm%20trees%2C%20private%20cabana%2C%20tropical%20paradise%2C%20honeymoon%20setting%2C%20professional%20photography&width=400&height=300&seq=rom6&orientation=landscape',
    location: 'St. Lucia',
    rating: 4.9,
    price: 799,
    features: ['Beach Butler', 'Catamaran Sail', 'Couples Massage', 'Private Dining'],
    description: 'Discover paradise on pristine Caribbean beaches with the iconic Pitons as your backdrop for unforgettable moments.',
    bestFor: 'Beach Lovers'
  }
];

const romanticExperiences = [
  {
    icon: 'ri-heart-2-line',
    title: 'Candlelit Dinners',
    description: 'Private dining experiences under the stars'
  },
  {
    icon: 'ri-spa-line',
    title: 'Couples Spa',
    description: 'Relaxing treatments designed for two'
  },
  {
    icon: 'ri-sailboat-line',
    title: 'Sunset Cruises',
    description: 'Romantic voyages with champagne'
  },
  {
    icon: 'ri-camera-line',
    title: 'Photo Sessions',
    description: 'Professional couple photography'
  }
];

export default function RomanticGetawaysPage() {
  const [selectedDestination, setSelectedDestination] = useState<RomanticDestination | null>(null);

  const closeModal = () => {
    setSelectedDestination(null);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        <img
          src="https://readdy.ai/api/search-image?query=romantic%20couple%20silhouette%20watching%20sunset%20on%20tropical%20beach%2C%20golden%20hour%20light%2C%20palm%20trees%2C%20ocean%20waves%2C%20love%20and%20romance%20atmosphere%2C%20honeymoon%20destination%2C%20cinematic%20wide%20shot%2C%20professional%20photography&width=1920&height=600&seq=rom-hero&orientation=landscape"
          alt="Romantic Getaways"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl px-4 md:px-6 w-full">
            <div className="flex items-center justify-center gap-2 mb-3 md:mb-4">
              <i className="ri-heart-fill text-2xl md:text-3xl text-rose-400"></i>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">Romantic Getaways</h1>
            <p className="text-base md:text-xl lg:text-2xl text-white/90 mb-6 md:mb-8">
              Create unforgettable memories with your loved one in the world's most romantic destinations
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
              <a
                href="#destinations"
                className="w-full sm:w-auto bg-rose-500 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold hover:bg-rose-600 transition-colors whitespace-nowrap cursor-pointer text-sm md:text-base"
              >
                <i className="ri-heart-line mr-2"></i>
                Explore Destinations
              </a>
              <Link
                to="/signup"
                className="w-full sm:w-auto bg-white/20 backdrop-blur-sm text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold hover:bg-white/30 transition-colors whitespace-nowrap cursor-pointer text-sm md:text-base"
              >
                Plan Your Trip
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Romantic Experiences */}
      <section className="py-12 md:py-16 bg-rose-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">Romantic Experiences</h2>
            <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
              Every detail crafted to make your romantic escape truly special
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {romanticExperiences.map((experience, index) => (
              <div key={index} className="text-center">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <i className={`${experience.icon} text-2xl md:text-3xl text-rose-500`}></i>
                </div>
                <h3 className="font-bold text-gray-900 mb-1 md:mb-2 text-sm md:text-base">{experience.title}</h3>
                <p className="text-xs md:text-sm text-gray-600">{experience.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-rose-500 to-pink-500">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
            <div>
              <p className="text-3xl md:text-4xl font-bold text-white mb-1 md:mb-2">10K+</p>
              <p className="text-xs md:text-base text-rose-100">Happy Couples</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-white mb-1 md:mb-2">50+</p>
              <p className="text-xs md:text-base text-rose-100">Romantic Destinations</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-white mb-1 md:mb-2">500+</p>
              <p className="text-xs md:text-base text-rose-100">Proposals Planned</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-white mb-1 md:mb-2">99%</p>
              <p className="text-xs md:text-base text-rose-100">Love Stories</p>
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section id="destinations" className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">Romantic Destinations</h2>
            <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
              Handpicked locations perfect for honeymoons, anniversaries, proposals, or simply celebrating your love.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {romanticDestinations.map((destination) => (
              <div 
                key={destination.id} 
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="relative h-48 md:h-64 overflow-hidden">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 md:top-4 right-3 md:right-4 bg-white px-2.5 md:px-3 py-1 md:py-1.5 rounded-full shadow-lg">
                    <div className="flex items-center gap-1">
                      <i className="ri-star-fill text-yellow-400 text-xs md:text-sm"></i>
                      <span className="font-semibold text-gray-900 text-xs md:text-sm">{destination.rating}</span>
                    </div>
                  </div>
                  <div className="absolute top-3 md:top-4 left-3 md:left-4 bg-rose-500 text-white px-2.5 md:px-3 py-1 md:py-1.5 rounded-full text-xs font-medium">
                    {destination.bestFor}
                  </div>
                </div>

                <div className="p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">{destination.name}</h3>
                  <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600 mb-3 md:mb-4">
                    <i className="ri-map-pin-line"></i>
                    <span>{destination.location}</span>
                  </div>

                  <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4 line-clamp-2">
                    {destination.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-3 md:mb-4">
                    {destination.features.slice(0, 3).map((feature, index) => (
                      <span
                        key={index}
                        className="px-2.5 md:px-3 py-1 bg-rose-50 text-rose-600 text-xs rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-3 md:pt-4 border-t border-gray-200">
                    <div>
                      <p className="text-xs md:text-sm text-gray-600">From</p>
                      <p className="text-xl md:text-2xl font-bold text-rose-500">
                        ${destination.price}
                        <span className="text-xs md:text-sm text-gray-600 font-normal">/night</span>
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedDestination(destination)}
                      className="bg-rose-500 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-medium hover:bg-rose-600 transition-colors whitespace-nowrap cursor-pointer text-xs md:text-base"
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

      {/* Destination Details Modal */}
      {selectedDestination && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <div className="relative h-64 md:h-80 overflow-hidden">
                <img
                  src={selectedDestination.image}
                  alt={selectedDestination.name}
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
                          i < Math.floor(selectedDestination.rating)
                            ? 'ri-star-fill text-yellow-400'
                            : 'ri-star-line text-gray-300'
                        } text-base md:text-lg`}
                      ></i>
                    ))}
                    <span className="ml-2 font-semibold text-gray-900 text-sm md:text-base">{selectedDestination.rating}</span>
                  </div>
                </div>
                <div className="absolute bottom-3 md:bottom-4 right-3 md:right-4 bg-rose-500 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium">
                  {selectedDestination.bestFor}
                </div>
              </div>

              <div className="p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{selectedDestination.name}</h2>
                <div className="flex items-center gap-2 text-gray-600 mb-4 md:mb-6">
                  <i className="ri-map-pin-line text-lg md:text-xl"></i>
                  <span className="text-base md:text-lg">{selectedDestination.location}</span>
                </div>

                <div className="mb-6 md:mb-8">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3">About This Destination</h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">{selectedDestination.description}</p>
                </div>

                <div className="mb-6 md:mb-8">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">Romantic Inclusions</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                    {selectedDestination.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 md:gap-3 text-sm md:text-base text-gray-700">
                        <i className="ri-heart-line text-rose-500 text-lg md:text-xl"></i>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-rose-50 rounded-xl p-4 md:p-6 mb-4 md:mb-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <p className="text-xs md:text-sm text-gray-600 mb-1">Starting From</p>
                      <p className="text-2xl md:text-3xl font-bold text-rose-500">
                        ${selectedDestination.price}
                        <span className="text-base md:text-lg text-gray-600 font-normal">/night</span>
                      </p>
                    </div>
                    <Link
                      to="/signup"
                      className="w-full sm:w-auto bg-rose-500 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold hover:bg-rose-600 transition-colors whitespace-nowrap cursor-pointer text-sm md:text-base text-center"
                    >
                      <i className="ri-calendar-heart-line mr-2"></i>
                      Book Now
                    </Link>
                  </div>
                </div>

                <div className="bg-pink-50 rounded-xl p-4 md:p-6">
                  <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                    <i className="ri-gift-line text-xl md:text-2xl text-rose-500"></i>
                    <h3 className="text-base md:text-lg font-bold text-gray-900">Special Touches</h3>
                  </div>
                  <ul className="space-y-2 text-sm md:text-base text-gray-700">
                    <li className="flex items-center gap-2">
                      <i className="ri-check-line text-rose-500"></i>
                      <span>Champagne and roses on arrival</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <i className="ri-check-line text-rose-500"></i>
                      <span>Romantic turndown service</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <i className="ri-check-line text-rose-500"></i>
                      <span>Couples photography session</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <i className="ri-check-line text-rose-500"></i>
                      <span>Anniversary or honeymoon celebration</span>
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
            <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden">
              <img
                src="https://readdy.ai/api/search-image?query=romantic%20couple%20enjoying%20champagne%20on%20private%20beach%20at%20sunset%2C%20elegant%20setting%2C%20rose%20petals%2C%20candlelight%20dinner%20setup%2C%20tropical%20paradise%2C%20love%20and%20romance%2C%20professional%20photography&width=600&height=400&seq=rom-why&orientation=landscape"
                alt="Romantic Couple"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">Why Choose Us for Your Romantic Escape?</h2>
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-rose-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className="ri-heart-2-line text-xl md:text-2xl text-rose-500"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1 text-sm md:text-base">Curated for Couples</h3>
                    <p className="text-xs md:text-base text-gray-600">Every destination handpicked for its romantic ambiance and couple-friendly amenities.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-rose-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className="ri-magic-line text-xl md:text-2xl text-rose-500"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1 text-sm md:text-base">Special Moments</h3>
                    <p className="text-xs md:text-base text-gray-600">We help plan proposals, anniversaries, and surprise celebrations.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-rose-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className="ri-vip-crown-line text-xl md:text-2xl text-rose-500"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1 text-sm md:text-base">VIP Treatment</h3>
                    <p className="text-xs md:text-base text-gray-600">Exclusive perks, room upgrades, and personalized romantic touches.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-rose-500 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <i className="ri-heart-fill text-4xl md:text-5xl mb-4 md:mb-6"></i>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">Ready to Create Your Love Story?</h2>
          <p className="text-base md:text-xl text-white/90 mb-6 md:mb-8">
            Let us help you plan the perfect romantic getaway for you and your special someone.
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center justify-center gap-2 bg-white text-rose-500 px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap cursor-pointer text-sm md:text-base"
          >
            Start Planning
            <i className="ri-arrow-right-line"></i>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
