const express = require('express');
const Router = express.Router();
const {
  PostUserRequest,
  AdminLogin,
  AdminRegister,
  PublicData,
} = require('./../controllers/index');

Router.post('/submit-request', PostUserRequest);
Router.post('/admin-login', AdminLogin);
Router.post('/admin-register', AdminRegister);
Router.get('/public-data', PublicData);

module.exports = Router;
