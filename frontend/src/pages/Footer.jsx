import { FaLeaf, FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaPinterest } from 'react-icons/fa';
import { MdLocalShipping, MdPayment, MdHealthAndSafety, MdSupportAgent } from 'react-icons/md';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#E5E7EB] to-[#D1D5DB] text-white pt-12 pb-6  ">
      {/* Top Section - Features */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Feature 1 */}
          <div className="flex flex-col items-center text-center">
            <MdLocalShipping className="text-3xl mb-3 text-black" />
            <h3 className="font-semibold mb-1 text-black">Free Shipping</h3>
            <p className="text-sm text-black">On all orders over ₹999</p>
          </div>
          
          {/* Feature 2 */}
          <div className="flex flex-col items-center text-center">
            <MdPayment className="text-3xl mb-3 text-black" />
            <h3 className="font-semibold mb-1 text-black">Secure Payment</h3>
            <p className="text-sm text-black">100% secure & encrypted</p>
          </div>
          
          {/* Feature 3 */}
          <div className="flex flex-col items-center text-center">
            <MdHealthAndSafety className="text-3xl mb-3 text-black" />
            <h3 className="font-semibold mb-1 text-black">Authentic Ayurveda</h3>
            <p className="text-sm text-black">Certified organic products</p>
          </div>
          
          {/* Feature 4 */}
          <div className="flex flex-col items-center text-center">
            <MdSupportAgent className="text-3xl mb-3 text-black" />
            <h3 className="font-semibold mb-1 text-black">24/7 Support</h3>
            <p className="text-sm text-black">Dedicated ayurvedic experts</p>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* About */}
          <div>
            <div className="flex items-center mb-4">
              <FaLeaf className="text-2xl mr-2 text-black" />
              <h2 className="text-xl font-bold text-black">TMH Ayurvedic</h2>
            </div>
            <p className="mb-4 text-sm text-black">
              Bringing authentic Ayurvedic wellness to your doorstep since 2015. 
              Our products are crafted with ancient wisdom and modern purity standards.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-green-800 transition-colors text-black">
                <FaFacebook />
              </a>
              <a href="#" className="hover:text-green-800 transition-colors text-black">
                <FaInstagram />
              </a>
              <a href="#" className="hover:text-green-800 transition-colors text-black">
                <FaTwitter />
              </a>
              <a href="#" className="hover:text-green-800 transition-colors text-black">
                <FaYoutube />
              </a>
              <a href="#" className="hover:text-green-800 transition-colors text-black">
                <FaPinterest />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-black">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-sm hover:text-green-200 transition-colors text-black">Home</a></li>
              <li><a href="/shop" className="text-sm hover:text-green-800 transition-colors text-black">Shop</a></li>
              <li><a href="/about" className="text-sm hover:text-green-800 transition-colors text-black">About Us</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-black">Categories</h3>
            <ul className="space-y-2">
              <li><a href="/category/oil" className="text-sm hover:text-green-800 transition-colors text-black">Oils</a></li>
              <li><a href="/category/soap" className="text-sm hover:text-green-800 transition-colors text-black">Soaps</a></li>
             
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-black">Contact Us</h3>
            <address className="not-italic text-sm space-y-2 text-black">
              <p className="flex items-start">
                <span className="mr-2">📍</span>
                <span>No. 123, Ayurveda Mawatha, Colombo 05, Sri Lanka</span>
              </p>
              <p className="flex items-center">
                <span className="mr-2">📞</span>
                <span>(+94)-112738901</span>
              </p>
              <p className="flex items-center">
                <span className="mr-2">✉️</span>
                <span>info@example.com</span>
              </p>
              <p className="flex items-center">
                <span className="mr-2">🕒</span>
                <span>Mon-Sat: 8:30 AM - 5:30 PM</span>
              </p>
            </address>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-400 pt-6 flex flex-col md:flex-row justify-center items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-xs text-black">
              © {new Date().getFullYear()} TMH Ayurvedic. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;