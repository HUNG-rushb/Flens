import Academy from '../page/Academy/Academy.jsx';
import Login from '../page/Authentication/Login.jsx';
import Register from '../page/Authentication/Register.jsx';
import Courses from '../page/Courses/Courses.jsx';
import Explore from '../page/Explore/Explore.jsx';
import Home from '../page/Home/Home.jsx';
import LeaderBoard from '../page/LeaderBoard/LeaderBoard.jsx';
import MessagePage from '../page/Message/MessagePage.jsx';
import NotFound from '../page/NotFound/404NotFound.jsx';
import Notification from '../page/Notification/Notification.jsx';
import Profile from '../page/Profile/Profile.jsx';
import EditProfile from '../page/Profile/Tabs/Biography/EditProfile.jsx';
import Report from '../page/Report/Report.jsx';
import Statistic from '../page/Statistic/Statistic.jsx';
import CoursesManagement from '../page/CoursesManagement/CoursesManagement.jsx';
import UploadImage from '../page/UploadImage/UploadImage.jsx';
import UploadStory from '../page/UploadStory/UploadStory.jsx'
import StoryPage from '../page/Stories/StoryPage.jsx'
import UploadCourses from '../page/CoursesManagement/UploadCourses/UploadCourses.jsx'

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
  {
    path: '/courses',
    element: <Courses />,
    exact: true,
    isPrivate: true,
  },
  {
    path: '/reports',
    element: <Report />,
    exact: true,
    isPrivate: true,
  },
  {
    path: '/statistic',
    element: <Statistic />,
    exact: true,
    isPrivate: true,
  },
  {
    path: '/coursesManagement',
    element: <CoursesManagement />,
    exact: true,
    isPrivate: true,
  },
  {
    path: '/upload',
    element: <UploadImage />,
    exact: true,
    isPrivate: true,
  },
  {
    path: '/uploadStory',
    element: <UploadStory />,
    exact: true,
    isPrivate: true,
  },
  {
    path: '/editProfile',
    element: <EditProfile />,
    exact: true,
    isPrivate: true,
  },
  {
    path: '/stories',
    element: <StoryPage />,
    exact: true,
    isPrivate: true,
  },
  {
    path: '/uploadCourses',
    element: <UploadCourses />,
    exact: true,
    isPrivate: true,
  },
  
];

export default routes;
