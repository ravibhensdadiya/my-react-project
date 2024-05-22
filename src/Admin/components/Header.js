import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate , Link} from "react-router-dom";

function Header() {
  const [currentTime, setCurrentTime] = useState('');
  const navigate = useNavigate(); // Access to navigation history

  useEffect(() => {
    updateTime(); // Start the timer when the component mounts
  }, []);

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

  function updateTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    seconds = seconds < 10 ? '0'+seconds : seconds;

    const strTime = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
    setCurrentTime(strTime); // Update the state with the current time

    setTimeout(updateTime, 1000); // Call updateTime again after 1 second
  }

  return (
    <>
      <header
        id="header"
        className="header fixed-top d-flex align-items-center"
      >
        <div className="container d-flex align-items-center justify-content-between">
          {/* Logo */}
          <a href="/" className="logo d-flex align-items-center me-auto me-lg-0">
            <img src="" alt="" className="img-fluid" />
            <h1>
              Industro Admin<span>.</span>
            </h1>
          </a>

          {/* Navigation Menu */}
          <nav id="navbar" className="navbar">
            <ul className="d-none d-lg-flex">
              <div id="current-time" style={{ fontWeight: 'bold' }}>{currentTime}</div>
              <li>
                <a href="/dashboard">Dashboard</a>
              </li>
              <li className="dropdown">
                <a href="/product">Products</a>
              </li>
              <li><a href="/orders">Orders</a></li>
              <li>
                {/* <Link to='/login'> */}
                <a onClick={handleLogout} href="#">Logout</a>
                {/* </Link> */}
                {/* <a onClick={handleLogout} href="#">Logout</a> */}
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}

export default Header;
