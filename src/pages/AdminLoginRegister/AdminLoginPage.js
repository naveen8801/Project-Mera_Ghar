import React, { useState } from 'react';
import './AdminLoginPage.css';
import { adminRegister, adminLogin } from './../../api/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AdminLoginPage() {
  const [fullname, setfullname] = useState('');
  const [phonenumber, setphone] = useState('');
  const [password, setpassword] = useState('');
  const [adminId, setadminid] = useState('');
  const [adminpassword, setadminpassword] = useState('');

  const signUpHandler = async () => {
    if (fullname === '') {
      toast.error('Please enter your Full name');
      return;
    }
    if (phonenumber === '') {
      toast.error('Please enter a valid phone number with 10 digits');
      return;
    }
    if (password === '') {
      toast.error('Please enter a valid password between 6 to 15 characters ');
      return;
    }

    if (phonenumber.trim().length !== 10) {
      toast.error('Please enter a valid phone number with 10 digits');
      return;
    }

    if (password.trim().length < 6 || password.trim().length > 16) {
      toast.error('Please enter a valid password between 6 to 15 characters ');
      return;
    }

    const body = {
      fullname: fullname,
      phone_number: phonenumber,
      password: password,
    };

    try {
      const res = await adminRegister(body);
      if (!res.data.error) {
        localStorage.setItem('tokken', res.data.accesstoken);
        toast.success('Admin Registered Succesfully');
        setfullname('');
        setpassword('');
        setphone('');
      }
    } catch (error) {
      console.log(error.response);
      if (error.response) {
        console.log(error.response);
        toast.error(`${error.response.data.msg}`);
      }
    }
  };

  const loginHandler = async () => {
    if (adminId === '') {
      toast.error('Please enter a valid admin id');
      return;
    }

    if (adminpassword.trim().length < 6 || password.trim().length > 16) {
      toast.error('Please enter a valid password between 6 to 15 characters ');
      return;
    }

    const body = {
      admin_id: adminId,
      password: adminpassword,
    };

    try {
      const res = await adminLogin(body);
      if (!res.data.error) {
        localStorage.setItem('tokken', res.data.accesstoken);
        toast.success('Admin logined Succesfully');
        setadminid('');
        setadminpassword('');
      }
    } catch (error) {
      console.log(error.response);
      if (error.response) {
        console.log(error.response);
        toast.error(`${error.response.data.msg}`);
      }
    }

    console.log(body);
  };

  return (
    <div className="admin-login-page">
      <ToastContainer position="bottom-left" />
      <div className="flexbox-item">
        <h2>Register</h2>
        <div className="form">
          <input
            value={fullname}
            type="text"
            placeholder="Full Name"
            onChange={(e) => setfullname(e.target.value)}
          />
          <input
            value={phonenumber}
            type="text"
            placeholder="Phone Number"
            onChange={(e) => setphone(e.target.value)}
          />
          <input
            value={password}
            type="password"
            placeholder="Password"
            onChange={(e) => setpassword(e.target.value)}
          />
          <button onClick={signUpHandler} className="login-btn">
            Sign Up
          </button>
        </div>
      </div>
      <div className="flexbox-item">
        <h2>Login</h2>
        <div className="form">
          <input
            value={adminId}
            type="text"
            placeholder="Admin ID"
            onChange={(e) => setadminid(e.target.value)}
          />
          <input
            value={adminpassword}
            type="password"
            placeholder="Password"
            onChange={(e) => setadminpassword(e.target.value)}
          />
          <button onClick={loginHandler} className="login-btn">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminLoginPage;
