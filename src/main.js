import 'bootstrap/dist/css/bootstrap.min.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'


const app = createApp(App)
app.use(PrimeVue, { theme: { preset: Aura } })
app.use(router)

app.mount('#app')



// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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