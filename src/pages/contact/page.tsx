import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/feature/Header';

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Honeypot check
    const honeypot = (formData.get('phone_alt') as string || '').trim();
    if (honeypot) {
      setStatus('success');
      if (formRef.current) formRef.current.reset();
      return;
    }

    // Remove honeypot from payload
    formData.delete('phone_alt');

    // Textarea length check
    const message = (formData.get('message') as string || '');
    if (message.length > 500) {
      setStatus('error');
      setErrorMsg('Message must be 500 characters or less.');
      return;
    }

    try {
      const response = await fetch('https://readdy.ai/api/form/da47kmoet96csuseplk0', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData as any).toString(),
      });

      const responseText = await response.text();
      let parsed: any = null;
      try {
        parsed = JSON.parse(responseText);
      } catch {
        parsed = null;
      }

      const serverCode = parsed?.code;
      const serverMsg = parsed?.meta?.message || parsed?.message || parsed?.meta?.detail || responseText;

      if (response.ok && serverCode === 'OK') {
        setStatus('success');
        if (formRef.current) formRef.current.reset();
      } else if (serverMsg.toLowerCase().includes('spam') || serverMsg.toLowerCase().includes('form data is spam')) {
        setStatus('error');
        setErrorMsg('Submission failed. Please try again.');
      } else {
        setStatus('error');
        setErrorMsg(serverMsg || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setStatus('error');
      setErrorMsg('Network error. Please check your connection and try again.');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-[#1990FF] to-[#0070E0]">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2h-4zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
        }}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/30"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
            Get in Touch
          </h1>
          <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Have questions or want to learn more? Drop us a message and we will get back to you.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-gray-100 p-6 sm:p-8 lg:p-12">
            <div className="text-center mb-8 sm:mb-10">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#1990FF]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <i className="ri-mail-send-line text-2xl sm:text-3xl text-[#1990FF]"></i>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0A2540] mb-2">Leave Your Email</h2>
              <p className="text-gray-600 text-sm sm:text-base">
                We will reach out with updates, offers, and answers to your questions.
              </p>
            </div>

            {status === 'success' ? (
              <div className="text-center py-8 sm:py-12">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <i className="ri-check-line text-3xl sm:text-4xl text-green-600"></i>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#0A2540] mb-2">Message Sent!</h3>
                <p className="text-gray-600 mb-6 sm:mb-8">Thank you for reaching out. We will be in touch soon.</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="px-6 sm:px-8 py-2.5 sm:py-3 bg-[#1990FF] text-white rounded-xl font-semibold hover:bg-[#0070E0] transition-colors cursor-pointer whitespace-nowrap text-sm sm:text-base"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                data-readdy-form="da47kmoet96csuseplk0"
                className="space-y-5 sm:space-y-6"
              >
                {/* Honeypot */}
                <div className="phone_alt_wrap" style={{ position: 'absolute', left: '-9999px', opacity: 0 }}>
                  <input
                    type="text"
                    name="phone_alt"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    readOnly
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-xl text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#1990FF]/30 focus:border-[#1990FF] transition-colors"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-xl text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#1990FF]/30 focus:border-[#1990FF] transition-colors"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-xl text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#1990FF]/30 focus:border-[#1990FF] transition-colors"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-xl text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#1990FF]/30 focus:border-[#1990FF] transition-colors bg-white"
                  >
                    <option value="">Select a topic</option>
                    <option value="general">General Inquiry</option>
                    <option value="events">Events &amp; Tickets</option>
                    <option value="travel">Travel &amp; Hotels</option>
                    <option value="membership">Membership &amp; Pricing</option>
                    <option value="partnership">Business Partnership</option>
                    <option value="support">Technical Support</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    maxLength={500}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-xl text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#1990FF]/30 focus:border-[#1990FF] transition-colors resize-none"
                    placeholder="How can we help you?"
                  ></textarea>
                  <p className="text-xs text-gray-400 mt-1 text-right">Max 500 characters</p>
                </div>

                {errorMsg && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-3 sm:p-4 flex items-start gap-2 sm:gap-3">
                    <i className="ri-error-warning-line text-red-500 text-lg sm:text-xl flex-shrink-0 mt-0.5"></i>
                    <p className="text-sm text-red-700">{errorMsg}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full py-3 sm:py-4 bg-[#1990FF] text-white rounded-xl font-semibold text-sm sm:text-base hover:bg-[#0070E0] transition-colors disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap flex items-center justify-center gap-2"
                >
                  {status === 'submitting' ? (
                    <>
                      <i className="ri-loader-4-line animate-spin"></i>
                      Sending...
                    </>
                  ) : (
                    <>
                      <i className="ri-send-plane-line"></i>
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 sm:py-16 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-white rounded-2xl p-6 sm:p-8 text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#1990FF]/10 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <i className="ri-phone-line text-xl sm:text-2xl text-[#1990FF]"></i>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#0A2540] mb-1 sm:mb-2">Phone</h3>
              <a href="tel:+12136310859" className="text-gray-600 hover:text-[#1990FF] transition-colors text-sm sm:text-base">
                213-631-0859
              </a>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-8 text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#1990FF]/10 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <i className="ri-mail-line text-xl sm:text-2xl text-[#1990FF]"></i>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#0A2540] mb-1 sm:mb-2">Email</h3>
              <a href="mailto:exe.desk@netcozyworkawayweekend.com" className="text-gray-600 hover:text-[#1990FF] transition-colors text-sm sm:text-base break-all">
                exe.desk@netcozyworkawayweekend.com
              </a>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-8 text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#1990FF]/10 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <i className="ri-map-pin-line text-xl sm:text-2xl text-[#1990FF]"></i>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#0A2540] mb-1 sm:mb-2">Address</h3>
              <a
                href="https://www.google.com/maps/search/?api=1&query=1900+Camden+Avenue+San+Jose+California+95124"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="text-gray-600 hover:text-[#1990FF] transition-colors text-sm sm:text-base"
              >
                1900 Camden Avenue<br />San Jose, CA 95124
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link to="/" className="flex items-center gap-3">
              <img
                src="https://storage.readdy-site.link/project_files/029ac680-786b-4603-9848-08fb20ae4f30/d786ac2c-4121-45c7-b4ed-371b6f8287d1_image-12.png?v=6f4af2e64a06407323df94a323e44b9e"
                alt="Netcozy Logo"
                className="h-8 sm:h-10 w-auto"
              />
            </Link>
            <p className="text-gray-500 text-xs sm:text-sm text-center">
              &copy; {new Date().getFullYear()} Netcozy. All rights reserved.
            </p>
            <Link
              to="/"
              className="text-gray-500 text-xs sm:text-sm hover:text-[#1990FF] transition-colors cursor-pointer"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}