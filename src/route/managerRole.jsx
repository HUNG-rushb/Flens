import Login from '../page/Authentication/Login.jsx';
import Register from '../page/Authentication/Register.jsx';
import Explore from '../page/Explore/Explore.jsx';
import Home from '../page/Home/Home.jsx';
import MessagePage from '../page/Message/MessagePage.jsx';
import NotFound from '../page/NotFound/404NotFound.jsx';
import Notification from '../page/Notification/Notification.jsx';
import Profile from '../page/Profile/Profile.jsx';
import Academy from '../page/Academy/Academy.jsx';
import LeaderBoard from '../page/LeaderBoard/LeaderBoard.jsx'

const managerRoutes = [
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
    isPrivate: false,
  },
  {
    path: '/academy',
    element: <Academy />,
    exact: true,
    isPrivate: true,
  },
  {
    path: '/leaderBoard',
    element: <LeaderBoard />,
    exact: true,
    isPrivate: true,
  },
];

export default managerRoutes;
