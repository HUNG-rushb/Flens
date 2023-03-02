// Router
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import NavBar from './components/NavBar/NavBar.jsx';
import Login from './page/Authencation/Login.jsx';
import Register from './page/Authencation/Register.jsx';
import Explore from './page/Explore/Explore.jsx';
import Notification from './page/Notification/Notification.jsx';
import Profile from './page/Profile/Profile.jsx';
import Home from './page/Home/Home.jsx';
import MessagePage from './page/MessagePage.jsx';

const router = [
  {
    path: '/',
    element: <Home />,
    exact: true,
  },
  {
    path: '/login',
    element: <Login />,
    exact: true,
  },
  {
    path: '/register',
    element: <Register />,
    exact: true,
  },
  {
    path: '/explore',
    element: <Explore />,
    exact: true,
  },
  {
    path: '/message',
    element: <MessagePage />,
    exact: true,
  },
  {
    path: '/notification',
    element: <Notification />,
    exact: true,
  },
  {
    path: '/profile',
    element: <Profile />,
    exact: true,
  },
];

const App = () => {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <div className="inside">
          <Routes>
            {router.map((route, idx) => (
              <Route
                key={idx}
                path={route.path}
                element={route.element}
                exact={route.exact}
              />
            ))}
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
