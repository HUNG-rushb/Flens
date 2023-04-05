import PrivateRoute from './PrivateRoute.jsx';
import { client } from './apollo-client-v2/client.jsx';
import NavBar from './components/NavBar/NavBar.jsx';
import { AuthProvider } from './context/AuthContext.js';
import routes from './route/route.jsx';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {


  return (
    <>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <AuthProvider>
            <NavBar/>
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
      </ApolloProvider>
    </>
  );
};

export default App;
