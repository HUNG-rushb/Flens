// https://viblo.asia/p/reactjs-push-notification-su-dung-firebase-cloud-messaging-yZjJYE9XJOE
import firebase from 'firebase/app/dist/index.esm.js';
import 'firebase/messaging/dist/index.esm.js';

// Import the functions you need from the SDKs you need
// Scripts for firebase and firebase messaging
// importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

const vapidKey =
  'BDdytKBVZZB-irKRkBlQOnOyoLcfgB6bNKGUmnaISHB-4gS4IiNL_i-1QtNikVUr5uphGWFC0PjP7Hp6rklBHcE';

export const firebaseConfig = {
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

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

let messaging;

if (typeof window !== 'undefined') {
  if (firebase.messaging.isSupported()) {
    messaging = firebase.messaging();
  }
}

export const getMessagingToken = async () => {
  let currentToken = '';

  if (!messaging) return;

  try {
    currentToken = await messaging.getToken({
      vapidKey: vapidKey,
    });

    console.log('FCM registration token', currentToken);
  } catch (error) {
    console.log('An error occurred while retrieving token. ', error);
  }

  return currentToken;
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
  });
