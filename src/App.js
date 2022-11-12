// Router
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import Header from './components/Header/Header.jsx';
import HomePage from './page/HomePage.jsx';
// import MessagePage from './page/MessagePage.jsx';

const router = [
  {
    path: '/',
    element: <HomePage />,
    exact: true,
  },
  // {
  //   path: '/message',
  //   element: <MessagePage />,
  //   exact: true,
  // },
];

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />

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
