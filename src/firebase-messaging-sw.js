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
