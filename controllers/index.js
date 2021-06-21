const UserRequestModel = require('./../model/UserRequest');
const moment = require('moment');
const sms = require('fast-two-sms');

exports.PostUserRequest = async (req, res) => {
  const {
    firstname,
    lastname,
    adhaar_no,
    phone_number,
    long,
    lat,
    pincode,
    district,
    state,
    stage_predicted,
    photos,
  } = req.body;
  const created_at = moment().format('MMMM Do YYYY, h:mm:ss a');
  const accepted = false;
  try {
    const RequestData = await UserRequestModel.create({
      firstname,
      lastname,
      adhaar_no,
      phone_number,
      long,
      lat,
      pincode,
      district,
      state,
      accepted,
      created_at,
      stage_predicted,
      photos,
    });
    var options = {
      authorization: process.env.API_KEY_SMS,
      message: `Your request have been submitted successfully.
      
      Use these details to login to dashboard and check application status:-
      Application ID - ${RequestData._id}
      Adhaar Number - ${RequestData.adhaar_no}
      
      Thanks for using "Mera Ghar"`,
      numbers: [phone_number],
    };
    const message = await sms.sendMessage(options);
    res.status(200).json({ status: 200 });
  } catch (err) {
    console.log(err);
    res.status(400).send('ERROR OCCURRED');
  }
};

exports.AdminLogin = async (req, res) => {
  res.send('SUCCESS');
};

exports.AdminRegister = async (req, res) => {
  res.send('SUCCESS');
};

exports.UserLogin = async (req, res) => {
  res.send('SUCCESS');
};
