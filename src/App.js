import { BrowserRouter, Routes, Route } from 'react-router-dom';

import NavBar from './components/NavBar/NavBar.jsx';
import routes from './route/route.jsx';
import { AuthProvider } from './context/AuthContext.js';
import PrivateRoute from './PrivateRoute.jsx';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <NavBar />

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
        </AuthProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
