import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { Package, Activity, Users, FileText, CheckCircle, Clock } from 'lucide-react';
import FoodCard from '../components/FoodCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user.role === 'Donor') {
          const { data: donations } = await api.get('/food/donor/me');
          const { data: reqs } = await api.get('/requests/donor');
          setData({ donations, requests: reqs });
        } else if (user.role === 'NGO') {
          const { data: reqs } = await api.get('/requests/ngo');
          setData({ requests: reqs });
        } else if (user.role === 'Admin') {
          const { data: adminStats } = await api.get('/admin/stats');
          const { data: users } = await api.get('/admin/users');
          setStats(adminStats);
          setData({ users });
        }
      } catch (error) {
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [user.role]);

  const updateRequestStatus = async (id, status) => {
    try {
      await api.put(`/requests/${id}/status`, { status });
      toast.success(`Request marked as ${status}`);
      // Refresh data by reloading the page for simplicity
      window.location.reload();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const deleteDonation = async (id) => {
    if (window.confirm('Are you sure you want to delete this donation?')) {
      try {
        await api.delete(`/food/${id}`);
        toast.success('Donation removed');
        window.location.reload();
      } catch (error) {
        toast.error('Failed to delete');
      }
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await api.delete(`/admin/users/${id}`);
        toast.success('User deleted');
        setData(prev => ({ ...prev, users: prev.users.filter(u => u._id !== id) }));
      } catch (error) {
        toast.error('Failed to delete user');
      }
    }
  };

  if (loading) return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div></div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome back, {user.name}!</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Here is your {user.role} dashboard overview.</p>
        </div>

        {/* DONOR DASHBOARD */}
        {user.role === 'Donor' && (
          <div className="space-y-10">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2"><Package className="text-primary"/> My Donations</h2>
              {data.donations?.length === 0 ? (
                <p className="text-gray-500">You haven't made any donations yet.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {data.donations?.map(food => (
                    <div key={food._id} className="relative">
                      <FoodCard food={food} isNgo={false} />
                      <button 
                        onClick={() => deleteDonation(food._id)}
                        className="absolute top-2 left-2 bg-red-500 text-white p-1 rounded-full text-xs hover:bg-red-600 shadow-md"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white dark:bg-dark-card rounded-2xl shadow-md border border-gray-100 dark:border-gray-800 p-6 overflow-hidden">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2"><Activity className="text-primary"/> Received Requests</h2>
              {data.requests?.length === 0 ? (
                <p className="text-gray-500">No requests received yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                      <tr>
                        <th className="p-4 font-semibold">Food</th>
                        <th className="p-4 font-semibold">NGO</th>
                        <th className="p-4 font-semibold">Status</th>
                        <th className="p-4 font-semibold">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                      {data.requests?.map(req => (
                        <tr key={req._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                          <td className="p-4">{req.food?.name}</td>
                          <td className="p-4">
                            <div>{req.ngo?.name}</div>
                            <div className="text-sm text-gray-500">{req.ngo?.contactNumber}</div>
                          </td>
                          <td className="p-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${req.status === 'Requested' ? 'bg-yellow-100 text-yellow-800' : req.status === 'Accepted' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                              {req.status}
                            </span>
                          </td>
                          <td className="p-4">
                            {req.status === 'Requested' && (
                              <button onClick={() => updateRequestStatus(req._id, 'Accepted')} className="bg-primary hover:bg-primary-dark text-white px-3 py-1 rounded text-sm mr-2">Accept</button>
                            )}
                            {req.status === 'Accepted' && (
                              <button onClick={() => updateRequestStatus(req._id, 'Picked Up')} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm mr-2">Mark Picked Up</button>
                            )}
                            {req.status === 'Picked Up' && (
                              <button onClick={() => updateRequestStatus(req._id, 'Delivered')} className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm">Mark Delivered</button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* NGO DASHBOARD */}
        {user.role === 'NGO' && (
          <div className="bg-white dark:bg-dark-card rounded-2xl shadow-md border border-gray-100 dark:border-gray-800 p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2"><CheckCircle className="text-primary"/> My Requests</h2>
            {data.requests?.length === 0 ? (
              <p className="text-gray-500">You haven't made any requests yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                    <tr>
                      <th className="p-4 font-semibold">Food</th>
                      <th className="p-4 font-semibold">Donor Info</th>
                      <th className="p-4 font-semibold">Address</th>
                      <th className="p-4 font-semibold">Status</th>
                      <th className="p-4 font-semibold">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                    {data.requests?.map(req => (
                      <tr key={req._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <td className="p-4 font-medium">{req.food?.name}</td>
                        <td className="p-4">
                          <div>{req.food?.donor?.name}</div>
                          <div className="text-sm text-gray-500">{req.food?.donor?.contactNumber}</div>
                        </td>
                        <td className="p-4 text-sm max-w-[200px] truncate" title={req.food?.donor?.address}>{req.food?.donor?.address || 'N/A'}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-bold ${req.status === 'Requested' ? 'bg-yellow-100 text-yellow-800' : req.status === 'Accepted' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                            {req.status}
                          </span>
                        </td>
                        <td className="p-4 text-sm text-gray-500">
                          {new Date(req.requestedAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ADMIN DASHBOARD */}
        {user.role === 'Admin' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-dark-card rounded-2xl shadow-md border border-gray-100 dark:border-gray-800 p-6 flex items-center gap-4">
                <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"><Users size={28}/></div>
                <div><p className="text-sm text-gray-500">Total Users</p><p className="text-2xl font-bold">{stats?.totalUsers}</p></div>
              </div>
              <div className="bg-white dark:bg-dark-card rounded-2xl shadow-md border border-gray-100 dark:border-gray-800 p-6 flex items-center gap-4">
                <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"><Package size={28}/></div>
                <div><p className="text-sm text-gray-500">Foods Donated</p><p className="text-2xl font-bold">{stats?.totalFoodsDonated}</p></div>
              </div>
              <div className="bg-white dark:bg-dark-card rounded-2xl shadow-md border border-gray-100 dark:border-gray-800 p-6 flex items-center gap-4">
                <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400"><CheckCircle size={28}/></div>
                <div><p className="text-sm text-gray-500">Meals Saved</p><p className="text-2xl font-bold">{stats?.totalMealsSaved}</p></div>
              </div>
              <div className="bg-white dark:bg-dark-card rounded-2xl shadow-md border border-gray-100 dark:border-gray-800 p-6 flex items-center gap-4">
                <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"><Users size={28}/></div>
                <div><p className="text-sm text-gray-500">Active NGOs</p><p className="text-2xl font-bold">{stats?.totalNGOs}</p></div>
              </div>
            </div>

            <div className="bg-white dark:bg-dark-card rounded-2xl shadow-md border border-gray-100 dark:border-gray-800 p-6">
              <h2 className="text-xl font-bold mb-6">User Management</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                    <tr>
                      <th className="p-4">Name</th>
                      <th className="p-4">Email</th>
                      <th className="p-4">Role</th>
                      <th className="p-4">Joined</th>
                      <th className="p-4">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                    {data.users?.map(u => (
                      <tr key={u._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <td className="p-4">{u.name}</td>
                        <td className="p-4">{u.email}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded text-xs ${u.role === 'Admin' ? 'bg-purple-100 text-purple-800' : u.role === 'Donor' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>{u.role}</span>
                        </td>
                        <td className="p-4 text-sm text-gray-500">{new Date(u.createdAt).toLocaleDateString()}</td>
                        <td className="p-4">
                          {u.role !== 'Admin' && (
                            <button 
                              onClick={() => deleteUser(u._id)}
                              className="text-red-500 hover:text-red-700 text-sm font-medium"
                            >
                              Delete
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
