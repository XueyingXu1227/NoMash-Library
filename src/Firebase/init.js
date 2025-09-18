// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvt_jExZEIOYbA8gnCHMXUZqDx87dJ6_s",
  authDomain: "week7-xueying.firebaseapp.com",
  projectId: "week7-xueying",
  storageBucket: "week7-xueying.firebasestorage.app",
  messagingSenderId: "333038834660",
  appId: "1:333038834660:web:4201bd18b566f3c1a8edf1"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore()
export default db