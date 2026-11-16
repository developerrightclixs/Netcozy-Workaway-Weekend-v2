import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-12 mb-8 sm:mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <img 
                src="https://storage.readdy-site.link/project_files/029ac680-786b-4603-9848-08fb20ae4f30/d786ac2c-4121-45c7-b4ed-371b6f8287d1_image-12.png?v=6f4af2e64a06407323df94a323e44b9e" 
                alt="Netcozy Logo" 
                className="h-10 sm:h-12 w-auto"
              />
            </Link>
            <p className="text-[#0000007D] mb-6 leading-relaxed text-sm sm:text-base">
              Your trusted partner for unforgettable travel experiences. From luxury hotels to exclusive events, we make every journey extraordinary.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://www.facebook.com/netcozyworkawayweekend" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[#1990FF] hover:text-white transition-colors cursor-pointer text-gray-600">
                <i className="ri-facebook-fill"></i>
              </a>
              <a href="https://twitter.com/netcozy" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[#1990FF] hover:text-white transition-colors cursor-pointer text-gray-600">
                <i className="ri-twitter-fill"></i>
              </a>
              <a href="https://www.instagram.com/exe.desk/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[#1990FF] hover:text-white transition-colors cursor-pointer text-gray-600">
                <i className="ri-instagram-fill"></i>
              </a>
              <a href="https://www.linkedin.com/company/netcozy" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[#1990FF] hover:text-white transition-colors cursor-pointer text-gray-600">
                <i className="ri-linkedin-fill"></i>
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="font-bold text-black mb-4 sm:mb-6 text-base sm:text-lg">Explore</h3>
            <ul className="space-y-3 sm:space-y-4">
              <li>
                <Link to="/" className="text-[#0000007D] hover:text-[#1990FF] transition-colors cursor-pointer text-sm sm:text-base">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/hotels" className="text-[#0000007D] hover:text-[#1990FF] transition-colors cursor-pointer text-sm sm:text-base">
                  Hotels & Resorts
                </Link>
              </li>
              <li>
                <Link to="/museums" className="text-[#0000007D] hover:text-[#1990FF] transition-colors cursor-pointer text-sm sm:text-base">
                  Museums
                </Link>
              </li>
              <li>
                <Link to="/concerts" className="text-[#0000007D] hover:text-[#1990FF] transition-colors cursor-pointer text-sm sm:text-base">
                  Concerts & Events
                </Link>
              </li>
              <li>
                <Link to="/beach-resorts" className="text-[#0000007D] hover:text-[#1990FF] transition-colors cursor-pointer text-sm sm:text-base">
                  Destinations
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold text-black mb-4 sm:mb-6 text-base sm:text-lg">Support</h3>
            <ul className="space-y-3 sm:space-y-4">
              <li>
                <Link to="/about" className="text-[#0000007D] hover:text-[#1990FF] transition-colors cursor-pointer text-sm sm:text-base">
                  About Us
                </Link>
              </li>
              <li>
                <div className="text-[#0000007D] hover:text-[#1990FF] transition-colors cursor-pointer text-sm sm:text-base">
                  Help Center
                </div>
              </li>
              <li>
                <Link to="/terms" className="text-[#0000007D] hover:text-[#1990FF] transition-colors cursor-pointer text-sm sm:text-base">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-[#0000007D] hover:text-[#1990FF] transition-colors cursor-pointer text-sm sm:text-base">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-bold text-black mb-4 sm:mb-6 text-base sm:text-lg">Connect</h3>
            <ul className="space-y-3 sm:space-y-4">
              <li>
                <a href="tel:+12136310859" className="text-[#0000007D] hover:text-[#1990FF] transition-colors cursor-pointer flex items-center gap-2 text-sm sm:text-base">
                  <i className="ri-phone-line"></i>
                  213-631-0859
                </a>
              </li>
              <li>
                <a href="mailto:exe.desk@netcozyworkawayweekend.com" className="text-[#0000007D] hover:text-[#1990FF] transition-colors cursor-pointer flex items-center gap-2 text-sm sm:text-base">
                  <i className="ri-mail-line"></i>
                  exe.desk@netcozyworkawayweekend.com
                </a>
              </li>
              <li>
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=1900+Camden+Avenue+San+Jose+California+95124" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#0000007D] hover:text-[#1990FF] transition-colors cursor-pointer flex items-start gap-2 text-sm sm:text-base"
                >
                  <i className="ri-map-pin-line mt-1"></i>
                  <span>1900 Camden Avenue<br />San Jose, CA 95124</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#0000007D] text-xs sm:text-sm text-center sm:text-left">
            © {currentYear} Netcozy. All rights reserved.
          </p>
          <a 
            href="https://readdy.ai/?ref=logo" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#0000007D] text-xs sm:text-sm hover:text-[#1990FF] transition-colors cursor-pointer"
          >
            Powered by Readdy
          </a>
        </div>
      </div>
    </footer>
  );
}
