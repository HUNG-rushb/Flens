// Router
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import NavBar from './components/NavBar/NavBar.jsx';
// import HomePage from './page/HomePage.jsx';
import Login from './page/Login.jsx'
import Register from './page/Register.jsx'
import Explore from './page/Explore.jsx'
import Inbox from './page/Inbox.jsx'
import Notification from './page/Notification.jsx'
import Profile from './page/Profile.jsx'
import Home from './page/Home.jsx'



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
  }
];

const App = () => {
  
  return (
    <>
      <BrowserRouter>
        <NavBar />

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
      </BrowserRouter>
    </>
  );
};

export default App;
