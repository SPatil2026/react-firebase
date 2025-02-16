// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBSepAEL1atrFUC7I_gBNM7Ijg4UWtNMgA",
  authDomain: "react-firebase-87b7f.firebaseapp.com",
  projectId: "react-firebase-87b7f",
  storageBucket: "react-firebase-87b7f.firebasestorage.app",
  messagingSenderId: "649056400259",
  appId: "1:649056400259:web:25df58744677b8c646bcb6",
  measurementId: "G-CZLV7GDLRQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);