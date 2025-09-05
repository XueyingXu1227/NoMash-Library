<template>
  <div>
    <h2>Members Area</h2>
    <p class="text-muted">
      Welcome, <strong>{{ auth.state?.user?.username }}</strong>!  
      This page is protected.
    </p>

    <div class="mt-3">
      <RouterLink to="/" class="btn btn-outline-primary me-2">Back to Home</RouterLink>
      <button class="btn btn-outline-secondary" @click="onLogout">Logout</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuth } from '@/auth'

const auth = useAuth()
const router = useRouter()

function onLogout() {
  auth.logout()
  router.push({ name: 'Home' })
}
</script>
