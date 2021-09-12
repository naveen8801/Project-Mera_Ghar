import React from 'react';
import './Navbar.css';
import gov_logo from './../../assets/govt_logo.svg';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import AdminProfile from '../../pages/AdminProfile/AdminProfile';

function Navbar() {
  const dispatch = useDispatch();
  const islogin = useSelector((state) => state.admin.islogin);
  const adminName = useSelector((state) => state.admin.details.name);
  return (
    <div className="navabr">
      <div className="flexbox-item1">
        <img src={gov_logo} className="logo-gov" alt="logo" />
        <h2 className="heading-title">Mera Ghar</h2>
      </div>
      <div className="flexbox-item2">
        <div className="sub-flexbox-item">
          <Link to="/">
            <h3 className="nav-links">Dashboard</h3>
          </Link>
          {islogin ? (
            <>
              <Link to="/admin-profile">
                <h3 className="nav-links">Hello {adminName} !</h3>
              </Link>
              <Link to="/logut">
                <h3 className="nav-links">Logout</h3>
              </Link>
            </>
          ) : (
            <Link to="/admin">
              <h3 className="nav-links">Admin</h3>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
