import { Link } from 'react-router-dom';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import ContactSection from '../../components/feature/ContactSection';

export default function PoliticiansPage() {
  const benefits = [
    {
      icon: 'ri-group-line',
      title: 'Monetize Your Support Base',
      description: 'Turn your supporters, donors, and campaign contacts into new revenue streams — online and in your community.'
    },
    {
      icon: 'ri-megaphone-line',
      title: 'Campaigns & Fundraisers',
      description: 'Turn rallies, town halls, and fundraising events into opportunities that grow your network and reach.'
    },
    {
      icon: 'ri-user-heart-line',
      title: 'Strengthen Community Ties',
      description: 'Bring life to your district with events that connect constituents, local businesses, and community partners.'
    },
    {
      icon: 'ri-verified-badge-line',
      title: 'LI3K Premium Service',
      description: 'Our premium service helps public figures create digital assets and monetize contacts and interactions.'
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
              <span className="text-white font-medium whitespace-nowrap text-sm sm:text-base">Politicians &amp; Public Figures</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6">Politicians &amp; Public Figures</h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 leading-relaxed">
              Turn your public reach, supporters, and community connections into new revenue streams — while keeping the focus on the people you serve.
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
              Public life is built on people. Every supporter, donor, constituent, and community partner you meet is part of a network that holds real value — and Netcozy Workaway Weekend is your entertainment and event connection for turning that value into opportunity.
            </p>
            <p>
              From town halls and fundraisers to community events and celebrations, we help politicians and public figures bring energy to their districts, reward the people who show up, and build goodwill that lasts well beyond election season.
            </p>
            <p>
              With our premium service <strong>LI3K</strong>, you can go further — monetizing your online and in-person interactions, creating digital assets from your network, and unlocking new lines of revenue from the very people who already believe in your work.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-14 sm:py-20 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0A2540] text-center mb-8 sm:mb-12">Built for Public Figures</h2>
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
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0A2540] mb-6">New Meaning to Social Graces</h2>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-5">
                Being community-partner-centric and people-friendly can translate into real dollars. Netcozy Workaway Weekend brings all-new meaning to the words <strong>social graces</strong> — the work weekend, all week long.
              </p>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                Whether it's rewarding loyal supporters with unforgettable experiences, hosting events that draw crowds to your city center, or simply strengthening the bonds that keep a community moving forward, we're here to help.
              </p>
            </div>
            <div className="relative h-72 sm:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://readdy.ai/api/search-image?query=elegant%20political%20fundraising%20dinner%20event%20with%20diverse%20professionals%20networking%20in%20formal%20attire%2C%20warm%20ambient%20lighting%2C%20sophisticated%20banquet%20hall%20with%20flags%20and%20floral%20arrangements%2C%20community%20leadership%20atmosphere%2C%20simple%20clean%20background%2C%20professional%20event%20photography&width=640&height=480&seq=politicians-value&orientation=landscape"
                alt="Community event"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </div>
      </section>

      <ContactSection category="Politicians & Public Figures" />

      <Footer />
    </div>
  );
}