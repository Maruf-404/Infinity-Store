import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <img 
                src={assets.logo} 
                alt="InfinityStore Logo" 
                className="h-8 w-auto" // Fixed height instead of width
                loading="eager" // Since it's above fold
                width="128" 
                height="32"
              />
            </div>
            <p className="text-gray-600 text-sm leading-relaxed max-w-md">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod at,
              nam corporis quidem minima numquam unde et odit quas voluptatum iste
              quasi, architecto sint! Totam culpa iusto accusantium.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-gray-900 font-semibold text-sm uppercase tracking-wider mb-4">
              Company
            </h3>
            <nav>
              <ul className="space-y-3">
                <li>
                  <a 
                    href="/" 
                    className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-200"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a 
                    href="/about" 
                    className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-200"
                  >
                    About us
                  </a>
                </li>
                <li>
                  <a 
                    href="/delivery" 
                    className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-200"
                  >
                    Delivery
                  </a>
                </li>
                <li>
                  <a 
                    href="/privacy" 
                    className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-200"
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-gray-900 font-semibold text-sm uppercase tracking-wider mb-4">
              Get In Touch
            </h3>
            <div className="space-y-3">
              <a 
                href="tel:+12124788735" 
                className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-200 block"
              >
                +1-212-478-8735
              </a>
              <a 
                href="mailto:contact@infinitystore.com" 
                className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-200 block"
              >
                contact@infinitystore.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="border-t border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-xs text-gray-500">
            © {new Date().getFullYear()} InfinityStore. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;