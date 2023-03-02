import React, { Suspense, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Page from '../../components/utils/Page';
import Button from '../../components/Button/Button';
import './Login.css'

 const Login = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [passwordError, setpasswordError] = useState('');
  const [emailError, setemailError] = useState('');

  var user = JSON.parse(localStorage.getItem('user'));

  const handleClick = (e) => {
    e.preventDefault();
    console.log("sdsd")
    let formIsValid = true;

    if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
      formIsValid = false;
      setemailError('Email Not Valid');
      return false;
    } else {
      setemailError('');
      formIsValid = true;
    }

    if (!password.match(/^[a-zA-Z]{8,22}$/)) {
      formIsValid = false;
      setpasswordError('Password must in length of 8 to 22 Chracters');
      return false;
    } else {
      setpasswordError('');
      formIsValid = true;
    }
    formIsValid =
      email === user.email && password === user.password ? true : false;

    formIsValid === true ? navigate('/') : alert('wrong email or password');
  };

  return (
    <Page title={"Flens-Login"}>
      <Suspense fallback={null}>
      <div className='login-page'>
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
                <small id="emailError" className="text-danger form-text">
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
                <small id="passwordError" className="text-danger form-text">
                  {passwordError}
                </small>
              </div>
              <div className="d-grid gap-2 mt-3 mb-4">
                <Button
                  text={'Sign In'}
                  type="default"
                  onClick={(e)=>handleClick(e)}
                ></Button>
              </div>
              <p>
                Don't have an account yet? <a href="/register">Sign up now</a>
              </p>
            </div>
          </form>
      </div>
      </Suspense>
    </Page>
  )
}

export default Login
