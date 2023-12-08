import Button from '../../components/Button/Button';
import Page from '../../components/utils/Page';
import { useCreateUserLazy } from '../../graphql/useUser';
import { checkValidate } from '../../utils/checkValidate';
import ErrorPopup from '../../utils/errorPopup';
import './Login.css';
import hash from 'hash-it';
import React, { Suspense, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../utils/useLoading';

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState([]);

  const { createUser, isFetching, fetchedData, fetchError } =
    useCreateUserLazy();

  const handleClick = async (e) => {
    e.preventDefault();
    const validationErrors = checkValidate(name, email, password, rePassword);

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

              <div className="form-group mt-3">
                <label style={{ display: 'flex' }}>Confirm password</label>
                <input
                  type="password"
                  className="form-control mt-1"
                  onChange={(e) => setRePassword(e.target.value)}
                  placeholder="Retype password"
                  value={rePassword}
                />
                {errors.rePassword && (
                  <span className="errors">{errors.rePassword}</span>
                )}
              </div>
              <div className="d-grid gap-2 mt-3">
                <Button
                  text="Sign Up"
                  type="default"
                  onClick={handleClick}
                />
              </div>

              <p className="mt-3 mb-3">
                Already have an account? <a href="/login">Sign in now</a>
              </p>
            </div>
          </form>
          <Loading loading={isFetching} />
          {fetchError?.message && <ErrorPopup message={fetchError?.message} />}
        </div>
      </Suspense>
    </Page>
  );
};

export default Register;
