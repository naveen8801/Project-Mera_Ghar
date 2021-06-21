const express = require('express');
const Router = express.Router();
const {
  PostUserRequest,
  AdminLogin,
  AdminRegister,
  UserLogin,
} = require('./../controllers/index');

Router.post('/submit-request', PostUserRequest);
Router.post('/admin-login', AdminLogin);
Router.post('/admin-register', AdminRegister);
Router.post('/user-login', UserLogin);


module.exports = Router;
