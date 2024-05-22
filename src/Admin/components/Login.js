import "../css/login.css";
import React from "react";

export default function Login() {
  return (
    <>
      <div className="loginContainer">
        <div className="loginWrapper">
          <div className="loginLeft">
            <h4 className="loginLogo">IndustroManage.</h4>
            <span className="loginDesc">
              Get all the Products in one place!!!
            </span>
          </div>
          <div className="loginRight">
            <form className="loginBox">
              <input
                type="Email"
                placeholder="Email"
                className="loginInput"
                required
              />
              <input
                type="Password"
                placeholder="Password"
                className="loginInput"
                minLength="6"
                required
              />
              <button className="loginButton">Sign In</button>
              <span className="loginForgot">Forgot Password?</span>
              <button className="loginRegisterButton">
                Create a new Account
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
