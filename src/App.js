// Router
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import Header from './components/Header/Header.js';
import HomePage from './page/HomePage.js';
import MessagePage from './page/MessagePage.js';

const router = [
  {
    path: '/',
    element: <HomePage />,
    exact: true,
  },
  {
    path: '/message',
    element: <MessagePage />,
    exact: true,
  },
];

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/message" element={<MessagePage />} />
          {router.map((route) => (
            <Route
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
