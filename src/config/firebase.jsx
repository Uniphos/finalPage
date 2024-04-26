// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_WXbPNisPEk99S9IHq6xPqJLrdodyqVE",
  authDomain: "finalform-85dab.firebaseapp.com",
  projectId: "finalform-85dab",
  storageBucket: "finalform-85dab.appspot.com",
  messagingSenderId: "757362065996",
  appId: "1:757362065996:web:10df7c572e3b8ed0772ae9",
  measurementId: "G-TM5LJQT0BZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);