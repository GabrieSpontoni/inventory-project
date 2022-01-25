import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY_PROD,
  authDomain: process.env.REACT_APP_APIKEY_AUTHDOMAIN_PROD,
  databaseURL: process.env.REACT_APP_APIKEY_DATABASEURL_PROD,
  projectId: process.env.REACT_APP_APIKEY_PROJECTID_PROD,
  storageBucket: process.env.REACT_APP_APIKEY_STORAGEBUCKET_PROD,
  messagingSenderId: process.env.REACT_APP_APIKEY_MESSAGINGSENDERID_PROD,
  appId: process.env.REACT_APP_APIKEY_APPID_PROD,
  measurementId: process.env.REACT_APP_APIKEY_MEASUREMENTID_PROD,
};

export const app = firebase.initializeApp(firebaseConfig);
