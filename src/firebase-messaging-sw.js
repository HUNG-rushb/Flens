// Import the functions you need from the SDKs you need
// Scripts for firebase and firebase messaging
// importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// const firebaseConfig = {
//   apiKey: 'AIzaSyDFNig0B0NfjfafWksbULgXcGvOhagUBBo',
//   authDomain: 'noti-flens.firebaseapp.com',
//   databaseURL:
//     'https://noti-flens-default-rtdb.asia-southeast1.firebasedatabase.app',
//   projectId: 'noti-flens',
//   storageBucket: 'noti-flens.appspot.com',
//   messagingSenderId: '1050901670890',
//   appId: '1:1050901670890:web:5c4bf14e709bf6bce3e093',
//   measurementId: 'G-FZ37LB7Q55',
// };

// firebase.initializeApp(firebaseConfig);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('../firebase-messaging-sw.js')
    .then(function (registration) {
      console.log('Registration successful, scope is:', registration.scope);
    })
    .catch(function (err) {
      console.log('Service worker registration failed, error:', err);
    });
}
