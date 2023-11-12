import PrivateRoute from './PrivateRoute.jsx';
import NavBar from './components/NavBar/NavBar.jsx';
import { AuthProvider } from './context/AuthContext.js';
import routes from './router/router.jsx';
import { Offline, Online } from 'react-detect-offline';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <Online>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <BrowserRouter>
          <AuthProvider>
            <NavBar />
            <div className="inside">
              <Routes>
                {routes.map((route, idx) => {
                  if (route.isPrivate) {
                    return (
                      <Route
                        key={idx + 'private'}
                        path={route.path}
                        element={<PrivateRoute />}
                        exact={route.exact}
                      >
                        <Route
                          key={idx}
                          exact={route.exact}
                          path={route.path}
                          element={route.element}
                        />
                      </Route>
                    );
                  } else {
                    return (
                      <Route
                        key={idx}
                        path={route.path}
                        element={route.element}
                        exact={route.exact}
                      />
                    );
                  }
                })}
              </Routes>
            </div>
          </AuthProvider>
        </BrowserRouter>
      </Online>

      <Offline>You're offline right now. Check your connection!</Offline>
    </>
  );
};

export default App;
