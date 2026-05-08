const express = require('express');
const router = express.Router();
const { createRequest, getNgoRequests, getDonorRequests, updateRequestStatus } = require('../controllers/requestController');
const { protect, ngo, donor } = require('../middlewares/authMiddleware');

router.route('/')
  .post(protect, ngo, createRequest);

router.get('/ngo', protect, ngo, getNgoRequests);
router.get('/donor', protect, donor, getDonorRequests);

router.route('/:id/status')
  .put(protect, donor, updateRequestStatus);

module.exports = router;
