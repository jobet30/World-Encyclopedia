// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYsqW-W7_RF0LHC7kxOPWx4snmXcgjkV0",
  authDomain: "world-encyclopedia-89bc8.firebaseapp.com",
  projectId: "world-encyclopedia-89bc8",
  storageBucket: "world-encyclopedia-89bc8.appspot.com",
  messagingSenderId: "23999073383",
  appId: "1:23999073383:web:95f5d34efa6348b35018c2",
  measurementId: "G-GEWTQJ8LHS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);