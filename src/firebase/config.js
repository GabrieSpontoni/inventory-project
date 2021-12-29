import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY_DEV,
  authDomain: process.env.REACT_APP_APIKEY_AUTHDOMAIN_DEV,
  databaseURL: process.env.REACT_APP_APIKEY_DATABASEURL_DEV,
  projectId: process.env.REACT_APP_APIKEY_PROJECTID_DEV,
  storageBucket: process.env.REACT_APP_APIKEY_STORAGEBUCKET_DEV,
  messagingSenderId: process.env.REACT_APP_APIKEY_MESSAGINGSENDERID_DEV,
  appId: process.env.REACT_APP_APIKEY_APPID_DEV,
  measurementId: process.env.REACT_APP_APIKEY_MEASUREMENTID_DEV,
};

export const app = firebase.initializeApp(firebaseConfig);
