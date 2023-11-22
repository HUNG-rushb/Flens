import PrivateRoute from './PrivateRoute.jsx';
import NavBar from './components/NavBar/NavBar.jsx';
import { AuthProvider } from './context/AuthContext.js';
import { getMessagingToken } from './firebase.js';
import { onMessageListener } from './firebase.js';
import routes from './router/router.jsx';
import { successfullNoty } from './utils/useNotify.js';
import React, { useEffect } from 'react';
import { Offline, Online } from 'react-detect-offline';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  useEffect(() => {
    getMessagingToken();
    const channel = new BroadcastChannel('notifications');
    channel.addEventListener('message', (event) => {
      console.log('Receive background: ', event.data);
    });
  }, []);

  useEffect(() => {
    onMessageListener().then((data) => {
      console.log('Receive foreground: ', data);
      successfullNoty(data.notification.body);
    });
  });

  return (
    <>
      <Online>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <BrowserRouter>
          <AuthProvider>
            <NavBar />
            <div className="inside">
              <Routes>
                {routes.map((route, idx) => {
                  if (route.isPrivate) {
                    return (
                      <Route
                        key={idx + 'private'}
                        path={route.path}
                        element={<PrivateRoute />}
                        exact={route.exact}
                      >
                        <Route
                          key={idx}
                          exact={route.exact}
                          path={route.path}
                          element={route.element}
                        />
                      </Route>
                    );
                  } else {
                    return (
                      <Route
                        key={idx}
                        path={route.path}
                        element={route.element}
                        exact={route.exact}
                      />
                    );
                  }
                })}
              </Routes>
            </div>
          </AuthProvider>
        </BrowserRouter>
      </Online>

      <Offline>You're offline right now. Check your connection!</Offline>
    </>
  );
};

export default App;
// {
//   "data": {
//       "gcm.n.e": "1",
//       "google.c.a.ts": "1700505299",
//       "google.c.a.udt": "0",
//       "google.c.a.e": "1",
//       "google.c.a.c_id": "6643482943912459603",
//       "google.c.a.c_l": "hi"
//   },
//   "from": "1050901670890",
//   "priority": "high",
//   "notification": {
//       "title": "hi",
//       "body": "hi",
//       "tag": "campaign_collapse_key_6643482943912459603"
//   },
//   "fcmMessageId": "09b19a00-88bb-4f1a-b381-674fc4fe4891",
//   "collapse_key": "campaign_collapse_key_6643482943912459603"
// }
