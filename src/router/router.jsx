// admin
import AdminHome from '../page/AdminHome/AdminHome.jsx';
import Login from '../page/Authentication/Login.jsx';
import Register from '../page/Authentication/Register.jsx';
import Contest from '../page/Contest/Contest.jsx';
import ContestDetail from '../page/Contest/Tab/ContestDetail/ContestDetail.jsx';
import ContestManagement from '../page/ContestManagement/ContestManagament.jsx';
import CreateContest from '../page/ContestManagement/CreateContest.jsx';
import ContestDetailManagement from '../page/ContestManagement/ContestDetailManagement.jsx';
// user
import Explore from '../page/Explore/Explore.jsx';
import Home from '../page/Home/Home.jsx';
import PostDetail from '../page/Home/Post/PostDetail.jsx';
import LeaderBoard from '../page/LeaderBoard/LeaderBoard.jsx';
import MessageChatApp from '../page/Message/MessageChatApp.jsx';
import NotFound from '../page/NotFound/404NotFound.jsx';
import Notification from '../page/Notification/Notification.jsx';
import Profile from '../page/Profile/Profile.jsx';
import EditProfile from '../page/Profile/Tabs/Biography/EditProfile.jsx';
import ReportManagement from '../page/ReportManagement/ReportManagement.jsx';
import Statistic from '../page/Statistic/Statistic.jsx';
import StoryDetail from '../page/Stories/Story/StoryDetail.jsx';
import TagSearchResult from '../page/TagSearchResult/SearchTagResult.jsx';
import UploadImage from '../page/UploadImage/UploadImage.jsx';
import EditStory from '../page/UploadStory/EditStory.jsx';
import UploadStory from '../page/UploadStory/UploadStory.jsx';
import AllTags from '../page/AllTags/AllTags.jsx';

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
    element: <MessageChatApp />,
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
    path: '/leaderBoard',
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
    path: '/edit-story',
    element: <EditStory />,
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
    path: '/contest/',
    element: <Contest />,
    exact: true,
    isPrivate: true,
  },
  {
    path: '/contest/:contestId',
    element: <ContestDetail />,
    exact: true,
    isPrivate: true,
  },
  {
    path: '/search/:query',
    element: <TagSearchResult />,
    exact: true,
    isPrivate: true,
  },
  // admin route
  {
    path: '/home',
    element: <AdminHome />,
    exact: true,
    isPrivate: true,
  },
  {
    path: '/create-contest',
    element: <CreateContest />,
    exact: true,
    isPrivate: true,
  },
  {
    path: '/contest-management',
    element: <ContestManagement />,
    exact: true,
    isPrivate: true,
  },
  {
    path: '/contest-management/:contestId',
    element: <ContestDetailManagement />,
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
  {
    path: '/post/:postId',
    element: <PostDetail />,
    exact: true,
    isPrivate: true,
  },
  {
    path: '/tag/:tagName',
    element: <AllTags/>,
    exact: true,
    isPrivate: true,
  },
  // error page
  {
    path: '/*',
    element: <NotFound />,
    exact: false,
    isPrivate: false,
  },
];

export default routes;
