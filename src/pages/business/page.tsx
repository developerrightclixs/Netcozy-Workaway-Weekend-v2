import { Link } from 'react-router-dom';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import ContactSection from '../../components/feature/ContactSection';

export default function BusinessPage() {
  const benefits = [
    {
      icon: 'ri-line-chart-line',
      title: 'Monetize In-House & Online Visitors',
      description:
        'Get paid not just from client transactions and associate deals, but from interactions online and at your place of business.',
      accent: 'from-[#F59E0B] to-[#FBBF24]',
    },
    {
      icon: 'ri-gift-2-line',
      title: 'Diversify Employee Programs',
      description:
        'Offer flexibility and peace of mind while diversifying employee programs and benefits. A built-in party with serious business muscle.',
      accent: 'from-[#10B981] to-[#34D399]',
    },
    {
      icon: 'ri-building-4-line',
      title: 'Bring Life to Your City',
      description:
        'Events that draw and bring life to your city centers, turning community partner centric and customer friendly into real dollars.',
      accent: 'from-[#FF6B6B] to-[#FF8E53]',
    },
  ];

  const perks = [
    {
      icon: 'ri-music-2-line',
      title: 'Kiss or Rolling Stones Night',
      description:
        'A Kiss or Rolling Stones night in Las Vegas for everyone as extras, with hot dogs and lemonade.',
    },
    {
      icon: 'ri-basketball-line',
      title: 'Lakers Game in LA',
      description:
        'Seats at the Lakers game in LA, plus flight and Hilton, when they sign up for Netcozy Workaway Weekend.',
    },
    {
      icon: 'ri-user-heart-line',
      title: 'Happy Endings & Local Nightlife',
      description:
        'Not only gives them a happy ending, but spices up your local nightlife with memorable events.',
    },
  ];

  const offerings = [
    {
      icon: 'ri-calendar-check-line',
      title: 'Netcozy Workaway Weekend',
      tag: 'THE WORK WEEKEND',
      description:
        "The work weekend all week long. Flexibility, peace of mind, and diversified employee programs for your business.",
    },
    {
      icon: 'ri-group-line',
      title: 'Customer & Employee Services',
      tag: 'GROW YOUR CIRCLE',
      description:
        'Employees get the chance to make extra money online and increase their social circle.',
    },
    {
      icon: 'ri-bank-line',
      title: 'LI3K — Premium Financial Services',
      tag: 'MONETIZE',
      description:
        'Business contact and employee monetization through our premium financial services.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=modern%20professionals%20networking%20at%20an%20elegant%20corporate%20event%20with%20warm%20golden%20lighting%2C%20diverse%20business%20people%20shaking%20hands%20and%20celebrating%2C%20upscale%20city%20venue%20with%20skyline%20views%2C%20premium%20business%20atmosphere%2C%20energetic%20yet%20sophisticated%2C%20simple%20clean%20background&width=1920&height=800&seq=business-hero-001&orientation=landscape"
            alt="Netcozy Workaway Weekend for Business"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-[#F59E0B]/90 backdrop-blur-sm text-white px-6 py-2 rounded-full text-sm font-medium mb-6">
            <i className="ri-building-line"></i>
            For Businesses
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Netcozy Workaway Weekend for Business
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
            A built-in party with serious business muscle. Flexibility, peace of mind, and diversified
            employee programs for your business.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 bg-[#F59E0B] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#D97706] transition-colors whitespace-nowrap cursor-pointer"
            >
              Inquire With Us
              <i className="ri-arrow-right-line"></i>
            </Link>
            <Link
              to="/li3k"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-colors whitespace-nowrap cursor-pointer border border-white/30"
            >
              Explore LI3K
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              Netcozy Workaway Weekend for businesses offers flexibility and peace of mind, as well as
              diversifies employee programs and benefits for your business. It&apos;s like a built-in
              party with serious business muscle — Netcozy Workaway Weekend and its premium service{' '}
              <strong className="text-[#F59E0B]">LI3K</strong> (pronounced &ldquo;Like&rdquo;).
            </p>

            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              Businesses survive and thrive off of new business, thankful patrons, and successful
              partnerships and associations. Now you not only get paid from client transactions and
              associate deals, but from interactions online and at your place of business.
            </p>

            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              Your business can have things like a <strong>Kiss or Rolling Stones night</strong> in Las
              Vegas for everyone as extras with hot dogs and lemonade — or get them seats at the{' '}
              <strong>Lakers game in LA</strong>, flight and Hilton, when they sign up for Netcozy
              Workaway Weekend and have a qualifying LinkedIn account (or start one today).
            </p>

            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              Not only does it give them a happy ending, but it also spices up your local nightlife with
              events that can draw and bring life to your city centers. So being community-partner
              centric and customer friendly can translate into real dollars.{' '}
              <strong className="text-[#F59E0B]">
                Netcozy Workaway Weekend brings all-new meaning to the words &ldquo;social graces.&rdquo;
              </strong>{' '}
              It&apos;s the work weekend, all week long.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0A2540] mb-4">
              Built for Your Bottom Line
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              New business, thankful patrons, and successful partnerships — translated into real dollars.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${benefit.accent} rounded-xl flex items-center justify-center mb-6`}
                >
                  <i className={`${benefit.icon} text-3xl text-white`}></i>
                </div>
                <h3 className="text-2xl font-bold text-[#0A2540] mb-3">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0A2540] mb-4">
              Extras That Wow Your People
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Memorable experiences that turn customers into fans and employees into advocates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {perks.map((perk, index) => (
              <div
                key={index}
                className="text-center group p-8 rounded-2xl hover:bg-[#F8F9FA] transition-colors duration-300"
              >
                <div className="relative w-20 h-20 bg-gradient-to-br from-[#F59E0B] to-[#FBBF24] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <i className={`${perk.icon} text-4xl text-white`}></i>
                </div>
                <h3 className="text-xl font-bold text-[#0A2540] mb-3">{perk.title}</h3>
                <p className="text-gray-600 leading-relaxed">{perk.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offerings */}
      <section className="py-20 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0A2540] mb-4">Inquire With Us For</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the solution that fits your business — or combine them all.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {offerings.map((offering, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={
                      index === 0
                        ? 'https://readdy.ai/api/search-image?query=elegant%20corporate%20celebration%20event%20with%20professionals%20enjoying%20a%20premium%20party%2C%20warm%20golden%20lighting%2C%20sophisticated%20venue%2C%20business%20networking%20and%20leisure%20combined%2C%20simple%20clean%20background&width=600&height=400&seq=business-offer-001&orientation=landscape'
                        : index === 1
                        ? 'https://readdy.ai/api/search-image?query=diverse%20happy%20employees%20networking%20and%20building%20social%20connections%20at%20a%20lively%20professional%20event%2C%20warm%20ambient%20lighting%2C%20collaborative%20energetic%20atmosphere%2C%20simple%20clean%20background&width=600&height=400&seq=business-offer-002&orientation=landscape'
                        : 'https://readdy.ai/api/search-image?query=premium%20financial%20services%20concept%20with%20business%20professionals%20reviewing%20growth%20and%20monetization%2C%20elegant%20office%20setting%2C%20golden%20accents%2C%20success%20and%20wealth%2C%20simple%20clean%20background&width=600&height=400&seq=business-offer-003&orientation=landscape'
                    }
                    alt={offering.title}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  <span className="absolute top-4 left-4 px-4 py-1.5 bg-[#F59E0B] text-white text-xs font-bold rounded-full whitespace-nowrap">
                    {offering.tag}
                  </span>
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <i className={`${offering.icon} text-3xl text-[#F59E0B]`}></i>
                    <h3 className="text-2xl font-bold text-[#0A2540]">{offering.title}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed flex-1">{offering.description}</p>
                  <Link
                    to="/signup"
                    className="inline-flex items-center gap-2 text-[#F59E0B] font-semibold mt-6 hover:text-[#D97706] transition-colors cursor-pointer"
                  >
                    Inquire Now
                    <i className="ri-arrow-right-line"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#F59E0B] to-[#FF8E53]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            Bring All-New Meaning to Social Graces
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Turn community partnership and customer friendliness into real dollars. It&apos;s the work
            weekend, all week long.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 bg-white text-[#F59E0B] px-10 py-4 rounded-full text-lg font-bold transition-all hover:shadow-2xl hover:scale-105 whitespace-nowrap cursor-pointer"
            >
              Inquire With Us
              <i className="ri-arrow-right-line"></i>
            </Link>
            <Link
              to="/li3k"
              className="inline-flex items-center gap-2 border-2 border-white text-white px-10 py-4 rounded-full text-lg font-bold transition-all hover:bg-white/10 whitespace-nowrap cursor-pointer"
            >
              Explore LI3K
            </Link>
          </div>
        </div>
      </section>

      <ContactSection category="Businesses" />

      <Footer />
    </div>
  );
}