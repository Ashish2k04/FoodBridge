import { Link } from 'react-router-dom';
import { Leaf, Heart, Globe, MessageCircle, Share2, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-dark-card border-t border-gray-200 dark:border-gray-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Leaf className="text-primary" size={28} />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">FoodBridge</span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              Connecting food donors with NGOs to reduce food waste and help those in need. Let's make the world a better place, one meal at a time.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-primary hover:text-white transition">
                <Globe size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-primary hover:text-white transition">
                <MessageCircle size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-primary hover:text-white transition">
                <Share2 size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-primary transition">Home</Link></li>
              <li><Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-primary transition">About Us</Link></li>
              <li><Link to="/available-foods" className="text-gray-600 dark:text-gray-400 hover:text-primary transition">Find Food</Link></li>
              <li><Link to="/donate" className="text-gray-600 dark:text-gray-400 hover:text-primary transition">Donate Food</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Support</h3>
            <ul className="space-y-3">
              <li><Link to="/contact" className="text-gray-600 dark:text-gray-400 hover:text-primary transition">Contact Us</Link></li>
              <li><Link to="/faq" className="text-gray-600 dark:text-gray-400 hover:text-primary transition">FAQs</Link></li>
              <li><Link to="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-primary transition">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-600 dark:text-gray-400 hover:text-primary transition">Terms of Service</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Contact Info</h3>
            <ul className="space-y-4 text-gray-600 dark:text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="text-primary shrink-0 mt-1" size={20} />
                <span>123 Green Avenue, Eco City, 400001, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-primary shrink-0" size={20} />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-primary shrink-0" size={20} />
                <span>support@foodbridge.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 dark:text-gray-500">
          <p>© {new Date().getFullYear()} FoodBridge. All rights reserved.</p>
          <p className="flex items-center gap-1 mt-4 md:mt-0 font-medium">
            Developed as a College Project by Team FoodBridge <Heart className="text-red-500 fill-red-500" size={16} />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
