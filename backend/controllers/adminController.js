const User = require('../models/User');
const Food = require('../models/Food');
const Request = require('../models/Request');

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
// @access  Private/Admin
const getStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalDonors = await User.countDocuments({ role: 'Donor' });
    const totalNGOs = await User.countDocuments({ role: 'NGO' });
    const totalFoodsDonated = await Food.countDocuments();
    const totalMealsSaved = await Request.countDocuments({ status: { $in: ['Picked Up', 'Delivered'] } });

    res.json({
      totalUsers,
      totalDonors,
      totalNGOs,
      totalFoodsDonated,
      totalMealsSaved, // Approximation based on completed requests
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      await user.deleteOne();
      res.json({ message: 'User removed' });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getStats,
  getUsers,
  deleteUser,
};
