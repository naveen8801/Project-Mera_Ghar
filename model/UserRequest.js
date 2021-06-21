const mongoose = require('mongoose');

const userrequest = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  adhaar_no: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
    required: true,
  },
  long: {
    type: String,
    required: true,
  },
  lat: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  stage_predicted: {
    type: String,
    required: true,
  },
  photos: [String],
  accepted: {
    type: Boolean,
    required: false,
  },
  created_at: {
    type: String,
    required: true,
  },
});

const UserRequestModel = mongoose.model('UserRequests', userrequest);
module.exports = UserRequestModel;
