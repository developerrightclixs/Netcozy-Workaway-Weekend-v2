import { Link } from 'react-router-dom';
import { useState } from 'react';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import ContactSection from '../../components/feature/ContactSection';

export default function MuseumsPage() {
  const [showSignupPrompt, setShowSignupPrompt] = useState(false);

  const museums = [
    {
      name: 'Metropolitan Museum of Art',
      location: 'New York, NY',
      description: 'One of the world\'s largest and finest art museums, featuring over 5,000 years of art from around the world.',
      image: 'https://readdy.ai/api/search-image?query=metropolitan%20museum%20of%20art%20interior%20grand%20hall%20with%20classical%20architecture%2C%20elegant%20lighting%2C%20visitors%20viewing%20art%2C%20sophisticated%20cultural%20atmosphere%2C%20simple%20clean%20background&width=800&height=600&seq=museum1&orientation=landscape',
      memberPrice: '$15',
      regularPrice: '$30',
      rating: 4.9
    },
    {
      name: 'The Louvre',
      location: 'Paris, France',
      description: 'The world\'s most visited museum, home to thousands of works including the Mona Lisa and Venus de Milo.',
      image: 'https://readdy.ai/api/search-image?query=louvre%20museum%20interior%20with%20classical%20paintings%20and%20sculptures%2C%20elegant%20gallery%20space%2C%20artistic%20atmosphere%2C%20visitors%20admiring%20masterpieces%2C%20simple%20clean%20background&width=800&height=600&seq=museum2&orientation=landscape',
      memberPrice: '$50',
      regularPrice: '$75',
      rating: 4.8
    },
    {
      name: 'Smithsonian National Museum',
      location: 'Washington, DC',
      description: 'America\'s largest museum complex featuring natural history, air and space, American history, and more.',
      image: 'https://readdy.ai/api/search-image?query=smithsonian%20museum%20interior%20with%20natural%20history%20exhibits%2C%20dinosaur%20fossils%2C%20educational%20displays%2C%20modern%20museum%20architecture%2C%20simple%20clean%20background&width=800&height=600&seq=museum3&orientation=landscape',
      memberPrice: 'Free',
      regularPrice: 'Free',
      rating: 4.9
    },
    {
      name: 'British Museum',
      location: 'London, UK',
      description: 'A museum of human history, art and culture with a collection spanning over two million years.',
      image: 'https://readdy.ai/api/search-image?query=british%20museum%20interior%20with%20ancient%20artifacts%2C%20egyptian%20sculptures%2C%20classical%20architecture%2C%20grand%20exhibition%20hall%2C%20simple%20clean%20background&width=800&height=600&seq=museum4&orientation=landscape',
      memberPrice: '$50',
      regularPrice: '$65',
      rating: 4.7
    },
    {
      name: 'Museum of Modern Art',
      location: 'New York, NY',
      description: 'MoMA houses an unparalleled collection of modern and contemporary art, from paintings to design objects.',
      image: 'https://readdy.ai/api/search-image?query=modern%20art%20museum%20interior%20with%20contemporary%20paintings%2C%20minimalist%20gallery%20space%2C%20white%20walls%2C%20artistic%20installations%2C%20simple%20clean%20background&width=800&height=600&seq=museum5&orientation=landscape',
      memberPrice: '$15',
      regularPrice: '$28',
      rating: 4.8
    },
    {
      name: 'Vatican Museums',
      location: 'Vatican City',
      description: 'Home to the Sistine Chapel and an extensive collection of art and historical artifacts from the Catholic Church.',
      image: 'https://readdy.ai/api/search-image?query=vatican%20museum%20interior%20with%20renaissance%20frescoes%2C%20ornate%20ceiling%20paintings%2C%20classical%20sculptures%2C%20grand%20corridor%2C%20simple%20clean%20background&width=800&height=600&seq=museum6&orientation=landscape',
      memberPrice: '$50',
      regularPrice: '$80',
      rating: 4.9
    },
    {
      name: 'Guggenheim Museum',
      location: 'New York, NY',
      description: 'An architectural masterpiece featuring modern and contemporary art in Frank Lloyd Wright\'s iconic spiral design.',
      image: 'https://readdy.ai/api/search-image?query=guggenheim%20museum%20interior%20with%20spiral%20ramps%2C%20modern%20art%20displays%2C%20unique%20circular%20architecture%2C%20contemporary%20gallery%20space%2C%20simple%20clean%20background&width=800&height=600&seq=museum7&orientation=landscape',
      memberPrice: '$15',
      regularPrice: '$25',
      rating: 4.7
    },
    {
      name: 'Rijksmuseum',
      location: 'Amsterdam, Netherlands',
      description: 'The national museum of the Netherlands featuring Dutch Golden Age paintings and Asian art collections.',
      image: 'https://readdy.ai/api/search-image?query=rijksmuseum%20interior%20with%20dutch%20golden%20age%20paintings%2C%20classical%20european%20art%20gallery%2C%20elegant%20museum%20hall%2C%20historical%20masterpieces%2C%20simple%20clean%20background&width=800&height=600&seq=museum8&orientation=landscape',
      memberPrice: '$50',
      regularPrice: '$70',
      rating: 4.8
    }
  ];

  const benefits = [
    {
      icon: 'ri-ticket-line',
      title: 'Exclusive Member Pricing',
      description: 'Save up to 50% on admission with your Netcozy membership'
    },
    {
      icon: 'ri-time-line',
      title: 'Skip the Lines',
      description: 'Fast-track entry to popular museums and galleries worldwide'
    },
    {
      icon: 'ri-calendar-event-line',
      title: 'Special Events Access',
      description: 'Invitations to exclusive exhibitions and member-only events'
    },
    {
      icon: 'ri-guide-line',
      title: 'Guided Tours',
      description: 'Complimentary guided tours with expert curators and historians'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1990FF] to-[#0070E0] text-white pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 md:pb-24">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <Link to="/" className="text-white/80 hover:text-white transition-colors whitespace-nowrap text-sm sm:text-base">Home</Link>
              <i className="ri-arrow-right-s-line text-white/60"></i>
              <span className="text-white font-medium whitespace-nowrap text-sm sm:text-base">Museums &amp; Galleries</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6">Museums &amp; Galleries</h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 leading-relaxed">
              Discover world-class museums and galleries with exclusive member benefits. Experience art, history, and culture like never before with Netcozy's curated collection of premier cultural destinations.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <button 
                onClick={() => setShowSignupPrompt(true)}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-[#1990FF] rounded-lg text-base sm:text-lg font-bold hover:bg-gray-100 transition-colors whitespace-nowrap cursor-pointer"
              >
                View Member Pricing
              </button>
              <Link to="/signup" className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-white text-white rounded-lg text-base sm:text-lg font-bold hover:bg-white/10 transition-colors whitespace-nowrap text-center">
                Become a Member
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0A2540] text-center mb-8 sm:mb-12">Member Benefits</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              { icon: 'ri-ticket-line', title: 'Exclusive Member Pricing', description: 'Save up to 50% on admission with your Netcozy membership' },
              { icon: 'ri-time-line', title: 'Skip the Lines', description: 'Fast-track entry to popular museums and galleries worldwide' },
              { icon: 'ri-calendar-event-line', title: 'Special Events Access', description: 'Invitations to exclusive exhibitions and member-only events' },
              { icon: 'ri-guide-line', title: 'Guided Tours', description: 'Complimentary guided tours with expert curators and historians' }
            ].map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#1990FF]/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <i className={`${benefit.icon} text-2xl sm:text-3xl text-[#1990FF]`}></i>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#0A2540] mb-2">{benefit.title}</h3>
                <p className="text-sm sm:text-base text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Museums Grid */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 sm:mb-12 gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0A2540] mb-2">Featured Museums &amp; Galleries</h2>
              <p className="text-sm sm:text-base text-gray-600">Explore our curated collection of world-renowned cultural institutions</p>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button className="flex-1 sm:flex-none px-4 py-2 border-2 border-gray-300 rounded-lg text-sm sm:text-base text-gray-700 hover:border-[#1990FF] hover:text-[#1990FF] transition-colors whitespace-nowrap cursor-pointer">
                <i className="ri-filter-line mr-2"></i>
                Filter
              </button>
              <button className="flex-1 sm:flex-none px-4 py-2 border-2 border-gray-300 rounded-lg text-sm sm:text-base text-gray-700 hover:border-[#1990FF] hover:text-[#1990FF] transition-colors whitespace-nowrap cursor-pointer">
                <i className="ri-sort-desc mr-2"></i>
                Sort
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              { name: 'Metropolitan Museum of Art', location: 'New York, NY', description: 'One of the world\'s largest and finest art museums, featuring over 5,000 years of art from around the world.', image: 'https://readdy.ai/api/search-image?query=metropolitan%20museum%20of%20art%20interior%20grand%20hall%20with%20classical%20architecture%2C%20elegant%20lighting%2C%20visitors%20viewing%20art%2C%20sophisticated%20cultural%20atmosphere%2C%20simple%20clean%20background&width=800&height=600&seq=museum1&orientation=landscape', memberPrice: '$15', regularPrice: '$30', rating: 4.9 },
              { name: 'The Louvre', location: 'Paris, France', description: 'The world\'s most visited museum, home to thousands of works including the Mona Lisa and Venus de Milo.', image: 'https://readdy.ai/api/search-image?query=louvre%20museum%20interior%20with%20classical%20paintings%20and%20sculptures%2C%20elegant%20gallery%20space%2C%20artistic%20atmosphere%2C%20visitors%20admiring%20masterpieces%2C%20simple%20clean%20background&width=800&height=600&seq=museum2&orientation=landscape', memberPrice: '$50', regularPrice: '$75', rating: 4.8 },
              { name: 'Smithsonian National Museum', location: 'Washington, DC', description: 'America\'s largest museum complex featuring natural history, air and space, American history, and more.', image: 'https://readdy.ai/api/search-image?query=smithsonian%20museum%20interior%20with%20natural%20history%20exhibits%2C%20dinosaur%20fossils%2C%20educational%20displays%2C%20modern%20museum%20architecture%2C%20simple%20clean%20background&width=800&height=600&seq=museum3&orientation=landscape', memberPrice: 'Free', regularPrice: 'Free', rating: 4.9 },
              { name: 'British Museum', location: 'London, UK', description: 'A museum of human history, art and culture with a collection spanning over two million years.', image: 'https://readdy.ai/api/search-image?query=british%20museum%20interior%20with%20ancient%20artifacts%2C%20egyptian%20sculptures%2C%20classical%20architecture%2C%20grand%20exhibition%20hall%2C%20simple%20clean%20background&width=800&height=600&seq=museum4&orientation=landscape', memberPrice: '$50', regularPrice: '$65', rating: 4.7 },
              { name: 'Museum of Modern Art', location: 'New York, NY', description: 'MoMA houses an unparalleled collection of modern and contemporary art, from paintings to design objects.', image: 'https://readdy.ai/api/search-image?query=modern%20art%20museum%20interior%20with%20contemporary%20paintings%2C%20minimalist%20gallery%20space%2C%20white%20walls%2C%20artistic%20installations%2C%20simple%20clean%20background&width=800&height=600&seq=museum5&orientation=landscape', memberPrice: '$15', regularPrice: '$28', rating: 4.8 },
              { name: 'Vatican Museums', location: 'Vatican City', description: 'Home to the Sistine Chapel and an extensive collection of art and historical artifacts from the Catholic Church.', image: 'https://readdy.ai/api/search-image?query=vatican%20museum%20interior%20with%20renaissance%20frescoes%2C%20ornate%20ceiling%20paintings%2C%20classical%20sculptures%2C%20grand%20corridor%2C%20simple%20clean%20background&width=800&height=600&seq=museum6&orientation=landscape', memberPrice: '$50', regularPrice: '$80', rating: 4.9 }
            ].map((museum, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer">
                <div className="relative h-48 sm:h-56 md:h-64 w-full overflow-hidden">
                  <img 
                    src={museum.image} 
                    alt={museum.name}
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-white/95 backdrop-blur-sm px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full flex items-center gap-1">
                    <i className="ri-star-fill text-yellow-500 text-xs sm:text-sm"></i>
                    <span className="font-bold text-[#0A2540] text-xs sm:text-sm">{museum.rating}</span>
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-[#0A2540] mb-1">{museum.name}</h3>
                      <p className="text-gray-600 text-xs sm:text-sm flex items-center gap-1">
                        <i className="ri-map-pin-line"></i>
                        {museum.location}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-xs sm:text-sm mb-4 line-clamp-3">{museum.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Member Price</p>
                      <p className="text-xl sm:text-2xl font-bold text-[#1990FF]">{museum.memberPrice}</p>
                      {museum.regularPrice !== 'Free' && (
                        <p className="text-xs text-gray-400 line-through">{museum.regularPrice}</p>
                      )}
                    </div>
                    <button 
                      onClick={() => setShowSignupPrompt(true)}
                      className="px-4 sm:px-6 py-2 sm:py-2.5 bg-[#1990FF] text-white rounded-lg text-sm sm:text-base font-semibold hover:bg-[#0070E0] transition-colors whitespace-nowrap cursor-pointer"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-[#1990FF] to-[#0070E0] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 sm:mb-6">Ready to Explore?</h2>
          <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 leading-relaxed">
            Join Netcozy today and unlock exclusive access to the world's finest museums and galleries. Experience culture, art, and history with unparalleled benefits and member-only perks.
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
            <Link to="/signup" className="px-8 sm:px-10 py-3 sm:py-4 bg-white text-[#1990FF] rounded-lg text-base sm:text-lg font-bold hover:bg-gray-100 transition-colors whitespace-nowrap text-center">
              Sign Up Now
            </Link>
            <Link to="/about" className="px-8 sm:px-10 py-3 sm:py-4 border-2 border-white text-white rounded-lg text-base sm:text-lg font-bold hover:bg-white/10 transition-colors whitespace-nowrap text-center">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      <ContactSection category="Museums & Galleries" />

      <Footer />

      {/* Signup Prompt Modal */}
      {showSignupPrompt && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 relative">
            <button 
              onClick={() => setShowSignupPrompt(false)}
              className="absolute top-3 sm:top-4 right-3 sm:right-4 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            >
              <i className="ri-close-line text-2xl"></i>
            </button>
            <div className="text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#1990FF]/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <i className="ri-lock-line text-2xl sm:text-3xl text-[#1990FF]"></i>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#0A2540] mb-2 sm:mb-3">Member Access Required</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                Sign up for a Netcozy membership to unlock exclusive pricing, skip-the-line access, and special events at museums and galleries worldwide.
              </p>
              <div className="space-y-3">
                <Link 
                  to="/signup"
                  className="block w-full py-2.5 sm:py-3 bg-[#1990FF] text-white rounded-lg text-sm sm:text-base font-semibold hover:bg-[#0070E0] transition-colors whitespace-nowrap"
                >
                  Create Account
                </Link>
                <Link 
                  to="/login"
                  className="block w-full py-2.5 sm:py-3 border-2 border-gray-300 text-gray-700 rounded-lg text-sm sm:text-base font-semibold hover:border-[#1990FF] hover:text-[#1990FF] transition-colors whitespace-nowrap"
                >
                  Log In
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
