import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { getCurrentUser } from '../../lib/api';

export default function BlockPartyPage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkUser = async () => {
      const currentUser = await getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
      }
    };
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const features = [
    {
      icon: 'ri-group-line',
      title: 'Create Your Block',
      description: 'Start your own community group centered around your professional needs, hobbies, or special interests'
    },
    {
      icon: 'ri-compass-line',
      title: 'Discover Communities',
      description: 'Join existing blocks that match your interests - from surfing to career networking to university events'
    },
    {
      icon: 'ri-global-line',
      title: 'Stay Connected While Traveling',
      description: 'Keep in touch with your circles no matter where your journey takes you around the world'
    },
    {
      icon: 'ri-chat-smile-3-line',
      title: 'Engage & Share',
      description: 'Chronicle your journey, share experiences, and build meaningful connections with like-minded members'
    }
  ];

  const interestCategories = [
    {
      name: 'Professional Networking',
      icon: 'ri-briefcase-line',
      examples: ['Career Growth', 'Industry Events', 'Business Development', 'Mentorship'],
      image: 'https://readdy.ai/api/search-image?query=professional%20business%20networking%20event%20with%20diverse%20professionals%20exchanging%20ideas%2C%20modern%20corporate%20setting%2C%20collaborative%20atmosphere%2C%20contemporary%20office%20environment%2C%20simple%20clean%20background&width=400&height=300&seq=bp1&orientation=landscape'
    },
    {
      name: 'Sports & Adventure',
      icon: 'ri-riding-line',
      examples: ['Downhill Alpine Racing', 'Surfing', 'Hiking', 'Extreme Sports'],
      image: 'https://readdy.ai/api/search-image?query=group%20of%20adventure%20sports%20enthusiasts%20on%20mountain%20peak%2C%20outdoor%20activities%2C%20exciting%20sports%20community%2C%20active%20lifestyle%2C%20simple%20clean%20background&width=400&height=300&seq=bp2&orientation=landscape'
    },
    {
      name: 'Travel & Exploration',
      icon: 'ri-plane-line',
      examples: ['World Travel', 'Cultural Exchange', 'Adventure Tourism', 'Digital Nomads'],
      image: 'https://readdy.ai/api/search-image?query=diverse%20group%20of%20travelers%20exploring%20exotic%20destination%2C%20cultural%20tourism%2C%20international%20community%2C%20travel%20photography%20style%2C%20simple%20clean%20background&width=400&height=300&seq=bp3&orientation=landscape'
    },
    {
      name: 'Education & University',
      icon: 'ri-graduation-cap-line',
      examples: ['University Events', 'Study Groups', 'Alumni Networks', 'Academic Conferences'],
      image: 'https://readdy.ai/api/search-image?query=university%20students%20collaborating%20on%20campus%2C%20modern%20educational%20setting%2C%20academic%20community%2C%20collegiate%20atmosphere%2C%20simple%20clean%20background&width=400&height=300&seq=bp4&orientation=landscape'
    },
    {
      name: 'Arts & Culture',
      icon: 'ri-palette-line',
      examples: ['Music', 'Theater', 'Visual Arts', 'Creative Writing'],
      image: 'https://readdy.ai/api/search-image?query=creative%20artists%20community%20working%20together%20in%20modern%20studio%2C%20artistic%20collaboration%2C%20cultural%20activities%2C%20contemporary%20art%20space%2C%20simple%20clean%20background&width=400&height=300&seq=bp5&orientation=landscape'
    },
    {
      name: 'Community & Social',
      icon: 'ri-heart-line',
      examples: ['Political Groups', 'Religious Communities', 'Social Causes', 'Volunteer Work'],
      image: 'https://readdy.ai/api/search-image?query=diverse%20community%20members%20gathering%20for%20social%20cause%2C%20inclusive%20group%20meeting%2C%20community%20engagement%2C%20supportive%20atmosphere%2C%20simple%20clean%20background&width=400&height=300&seq=bp6&orientation=landscape'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#F59E0B] via-[#FBBF24] to-[#FCD34D]">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/30"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 w-full text-center">
          <div className="inline-block px-6 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white font-semibold mb-6">
            <i className="ri-notification-line mr-2"></i>
            COMING SOON
          </div>
          <h1 className="text-7xl font-bold text-white mb-6 leading-tight">
            Welcome to<br />
            <span className="italic font-serif">Block Party</span>
          </h1>
          <p className="text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed">
            Build online communities by creating or joining groups centered around professional needs, hobbies, and special interests. Connect with others while you travel and engage with your community.
          </p>
          <div className="flex items-center justify-center gap-4">
            {user ? (
              <Link to="/profile" className="px-10 py-4 bg-white text-[#F59E0B] rounded-full text-lg font-bold transition-all hover:shadow-2xl hover:scale-105 whitespace-nowrap cursor-pointer">
                Get Early Access
              </Link>
            ) : (
              <Link to="/signup" className="px-10 py-4 bg-white text-[#F59E0B] rounded-full text-lg font-bold transition-all hover:shadow-2xl hover:scale-105 whitespace-nowrap cursor-pointer">
                Join the Waitlist
              </Link>
            )}
            <Link to="/" className="px-10 py-4 border-2 border-white text-white rounded-full text-lg font-bold transition-all hover:bg-white/10 whitespace-nowrap cursor-pointer">
              Back to Home
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <i className="ri-arrow-down-line text-4xl text-white"></i>
        </div>
      </section>

      {/* Announcement Section */}
      <section className="py-20 bg-[#F8F9FA]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-3xl shadow-lg p-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-[#F59E0B] to-[#FBBF24] rounded-full flex items-center justify-center">
                <i className="ri-megaphone-line text-2xl text-white"></i>
              </div>
              <h2 className="text-3xl font-bold text-[#0A2540]">Platform Expansion Announcement</h2>
            </div>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
              <p>
                I am excited to share an upcoming expansion of our platform that will help you grow your vision and celebrate your personal achievements.
              </p>
              <p>
                We are soon launching <strong>"Block Party,"</strong> a new social media implementation for Netcozy Workaway Weekend. This feature is designed to help members build online communities by creating or joining groups centered around professional needs, hobbies, and special interests. Whether you are interested in networking for career growth or connecting with others over surfing, travel, or university events, Block Party provides the space to stay connected while you travel and engage with your community.
              </p>
              <p>
                From political and religious groups to niche interests like downhill alpine racing, the possibilities for connection and support are endless. We encourage you to stop in, create a "block," and begin chronicling your journey with your circles today.
              </p>
              <p className="font-semibold text-[#F59E0B]">
                Keep an eye out for the official launch of Block Party, coming soon to Netcozy Workaway Weekend.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-[#0A2540] mb-4">How Block Party Works</h2>
            <p className="text-xl text-gray-600">Connect, share, and grow with your community</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-[#F59E0B] to-[#FBBF24] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <i className={`${feature.icon} text-4xl text-white`}></i>
                </div>
                <h3 className="text-xl font-bold text-[#0A2540] mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interest Categories Section */}
      <section className="py-20 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-[#0A2540] mb-4">Endless Possibilities for Connection</h2>
            <p className="text-xl text-gray-600">Explore communities across diverse interests and passions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {interestCategories.map((category, index) => (
              <div key={index} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative h-48 overflow-hidden">
                  <img src={category.image} alt={category.name} className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  <div className="absolute top-4 left-4 w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <i className={`${category.icon} text-2xl text-[#F59E0B]`}></i>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-[#0A2540] mb-4">{category.name}</h3>
                  <div className="flex flex-wrap gap-2">
                    {category.examples.map((example, idx) => (
                      <span key={idx} className="px-3 py-1 bg-[#FEF3C7] text-[#92400E] text-sm font-medium rounded-full">
                        {example}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-[#F59E0B] to-[#FBBF24]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="text-6xl font-bold text-white mb-2">∞</div>
              <div className="text-xl text-white/90">Unlimited Communities</div>
            </div>
            <div>
              <div className="text-6xl font-bold text-white mb-2">24/7</div>
              <div className="text-xl text-white/90">Stay Connected Anywhere</div>
            </div>
            <div>
              <div className="text-6xl font-bold text-white mb-2">100%</div>
              <div className="text-xl text-white/90">Your Journey, Your Story</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold text-[#0A2540] mb-6">Be Among the First</h2>
          <p className="text-xl text-gray-600 mb-8">Join the waitlist and get early access when Block Party launches</p>
          <div className="flex items-center justify-center gap-4">
            {user ? (
              <Link to="/profile" className="px-10 py-4 bg-gradient-to-r from-[#F59E0B] to-[#FBBF24] text-white rounded-full text-lg font-bold transition-all hover:shadow-2xl hover:scale-105 whitespace-nowrap cursor-pointer">
                Get Notified
              </Link>
            ) : (
              <Link to="/signup" className="px-10 py-4 bg-gradient-to-r from-[#F59E0B] to-[#FBBF24] text-white rounded-full text-lg font-bold transition-all hover:shadow-2xl hover:scale-105 whitespace-nowrap cursor-pointer">
                Join Waitlist
              </Link>
            )}
            <Link to="/" className="px-10 py-4 border-2 border-[#F59E0B] text-[#F59E0B] rounded-full text-lg font-bold transition-all hover:bg-[#FEF3C7] whitespace-nowrap cursor-pointer">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#F8F9FA] border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Link to="/" className="flex items-center gap-3">
              <img 
                src="https://storage.readdy-site.link/project_files/029ac680-786b-4603-9848-08fb20ae4f30/d786ac2c-4121-45c7-b4ed-371b6f8287d1_image-12.png?v=6f4af2e64a06407323df94a323e44b9e" 
                alt="Netcozy Logo" 
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-gray-600 text-sm">
              © 2024 Netcozy. Block Party coming soon.
            </p>
            <a 
              href="https://readdy.ai/?ref=logo" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 text-sm hover:text-[#F59E0B] transition-colors cursor-pointer"
            >
              Powered by Readdy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
