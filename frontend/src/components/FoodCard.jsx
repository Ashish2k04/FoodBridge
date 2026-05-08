import { MapPin, Clock, Info, User, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const FoodCard = ({ food, onRequest, isNgo, isDonor, isAdmin, onEdit, onDelete, status }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'Requested': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'Accepted': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'Picked Up': return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400';
      case 'Delivered': return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white dark:bg-dark-card rounded-2xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-800 flex flex-col h-full hover:shadow-xl transition-shadow"
    >
      {/* Image Container */}
      <div className="relative h-48 w-full bg-gray-200 dark:bg-gray-700">
        {food.imageUrl ? (
          <img src={food.imageUrl} alt={food.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <span className="font-medium text-lg">No Image</span>
          </div>
        )}
        <div className="absolute top-4 right-4 flex gap-2">
          <span className={`px-3 py-1 text-xs font-bold rounded-full ${food.isVeg ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
            {food.isVeg ? 'Veg' : 'Non-Veg'}
          </span>
          <span className={`px-3 py-1 text-xs font-bold rounded-full ${getStatusColor(status || food.status)}`}>
            {status || food.status}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{food.name}</h3>
        
        <div className="space-y-3 mb-6 flex-grow">
          <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Info className="w-4 h-4 mt-0.5 text-primary shrink-0" />
            <span><span className="font-medium text-gray-900 dark:text-gray-200">Quantity:</span> {food.quantity}</span>
          </div>
          
          <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
            <User className="w-4 h-4 mt-0.5 text-primary shrink-0" />
            <span><span className="font-medium text-gray-900 dark:text-gray-200">Donor:</span> {food.donor?.name || 'Unknown'}</span>
          </div>

          <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
            <MapPin className="w-4 h-4 mt-0.5 text-primary shrink-0" />
            <span className="line-clamp-2">{food.pickupAddress}</span>
          </div>

          <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Clock className="w-4 h-4 mt-0.5 text-primary shrink-0" />
            <span><span className="font-medium text-gray-900 dark:text-gray-200">Expires:</span> {formatDate(food.expiryTime)}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 mt-4">
          <div className="flex gap-2">
            {food.contactNumber && (
              <a 
                href={`tel:${food.contactNumber}`}
                className="flex-1 flex justify-center items-center gap-2 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition shadow-md"
              >
                <Phone size={18} /> Contact
              </a>
            )}
            {isNgo && food.status === 'Available' && (
              <button 
                onClick={() => onRequest(food._id)}
                className="flex-1 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium transition shadow-md"
              >
                Request Food
              </button>
            )}
          </div>
          {isAdmin && (
            <div className="flex gap-2">
              <button 
                onClick={() => onEdit(food)} 
                className="flex-1 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition shadow-md"
              >
                Edit
              </button>
              <button 
                onClick={() => onDelete(food._id)} 
                className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition shadow-md"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default FoodCard;
