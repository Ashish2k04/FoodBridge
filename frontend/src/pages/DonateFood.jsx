import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { Upload, MapPin, Clock, Package, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const DonateFood = () => {
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    isVeg: 'true',
    cookedTime: '',
    expiryTime: '',
    pickupAddress: '',
    contactNumber: '',
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let imageUrl = '';

    try {
      if (image) {
        const uploadData = new FormData();
        uploadData.append('image', image);
        const { data } = await api.post('/upload', uploadData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        imageUrl = `https://foodbridge-api-p4hv.onrender.com${data.image}`;
      } else {
        // Fallback Placeholder if no image is uploaded
        imageUrl = "https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"; 
      }

      const foodData = {
        ...formData,
        isVeg: formData.isVeg === 'true',
        imageUrl
      };

      await api.post('/food', foodData);
      toast.success('Food donation created successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create donation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Donate Food</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Your excess food can be someone's meal today.</p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-dark-card shadow-xl rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800"
        >
          <div className="bg-primary/10 dark:bg-primary/5 p-6 border-b border-gray-100 dark:border-gray-800">
            <h2 className="text-xl font-bold text-primary flex items-center gap-2">
              <Package size={24} /> Donation Details
            </h2>
          </div>
          
          <form className="p-8 space-y-8" onSubmit={handleSubmit}>
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Food Image</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-700 border-dashed rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600 dark:text-gray-400">
                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white dark:bg-dark-card rounded-md font-medium text-primary hover:text-primary-dark focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary">
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageChange} accept="image/*" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-500">PNG, JPG up to 5MB</p>
                  {image && <p className="text-sm text-green-600 mt-2 font-medium">Selected: {image.name}</p>}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Food Name */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Food Name / Description</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Info className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="appearance-none block w-full pl-10 px-3 py-3 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="e.g. 50 Servings of Rice and Dal"
                  />
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Quantity</label>
                <input
                  type="text"
                  name="quantity"
                  required
                  value={formData.quantity}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-3 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="e.g. 10 kg, 50 packets"
                />
              </div>

              {/* Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Food Type</label>
                <select
                  name="isVeg"
                  value={formData.isVeg}
                  onChange={handleChange}
                  className="block w-full px-3 py-3 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="true">Vegetarian</option>
                  <option value="false">Non-Vegetarian</option>
                </select>
              </div>

              {/* Cooked Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Cooked Time</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Clock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="datetime-local"
                    name="cookedTime"
                    value={formData.cookedTime}
                    onChange={handleChange}
                    className="appearance-none block w-full pl-10 px-3 py-3 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Expiry Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Expiry/Freshness Time <span className="text-red-500">*</span></label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Clock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="datetime-local"
                    name="expiryTime"
                    required
                    value={formData.expiryTime}
                    onChange={handleChange}
                    className="appearance-none block w-full pl-10 px-3 py-3 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Pickup Address */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Pickup Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <textarea
                    name="pickupAddress"
                    required
                    rows="3"
                    value={formData.pickupAddress}
                    onChange={handleChange}
                    className="appearance-none block w-full pl-10 px-3 py-3 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
                    placeholder="Enter complete address for pickup"
                  ></textarea>
                </div>
              </div>

              {/* Contact Number */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Contact Number</label>
                <input
                  type="tel"
                  name="contactNumber"
                  required
                  value={formData.contactNumber}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-3 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="Contact person's phone number"
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-4 px-4 border border-transparent text-lg font-medium rounded-xl text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition shadow-lg disabled:opacity-70"
              >
                {loading ? 'Submitting...' : 'Submit Food Donation'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default DonateFood;
