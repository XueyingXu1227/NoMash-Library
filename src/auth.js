// src/auth.js
import { reactive, computed } from 'vue'

const state = reactive({
  token: localStorage.getItem('auth_token') || null,
  user: JSON.parse(localStorage.getItem('auth_user') || 'null'),
})

function save() {
  if (state.token) {
    localStorage.setItem('auth_token', state.token)
    localStorage.setItem('auth_user', JSON.stringify(state.user))
  } else {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
  }
}

export function useAuth() {
  const isAuthenticated = computed(() => !!state.token)

  function login({ username, password }) {

    if (username === "admin" && password === "admin123") {
      state.token = 'admin-token'
      state.user = { username, role: 'admin' }
      save()
      return
    }
    // Give token when condition is met
    if (username.trim().length < 3 || password.trim().length < 6) {
      throw new Error('Please enter a valid username (>=3) and password (>=6).')
    }
    state.token = 'user-' + Date.now()
    state.user = { username: username.trim(), role: 'user' }
    save()
  }

  function logout() {
    state.token = null
    state.user = null
    save()
    console.log("User after logout:", state.user)
  }

  return { state, isAuthenticated, login, logout }
}
