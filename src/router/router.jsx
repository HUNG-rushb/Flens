import Academy from '../page/Academy/Academy.jsx';
import Login from '../page/Authentication/Login.jsx';
import Register from '../page/Authentication/Register.jsx';
import Contest from '../page/Contest/Contest.jsx';
import ContestDetail from '../page/Contest/contestTab/ContestDetail.jsx';
import Courses from '../page/Courses/Courses.jsx';
import UploadCourses from '../page/CoursesManagement/UploadCourses/UploadCourses.jsx';
import Explore from '../page/Explore/Explore.jsx';
import Home from '../page/Home/Home.jsx';
import LeaderBoard from '../page/LeaderBoard/LeaderBoard.jsx';
import MessagePage from '../page/Message/MessagePage.jsx';
import NotFound from '../page/NotFound/404NotFound.jsx';
import Notification from '../page/Notification/Notification.jsx';
import Profile from '../page/Profile/Profile.jsx';
import EditProfile from '../page/Profile/Tabs/Biography/EditProfile.jsx';
import StoryDetail from '../page/Stories/Story/StoryDetail.jsx';
import UploadImage from '../page/UploadImage/UploadImage.jsx';
import UploadStory from '../page/UploadStory/UploadStory.jsx';

// admin
import ReportManagement from '../page/ReportManagement/ReportManagement.jsx';
import Statistic from '../page/Statistic/Statistic.jsx';
import CoursesManagement from '../page/CoursesManagement/CoursesManagement.jsx';
import ContestManagement from '../page/ContestManagement/ContestManagement.jsx';

const routes = [
  // user route
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
    path: '/',
    element: <Home />,
    exact: true,
    isPrivate: true,
  },
  {
    path: '/explore/:exploreTab',
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
    path: '/profile/:userId',
    element: <Profile />,
    exact: true,
    isPrivate: true,
  },
  {
    path: '/academy',
    element: <Academy />,
    exact: true,
    isPrivate: true,
  },
  {
    path: '/academy/:typeCourses/:courses',
    element: <Courses />,
    exact: true,
    isPrivate: true,
  },
  {
    path: '/leader-board',
    element: <LeaderBoard />,
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
    path: '/stories/:storyId',
    element: <StoryDetail />,
    exact: true,
    isPrivate: true,
  },
  {
    path: '/upload-courses',
    element: <UploadCourses />,
    exact: true,
    isPrivate: true,
  },
  {
    path: '/contest/',
    element: <Contest />,
    exact: true,
    isPrivate: true,
  },
  {
    path: '/contest/:title',
    element: <ContestDetail />,
    exact: true,
    isPrivate: true,
  },
  // admin route
  {
    path: '/contest-management',
    element: <ContestManagement />,
    exact: true,
    isPrivate: true,
  },
  {
    path: '/courses-management',
    element: <CoursesManagement />,
    exact: true,
    isPrivate: true,
  },
  {
    path: '/report-management',
    element: <ReportManagement />,
    exact: true,
    isPrivate: true,
  },
  {
    path: '/statistic',
    element: <Statistic />,
    exact: true,
    isPrivate: true,
  },
  // error page
  {
    path: '/*',
    element: <NotFound />,
    exact: false,
    isPrivate: false,
  }
];
  
export default routes;
