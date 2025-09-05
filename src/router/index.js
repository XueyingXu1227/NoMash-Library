import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '@/views/LoginView.vue'            
import MembersView from '@/views/MembersView.vue'        
import AccessDenied from '@/views/AccessDenied.vue'
import { useAuth } from '@/auth'

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
    component: AccessDenied }, 
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Global Front Guard: Protect Restricted Routes + Block Logged-In Access /login
router.beforeEach((to, from, next) => {
  const { isAuthenticated } = useAuth()

  if (to.meta.requiresAuth && !isAuthenticated.value) {
    next({ name: 'AccessDenied', query: { redirect: to.fullPath } })
    return
  } 
  if (to.meta.guestOnly && isAuthenticated.value) {
    next({ name: 'Members' })
    return
  } 
    next()
})

export default router