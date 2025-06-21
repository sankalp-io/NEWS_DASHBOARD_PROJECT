// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA8gLczwsD6n8BVSFbe1lbnqSH8PIT_s8U",
  authDomain: "news-dashboard-bde2d.firebaseapp.com",
  projectId: "news-dashboard-bde2d",
  storageBucket: "news-dashboard-bde2d.firebasestorage.app",
  messagingSenderId: "491013533960",
  appId: "1:491013533960:web:5044b89ef910234ecdfcbd",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
