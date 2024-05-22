import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Validation from "./LoginValidation";
import axios from "axios";

function SignIn() {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));

    if (!errors.email && !errors.password) {
      axios.post("http://localhost:8081/signin", values)
        .then((res) => {
          if (res.data === "Success") {
            navigate("/");
          } 
          else if (res.data === "Admin") {
            navigate("/dashboard");
          }   
          else {
            alert("No record existed");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
      <div className='bg-white p-3 rounded w-25'>
        <h2>Sign-In</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor="email"><strong>Email</strong></label>
            <input 
              type="email" 
              placeholder='Enter Email' 
              className='form-control rounded-0'
              name="email"
              value={values.email} 
              onChange={handleInput} 
            />
            {errors.email && <span className="text-danger">{errors.email}</span>}
          </div>
          
          <div className='mb-3'>
            <label htmlFor="password"><strong>Password</strong></label>
            <input 
              type="password" 
              placeholder='Enter Password'
              name="password" 
              value={values.password}
              onChange={handleInput} 
              className='form-control rounded-0' 
            />
            {errors.password && <span className="text-danger">{errors.password}</span>}
          </div>
          <button type="submit" className='btn btn-success w-100 rounded-0'>Sign in</button>
          <p>You agree to our terms and policies</p>
          <Link to="/signup" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Create Account</Link>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
