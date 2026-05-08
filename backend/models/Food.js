const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  isVeg: {
    type: Boolean,
    required: true,
  },
  cookedTime: {
    type: Date,
  },
  expiryTime: {
    type: Date,
    required: true,
  },
  pickupAddress: {
    type: String,
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ['Point']
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
    }
  },
  contactNumber: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  status: {
    type: String,
    enum: ['Available', 'Requested', 'Accepted', 'Picked Up', 'Delivered'],
    default: 'Available',
  }
}, {
  timestamps: true,
});

foodSchema.index({ location: '2dsphere' });

const Food = mongoose.model('Food', foodSchema);
module.exports = Food;
