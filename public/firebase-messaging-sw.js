// importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');
// self.addEventListener('fetch', () => {
//   const urlParams = new URLSearchParams(location.search);
//   self.firebaseConfig = Object.fromEntries(urlParams);
// });
// const defaultConfig = {
//   apiKey: true,
//   projectId: true,
//   messagingSenderId: true,
//   appId: true,
// };
// firebase.initializeApp(self.firebaseConfig || defaultConfig);
// if (firebase.messaging.isSupported()) {
//   const messaging = firebase.messaging();
//   const channel = new BroadcastChannel('notifications');
//   messaging.onBackgroundMessage(function (payload) {
//     //can not console.log here
//     channel.postMessage(payload);
//   });
// }
import { firebaseConfig } from './firebase';

// importScripts(
//   'https://www.gstatic.com/firebasejs/<v9+>/firebase-app-compat.js'
// );
// importScripts(
//   'https://www.gstatic.com/firebasejs/<v9+>/firebase-messaging-compat.js'
// );

if ('serviceWorker' in navigator) {
  const firebaseConfigParams = new URLSearchParams(firebaseConfig).toString();
  navigator.serviceWorker
    .register(`../firebase-messaging-sw.js?${firebaseConfigParams}`)
    // .register(`../public/firebase-messaging-sw.js?${firebaseConfigParams}`)
    .then(function (registration) {
      console.log('Registration successful, scope is:', registration.scope);
    })
    .catch(function (err) {
      console.log('Service worker registration failed, error:', err);
    });
}
