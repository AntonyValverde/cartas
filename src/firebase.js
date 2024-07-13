// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDkXtwQ4_SMM3tAgZSEPBpOzCgUedsOygs",
  authDomain: "cartas-d94b6.firebaseapp.com",
  projectId: "cartas-d94b6",
  storageBucket: "cartas-d94b6.appspot.com",
  messagingSenderId: "563429631533",
  appId: "1:563429631533:web:17355d18b73c713695faa4",
  measurementId: "G-TS0198BXPM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };
