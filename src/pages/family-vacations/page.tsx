import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';

interface FamilyDestination {
  id: string;
  name: string;
  image: string;
  location: string;
  rating: number;
  price: number;
  features: string[];
  description: string;
  ageGroup: string;
  familySize: string;
}

const familyDestinations: FamilyDestination[] = [
  {
    id: '1',
    name: 'Orlando Theme Park Adventure',
    image: 'https://readdy.ai/api/search-image?query=family%20enjoying%20theme%20park%20ride%20with%20colorful%20roller%20coaster%2C%20happy%20children%20and%20parents%2C%20sunny%20day%2C%20magical%20atmosphere%2C%20Orlando%20Florida%20vacation%2C%20professional%20photography%20with%20warm%20tones&width=400&height=300&seq=fam1&orientation=landscape',
    location: 'Orlando, Florida',
    rating: 4.9,
    price: 299,
    features: ['Theme Parks', 'Water Parks', 'Character Dining', 'Fireworks Shows'],
    description: 'Experience the magic of world-famous theme parks with thrilling rides, beloved characters, and unforgettable family memories.',
    ageGroup: 'All Ages',
    familySize: '2-8 guests'
  },
  {
    id: '2',
    name: 'Hawaiian Beach Family Resort',
    image: 'https://readdy.ai/api/search-image?query=family%20building%20sandcastle%20on%20Hawaiian%20beach%2C%20children%20playing%20in%20waves%2C%20palm%20trees%2C%20tropical%20paradise%2C%20parents%20relaxing%2C%20golden%20sunset%20light%2C%20professional%20photography&width=400&height=300&seq=fam2&orientation=landscape',
    location: 'Maui, Hawaii',
    rating: 4.8,
    price: 449,
    features: ['Kids Club', 'Snorkeling', 'Luau Dinner', 'Surf Lessons'],
    description: 'Discover paradise with your family on pristine Hawaiian beaches, complete with kid-friendly activities and cultural experiences.',
    ageGroup: 'All Ages',
    familySize: '2-6 guests'
  },
  {
    id: '3',
    name: 'Costa Rica Eco Adventure',
    image: 'https://readdy.ai/api/search-image?query=family%20on%20zip%20line%20adventure%20through%20Costa%20Rica%20rainforest%20canopy%2C%20children%20wearing%20helmets%2C%20lush%20green%20jungle%2C%20exciting%20outdoor%20activity%2C%20professional%20photography&width=400&height=300&seq=fam3&orientation=landscape',
    location: 'Costa Rica',
    rating: 4.7,
    price: 379,
    features: ['Zip Lining', 'Wildlife Tours', 'Volcano Hikes', 'Beach Time'],
    description: 'Embark on an educational eco-adventure where kids can explore rainforests, spot exotic wildlife, and learn about nature.',
    ageGroup: '5+ Years',
    familySize: '2-6 guests'
  },
  {
    id: '4',
    name: 'Caribbean Cruise Family Package',
    image: 'https://readdy.ai/api/search-image?query=family%20on%20cruise%20ship%20deck%20enjoying%20ocean%20view%2C%20children%20at%20pool%20area%2C%20colorful%20water%20slides%2C%20Caribbean%20sea%20background%2C%20sunny%20vacation%20atmosphere%2C%20professional%20photography&width=400&height=300&seq=fam4&orientation=landscape',
    location: 'Caribbean Islands',
    rating: 4.9,
    price: 599,
    features: ['Kids Programs', 'Water Slides', 'Island Excursions', 'All-Inclusive'],
    description: 'Set sail on a family-friendly cruise with endless entertainment, delicious dining, and exciting island adventures.',
    ageGroup: 'All Ages',
    familySize: '2-8 guests'
  },
  {
    id: '5',
    name: 'San Diego Family Fun',
    image: 'https://readdy.ai/api/search-image?query=family%20at%20zoo%20watching%20pandas%20and%20exotic%20animals%2C%20children%20excited%20pointing%20at%20animals%2C%20educational%20experience%2C%20sunny%20California%20day%2C%20professional%20photography&width=400&height=300&seq=fam5&orientation=landscape',
    location: 'San Diego, California',
    rating: 4.8,
    price: 249,
    features: ['Zoo Visit', 'SeaWorld', 'Beach Days', 'LEGOLAND'],
    description: 'Explore San Diego\'s world-famous attractions including the zoo, aquariums, and beautiful beaches perfect for families.',
    ageGroup: 'All Ages',
    familySize: '2-6 guests'
  },
  {
    id: '6',
    name: 'Cancun All-Inclusive Resort',
    image: 'https://readdy.ai/api/search-image?query=family%20at%20all%20inclusive%20resort%20pool%20in%20Cancun%20Mexico%2C%20children%20playing%20in%20water%2C%20parents%20relaxing%20on%20lounge%20chairs%2C%20tropical%20resort%20setting%2C%20turquoise%20water%2C%20professional%20photography&width=400&height=300&seq=fam6&orientation=landscape',
    location: 'Cancun, Mexico',
    rating: 4.7,
    price: 349,
    features: ['Kids Club', 'Water Sports', 'Mayan Ruins Tour', 'All-Inclusive'],
    description: 'Enjoy worry-free family fun at an all-inclusive resort with dedicated kids programs and exciting cultural excursions.',
    ageGroup: 'All Ages',
    familySize: '2-8 guests'
  }
];

const familyActivities = [
  {
    icon: 'ri-gamepad-line',
    title: 'Kids Entertainment',
    description: 'Age-appropriate activities and games'
  },
  {
    icon: 'ri-restaurant-line',
    title: 'Family Dining',
    description: 'Kid-friendly menus and options'
  },
  {
    icon: 'ri-shield-check-line',
    title: 'Safe Adventures',
    description: 'Supervised activities for all ages'
  },
  {
    icon: 'ri-home-heart-line',
    title: 'Family Suites',
    description: 'Spacious rooms for the whole family'
  }
];

export default function FamilyVacationsPage() {
  const [selectedDestination, setSelectedDestination] = useState<FamilyDestination | null>(null);

  const closeModal = () => {
    setSelectedDestination(null);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        <img
          src="https://readdy.ai/api/search-image?query=happy%20family%20walking%20on%20beach%20at%20sunset%2C%20parents%20holding%20children%20hands%2C%20golden%20hour%20light%2C%20ocean%20waves%2C%20joyful%20vacation%20moment%2C%20silhouette%20against%20colorful%20sky%2C%20cinematic%20wide%20shot%2C%20professional%20photography&width=1920&height=600&seq=fam-hero&orientation=landscape"
          alt="Family Vacations"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl px-4 md:px-6 w-full">
            <div className="flex items-center justify-center gap-2 mb-3 md:mb-4">
              <i className="ri-team-fill text-2xl md:text-3xl text-amber-400"></i>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">Family Vacations</h1>
            <p className="text-base md:text-xl lg:text-2xl text-white/90 mb-6 md:mb-8">
              Create lasting memories with adventures designed for the whole family
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
              <a
                href="#destinations"
                className="w-full sm:w-auto bg-amber-500 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold hover:bg-amber-600 transition-colors whitespace-nowrap cursor-pointer text-sm md:text-base"
              >
                <i className="ri-compass-3-line mr-2"></i>
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

      {/* Family Activities */}
      <section className="py-12 md:py-16 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">Family-Friendly Features</h2>
            <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
              Every detail designed to make your family vacation stress-free and fun
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {familyActivities.map((activity, index) => (
              <div key={index} className="text-center">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <i className={`${activity.icon} text-2xl md:text-3xl text-amber-600`}></i>
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm md:text-base">{activity.title}</h3>
                <p className="text-xs md:text-sm text-gray-600">{activity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-amber-500 to-orange-500">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 text-center">
            <div>
              <p className="text-3xl md:text-4xl font-bold text-white mb-2">25K+</p>
              <p className="text-xs md:text-base text-amber-100">Happy Families</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-white mb-2">100+</p>
              <p className="text-xs md:text-base text-amber-100">Family Destinations</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-white mb-2">50K+</p>
              <p className="text-xs md:text-base text-amber-100">Kids Entertained</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-white mb-2">98%</p>
              <p className="text-xs md:text-base text-amber-100">Family Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section id="destinations" className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">Family Destinations</h2>
            <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
              Handpicked locations perfect for families with children of all ages, featuring kid-friendly activities and accommodations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {familyDestinations.map((destination) => (
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
                  <div className="absolute top-3 md:top-4 right-3 md:right-4 bg-white px-2 md:px-3 py-1 md:py-1.5 rounded-full shadow-lg">
                    <div className="flex items-center gap-1">
                      <i className="ri-star-fill text-yellow-400 text-xs md:text-sm"></i>
                      <span className="font-semibold text-gray-900 text-xs md:text-sm">{destination.rating}</span>
                    </div>
                  </div>
                  <div className="absolute top-3 md:top-4 left-3 md:left-4 bg-amber-500 text-white px-2 md:px-3 py-1 md:py-1.5 rounded-full text-xs font-medium">
                    {destination.ageGroup}
                  </div>
                </div>

                <div className="p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">{destination.name}</h3>
                  <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm text-gray-600 mb-3 md:mb-4">
                    <div className="flex items-center gap-1">
                      <i className="ri-map-pin-line"></i>
                      <span>{destination.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <i className="ri-group-line"></i>
                      <span>{destination.familySize}</span>
                    </div>
                  </div>

                  <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4 line-clamp-2">
                    {destination.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-3 md:mb-4">
                    {destination.features.slice(0, 3).map((feature, index) => (
                      <span
                        key={index}
                        className="px-2 md:px-3 py-1 bg-amber-50 text-amber-700 text-xs rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-3 md:pt-4 border-t border-gray-200">
                    <div>
                      <p className="text-xs md:text-sm text-gray-600">From</p>
                      <p className="text-xl md:text-2xl font-bold text-amber-600">
                        ${destination.price}
                        <span className="text-xs md:text-sm text-gray-600 font-normal">/night</span>
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedDestination(destination)}
                      className="bg-amber-500 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-medium hover:bg-amber-600 transition-colors whitespace-nowrap cursor-pointer text-xs md:text-sm"
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
                <div className="absolute bottom-3 md:bottom-4 right-3 md:right-4 bg-amber-500 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium">
                  {selectedDestination.ageGroup}
                </div>
              </div>

              <div className="p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{selectedDestination.name}</h2>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4 text-gray-600 mb-4 md:mb-6">
                  <div className="flex items-center gap-2">
                    <i className="ri-map-pin-line text-lg md:text-xl"></i>
                    <span className="text-sm md:text-lg">{selectedDestination.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="ri-group-line text-lg md:text-xl"></i>
                    <span className="text-sm md:text-lg">{selectedDestination.familySize}</span>
                  </div>
                </div>

                <div className="mb-6 md:mb-8">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3">About This Destination</h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">{selectedDestination.description}</p>
                </div>

                <div className="mb-6 md:mb-8">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">Family Activities Included</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                    {selectedDestination.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 md:gap-3 text-gray-700 text-sm md:text-base">
                        <i className="ri-checkbox-circle-line text-amber-500 text-lg md:text-xl"></i>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-amber-50 rounded-xl p-4 md:p-6 mb-4 md:mb-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <p className="text-xs md:text-sm text-gray-600 mb-1">Starting From</p>
                      <p className="text-2xl md:text-3xl font-bold text-amber-600">
                        ${selectedDestination.price}
                        <span className="text-base md:text-lg text-gray-600 font-normal">/night</span>
                      </p>
                    </div>
                    <Link
                      to="/signup"
                      className="w-full sm:w-auto bg-amber-500 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold hover:bg-amber-600 transition-colors whitespace-nowrap cursor-pointer text-center text-sm md:text-base"
                    >
                      <i className="ri-calendar-check-line mr-2"></i>
                      Book Now
                    </Link>
                  </div>
                </div>

                <div className="bg-orange-50 rounded-xl p-4 md:p-6">
                  <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                    <i className="ri-parent-line text-xl md:text-2xl text-amber-600"></i>
                    <h3 className="text-base md:text-lg font-bold text-gray-900">Family Perks</h3>
                  </div>
                  <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                    <li className="flex items-center gap-2">
                      <i className="ri-check-line text-amber-500"></i>
                      <span>Kids stay and eat free (under 12)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <i className="ri-check-line text-amber-500"></i>
                      <span>Complimentary kids club access</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <i className="ri-check-line text-amber-500"></i>
                      <span>Family-friendly room amenities</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <i className="ri-check-line text-amber-500"></i>
                      <span>Babysitting services available</span>
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
                src="https://readdy.ai/api/search-image?query=happy%20family%20at%20resort%20pool%2C%20children%20splashing%20water%2C%20parents%20laughing%2C%20tropical%20setting%2C%20palm%20trees%2C%20sunny%20vacation%20day%2C%20joyful%20atmosphere%2C%20professional%20photography&width=600&height=400&seq=fam-why&orientation=landscape"
                alt="Happy Family"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">Why Choose Us for Your Family Vacation?</h2>
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className="ri-shield-star-line text-xl md:text-2xl text-amber-600"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1 text-sm md:text-base">Kid-Approved Destinations</h3>
                    <p className="text-xs md:text-base text-gray-600">Every location vetted for safety, fun, and family-friendly amenities.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className="ri-price-tag-3-line text-xl md:text-2xl text-amber-600"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1 text-sm md:text-base">Family Value Packages</h3>
                    <p className="text-xs md:text-base text-gray-600">Special rates and perks designed to give families more for less.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className="ri-customer-service-2-line text-xl md:text-2xl text-amber-600"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1 text-sm md:text-base">24/7 Family Support</h3>
                    <p className="text-xs md:text-base text-gray-600">Dedicated support team to help with any family travel needs.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-amber-500 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <i className="ri-team-fill text-4xl md:text-5xl mb-4 md:mb-6"></i>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">Ready for Your Family Adventure?</h2>
          <p className="text-base md:text-xl text-white/90 mb-6 md:mb-8">
            Let us help you plan the perfect vacation that the whole family will love.
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 bg-white text-amber-600 px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap cursor-pointer text-sm md:text-base"
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
