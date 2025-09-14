// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0ipRcQee-MH1tOcuYNUCc2ZmawMOEyVw",
  authDomain: "yatri-e22bc.firebaseapp.com",
  projectId: "yatri-e22bc",
  storageBucket: "yatri-e22bc.firebasestorage.app",
  messagingSenderId: "839504356408",
  appId: "1:839504356408:web:d17da06171de05e954f2cd",
  measurementId: "G-2J59TRC10P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);