import ButtonCustom from '../../components/Button/ButtonCustom';
import InputCustom from '../../components/Input/Input';
import Page from '../../components/utils/Page';
import { useAuthState, useAuthDispatch } from '../../context/AuthContext';
import { loginUser } from '../../context/actions/AuthActions';
import './Login.css';
import React, { Suspense, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAuthDispatch();
  const { loading, errorMessage } = useAuthState();

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [passwordError, setpasswordError] = useState('');
  const [emailError, setemailError] = useState('');
  // const [account, setAccount] = useState({
  //   email: "",
  //   password: "",
  // });

  const account = {
    email:email,
    password:password,
  }

  const handleClick = async (e) => {
    // setAccount({
    //   email: email,
    //   password: password,
    // })
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
    // formIsValid =
    //   email === user.email && password === user.password ? true : false;

    // formIsValid === true ? navigate('/') : alert('wrong email or password');

    try {
      let response = await loginUser(dispatch, account);

      if (!response.user) return;

      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Page title={'Flens-Login'}>
      <Suspense fallback={null}>
        <div className="login-page">
          <form className="Login-form">
            <div className="Login-form-content">
              <h3 className="Login-form-title">Sign In</h3>
              <div className="form-group mt-3">
                <label>Email</label>
                <InputCustom
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
                <InputCustom
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
                <ButtonCustom
                  text={'Sign In'}
                  type="default"
                  onClick={handleClick}
                ></ButtonCustom>
              </div>
              <p>
                Don't have an account yet? <a href="/register">Sign up now</a>
              </p>
            </div>
          </form>
        </div>
      </Suspense>
    </Page>
  );
};

export default Login;
