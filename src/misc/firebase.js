import firebase from 'firebase/app';

const config = {
  apiKey: 'AIzaSyBlP3JCACrgD_sklng-VkibDSo6GyHxnH0',
  authDomain: 'chat-application-bc17b.firebaseapp.com',
  databaseURL:
    'https://chat-application-bc17b-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'chat-application-bc17b',
  storageBucket: 'chat-application-bc17b.appspot.com',
  messagingSenderId: '663478468014',
  appId: '1:663478468014:web:b7413d82caf260c5699c3f',
};

const app = firebase.initializeApp(config);
