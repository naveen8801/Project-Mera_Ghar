const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  created_at: {
    type: String,
    required: true,
  },
});

const AdminModel = mongoose.model('admins', AdminSchema);
module.exports = AdminModel;
