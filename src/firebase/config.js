import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_APIKEY_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_APIKEY_DATABASEURL,
  projectId: process.env.REACT_APP_APIKEY_PROJECTID,
  storageBucket: process.env.REACT_APP_APIKEY_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_APIKEY_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APIKEY_APPID,
  measurementId: process.env.REACT_APP_APIKEY_MEASUREMENTID,
};

export const app = initializeApp(firebaseConfig);
