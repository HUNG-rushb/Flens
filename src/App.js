import { BrowserRouter, Routes, Route } from 'react-router-dom';

import NavBar from './components/NavBar/NavBar.jsx';
import routes from './route/route.jsx';
import { AuthProvider } from './context/AuthContext.js';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <NavBar />

          <Routes>
            {routes.map((route, idx) => (
              <Route
                key={idx}
                path={route.path}
                element={route.element}
                exact={route.exact}
              />
            ))}
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
