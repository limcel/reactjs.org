import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyBg6o5rZBWF0yUkNfxSxoj-pCjP3ATK5A4',
  authDomain: 'hacktech2019-42079.firebaseapp.com',
  databaseURL: 'https://hacktech2019-42079.firebaseio.com',
  projectId: 'hacktech2019-42079',
  storageBucket: 'hacktech2019-42079.appspot.com',
  messagingSenderId: '319199126538',
};

const firebaseDB = firebase.initializeApp(config).database();
export const itemsRef = firebaseDB
  .ref('itemsList')
  .child('-L_2P-e0Sd_laEHfw7iT');
