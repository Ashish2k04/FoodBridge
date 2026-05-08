const Request = require('../models/Request');
const Food = require('../models/Food');

// @desc    Create a request
// @route   POST /api/requests
// @access  Private/NGO
const createRequest = async (req, res, next) => {
  try {
    const { foodId } = req.body;

    const food = await Food.findById(foodId);
    if (!food) {
      res.status(404);
      throw new Error('Food not found');
    }

    if (food.status !== 'Available') {
      res.status(400);
      throw new Error('Food is no longer available');
    }

    const requestExists = await Request.findOne({ food: foodId, ngo: req.user._id });
    if (requestExists) {
      res.status(400);
      throw new Error('You have already requested this food');
    }

    const request = new Request({
      food: foodId,
      ngo: req.user._id,
    });

    const createdRequest = await request.save();
    
    // Update food status
    food.status = 'Requested';
    await food.save();

    res.status(201).json(createdRequest);
  } catch (error) {
    next(error);
  }
};

// @desc    Get requests made by NGO
// @route   GET /api/requests/ngo
// @access  Private/NGO
const getNgoRequests = async (req, res, next) => {
  try {
    const requests = await Request.find({ ngo: req.user._id })
      .populate({
        path: 'food',
        populate: { path: 'donor', select: 'name contactNumber address' }
      })
      .sort({ createdAt: -1 });
    
    res.json(requests);
  } catch (error) {
    next(error);
  }
};

// @desc    Get requests received by Donor
// @route   GET /api/requests/donor
// @access  Private/Donor
const getDonorRequests = async (req, res, next) => {
  try {
    // Find all foods donated by this donor
    const foods = await Food.find({ donor: req.user._id });
    const foodIds = foods.map(food => food._id);

    // Find all requests for these foods
    const requests = await Request.find({ food: { $in: foodIds } })
      .populate('food')
      .populate('ngo', 'name email contactNumber address')
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (error) {
    next(error);
  }
};

// @desc    Update request status
// @route   PUT /api/requests/:id/status
// @access  Private/Donor
const updateRequestStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const request = await Request.findById(req.params.id).populate('food');

    if (!request) {
      res.status(404);
      throw new Error('Request not found');
    }

    // Check if the current user is the donor of the requested food
    if (request.food.donor.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to update this request');
    }

    request.status = status;
    await request.save();

    // Sync food status
    request.food.status = status;
    await request.food.save();

    res.json(request);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createRequest,
  getNgoRequests,
  getDonorRequests,
  updateRequestStatus,
};
