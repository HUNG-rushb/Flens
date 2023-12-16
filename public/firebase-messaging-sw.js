importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

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

const firebaseConfig = {
  apiKey: 'AIzaSyDFNig0B0NfjfafWksbULgXcGvOhagUBBo',
  authDomain: 'noti-flens.firebaseapp.com',
  databaseURL:
    'https://noti-flens-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'noti-flens',
  storageBucket: 'noti-flens.appspot.com',
  messagingSenderId: '1050901670890',
  appId: '1:1050901670890:web:5c4bf14e709bf6bce3e093',
  measurementId: 'G-FZ37LB7Q55',
};

firebase.initializeApp(firebaseConfig);

if (firebase.messaging.isSupported()) {
  const messaging = firebase.messaging();
  const channel = new BroadcastChannel('notifications');

  messaging.onBackgroundMessage((payload) => {
    channel.postMessage(payload);
  });
}
