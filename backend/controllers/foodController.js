const Food = require('../models/Food');

// @desc    Create a food donation
// @route   POST /api/food
// @access  Private/Donor
const createFood = async (req, res, next) => {
  try {
    const { name, quantity, isVeg, cookedTime, expiryTime, pickupAddress, location, contactNumber, imageUrl } = req.body;

    const foodData = {
      donor: req.user._id,
      name,
      quantity,
      isVeg,
      cookedTime,
      expiryTime,
      pickupAddress,
      contactNumber,
      imageUrl,
    };

    if (location && location.coordinates) {
      foodData.location = {
        type: 'Point',
        coordinates: location.coordinates,
      };
    }

    const food = new Food(foodData);

    const createdFood = await food.save();
    res.status(201).json(createdFood);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all available foods
// @route   GET /api/food
// @access  Public
const getAvailableFoods = async (req, res, next) => {
  try {
    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: 'i' } }
      : {};

    const vegFilter = req.query.isVeg !== undefined ? { isVeg: req.query.isVeg === 'true' } : {};

    const foods = await Food.find({ ...keyword, ...vegFilter, status: 'Available' })
      .populate('donor', 'name email contactNumber address');

    res.json(foods);
  } catch (error) {
    next(error);
  }
};

// @desc    Get specific food details
// @route   GET /api/food/:id
// @access  Public
const getFoodById = async (req, res, next) => {
  try {
    const food = await Food.findById(req.params.id).populate('donor', 'name email contactNumber');

    if (food) {
      res.json(food);
    } else {
      res.status(404);
      throw new Error('Food not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get donor's foods
// @route   GET /api/food/donor/me
// @access  Private/Donor
const getMyDonations = async (req, res, next) => {
  try {
    const foods = await Food.find({ donor: req.user._id }).sort({ createdAt: -1 });
    res.json(foods);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete food
// @route   DELETE /api/food/:id
// @access  Private/Donor or Admin
const deleteFood = async (req, res, next) => {
  try {
    const food = await Food.findById(req.params.id);

    if (food) {
      // Check ownership or admin
      if (food.donor.toString() !== req.user._id.toString() && req.user.role !== 'Admin') {
        res.status(401);
        throw new Error('Not authorized to delete this food');
      }
      
      await food.deleteOne();
      res.json({ message: 'Food removed' });
    } else {
      res.status(404);
      throw new Error('Food not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Update food
// @route   PUT /api/food/:id
// @access  Private/Donor or Admin
const updateFood = async (req, res, next) => {
  try {
    const food = await Food.findById(req.params.id);

    if (food) {
      // Check ownership or admin
      if (food.donor.toString() !== req.user._id.toString() && req.user.role !== 'Admin') {
        res.status(401);
        throw new Error('Not authorized to update this food');
      }

      const { name, quantity, isVeg, cookedTime, expiryTime, pickupAddress, contactNumber, status, imageUrl } = req.body;

      food.name = name || food.name;
      food.quantity = quantity || food.quantity;
      food.isVeg = isVeg !== undefined ? isVeg : food.isVeg;
      food.cookedTime = cookedTime || food.cookedTime;
      food.expiryTime = expiryTime || food.expiryTime;
      food.pickupAddress = pickupAddress || food.pickupAddress;
      food.contactNumber = contactNumber || food.contactNumber;
      food.status = status || food.status;
      if (imageUrl) food.imageUrl = imageUrl;

      const updatedFood = await food.save();
      res.json(updatedFood);
    } else {
      res.status(404);
      throw new Error('Food not found');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createFood,
  getAvailableFoods,
  getFoodById,
  getMyDonations,
  updateFood,
  deleteFood,
};
