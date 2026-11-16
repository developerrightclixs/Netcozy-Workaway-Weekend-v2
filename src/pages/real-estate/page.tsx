import { Link } from 'react-router-dom';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import ContactSection from '../../components/feature/ContactSection';

export default function RealEstatePage() {
  const benefits = [
    {
      icon: 'ri-user-heart-line',
      title: 'Monetize Client Relationships',
      description: 'Turn your buyer, seller, and tenant relationships into ongoing revenue — beyond the closing table.'
    },
    {
      icon: 'ri-exchange-funds-line',
      title: 'Referrals & Past Transactions',
      description: 'Unlock value from referrals and past deals by converting your network into new revenue streams.'
    },
    {
      icon: 'ri-home-smile-line',
      title: 'Open Houses & Listings',
      description: 'Bring energy to open houses and listing events that draw visitors and build your local presence.'
    },
    {
      icon: 'ri-verified-badge-line',
      title: 'LI3K Premium Service',
      description: 'Our premium service helps agents and brokers create digital assets and monetize contacts and interactions.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0A2540] to-[#1990FF] text-white pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 md:pb-24">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <Link to="/" className="text-white/80 hover:text-white transition-colors whitespace-nowrap text-sm sm:text-base">Home</Link>
              <i className="ri-arrow-right-s-line text-white/60"></i>
              <span className="text-white font-medium whitespace-nowrap text-sm sm:text-base">Real Estate</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6">Real Estate Professionals</h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 leading-relaxed">
              Monetize your client relationships, referrals, and property network — beyond the closing table.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <a href="#contact" className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-[#1990FF] rounded-lg text-base sm:text-lg font-bold hover:bg-gray-100 transition-colors whitespace-nowrap text-center cursor-pointer">
                Inquire With Us
              </a>
              <Link to="/signup" className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-white text-white rounded-lg text-base sm:text-lg font-bold hover:bg-white/10 transition-colors whitespace-nowrap text-center">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-lg sm:text-xl text-gray-700 leading-relaxed space-y-5">
            <p>
              Real estate is a relationship business. Every buyer, seller, tenant, and past client represents a network that holds real value — and Netcozy Workaway Weekend is your entertainment and event connection for turning that value into opportunity.
            </p>
            <p>
              Whether you're rewarding a loyal client, celebrating a closing, or hosting an open house that draws a crowd, we help agents and brokers bring life to their listings and their local communities.
            </p>
            <p>
              With our premium service <strong>LI3K</strong>, you can go further — monetizing your online and in-person interactions, creating digital assets from your network, and unlocking new lines of revenue from the very people who already trust you with their biggest transactions.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-14 sm:py-20 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0A2540] text-center mb-8 sm:mb-12">Built for Real Estate</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                <div className="w-14 h-14 bg-[#1990FF]/10 rounded-xl flex items-center justify-center mb-5">
                  <i className={`${benefit.icon} text-2xl sm:text-3xl text-[#1990FF]`}></i>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#0A2540] mb-3">{benefit.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="relative h-72 sm:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-xl order-2 lg:order-1">
              <img
                src="https://readdy.ai/api/search-image?query=modern%20real%20estate%20agent%20showing%20luxury%20home%20to%20happy%20couple%2C%20bright%20open%20living%20space%20with%20floor%20to%20ceiling%20windows%2C%20professional%20staging%2C%20warm%20natural%20light%2C%20premium%20residential%20property%20tour%2C%20simple%20clean%20background%2C%20professional%20photography&width=640&height=480&seq=realestate-value&orientation=landscape"
                alt="Real estate client"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0A2540] mb-6">Beyond the Closing Table</h2>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-5">
                A closed deal is the start of a relationship, not the end of it. Netcozy Workaway Weekend gives you new ways to stay connected with clients, reward referrals, and turn your community presence into real dollars.
              </p>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                From celebrations and open houses to exclusive client experiences, we're your connection for making every property and every relationship work harder for you.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ContactSection category="Real Estate" />

      <Footer />
    </div>
  );
}