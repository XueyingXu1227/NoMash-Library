// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA2qas1yZEpiSsG0zwaPVP4lznr-98JgJs",
  authDomain: "week7-xueyingxu.firebaseapp.com",
  projectId: "week7-xueyingxu",
  storageBucket: "week7-xueyingxu.firebasestorage.app",
  messagingSenderId: "214129435999",
  appId: "1:214129435999:web:a64d65fb7054d2ff5982ea"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore()
export default db