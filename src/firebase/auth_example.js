// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AAAAaaaAAAAAAAAAAAAAAAAaaaaaa",
  authDomain: "yourproject.firebaseapp.com",
  databaseURL: "https://yourprojet.firebaseio.com",
  projectId: "yourpoject-idProject",
  storageBucket: "yourproject.appspot.com",
  messagingSenderId: "000000000000000",
  appId: "0:0000000000000000:web:a1b2c3d4",
  measurementId: "A-ABCDEFGH",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
