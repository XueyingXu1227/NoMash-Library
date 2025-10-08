import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '@/views/LoginView.vue'            
import MembersView from '@/views/MembersView.vue'        
import AccessDenied from '@/views/AccessDenied.vue'
import { useAuth } from '@/auth'
import FirebaseSigninView from '../views/FirebaseSigninView.vue'
import FirebaseRegisterView from '../views/FirebaseRegisterView.vue'
import { getAuth } from "firebase/auth"
import AddBookView from '../views/AddBookView.vue'
import GetBookCountView from '../views/GetBookCountView.vue'
import WeatherView from "@/views/WeatherView.vue"
import CountBookAPI from "@/views/CountBookAPI.vue"
import GetAllBookAPI from '@/views/GetAllBookAPI.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView ,
    meta: { requiresAuth: true }
  },
  { 
    path: '/login', 
    name: 'Login', 
    component: LoginView ,
    meta: { guestOnly: true } 
  },
  { path: '/members', 
    name: 'Members', 
    component: MembersView, 
    meta: { requiresAuth: true } 
  },
  { 
    path: '/access-denied', 
    name: 'AccessDenied', 
    component: AccessDenied 
  },
  {
    path: '/firelogin',
    name: 'FireLogin',
    component: FirebaseSigninView
  },
  { 
    path: '/fireregister', 
    name: 'FireRegister', 
    component: FirebaseRegisterView 
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/AdminView.vue'),
    meta: { requiresAuth: true, requiresAdmin: true } 
  },
  {
    path: '/addbook',
    name: 'AddBook',
    component: AddBookView
  },
  {
    path: '/GetBookCount', 
    name: 'GetBookCount', 
    component: GetBookCountView
  },
  { path: "/WeatherCheck", 
    name: "GetWeather", 
    component: WeatherView 
  },
  { path: "/CountBookAPI", 
    name: "CountBookAPI", 
    component: CountBookAPI 
  },
   { path: '/GetAllBookAPI', 
    name: 'GetAllBookAPI', 
    component: GetAllBookAPI 
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const { isAuthenticated, state } = useAuth()
  const role = state.user?.role

  // Admin 
  if (to.meta.requiresAdmin) {
    if (role === 'admin') {
      next()
    }else{
      next({name: 'AccessDenied' })
    }
    return
  } 
  // requiresAuth 
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    next({ name: 'AccessDenied' })
    return
  }

  // guestOnly 
  if (to.meta.guestOnly && isAuthenticated.value) {
    next({ name: 'Members' })
    return
  }
    next()
})

export default router