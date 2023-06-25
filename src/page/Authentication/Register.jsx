import ButtonCustom from '../../components/Button/ButtonCustom';
import Page from '../../components/utils/Page';
import Spinner from '../../components/utils/Spinner';
import { useCreateUserLazy } from '../../graphql/useUser';
import './Login.css';
import hash from 'hash-it';
import React, { Suspense, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState([]);

  const { createUser, isFetching, fetchedData, fetchError } =
    useCreateUserLazy();

  const checkValidate = () => {
    const validationErrors = {};

    if (name === '') {
      validationErrors.name = 'Name is required.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
      validationErrors.email = 'Email is required.';
    }
    if (!emailRegex.test(email)) {
      validationErrors.email = 'Invalid email address.';
    }
    if (password === '') {
      validationErrors.password = 'Password is required.';
    }
    if (password.length < 6) {
      validationErrors.password = 'Password must be at least 6 characters.';
    }
    return validationErrors;
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const validationErrors = checkValidate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      try {
        await createUser({
          variables: {
            data: {
              name,
              hashPassword: `${hash(password)}`,
              email,
            },
          },
        });
        navigate('/login');
      } catch (e) {
        throw e;
      }
    }
  };

  return (
    <Page title={'Flens-Register'}>
      <Suspense fallback={null}>
        <div className="login-page">
          <form className="Login-form" autoComplete="off">
            <div className="Login-form-content">
              <h3 className="Login-form-title">Sign Up</h3>

              <div className="form-group mt-3">
                <label style={{ display: 'flex' }}>Name</label>
                <input
                  type="email"
                  className="form-control mt-1"
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter name"
                  value={name}
                />
                {errors.name && <span className="errors">{errors.name}</span>}
              </div>

              <div className="form-group mt-3">
                <label style={{ display: 'flex' }}>Email address</label>
                <input
                  type="email"
                  className="form-control mt-1"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                  value={email}
                />
                {errors.email && <span className="errors">{errors.email}</span>}
              </div>

              <div className="form-group mt-3">
                <label style={{ display: 'flex' }}>Password</label>
                <input
                  type="password"
                  className="form-control mt-1"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  value={password}
                />
                {errors.password && (
                  <span className="errors">{errors.password}</span>
                )}
              </div>

              {isFetching ? (
                <div className="d-grid gap-2 mt-3">
                  <Spinner />
                </div>
              ) : (
                <>
                  <div className="d-grid gap-2 mt-3">
                    <ButtonCustom
                      text={'Sign Up'}
                      type="default"
                      onClick={handleClick}
                      disabled={isFetching}
                    />
                  </div>

                  <p className="mt-3 mb-3">
                    Already have an account? <a href="/login">Sign in now</a>
                  </p>
                </>
              )}
            </div>
          </form>
        </div>
      </Suspense>
    </Page>
  );
};

export default Register;
