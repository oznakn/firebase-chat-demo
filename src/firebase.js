import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyB4HcIBIrzyvQPvmTxD68Bbgaiy1IzO5hw',
  authDomain: 'platinum-scout-306700.firebaseapp.com',
  databaseURL: 'https://platinum-scout-306700-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'platinum-scout-306700',
  storageBucket: 'platinum-scout-306700.appspot.com',
  messagingSenderId: '1040144006042',
  appId: '1:1040144006042:web:641eaea2d66d6b114a5823',
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const googleProvider = new firebase.auth.GoogleAuthProvider();

export default firebase;
