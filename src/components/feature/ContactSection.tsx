import { useState } from 'react';

interface ContactSectionProps {
  category: string;
}

const FORM_URL = 'https://readdy.ai/api/form/da2udkrd3r93mn1k3hlg';

export default function ContactSection({ category }: ContactSectionProps) {
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const honeypot = ((formData.get('company_alt') as string) ?? '').trim();
    if (honeypot) {
      setStatus({ type: 'success', message: 'Thank you! Your message has been sent.' });
      form.reset();
      return;
    }

    formData.delete('company_alt');

    setIsSubmitting(true);
    setStatus({ type: null, message: '' });

    try {
      const body = new URLSearchParams();
      formData.forEach((value, key) => {
        if (typeof value === 'string') {
          body.append(key, value);
        }
      });

      const response = await fetch(FORM_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });

      const responseText = await response.text();
      let parsed: { code?: string; meta?: { message?: string; detail?: string }; message?: string } | null = null;
      try {
        parsed = JSON.parse(responseText);
      } catch {
        parsed = null;
      }

      const serverMessage = parsed?.meta?.message || parsed?.message || parsed?.meta?.detail || '';
      const isSpam = responseText.toLowerCase().includes('spam')
        || (typeof serverMessage === 'string' && serverMessage.toLowerCase().includes('spam'));

      if (response.ok && parsed?.code === 'OK' && !isSpam) {
        setStatus({ type: 'success', message: 'Thank you! Your message has been sent. We\'ll get back to you shortly.' });
        form.reset();
      } else {
        setStatus({
          type: 'error',
          message: typeof serverMessage === 'string' && serverMessage ? serverMessage : 'Something went wrong. Please try again.',
        });
      }
    } catch {
      setStatus({ type: 'error', message: 'Something went wrong. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-20 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left: contact info */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0A2540] mb-4">Contact Us</h2>
            <p className="text-base sm:text-lg text-gray-600 mb-8 leading-relaxed">
              Interested in learning more about our {category} services? Fill out the form and our team will get back to you by email — no pressure, just answers.
            </p>

            <div className="space-y-5">
              <a href="tel:+12136310859" className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 bg-[#1990FF]/10 rounded-xl flex items-center justify-center group-hover:bg-[#1990FF] transition-colors">
                  <i className="ri-phone-line text-xl text-[#1990FF] group-hover:text-white"></i>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Call us</p>
                  <p className="text-[#0A2540] font-semibold">213-631-0859</p>
                </div>
              </a>
              <a href="mailto:exe.desk@netcozyworkawayweekend.com" className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 bg-[#1990FF]/10 rounded-xl flex items-center justify-center group-hover:bg-[#1990FF] transition-colors">
                  <i className="ri-mail-line text-xl text-[#1990FF] group-hover:text-white"></i>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email us</p>
                  <p className="text-[#0A2540] font-semibold">exe.desk@netcozyworkawayweekend.com</p>
                </div>
              </a>
              <a
                href="https://www.google.com/maps/search/?api=1&query=1900+Camden+Avenue+San+Jose+California+95124"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 group cursor-pointer"
              >
                <div className="w-12 h-12 bg-[#1990FF]/10 rounded-xl flex items-center justify-center group-hover:bg-[#1990FF] transition-colors">
                  <i className="ri-map-pin-line text-xl text-[#1990FF] group-hover:text-white"></i>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Visit us</p>
                  <p className="text-[#0A2540] font-semibold">1900 Camden Avenue, San Jose, CA 95124</p>
                </div>
              </a>
            </div>
          </div>

          {/* Right: form */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg">
            {status.type && (
              <div className={`mb-5 p-4 rounded-lg text-sm ${status.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                {status.message}
              </div>
            )}

            <form id="netcozy-contact-form" data-readdy-form onSubmit={handleSubmit}>
              <input type="hidden" name="category" value={category} />

              <input
                type="text"
                name="company_alt"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                readOnly
                className="contact-hp-field"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1990FF] focus:border-transparent outline-none transition-all text-sm"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1990FF] focus:border-transparent outline-none transition-all text-sm"
                    placeholder="you@email.com"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number <span className="text-gray-400 font-normal">(optional)</span></label>
                <input
                  type="tel"
                  name="phone"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1990FF] focus:border-transparent outline-none transition-all text-sm"
                  placeholder="(555) 123-4567"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">How can we help?</label>
                <textarea
                  name="message"
                  required
                  maxLength={500}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1990FF] focus:border-transparent outline-none transition-all text-sm resize-none"
                  placeholder="Tell us a little about what you're interested in..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-[#1990FF] text-white rounded-lg font-semibold transition-all hover:bg-[#0070E0] disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}