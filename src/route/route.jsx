// import HomePage from './page/HomePage.jsx';
import Login from '../page/Login.jsx';
import Register from '../page/Register.jsx';
import Explore from '../page/Explore.jsx';
import Inbox from '../page/Inbox.jsx';
import Notification from '../page/Notification.jsx';
import Profile from '../page/Profile.jsx';
import Home from '../page/Home.jsx';
import NotFound from '../page/404Notfound.jsx';

import MessagePage from '../page/MessagePage.jsx';

const routes = [
  {
    path: '/',
    element: <Home />,
    exact: true,
    isPrivate: true,
  },
  {
    path: '/login',
    element: <Login />,
    exact: true,
    isPrivate: false,
  },
  {
    path: '/register',
    element: <Register />,
    exact: true,
    isPrivate: false,
  },
  {
    path: '/explore',
    element: <Explore />,
    exact: true,
    isPrivate: false,
  },
  {
    path: '/message',
    element: <MessagePage />,
    exact: true,
    isPrivate: true,
  },
  {
    path: '/notification',
    element: <Notification />,
    exact: true,
    isPrivate: true,
  },
  {
    path: '/profile',
    element: <Profile />,
    exact: true,
    isPrivate: true,
  },
  {
    path: '/*',
    element: <NotFound />,
    exact: false,
    isPrivate: true,
  },
];

export default routes;
