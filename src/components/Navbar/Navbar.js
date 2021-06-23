import React from 'react';
import './Navbar.css'
import gov_logo from './../../assets/govt_logo.svg'
import { Link } from 'react-router-dom';

function Navbar() {
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
                    <Link to="/admin">
                        <h3 className="nav-links">Admin</h3>
                    </Link>
                    <Link to="/user">
                        <h3 className="nav-links">User</h3>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar
