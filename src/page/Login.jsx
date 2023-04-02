import React, { useState } from 'react';
import '../components/Account/Login.css';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../context/actions/AuthActions';
import { useAuthState, useAuthDispatch } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useAuthDispatch();
  const { loading, errorMessage } = useAuthState();

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [passwordError, setpasswordError] = useState('');
  const [emailError, setemailError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // let formIsValid = true;

    // if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
    //   formIsValid = false;
    //   setemailError('Email Not Valid');
    //   return false;
    // } else {
    //   setemailError('');
    //   formIsValid = true;
    // }

    // if (!password.match(/^[a-zA-Z]{8,22}$/)) {
    //   formIsValid = false;
    //   setpasswordError('Password must in length of 8 to 22 Chracters');
    //   return false;
    // } else {
    //   setpasswordError('');
    //   formIsValid = true;
    // }

    try {
      let response = await loginUser(dispatch, {});

      if (!response.user) return;

      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="loginPage">
      <form className="Login-form">
        <div className="Login-form-content">
          <h3 className="Login-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Email</label>
            <input
              type="text"
              className="form-control mt-1"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              value={email}
            />
            <small id="emailHelp" className="text-danger form-text">
              {emailError}
            </small>
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
            <small id="passworderror" className="text-danger form-text">
              {passwordError}
            </small>
          </div>
          <div className="d-grid gap-2 mt-3 mb-4">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Sign In
            </button>
          </div>
          <p>
            Don't have an account yet? <a href="/register">Sign up now</a>
          </p>
        </div>
      </form>

      {errorMessage ? <p>{errorMessage}</p> : null}
    </div>
  );
}
