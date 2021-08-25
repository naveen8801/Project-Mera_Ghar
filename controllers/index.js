const UserRequestModel = require('./../model/UserRequest');
const AdminModel = require('./../model/Admin');
const moment = require('moment');
const sms = require('fast-two-sms');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const maxage = 1 * 24 * 60 * 60;
const createwebToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_ACCESS_TOKEN, {
    expiresIn: maxage,
  });
};

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
      message: `Your request has been submitted successfully on Mera Ghar app.
Application Id - ${RequestData._id}
Adhaar Number - ${RequestData.adhaar_no}
Thanks for using MERA GHAR Application.`,
      numbers: [phone_number],
    };
    const message = await sms.sendMessage(options);
    res.status(200).json({ status: 200 });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      res.status(400).json({ status: 400, key: Object.keys(err.keyPattern) });
    } else {
      res.status(400).send('ERROR OCCURRED');
    }
  }
};

exports.AdminLogin = async (req, res) => {
  const { admin_id, password } = req.body;
  try {
    if (!admin_id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ status: 400, msg: 'Invalid Credentials' });
    }
    const user = await AdminModel.findById(admin_id);
    if (user) {
      const validPassword = await bcrypt.compare(password, user.password);
      if (validPassword) {
        const token = createwebToken(user._id);
        return res.status(200).json({ accesstoken: token });
      } else {
        return res
          .status(400)
          .json({ status: 400, msg: 'Invalid Credentials' });
      }
    } else {
      res.status(400).json({ status: 400, msg: 'No Admin Found' });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: 400, msg: '500 Internal Error' });
  }
};

exports.AdminRegister = async (req, res) => {
  let { fullname, phone_number, password } = req.body;
  try {
    const salt = await bcrypt.genSalt();
    password = await bcrypt.hash(password, salt);
    const created_at = moment().format('MMMM Do YYYY, h:mm:ss a');
    const admin = await AdminModel.create({
      fullname,
      phone_number,
      password,
      created_at,
    });
    var options = {
      authorization: process.env.API_KEY_SMS,
      message: `${fullname} has been succesfully registered as admin for Mera Ghar Service.
Admin Id - ${admin._id}
Thanks for using MERA GHAR Application.`,
      numbers: [phone_number],
    };
    const message = await sms.sendMessage(options);
    const token = createwebToken(admin._id);
    return res.status(200).json({ accesstoken: token });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      res.status(400).json({
        status: 400,
        msg: `${Object.keys(err.keyPattern)[0]} is already registered`,
      });
    } else {
      res.status(400).json({ msg: 'ERROR OCCURRED' });
    }
  }
};

exports.PublicData = async (req, res) => {
  try {
    const admin = await AdminModel.find();
    const Requests = await UserRequestModel.find();
    let RequestLocationData = [];
    let stages = [];
    let date = [];
    let state = [];
    Requests.map((item) => {
      RequestLocationData.push({
        name: item.firstname + ' ' + item.lastname,
        pincode: item.pincode,
        district: item.district,
        state: item.state,
        long: item.long,
        lat: item.lat,
      });
      stages.push(item.stage_predicted);
      date.push(item.created_at.split(',')[0]);
      state.push(item.state);
    });
    let stageAnalysis = {};
    for (let i = 0; i < stages.length; i++) {
      if (!stageAnalysis[stages[i]]) stageAnalysis[stages[i]] = 0;
      ++stageAnalysis[stages[i]];
    }
    let dateAnalysis = {};
    for (let i = 0; i < date.length; i++) {
      if (!dateAnalysis[date[i]]) dateAnalysis[date[i]] = 0;
      ++dateAnalysis[date[i]];
    }
    let stateAnalysis = {};
    for (let i = 0; i < date.length; i++) {
      if (!stateAnalysis[state[i]]) stateAnalysis[state[i]] = 0;
      ++stateAnalysis[state[i]];
    }
    res.status(200).json({
      totalrequest: Requests.length,
      totaladmin: admin.length,
      datedata: dateAnalysis,
      statedata: stateAnalysis,
      stagedata: stageAnalysis,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: 400 });
  }
};
