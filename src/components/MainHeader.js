
import React, { useEffect, useState } from "react";
// import { Navigate,useHistory} from "react-router-dom";
// import axios from "axios";
import "../css/mainheader.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function MainHeader() {

  const navigate = useNavigate(); // Access to navigation history

  const handleLogout = () => {
    axios.get('http://localhost:8081/logout')
      .then(res => {
        if (res.status === 200) {
          navigate('/signin'); // Redirect to login page after successful logout
          alert("logout successfull");
        } else {
          console.error('Logout failed');
        }
      })
      .catch(err => console.log(err))
  }

  return (
    <header id="header" className="header fixed-top d-flex align-items-center">
      
      <div className="container d-flex align-items-center justify-content-between">
        {/* Logo */}
        <a href="/" className="logo d-flex align-items-center me-auto me-lg-0">
          <img src="assets/img/logo.png" alt="" className="img-fluid" />
          <h1>
            IndustroManage<span>.</span>
          </h1>
        </a>

        {/* Navigation Menu */}
        <nav id="navbar" className="navbar">
          <ul className="d-none d-lg-flex">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about-us">About</a>
            </li>
            <li>
              <a href="/products">Product</a>
            </li>
            <li>
              <a href="/orderstatus">Orderstatus</a>
            </li>
            
            <li className="dropdown">
              <a href="#">
                <span>Join Us</span>{" "}
                <i className="bi bi-chevron-down dropdown-indicator"></i>
              </a>
              <ul>
                <li>
                  <a href="/signin">Login</a>
                </li>
                <li>
                  <a href="/signup">Registration</a>
                </li>
              </ul>
            </li>
            <li>
              {/* <Link to='/login'> */}
              <a onClick={handleLogout} href="#">Logout</a>
                {/* </Link> */}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default MainHeader;
