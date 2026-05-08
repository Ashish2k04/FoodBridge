const express = require('express');
const router = express.Router();
const { createFood, getAvailableFoods, getFoodById, getMyDonations, updateFood, deleteFood } = require('../controllers/foodController');
const { protect, donor } = require('../middlewares/authMiddleware');

router.route('/')
  .post(protect, donor, createFood)
  .get(getAvailableFoods);

router.get('/donor/me', protect, donor, getMyDonations);

router.route('/:id')
  .get(getFoodById)
  .put(protect, updateFood)
  .delete(protect, deleteFood);

module.exports = router;
