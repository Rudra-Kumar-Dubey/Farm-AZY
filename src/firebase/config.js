import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

// const dotenv = require("dotenv");
// dotenv.config();

const firebaseConfig = {
  // apiKey: "AIzaSyCVXicAfJKAJDBADaIvbVlt4LRDb1R9SXk",
  // authDomain: "farmeazy-8941d.firebaseapp.com",
  // projectId: "farmeazy-8941d",
  // storageBucket: "farmeazy-8941d.appspot.com",
  // messagingSenderId: "750069966622",
  // appId: "1:750069966622:web:d33d7431c5c32f8ad7cb0f"
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,

};

export const Firebase = firebase.initializeApp(firebaseConfig);

