import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Utensils, Heart, Users, MapPin, Search } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-primary/10 dark:bg-primary/5 py-20 lg:py-32 overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-primary/20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-primary-light/20 blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 dark:text-white mb-6">
                Share Food, <br />
                <span className="text-primary">Spread Hope</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-lg">
                Join our mission to reduce food waste. Connect your surplus food with NGOs and those who need it most. Together, we can make a difference.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/donate" className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full font-medium transition flex items-center gap-2 shadow-lg shadow-primary/30">
                  Donate Food <Heart size={20} />
                </Link>
                <Link to="/available-foods" className="bg-white dark:bg-dark-card border-2 border-primary text-primary px-8 py-3 rounded-full font-medium transition hover:bg-primary/5 flex items-center gap-2">
                  Find Food <Search size={20} />
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              className="relative hidden md:block"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800 transform rotate-2 hover:rotate-0 transition duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Food Donation" 
                  className="w-full h-auto object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                  <p className="font-bold text-xl">Every meal matters</p>
                  <p className="text-sm opacity-80">Help us feed the hungry today</p>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-dark-card p-4 rounded-xl shadow-xl flex items-center gap-4 animate-float">
                <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
                  <Utensils className="text-green-600 dark:text-green-400" size={24} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Meals Saved Today</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">1,245+</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-dark-card border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div whileHover={{ y: -5 }} className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/50">
              <div className="text-4xl font-bold text-primary mb-2">50k+</div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">Meals Saved</div>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/50">
              <div className="text-4xl font-bold text-primary mb-2">1,200+</div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">Active Donors</div>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/50">
              <div className="text-4xl font-bold text-primary mb-2">350+</div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">NGOs Connected</div>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/50">
              <div className="text-4xl font-bold text-primary mb-2">25+</div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">Cities Covered</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50 dark:bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">How FoodBridge Works</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">A simple and transparent process to ensure surplus food reaches those in need efficiently and safely.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Step 1 */}
            <div className="relative">
              <div className="bg-white dark:bg-dark-card rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-800 text-center h-full relative z-10">
                <div className="w-16 h-16 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MapPin className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">1. List Surplus Food</h3>
                <p className="text-gray-600 dark:text-gray-400">Restaurants, events, or households can quickly list their extra quality food with location details.</p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-6 w-12 border-t-2 border-dashed border-primary z-0"></div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="bg-white dark:bg-dark-card rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-800 text-center h-full relative z-10">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="text-blue-600 dark:text-blue-400" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">2. NGOs Request</h3>
                <p className="text-gray-600 dark:text-gray-400">Verified NGOs or volunteers browse nearby available food and send a request to collect it.</p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-6 w-12 border-t-2 border-dashed border-blue-500 z-0"></div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="bg-white dark:bg-dark-card rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-800 text-center h-full relative z-10">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="text-green-600 dark:text-green-400" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">3. Food is Shared</h3>
                <p className="text-gray-600 dark:text-gray-400">The requester picks up the food and distributes it to the needy, preventing food waste.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to make a difference?</h2>
          <p className="text-white/80 text-lg mb-8">Join thousands of donors and NGOs already using FoodBridge to fight hunger and reduce food waste.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register" className="bg-white text-primary px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition shadow-lg">
              Join as a Donor
            </Link>
            <Link to="/register" className="bg-primary-dark text-white border border-primary-light px-8 py-3 rounded-full font-bold hover:bg-green-800 transition shadow-lg">
              Register an NGO
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
