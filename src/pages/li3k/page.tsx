import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';

export default function LI3KPage() {
  const [showMoreInfoModal, setShowMoreInfoModal] = useState(false);
  const [showRepModal, setShowRepModal] = useState(false);
  const [moreInfoEmail, setMoreInfoEmail] = useState('');
  const [repForm, setRepForm] = useState({ name: '', email: '', phone: '', company: '' });
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleMoreInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('https://readdy.ai/api/form/d62gr30r3m6fkobknt2g', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ email: moreInfoEmail }).toString()
      });
      if (response.ok) {
        setSubmitStatus({ type: 'success', message: 'Thank you! We\'ll send you more information shortly.' });
        setMoreInfoEmail('');
        setTimeout(() => {
          setShowMoreInfoModal(false);
          setSubmitStatus({ type: null, message: '' });
        }, 2000);
      } else {
        setSubmitStatus({ type: 'error', message: 'Something went wrong. Please try again.' });
      }
    } catch {
      setSubmitStatus({ type: 'error', message: 'Something went wrong. Please try again.' });
    }
    setIsSubmitting(false);
  };

  const handleRepSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('https://readdy.ai/api/form/d62gr30r3m6fkobknt10', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          name: repForm.name,
          email: repForm.email,
          phone: repForm.phone,
          company: repForm.company
        }).toString()
      });
      if (response.ok) {
        setSubmitStatus({ type: 'success', message: 'Thank you! A representative will contact you soon.' });
        setRepForm({ name: '', email: '', phone: '', company: '' });
        setTimeout(() => {
          setShowRepModal(false);
          setSubmitStatus({ type: null, message: '' });
        }, 2000);
      } else {
        setSubmitStatus({ type: 'error', message: 'Something went wrong. Please try again.' });
      }
    } catch {
      setSubmitStatus({ type: 'error', message: 'Something went wrong. Please try again.' });
    }
    setIsSubmitting(false);
  };

  const benefits = [
    {
      icon: 'ri-money-dollar-circle-line',
      title: 'Access Capital Fast',
      description: 'Get cash in as little as 24-48 hours or 5-15 days, with additional amounts every 30 days'
    },
    {
      icon: 'ri-megaphone-line',
      title: 'Free Marketing',
      description: 'Get free marketing across social media, radio, television, and other media platforms'
    },
    {
      icon: 'ri-group-line',
      title: 'Expand Your Network',
      description: 'Connect with other businesses to expand your network and customer base'
    },
    {
      icon: 'ri-shield-check-line',
      title: 'No Credit Requirements',
      description: 'Access capital even with bad credit, pre-existing loans, or lack of collateral'
    },
    {
      icon: 'ri-percent-line',
      title: 'Interest & Penalty Free',
      description: 'Receive an interest-free and penalty-free injection of capital'
    },
    {
      icon: 'ri-building-line',
      title: 'Business Growth',
      description: 'Use funds for inventory, expansion, construction, or other business needs'
    }
  ];

  const howItWorks = [
    {
      step: '01',
      title: 'Connect Your Network',
      description: 'Link your LinkedIn account with 3,000+ contacts to get started'
    },
    {
      step: '02',
      title: 'Create Digital Assets',
      description: 'We help you create valuable digital assets from your existing network'
    },
    {
      step: '03',
      title: 'Monetize & Receive Cash',
      description: 'Convert your digital assets into cash you can access quickly'
    },
    {
      step: '04',
      title: 'Ongoing Revenue',
      description: 'Receive additional payments every 30 days from your network'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-20 min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://readdy.ai/api/search-image?query=professional%20business%20networking%20concept%20with%20digital%20connections%20and%20linkedin%20style%20network%20visualization%2C%20modern%20corporate%20atmosphere%2C%20abstract%20technology%20background%20with%20connected%20nodes%20and%20lines%2C%20warm%20golden%20and%20teal%20color%20scheme%2C%20simple%20clean%20background&width=1920&height=1080&seq=li3k-hero1&orientation=landscape"
            alt="LI3K Network"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A2540]/95 via-[#0A2540]/80 to-[#0A2540]/60"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-4 py-1.5 bg-[#1990FF] text-white text-sm font-bold rounded-full whitespace-nowrap">
                PREMIUM SERVICE
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              LI3K
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              A premium service of Netcozy Workaway Weekend - the social media innovation that allows businesses to create new revenue streams using social media and online and brick and mortar visitors or past transactions.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/signup"
                className="px-8 py-4 bg-[#1990FF] text-white rounded-full text-lg font-semibold transition-all hover:bg-[#0070E0] hover:shadow-2xl hover:scale-105 whitespace-nowrap cursor-pointer"
              >
                Sign Up Today
              </Link>
              <button
                onClick={() => setShowMoreInfoModal(true)}
                className="px-8 py-4 border-2 border-white text-white rounded-full text-lg font-semibold transition-all hover:bg-white/10 whitespace-nowrap cursor-pointer"
              >
                More Information
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-20 bg-gradient-to-b from-[#F8F9FA] to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#0A2540] mb-6">
              Turn Your Connections Into Cash
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Businesses with <strong>3,000 contacts</strong> can get <strong>half a million dollars or more</strong> using our business process to create digital assets and monetize them, converting them into cash that they can access in as little as <strong>24 to 48 hours</strong> or <strong>5 to 15 days</strong> and then receive additional amounts every <strong>30 days</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
              >
                <div className="w-14 h-14 bg-[#1990FF]/10 rounded-xl flex items-center justify-center mb-6">
                  <i className={`${benefit.icon} text-3xl text-[#1990FF]`}></i>
                </div>
                <h3 className="text-xl font-bold text-[#0A2540] mb-3">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#0A2540] mb-6">How LI3K Works</h2>
            <p className="text-xl text-gray-600">Simple steps to monetize your professional network</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((item, index) => (
              <div key={index} className="relative">
                <div className="text-8xl font-bold text-[#1990FF]/10 absolute -top-4 left-0">{item.step}</div>
                <div className="relative pt-12">
                  <h3 className="text-xl font-bold text-[#0A2540] mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
                {index < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-8 flex items-center justify-center">
                    <i className="ri-arrow-right-line text-2xl text-[#1990FF]"></i>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LI3K Contracts & Retreats */}
      <section className="py-20 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-[#0A2540] mb-6">LI3K Contracts & Retreats</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                LI3K contracts and LI3K retreats allow businesses and entrepreneurs to monetize their in-house and online visitors, contacts, clients, and connect with other businesses to expand their network and customer base.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                <strong>Get paid for being well connected</strong> in your local and online community. Cash for having your own contacts and past clients? Interesting concept.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-[#0A2540]">
                  <i className="ri-check-line text-xl text-[#1990FF]"></i>
                  <span>In-house visitors</span>
                </div>
                <div className="flex items-center gap-2 text-[#0A2540]">
                  <i className="ri-check-line text-xl text-[#1990FF]"></i>
                  <span>Online contacts</span>
                </div>
                <div className="flex items-center gap-2 text-[#0A2540]">
                  <i className="ri-check-line text-xl text-[#1990FF]"></i>
                  <span>Past clients</span>
                </div>
                <div className="flex items-center gap-2 text-[#0A2540]">
                  <i className="ri-check-line text-xl text-[#1990FF]"></i>
                  <span>Business network</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-96 rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://readdy.ai/api/search-image?query=professional%20business%20retreat%20with%20entrepreneurs%20networking%20at%20luxury%20venue%2C%20modern%20conference%20setting%20with%20collaborative%20atmosphere%2C%20diverse%20professionals%20exchanging%20ideas%2C%20warm%20lighting%2C%20simple%20clean%20background&width=600&height=400&seq=li3k-retreat1&orientation=landscape"
                  alt="LI3K Retreats"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Advantage */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="w-full h-96 rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://readdy.ai/api/search-image?query=business%20growth%20concept%20with%20entrepreneur%20reviewing%20financial%20charts%20showing%20upward%20growth%2C%20modern%20office%20setting%2C%20professional%20atmosphere%2C%20success%20and%20expansion%20theme%2C%20warm%20golden%20lighting%2C%20simple%20clean%20background&width=600&height=400&seq=li3k-growth1&orientation=landscape"
                  alt="Business Growth"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl font-bold text-[#0A2540] mb-6">The LI3K Business Advantage</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                LI3K offers businesses an advantage of being able to gain additional revenue for <strong>inventory, expansion, construction</strong> or other needs.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Making money available even when they would not be able to access it because of <strong>bad credit, pre-existing loans, lender credit requirements</strong>, or <strong>lack of assets for collateral or down payment</strong>. Giving them an <strong>interest-free and penalty-free injection of capital</strong>.
              </p>
              <div className="bg-[#1990FF]/5 border border-[#1990FF]/20 rounded-xl p-6">
                <h3 className="text-xl font-bold text-[#0A2540] mb-3">Ready to grow your business?</h3>
                <p className="text-gray-600 mb-4">Click below to speak with a representative or sign up today</p>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setShowRepModal(true)}
                    className="px-6 py-3 bg-[#1990FF] text-white rounded-lg font-semibold transition-all hover:bg-[#0070E0] whitespace-nowrap cursor-pointer"
                  >
                    Speak to Representative
                  </button>
                  <Link
                    to="/signup"
                    className="px-6 py-3 border-2 border-[#1990FF] text-[#1990FF] rounded-lg font-semibold transition-all hover:bg-[#1990FF]/5 whitespace-nowrap cursor-pointer"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Free Marketing Section */}
      <section className="py-20 bg-gradient-to-r from-[#0A2540] to-[#1990FF]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Free Marketing Across All Platforms</h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              LI3K also gives businesses another advantage by allowing them the ability to get free marketing of their services during our campaign
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <i className="ri-instagram-line text-5xl text-white"></i>
              </div>
              <h3 className="text-lg font-semibold text-white">Social Media</h3>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <i className="ri-radio-line text-5xl text-white"></i>
              </div>
              <h3 className="text-lg font-semibold text-white">Radio</h3>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <i className="ri-tv-line text-5xl text-white"></i>
              </div>
              <h3 className="text-lg font-semibold text-white">Television</h3>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <i className="ri-newspaper-line text-5xl text-white"></i>
              </div>
              <h3 className="text-lg font-semibold text-white">Other Media</h3>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#F8F9FA]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0A2540] mb-6">Get Started with LI3K Today</h2>
          <p className="text-xl text-gray-600 mb-10">
            Transform your professional network into a powerful revenue stream
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setShowMoreInfoModal(true)}
              className="w-full sm:w-auto px-8 py-4 border-2 border-[#0A2540] text-[#0A2540] rounded-full text-lg font-semibold transition-all hover:bg-[#0A2540] hover:text-white whitespace-nowrap cursor-pointer"
            >
              More Information
            </button>
            <button
              onClick={() => setShowRepModal(true)}
              className="w-full sm:w-auto px-8 py-4 bg-[#1990FF] text-white rounded-full text-lg font-semibold transition-all hover:bg-[#0070E0] hover:shadow-xl whitespace-nowrap cursor-pointer"
            >
              Speak to Representative
            </button>
            <Link
              to="/signup"
              className="w-full sm:w-auto px-8 py-4 bg-[#0A2540] text-white rounded-full text-lg font-semibold transition-all hover:bg-[#0A2540]/90 hover:shadow-xl whitespace-nowrap cursor-pointer"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      {/* More Information Modal */}
      {showMoreInfoModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 relative">
            <button
              onClick={() => {
                setShowMoreInfoModal(false);
                setSubmitStatus({ type: null, message: '' });
              }}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <i className="ri-close-line text-2xl"></i>
            </button>
            <h3 className="text-2xl font-bold text-[#0A2540] mb-2">Get More Information</h3>
            <p className="text-gray-600 mb-6">Enter your email and we'll send you detailed information about LI3K</p>
            
            {submitStatus.type && (
              <div className={`mb-4 p-4 rounded-lg ${submitStatus.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                {submitStatus.message}
              </div>
            )}

            <form id="li3k-more-info-form" data-readdy-form onSubmit={handleMoreInfoSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={moreInfoEmail}
                  onChange={(e) => setMoreInfoEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1990FF] focus:border-transparent outline-none transition-all"
                  placeholder="your@email.com"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-[#1990FF] text-white rounded-lg font-semibold transition-all hover:bg-[#0070E0] disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
              >
                {isSubmitting ? 'Sending...' : 'Send Me Information'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Speak to Representative Modal */}
      {showRepModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setShowRepModal(false);
                setSubmitStatus({ type: null, message: '' });
              }}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <i className="ri-close-line text-2xl"></i>
            </button>
            <h3 className="text-2xl font-bold text-[#0A2540] mb-2">Speak to a Representative</h3>
            <p className="text-gray-600 mb-6">Fill out the form and a representative will contact you shortly</p>
            
            {submitStatus.type && (
              <div className={`mb-4 p-4 rounded-lg ${submitStatus.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                {submitStatus.message}
              </div>
            )}

            <form id="li3k-rep-form" data-readdy-form onSubmit={handleRepSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={repForm.name}
                  onChange={(e) => setRepForm({ ...repForm, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1990FF] focus:border-transparent outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={repForm.email}
                  onChange={(e) => setRepForm({ ...repForm, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1990FF] focus:border-transparent outline-none transition-all"
                  placeholder="your@email.com"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={repForm.phone}
                  onChange={(e) => setRepForm({ ...repForm, phone: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1990FF] focus:border-transparent outline-none transition-all"
                  placeholder="(555) 123-4567"
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Name (Optional)</label>
                <input
                  type="text"
                  name="company"
                  value={repForm.company}
                  onChange={(e) => setRepForm({ ...repForm, company: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1990FF] focus:border-transparent outline-none transition-all"
                  placeholder="Your Company"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-[#1990FF] text-white rounded-lg font-semibold transition-all hover:bg-[#0070E0] disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
              >
                {isSubmitting ? 'Sending...' : 'Request a Call'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
