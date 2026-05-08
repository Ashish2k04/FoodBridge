import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Have questions about how to donate food, register your NGO, or want to partner with us? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="bg-primary rounded-2xl p-8 lg:p-10 text-white shadow-xl">
            <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
            <p className="text-primary-light mb-10">
              Fill out the form and our team will get back to you within 24 hours.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <Phone className="mt-1 shrink-0" size={24} />
                <div>
                  <h3 className="font-semibold text-lg">Phone Number</h3>
                  <p className="text-primary-light mt-1">+91 98765 43210</p>
                  <p className="text-primary-light">+91 12345 67890</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="mt-1 shrink-0" size={24} />
                <div>
                  <h3 className="font-semibold text-lg">Email Address</h3>
                  <p className="text-primary-light mt-1">support@foodbridge.com</p>
                  <p className="text-primary-light">partnerships@foodbridge.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="mt-1 shrink-0" size={24} />
                <div>
                  <h3 className="font-semibold text-lg">Head Office</h3>
                  <p className="text-primary-light mt-1 leading-relaxed">
                    123 Green Avenue, Eco City,<br />
                    Mumbai, Maharashtra 400001,<br />
                    India
                  </p>
                </div>
              </div>
            </div>
            
            {/* Background design elements */}
            <div className="relative mt-12 h-32 w-full overflow-hidden opacity-20">
              <div className="absolute right-0 bottom-0 w-48 h-48 bg-white rounded-full translate-x-1/3 translate-y-1/3"></div>
              <div className="absolute right-20 bottom-10 w-24 h-24 bg-white rounded-full"></div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-dark-card rounded-2xl p-8 lg:p-10 shadow-xl border border-gray-100 dark:border-gray-800">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send us a Message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">First Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Last Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                <textarea
                  rows="4"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  placeholder="Write your message here..."
                ></textarea>
              </div>

              <button
                type="button"
                className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition shadow-md"
              >
                <Send size={18} /> Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
