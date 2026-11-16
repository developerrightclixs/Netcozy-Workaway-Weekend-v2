import { Link } from 'react-router-dom';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import ContactSection from '../../components/feature/ContactSection';

export default function CollegesUniversitiesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=vibrant%20college%20campus%20with%20students%20walking%20between%20modern%20university%20buildings%2C%20diverse%20group%20of%20young%20people%20with%20backpacks%2C%20beautiful%20quad%20area%20with%20trees%20and%20pathways%2C%20collegiate%20atmosphere%2C%20academic%20excellence%2C%20simple%20clean%20background&width=1920&height=800&seq=college-hero-001&orientation=landscape"
            alt="College Campus Experience"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/50"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-teal-500/90 backdrop-blur-sm text-white px-6 py-2 rounded-full text-sm font-medium mb-6">
            <i className="ri-graduation-cap-line"></i>
            For Students & Universities
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Colleges &amp; Universities
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
            Enhancing the college experience with travel, events, and innovative revenue solutions
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 bg-teal-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-teal-600 transition-colors whitespace-nowrap cursor-pointer"
            >
              Get Started
              <i className="ri-arrow-right-line"></i>
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-colors whitespace-nowrap cursor-pointer border border-white/30"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* For Students Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                For Students: Travel, Fun &amp; College Experience
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                <p>
                  Travel and fun add to the college experience. They also allow you time to take a trip back home with friends or on the go.
                </p>
                <p className="text-2xl font-bold text-teal-600">
                  Don't miss a splash, cheer, or scream with Netcozy Workaway Weekend!
                </p>
                <p>
                  Your number one college social media event tickets and travel connection.
                </p>
              </div>
              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i className="ri-ticket-2-line text-2xl text-teal-600"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Free Event Tickets</h3>
                    <p className="text-gray-600">Access concerts, festivals, and sporting events with your qualifying social media account</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i className="ri-plane-line text-2xl text-teal-600"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Travel Benefits</h3>
                    <p className="text-gray-600">Enjoy free travel, hotels, and transportation to make memories with friends</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i className="ri-home-heart-line text-2xl text-teal-600"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Visit Home</h3>
                    <p className="text-gray-600">Take trips back home or explore new destinations during breaks</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="https://readdy.ai/api/search-image?query=happy%20college%20students%20traveling%20together%20with%20luggage%20at%20airport%2C%20diverse%20group%20of%20young%20friends%20excited%20for%20vacation%2C%20modern%20travel%20lifestyle%2C%20adventure%20and%20friendship%2C%20simple%20clean%20background&width=800&height=600&seq=college-students-001&orientation=landscape"
                  alt="Students Traveling"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Universities Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              For Universities: New Revenue Streams
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Netcozy Workaway Weekend's premium service LI3K offers new lines of revenue from community, student body, and faculty
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mb-6">
                <i className="ri-team-line text-3xl text-teal-600"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Student Body Monetization</h3>
              <p className="text-gray-600 leading-relaxed">
                Turn your student community into a valuable digital asset with LI3K's innovative monetization platform
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mb-6">
                <i className="ri-user-star-line text-3xl text-teal-600"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Faculty &amp; Staff Revenue</h3>
              <p className="text-gray-600 leading-relaxed">
                Generate additional revenue streams from faculty networks and professional connections
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mb-6">
                <i className="ri-community-line text-3xl text-teal-600"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Community Engagement</h3>
              <p className="text-gray-600 leading-relaxed">
                Leverage your broader community connections for institutional growth and funding
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl p-8 text-white">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold mb-6">The Future is Changing: Digital Gold Mines</h3>
              <div className="prose prose-lg max-w-none text-white/90 leading-relaxed space-y-4">
                <p>
                  Old repositories were places to store computers for use. Fast forward since the millennium and assets have switched places - new repositories are places with <strong>digital gold mines</strong> waiting to be tapped.
                </p>
                <p>
                  Universities have long been the focus of forward-thinking individuals, if not the toast of major cities and small towns. They act as a magnet - anyone from students to professors to vendors and community gravitate to them for various reasons: superior facilities and resources, culture and entertainment.
                </p>
                <p>
                  New technologies and laws are changing the way we look at payment compensation in professional sports as well as on the collegiate level. The dawn of new opportunities is here.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services for Institutions */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">
            Services for Institutions
          </h2>
          <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
            Comprehensive solutions designed specifically for colleges and universities
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Workaway Weekend Card */}
            <Link
              to="/services/workaway"
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group cursor-pointer"
            >
              <div className="relative h-64">
                <img
                  src="https://readdy.ai/api/search-image?query=college%20students%20enjoying%20weekend%20getaway%20at%20resort%2C%20group%20of%20diverse%20young%20people%20having%20fun%20at%20pool%20party%2C%20campus%20life%20and%20travel%20experience%2C%20simple%20clean%20background&width=800&height=600&seq=college-workaway-001&orientation=landscape"
                  alt="Workaway Weekend"
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-teal-500 text-white px-4 py-1.5 rounded-full text-sm font-bold whitespace-nowrap">
                  FOR STUDENTS
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Netcozy Workaway Weekend</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Your number one college social media event tickets and travel connection. Free events and travel for students with qualifying social media accounts.
                </p>
                <div className="flex items-center gap-2 text-teal-600 font-semibold">
                  Learn More
                  <i className="ri-arrow-right-line group-hover:translate-x-2 transition-transform"></i>
                </div>
              </div>
            </Link>

            {/* LI3K Card */}
            <Link
              to="/li3k"
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group cursor-pointer"
            >
              <div className="relative h-64">
                <img
                  src="https://readdy.ai/api/search-image?query=modern%20university%20administration%20building%20with%20professional%20staff%2C%20institutional%20leadership%20and%20management%2C%20academic%20excellence%20and%20innovation%2C%20simple%20clean%20background&width=800&height=600&seq=college-li3k-001&orientation=landscape"
                  alt="LI3K"
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-bold whitespace-nowrap">
                  FOR INSTITUTIONS
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900">LI3K</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  New lines of revenue from community, student body, and faculty. Monetize your institutional networks and connections with innovative digital asset solutions.
                </p>
                <div className="flex items-center gap-2 text-teal-600 font-semibold">
                  Learn More
                  <i className="ri-arrow-right-line group-hover:translate-x-2 transition-transform"></i>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Why Universities Choose Netcozy
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-4">
                <i className="ri-funds-line text-2xl text-teal-600"></i>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">New Revenue Streams</h3>
              <p className="text-gray-600 text-sm">Generate additional funding without traditional fundraising</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-4">
                <i className="ri-user-heart-line text-2xl text-teal-600"></i>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Student Satisfaction</h3>
              <p className="text-gray-600 text-sm">Enhance campus life with travel and event opportunities</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-4">
                <i className="ri-shield-check-line text-2xl text-teal-600"></i>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Zero Risk</h3>
              <p className="text-gray-600 text-sm">Free service with no upfront costs or financial obligations</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-4">
                <i className="ri-rocket-line text-2xl text-teal-600"></i>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Quick Implementation</h3>
              <p className="text-gray-600 text-sm">Get started in as little as 5-15 days</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-teal-600 mb-2">500K+</div>
              <div className="text-gray-600 font-medium">Potential Funding</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-teal-600 mb-2">5-15</div>
              <div className="text-gray-600 font-medium">Days to Access</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-teal-600 mb-2">100+</div>
              <div className="text-gray-600 font-medium">Partner Universities</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-teal-600 mb-2">24/7</div>
              <div className="text-gray-600 font-medium">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-teal-500 to-teal-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Institution?
          </h2>
          <p className="text-xl text-teal-50 mb-8 leading-relaxed">
            Join forward-thinking universities already leveraging Netcozy's innovative solutions for students and institutional growth.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="tel:+12136310859"
              className="inline-flex items-center gap-2 bg-white text-teal-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer"
            >
              <i className="ri-phone-line"></i>
              Call 213-631-0859
            </a>
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-colors whitespace-nowrap cursor-pointer border border-white/30"
            >
              Get Started Today
              <i className="ri-arrow-right-line"></i>
            </Link>
          </div>
        </div>
      </section>

      <ContactSection category="Colleges & Universities" />

      <Footer />
    </div>
  );
}
