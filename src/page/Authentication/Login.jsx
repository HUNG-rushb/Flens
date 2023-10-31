import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import Page from '../../components/utils/Page';
import { useAuthDispatch } from '../../context/AuthContext';
import { loginUser } from '../../context/actions/AuthActions';
import { useVerifyUserLazy } from '../../graphql/useUser';
import './Login.css';
import hash from 'hash-it';
import React, { Suspense, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAuthDispatch();

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState([]);

  const { verifyUser, isFetching, fetchedData, fetchError } =
    useVerifyUserLazy();

  const checkValidate = () => {
    const validationErrors = {};

    if (email === '') {
      validationErrors.email = 'Email is required.';
    }

    if (password === '') {
      validationErrors.password = 'Password is required.';
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
        const user = await verifyUser({
          variables: {
            verifyUserData: {
              hashPassword: `${hash(password)}`,
              email,
            },
          },
        });

        loginUser(dispatch, {
          id: user.data.verifyUser.id,
          isAdmin: user.data.verifyUser.isAdmin,
          profileImageURL: user.data.verifyUser.profileImageURL,
        });

        navigate('/');
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Page title='Flens-Login'>
      <Suspense fallback={null}>
        <div className="login-page">
          <form className="Login-form">
            <div className="Login-form-content">
              <h3 className="Login-form-title">Sign In</h3>
              {fetchError && <p>Retry</p>}

              <div className="form-group mt-3">
                <label>Email</label>
                <Input
                  type="text"
                  className="form-control mt-1"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                  value={email}
                />
                {errors.email && (
                  <span className="errors-signIn">{errors.email}</span>
                )}
              </div>

              <div className="form-group mt-3">
                <label>Password</label>
                <Input
                  type="password"
                  className="form-control mt-1"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                />
                {errors.password && (
                  <span className="errors-signIn">{errors.password}</span>
                )}
              </div>

              <div className="d-grid gap-2 mt-3 mb-4">
                <Button text="Sign In" type="default" onClick={handleClick} />
              </div>

              <p>
                Don't have an account yet? <a href="/register">Sign up now!</a>
              </p>
            </div>
          </form>
        </div>
      </Suspense>
    </Page>
  );
};

export default Login;