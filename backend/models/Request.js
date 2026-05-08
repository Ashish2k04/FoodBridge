const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  food: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Food',
    required: true,
  },
  ngo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['Requested', 'Accepted', 'Picked Up', 'Delivered'],
    default: 'Requested',
  },
  requestedAt: {
    type: Date,
    default: Date.now,
  }
}, {
  timestamps: true,
});

const Request = mongoose.model('Request', requestSchema);
module.exports = Request;
