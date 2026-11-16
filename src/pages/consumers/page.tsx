import { Link } from 'react-router-dom';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import ContactSection from '../../components/feature/ContactSection';

export default function ConsumersPage() {
  const experienceCards = [
    {
      icon: 'ri-ship-2-line',
      title: 'Cruises to the Tropics',
      description:
        'Sail away to sun-soaked destinations and turn your time off into something unforgettable.',
      accent: 'from-[#FF6B6B] to-[#FF8E53]',
    },
    {
      icon: 'ri-music-2-line',
      title: 'Concerts & Cultural Events',
      description:
        'Trips across the US or Europe for concerts, cultural, and sporting events — any event you love.',
      accent: 'from-[#F59E0B] to-[#FBBF24]',
    },
    {
      icon: 'ri-heart-3-line',
      title: 'Weddings & Celebrations',
      description:
        'Good for weddings and events all year long — spring break, summer, and every moment in between.',
      accent: 'from-[#10B981] to-[#34D399]',
    },
    {
      icon: 'ri-vip-diamond-line',
      title: 'Your Choice, Your Level',
      description:
        'Your choice, your travel and events at your level. Spice up a business trip or fire up the next frat or sorority.',
      accent: 'from-[#8B5CF6] to-[#A78BFA]',
    },
  ];

  const steps = [
    {
      icon: 'ri-linkedin-box-line',
      title: 'Have a Qualifying LinkedIn Account',
      description:
        'All you need is a qualifying LinkedIn account. No blue collar, no tie required — you can be a boss or become a boss.',
    },
    {
      icon: 'ri-user-add-line',
      title: 'Sign Up',
      description:
        'Sign up to see all the ways Netcozy Workaway Weekend can get you through your week.',
    },
    {
      icon: 'ri-gift-2-line',
      title: 'Never Reach in Your Wallet',
      description:
        'It\u2019s on our associates and us! Enjoy the party, travel, and events without opening your wallet once.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=group%20of%20happy%20young%20friends%20celebrating%20and%20partying%20at%20a%20vibrant%20tropical%20resort%20poolside%2C%20confetti%20and%20warm%20golden%20lighting%2C%20joyful%20lifestyle%20with%20tropical%20palm%20trees%20and%20ocean%20view%2C%20energetic%20celebration%20atmosphere%2C%20premium%20travel%20experience%2C%20simple%20clean%20background&width=1920&height=800&seq=consumer-hero-001&orientation=landscape"
            alt="Consumers"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-[#FF6B6B]/90 backdrop-blur-sm text-white px-6 py-2 rounded-full text-sm font-medium mb-6">
            <i className="ri-user-smile-line"></i>
            For Everyone Who Loves to Live It Up
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Welcome to Netcozy Workaway Weekend
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
            Trade your time off and nothing to do for something from the time you put in the work week.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 bg-[#FF6B6B] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#FF5252] transition-colors whitespace-nowrap cursor-pointer"
            >
              Sign Up
              <i className="ri-arrow-right-line"></i>
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-colors whitespace-nowrap cursor-pointer border border-white/30"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              Welcome to Netcozy Workaway Weekend! Where you can trade time off and nothing to do for
              something from the time that you put in the work week. You don&apos;t have to be blue
              collar or wear a tie — with Netcozy Workaway Weekend you can be a boss or become a boss
              getting paid to party with your friends.
            </p>

            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              If you like cruises to the tropics, trips across the US or Europe for concerts, cultural,
              and sporting events — or any event — we are your entertainment and concert connection.
              We&apos;re all about partying and the things that get you through the day.
            </p>

            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              But not only that, Netcozy Workaway Weekend is good for weddings and events all year long
              — spring break and summer. Your choice, your travel and events at your level. Spice up
              your business trip or add a little flavor to the next frat or sorority, or enjoy a little
              good time off.
            </p>

            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              <strong className="text-[#FF6B6B]">And never reach in your wallet once!</strong> It&apos;s
              on our associates and us! All you need is a qualifying LinkedIn account. Sign up to see
              all the ways that can get you through your week with Netcozy Workaway Weekend.
            </p>
          </div>
        </div>
      </section>

      {/* Experience Cards */}
      <section className="py-20 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0A2540] mb-4">
              Your Entertainment &amp; Event Connection
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From tropical cruises to concerts and celebrations — we&apos;ve got the good times covered.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {experienceCards.map((card, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex items-start gap-6"
              >
                <div
                  className={`w-16 h-16 shrink-0 bg-gradient-to-br ${card.accent} rounded-xl flex items-center justify-center`}
                >
                  <i className={`${card.icon} text-3xl text-white`}></i>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#0A2540] mb-3">{card.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-[#0A2540] text-center mb-16">
            Getting Started Is Easy
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative w-20 h-20 bg-gradient-to-br from-[#FF6B6B] to-[#FF8E53] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <i className={`${step.icon} text-4xl text-white`}></i>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#0A2540] text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[#0A2540] mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Representative Banner */}
      <section className="py-20 bg-[#F8F9FA]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="relative rounded-3xl overflow-hidden shadow-xl">
            <div className="relative h-72">
              <img
                src="https://readdy.ai/api/search-image?query=young%20brand%20ambassador%20enjoying%20a%20premium%20party%20lifestyle%20with%20friends%2C%20being%20paid%20to%20celebrate%20and%20network%20at%20an%20exclusive%20event%2C%20vibrant%20energetic%20atmosphere%20with%20warm%20lighting%20and%20confetti%2C%20aspirational%20social%20lifestyle%2C%20simple%20clean%20background&width=1200&height=600&seq=consumer-brandrep-001&orientation=landscape"
                alt="Become a Brand Representative"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20"></div>
            </div>
            <div className="absolute inset-0 flex items-center">
              <div className="relative max-w-xl px-8 md:px-12">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Become a Brand Representative
                </h3>
                <p className="text-lg text-white/90 mb-6">
                  Get paid to party with your friends. Turn your good time into a real income.
                </p>
                <Link
                  to="/signup"
                  className="inline-flex items-center gap-2 bg-white text-[#FF6B6B] px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap cursor-pointer"
                >
                  Get Started
                  <i className="ri-arrow-right-line"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#FF6B6B] to-[#FF3D8E]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            Ready to Get You Through Your Week?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Sign up or sign in to see all the ways Netcozy Workaway Weekend can turn your time off into
            something unforgettable.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 bg-white text-[#FF6B6B] px-10 py-4 rounded-full text-lg font-bold transition-all hover:shadow-2xl hover:scale-105 whitespace-nowrap cursor-pointer"
            >
              Sign Up
              <i className="ri-arrow-right-line"></i>
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 border-2 border-white text-white px-10 py-4 rounded-full text-lg font-bold transition-all hover:bg-white/10 whitespace-nowrap cursor-pointer"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      <ContactSection category="Consumers" />

      <Footer />
    </div>
  );
}