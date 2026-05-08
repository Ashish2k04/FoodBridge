import { useState, useEffect } from 'react';
import api from '../utils/api';
import FoodCard from '../components/FoodCard';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { Search, Filter, Loader } from 'lucide-react';

const AvailableFoods = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterVeg, setFilterVeg] = useState('all'); // 'all', 'true', 'false'
  const [editingFood, setEditingFood] = useState(null);
  const { user } = useAuth();

  const fetchFoods = async () => {
    setLoading(true);
    try {
      let query = '/food?';
      if (searchTerm) query += `keyword=${searchTerm}&`;
      if (filterVeg !== 'all') query += `isVeg=${filterVeg}`;

      const { data } = await api.get(query);
      setFoods(data);
    } catch (error) {
      toast.error('Failed to fetch foods');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, [searchTerm, filterVeg]);

  const handleRequestFood = async (foodId) => {
    if (!user) {
      toast.error('Please login to request food');
      return;
    }
    
    try {
      await api.post('/requests', { foodId });
      toast.success('Food requested successfully!');
      fetchFoods(); // Refresh list
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to request food');
    }
  };

  const handleEditFood = (food) => {
    setEditingFood(food);
  };

  const handleUpdateFood = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/food/${editingFood._id}`, editingFood);
      toast.success('Food updated successfully');
      setEditingFood(null);
      fetchFoods();
    } catch (error) {
      toast.error('Failed to update food');
    }
  };

  const handleDeleteFood = async (id) => {
    if (window.confirm('Are you sure you want to delete this food item?')) {
      try {
        await api.delete(`/food/${id}`);
        toast.success('Food deleted successfully');
        fetchFoods();
      } catch (error) {
        toast.error('Failed to delete food');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-10 gap-6">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Available Food Donations</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Find and request fresh food available in your area.</p>
          </div>

          <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search food..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm"
              />
            </div>

            {/* Filter */}
            <div className="relative flex items-center">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-5 w-5 text-gray-400" />
              </div>
              <select
                value={filterVeg}
                onChange={(e) => setFilterVeg(e.target.value)}
                className="pl-10 pr-8 py-2 w-full appearance-none border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm"
              >
                <option value="all">All Types</option>
                <option value="true">Vegetarian</option>
                <option value="false">Non-Vegetarian</option>
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader className="h-12 w-12 text-primary animate-spin" />
          </div>
        ) : foods.length === 0 ? (
          <div className="bg-white dark:bg-dark-card rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-12 text-center">
            <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
              <Search className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No food found</h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
              There are currently no food donations matching your search criteria. Please check back later.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {foods.map((food) => (
              <FoodCard 
                key={food._id} 
                food={food} 
                isNgo={user?.role === 'NGO'} 
                isAdmin={user?.role === 'Admin'}
                onRequest={handleRequestFood} 
                onEdit={handleEditFood}
                onDelete={handleDeleteFood}
              />
            ))}
          </div>
        )}
      </div>

      {editingFood && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-dark-card rounded-2xl p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Edit Food</h2>
            <form onSubmit={handleUpdateFood} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Name</label>
                <input type="text" value={editingFood.name} onChange={(e) => setEditingFood({...editingFood, name: e.target.value})} className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Quantity</label>
                <input type="text" value={editingFood.quantity} onChange={(e) => setEditingFood({...editingFood, quantity: e.target.value})} className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Status</label>
                <select value={editingFood.status} onChange={(e) => setEditingFood({...editingFood, status: e.target.value})} className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                  <option value="Available">Available</option>
                  <option value="Requested">Requested</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Picked Up">Picked Up</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
              <div className="flex gap-2 justify-end mt-6">
                <button type="button" onClick={() => setEditingFood(null)} className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition shadow-md">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvailableFoods;
