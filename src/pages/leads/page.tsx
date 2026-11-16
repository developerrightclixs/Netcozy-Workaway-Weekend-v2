import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { fetchMyProfile, getCurrentUser } from '../../lib/api';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';

export default function LeadsPage() {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    interest: 'general',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const checkUser = async () => {
      const currentUser = await getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
        const { data } = await fetchMyProfile();
        if (data?.profile) {
          setUserProfile(data.profile);
        }
      }
    };
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
        fetchMyProfile().then(({ data }) => {
          if (data?.profile) setUserProfile(data.profile);
        });
      } else {
        setUser(null);
        setUserProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setUserProfile(null);
    setShowUserMenu(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('loading');

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitStatus('success');
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        company: '',
        interest: 'general',
        message: ''
      });

      setTimeout(() => {
        setSubmitStatus('idle');
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 3000);
    }
  };

  const handleAlphaOnly = (value: string) => value.replace(/[^a-zA-Z\s]/g, '');
  const handleNumericOnly = (value: string) => value.replace(/[^0-9]/g, '');

  const features = [
    {
      icon: 'ri-user-add-line',
      title: 'Lead Capture',
      description: 'Capture leads directly from your website with customizable forms'
    },
    {
      icon: 'ri-mail-send-line',
      title: 'Email Marketing',
      description: 'Automated email campaigns to nurture and convert leads'
    },
    {
      icon: 'ri-line-chart-line',
      title: 'Analytics',
      description: 'Track and analyze your lead generation performance'
    },
    {
      icon: 'ri-customer-service-line',
      title: 'CRM Integration',
      description: 'Seamlessly integrate with your existing CRM system'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-[#8B5CF6] to-[#A78BFA]">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-6xl font-bold text-white mb-4">Lead Generation</h1>
            <p className="text-2xl text-white/90">Professional lead generation services</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0A2540] mb-4">Powerful Lead Generation Tools</h2>
            <p className="text-xl text-gray-600">Everything you need to capture and convert leads</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-[#8B5CF6] to-[#A78BFA] rounded-2xl mx-auto mb-4">
                  <i className={`${feature.icon} text-3xl text-white`}></i>
                </div>
                <h3 className="text-xl font-bold text-[#0A2540] mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-[#F8F9FA]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-3xl shadow-2xl p-12">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-[#0A2540] mb-4">Get Started Today</h2>
              <p className="text-xl text-gray-600">Fill out the form below and we'll get back to you shortly</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: handleAlphaOnly(e.target.value) })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-[#8B5CF6] transition-colors"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-[#8B5CF6] transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: handleNumericOnly(e.target.value) })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-[#8B5CF6] transition-colors"
                    placeholder="5551234567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-[#8B5CF6] transition-colors"
                    placeholder="Your Company"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Area of Interest</label>
                <select
                  value={formData.interest}
                  onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-[#8B5CF6] transition-colors cursor-pointer"
                >
                  <option value="general">General Inquiry</option>
                  <option value="hotels">Hotel Services</option>
                  <option value="concerts">Concert &amp; Events</option>
                  <option value="marketing">Marketing Solutions</option>
                  <option value="partnership">Partnership Opportunities</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  maxLength={500}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-[#8B5CF6] transition-colors resize-none"
                  placeholder="Tell us about your needs..."
                ></textarea>
                <p className="text-sm text-gray-500 mt-2">{formData.message.length}/500 characters</p>
              </div>

              <button
                type="submit"
                disabled={submitStatus === 'loading'}
                className="w-full py-4 bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white rounded-xl font-bold text-lg hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {submitStatus === 'loading' ? 'Submitting...' : 'Submit Inquiry'}
              </button>

              {submitStatus === 'success' && (
                <div className="p-4 bg-green-50 border-2 border-green-200 rounded-xl">
                  <p className="text-green-700 font-semibold text-center">Thank you! We'll be in touch soon.</p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl">
                  <p className="text-red-700 font-semibold text-center">Something went wrong. Please try again.</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
