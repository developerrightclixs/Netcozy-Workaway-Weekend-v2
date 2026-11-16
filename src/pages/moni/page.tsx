import { useState } from 'react';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';

const BILLIE_IMG = 'https://storage.readdy-site.link/project_files/029ac680-786b-4603-9848-08fb20ae4f30/2452e949-e382-4850-9c45-eeea97912c09_image-7.png?v=7c35bf3f4fdf1d96c8913d589c39e989';

export default function MoniPage() {
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [infoFormData, setInfoFormData] = useState({ email: '' });
  const [appointmentFormData, setAppointmentFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    message: ''
  });
  const [infoSubmitting, setInfoSubmitting] = useState(false);
  const [appointmentSubmitting, setAppointmentSubmitting] = useState(false);
  const [infoSuccess, setInfoSuccess] = useState(false);
  const [appointmentSuccess, setAppointmentSuccess] = useState(false);

  const handleInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setInfoSubmitting(true);
    try {
      const formData = new URLSearchParams();
      formData.append('email', infoFormData.email);
      const response = await fetch('https://readdy.ai/api/form/d62gr30r3m6fkobknt1g', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString(),
      });
      if (response.ok) {
        setInfoSuccess(true);
        setInfoFormData({ email: '' });
        setTimeout(() => { setShowInfoModal(false); setInfoSuccess(false); }, 2000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setInfoSubmitting(false);
    }
  };

  const handleAppointmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAppointmentSubmitting(true);
    try {
      const formData = new URLSearchParams();
      formData.append('name', appointmentFormData.name);
      formData.append('email', appointmentFormData.email);
      formData.append('phone', appointmentFormData.phone);
      formData.append('preferredDate', appointmentFormData.preferredDate);
      formData.append('message', appointmentFormData.message);
      const response = await fetch('https://readdy.ai/api/form/d62gr30r3m6fkobknt20', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString(),
      });
      if (response.ok) {
        setAppointmentSuccess(true);
        setAppointmentFormData({ name: '', email: '', phone: '', preferredDate: '', message: '' });
        setTimeout(() => { setShowAppointmentModal(false); setAppointmentSuccess(false); }, 2000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setAppointmentSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[680px] flex items-center">
        {/* Billie Eilish concert background */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src={BILLIE_IMG}
            alt="Billie Eilish concert performance with crowd holding cameras"
            className="w-full h-full object-cover object-bottom"
            style={{ display: 'block' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/30 to-black/60" />
        </div>

        <div className="relative w-full max-w-6xl mx-auto px-6 text-center pt-32 pb-24">
          <h1 className="text-8xl font-bold text-white tracking-tight mb-6">
            MONI
          </h1>
          <p className="text-3xl text-white/95 mb-6 font-semibold">
            Monetization Solutions for Celebrities, Influencers &amp; Public Figures
          </p>
          <p className="text-xl text-white/80 leading-relaxed max-w-4xl mx-auto">
            MONI is the premium service of Netcozy Workaway Weekend for celebrities, influencers, politicians and public figures. Monetize your fan base, following, and voter base with unprecedented earning potential.
          </p>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Why Choose MONI?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-emerald-50 to-white p-8 rounded-xl border border-emerald-100">
              <div className="w-14 h-14 bg-emerald-500 rounded-lg flex items-center justify-center mb-6">
                <i className="ri-money-dollar-circle-line text-2xl text-white"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Higher Earnings</h3>
              <p className="text-gray-700 leading-relaxed">
                Earn $30 to $100 per person versus streaming&apos;s $4,000 per million streams.
                That&apos;s $200,000 to $600,000 for just 6,000 people.
              </p>
            </div>
            <div className="bg-gradient-to-br from-teal-50 to-white p-8 rounded-xl border border-teal-100">
              <div className="w-14 h-14 bg-teal-500 rounded-lg flex items-center justify-center mb-6">
                <i className="ri-time-line text-2xl text-white"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Fast Access</h3>
              <p className="text-gray-700 leading-relaxed">
                Receive funds in as little as 5 to 15 days, with additional amounts every 30 days.
                Get all at once or on a flexible payment schedule.
              </p>
            </div>
            <div className="bg-gradient-to-br from-cyan-50 to-white p-8 rounded-xl border border-cyan-100">
              <div className="w-14 h-14 bg-cyan-500 rounded-lg flex items-center justify-center mb-6">
                <i className="ri-group-line text-2xl text-white"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Grow Your Audience</h3>
              <p className="text-gray-700 leading-relaxed">
                Gain new audiences through free event tickets and travel for fans, plus promotion across
                social media, radio, television and other platforms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who Benefits */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Who Can Benefit from MONI?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: 'ri-music-line', title: 'Musicians & Artists', desc: 'Supplement royalties and fill gaps in recurring payments' },
              { icon: 'ri-movie-line', title: 'Actors & Performers', desc: 'Monetize your career audience and fan base' },
              { icon: 'ri-star-line', title: 'Celebrities & Influencers', desc: 'Turn your following into substantial income' },
              { icon: 'ri-government-line', title: 'Politicians', desc: 'Monetize your voter base and supporters' },
              { icon: 'ri-user-star-line', title: 'Agents & Managers', desc: 'Benefit from campaigns for your clients' },
              { icon: 'ri-megaphone-line', title: 'Media Figures', desc: 'Leverage your public presence' },
              { icon: 'ri-trophy-line', title: 'Athletes', desc: 'Monetize your fan following' },
              { icon: 'ri-mic-line', title: 'Content Creators', desc: 'Turn your audience into revenue' }
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 hover:border-emerald-300 transition-all hover:shadow-lg">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <i className={`${item.icon} text-xl text-emerald-600`}></i>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Earning Potential */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-12 text-white">
            <h2 className="text-4xl font-bold mb-8 text-center">Your Earning Potential</h2>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
                <div className="text-5xl font-bold mb-4">1M</div>
                <div className="text-xl mb-2">Fans/Followers</div>
                <div className="text-3xl font-bold mb-2">$30M - $100M</div>
                <p className="text-emerald-100">Total earning potential</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
                <div className="text-5xl font-bold mb-4">30-Day</div>
                <div className="text-xl mb-2">Payment Cycle Option</div>
                <div className="text-3xl font-bold mb-2">$2.5M+</div>
                <p className="text-emerald-100">Per month potential</p>
              </div>
            </div>
            <div className="text-center">
              <p className="text-lg leading-relaxed max-w-3xl mx-auto">
                With a million fans, followers, or contacts, you could be eligible for $30 million to $100 million.
                Receive it all at once, half, a quarter, or on a 30-day cycle. Channel funds into new recordings,
                extended tours, equipment, press activities, or enhance your lifestyle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">MONI vs Traditional Revenue</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
                  <i className="ri-close-line text-2xl text-white"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Traditional Streaming</h3>
              </div>
              <div className="space-y-4">
                {['$4,000 per 1 million streams', 'Limited control over earnings', 'Delayed payments', 'No audience growth support'].map((t) => (
                  <div key={t} className="flex items-start gap-3">
                    <i className="ri-arrow-right-line text-red-500 mt-1"></i>
                    <p className="text-gray-700">{t}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-emerald-50 border-2 border-emerald-300 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center">
                  <i className="ri-check-line text-2xl text-white"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">MONI</h3>
              </div>
              <div className="space-y-4">
                {['$30-$100 per person ($200K-$600K for 6,000 people)', 'Flexible payment schedules', 'Fast access (5-15 days)', 'Free marketing & audience growth'].map((t) => (
                  <div key={t} className="flex items-start gap-3">
                    <i className="ri-arrow-right-line text-emerald-600 mt-1"></i>
                    <p className="text-gray-700">{t}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-6">Complete Financial Solutions</h2>
          <p className="text-center text-gray-600 mb-16 max-w-3xl mx-auto">
            Access to licensing our system and services from Netcozy Holdings Inc and its subsidiaries,
            along with other services for financing and financial products.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: 'ri-home-4-line', title: 'Netcozy 50 Homes', desc: 'Luxury properties and real estate' },
              { icon: 'ri-building-line', title: 'Real Estate Development', desc: 'Purchase and development financing' },
              { icon: 'ri-ship-line', title: 'Yachts', desc: 'Luxury yacht financing' },
              { icon: 'ri-plane-line', title: 'Aircraft', desc: 'Private aircraft financing' },
              { icon: 'ri-car-line', title: 'Supercars', desc: 'Luxury vehicle financing' },
              { icon: 'ri-steering-2-line', title: 'Netcozy 20/50 Motorsports', desc: 'Motorsports financing' },
              { icon: 'ri-links-line', title: 'LI3K', desc: 'Business monetization solutions' },
              { icon: 'ri-briefcase-line', title: 'Financial Products', desc: 'Comprehensive financial services' }
            ].map((item, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-200 hover:border-emerald-300 transition-all">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <i className={`${item.icon} text-xl text-emerald-600`}></i>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-emerald-500 to-teal-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Monetize Your Influence?</h2>
          <p className="text-xl text-emerald-50 mb-12">Join MONI today and unlock your earning potential. Get started in minutes.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => setShowInfoModal(true)} className="px-8 py-4 bg-white text-emerald-600 rounded-lg font-semibold hover:bg-emerald-50 transition-all whitespace-nowrap cursor-pointer">
              Request More Information
            </button>
            <button onClick={() => setShowAppointmentModal(true)} className="px-8 py-4 bg-emerald-700 text-white rounded-lg font-semibold hover:bg-emerald-800 transition-all whitespace-nowrap cursor-pointer">
              Set Up an Appointment
            </button>
            <a href="/signup" className="px-8 py-4 bg-teal-500 text-white rounded-lg font-semibold hover:bg-teal-600 transition-all whitespace-nowrap cursor-pointer inline-block">
              Sign Up Today
            </a>
          </div>
        </div>
      </section>

      {/* Info Modal */}
      {showInfoModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 relative">
            <button onClick={() => setShowInfoModal(false)} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer">
              <i className="ri-close-line text-2xl"></i>
            </button>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Request More Information</h3>
            {infoSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-check-line text-3xl text-emerald-600"></i>
                </div>
                <p className="text-lg text-gray-700">Thank you! We&apos;ll send you more information soon.</p>
              </div>
            ) : (
              <form onSubmit={handleInfoSubmit} data-readdy-form id="moni-info-form">
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email" name="email" required
                    value={infoFormData.email}
                    onChange={(e) => setInfoFormData({ email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
                    placeholder="your@email.com"
                  />
                </div>
                <button type="submit" disabled={infoSubmitting} className="w-full px-6 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-all disabled:opacity-50 whitespace-nowrap cursor-pointer">
                  {infoSubmitting ? 'Submitting...' : 'Submit Request'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Appointment Modal */}
      {showAppointmentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setShowAppointmentModal(false)} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer">
              <i className="ri-close-line text-2xl"></i>
            </button>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Set Up an Appointment</h3>
            {appointmentSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-check-line text-3xl text-emerald-600"></i>
                </div>
                <p className="text-lg text-gray-700">Thank you! We&apos;ll contact you soon to confirm your appointment.</p>
              </div>
            ) : (
              <form onSubmit={handleAppointmentSubmit} data-readdy-form id="moni-appointment-form">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                    <input type="text" name="name" required value={appointmentFormData.name}
                      onChange={(e) => setAppointmentFormData({ ...appointmentFormData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                    <input type="email" name="email" required value={appointmentFormData.email}
                      onChange={(e) => setAppointmentFormData({ ...appointmentFormData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm" placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                    <input type="tel" name="phone" required value={appointmentFormData.phone}
                      onChange={(e) => setAppointmentFormData({ ...appointmentFormData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm" placeholder="(555) 123-4567" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Date</label>
                    <input type="date" name="preferredDate" required value={appointmentFormData.preferredDate}
                      onChange={(e) => setAppointmentFormData({ ...appointmentFormData, preferredDate: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Message (Optional)</label>
                    <textarea name="message" value={appointmentFormData.message} maxLength={500} rows={4}
                      onChange={(e) => setAppointmentFormData({ ...appointmentFormData, message: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm resize-none"
                      placeholder="Tell us about your needs..."></textarea>
                    <p className="text-xs text-gray-500 mt-1">Maximum 500 characters</p>
                  </div>
                </div>
                <button type="submit" disabled={appointmentSubmitting} className="w-full mt-6 px-6 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-all disabled:opacity-50 whitespace-nowrap cursor-pointer">
                  {appointmentSubmitting ? 'Submitting...' : 'Schedule Appointment'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
