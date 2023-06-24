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
  const { createUser, isFetching, fetchedData, fetchError } =
    useCreateUserLazy();

  const handleClick = async (e) => {
    e.preventDefault();

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
