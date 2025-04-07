import { FaLeaf, FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaPinterest } from 'react-icons/fa';
import { MdLocalShipping, MdPayment, MdHealthAndSafety, MdSupportAgent } from 'react-icons/md';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-green-800 to-green-600 text-white pt-12 pb-6  ">
      {/* Top Section - Features */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Feature 1 */}
          <div className="flex flex-col items-center text-center">
            <MdLocalShipping className="text-3xl mb-3" />
            <h3 className="font-semibold mb-1">Free Shipping</h3>
            <p className="text-sm text-white/90">On all orders over ₹999</p>
          </div>
          
          {/* Feature 2 */}
          <div className="flex flex-col items-center text-center">
            <MdPayment className="text-3xl mb-3" />
            <h3 className="font-semibold mb-1">Secure Payment</h3>
            <p className="text-sm text-white/90">100% secure & encrypted</p>
          </div>
          
          {/* Feature 3 */}
          <div className="flex flex-col items-center text-center">
            <MdHealthAndSafety className="text-3xl mb-3" />
            <h3 className="font-semibold mb-1">Authentic Ayurveda</h3>
            <p className="text-sm text-white/90">Certified organic products</p>
          </div>
          
          {/* Feature 4 */}
          <div className="flex flex-col items-center text-center">
            <MdSupportAgent className="text-3xl mb-3" />
            <h3 className="font-semibold mb-1">24/7 Support</h3>
            <p className="text-sm text-white/90">Dedicated ayurvedic experts</p>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* About */}
          <div>
            <div className="flex items-center mb-4">
              <FaLeaf className="text-2xl mr-2" />
              <h2 className="text-xl font-bold">AyurVeda</h2>
            </div>
            <p className="mb-4 text-sm text-white/90">
              Bringing authentic Ayurvedic wellness to your doorstep since 2015. 
              Our products are crafted with ancient wisdom and modern purity standards.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-green-200 transition-colors">
                <FaFacebook />
              </a>
              <a href="#" className="hover:text-green-200 transition-colors">
                <FaInstagram />
              </a>
              <a href="#" className="hover:text-green-200 transition-colors">
                <FaTwitter />
              </a>
              <a href="#" className="hover:text-green-200 transition-colors">
                <FaYoutube />
              </a>
              <a href="#" className="hover:text-green-200 transition-colors">
                <FaPinterest />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-sm hover:text-green-200 transition-colors">Home</a></li>
              <li><a href="/shop" className="text-sm hover:text-green-200 transition-colors">Shop</a></li>
              <li><a href="/about" className="text-sm hover:text-green-200 transition-colors">About Us</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><a href="/category/herbal-medicines" className="text-sm hover:text-green-200 transition-colors">Herbal Medicines</a></li>
              <li><a href="/category/skin-care" className="text-sm hover:text-green-200 transition-colors">Skin Care</a></li>
              <li><a href="/category/hair-care" className="text-sm hover:text-green-200 transition-colors">Hair Care</a></li>
              <li><a href="/category/detox" className="text-sm hover:text-green-200 transition-colors">Detox & Cleansing</a></li>
              <li><a href="/category/immunity" className="text-sm hover:text-green-200 transition-colors">Immunity Boosters</a></li>
              <li><a href="/category/digestive" className="text-sm hover:text-green-200 transition-colors">Digestive Health</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <address className="not-italic text-sm space-y-2">
              <p className="flex items-start">
                <span className="mr-2">📍</span>
                <span>No. 123, Ayurveda Mawatha, Colombo 05, Sri Lanka</span>
              </p>
              <p className="flex items-center">
                <span className="mr-2">📞</span>
                <span>+94 112 345 678</span>
              </p>
              <p className="flex items-center">
                <span className="mr-2">✉️</span>
                <span>colombo@ayurveda.lk</span>
              </p>
              <p className="flex items-center">
                <span className="mr-2">🕒</span>
                <span>Mon-Sat: 8:30 AM - 5:30 PM</span>
              </p>
            </address>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 pt-6 flex flex-col md:flex-row justify-center items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-xs text-white/80">
              © {new Date().getFullYear()} AyurVeda. All rights reserved.
            </p>
          </div>
          {/* <div className="flex flex-wrap justify-center gap-4">
            <a href="/privacy" className="text-xs hover:text-green-200 transition-colors">Privacy Policy</a>
            <a href="/terms" className="text-xs hover:text-green-200 transition-colors">Terms of Service</a>
            <a href="/shipping" className="text-xs hover:text-green-200 transition-colors">Shipping Policy</a>
            <a href="/returns" className="text-xs hover:text-green-200 transition-colors">Returns & Refunds</a>
          </div> */}
          {/* <div className="mt-4 md:mt-0">
            <img 
              src="/images/payment-methods.png" 
              alt="Accepted payment methods" 
              className="h-6 opacity-90 hover:opacity-100 transition-opacity"
            />
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;