/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBvimTzyAhDs5lfzpkJh2Mw1hN_EuiVsLE",
  authDomain: "onde-2-e279f.firebaseapp.com",
  projectId: "onde-2-e279f",
  storageBucket: "onde-2-e279f.appspot.com",
  messagingSenderId: "970897550542",
  appId: "1:970897550542:web:bdac3f40b1314b483eb49f",
  measurementId: "G-142W7R2N9X",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;
