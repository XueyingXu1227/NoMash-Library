<template>
  <div class="row">
    <div class="col-md-6 col-lg-5">
      <h2 class="mb-3">Login</h2>

      <form @submit.prevent="onSubmit">
        <div class="mb-3">
          <label class="form-label" for="username">Username</label>
          <input id="username" type="text" class="form-control" v-model.trim="username" />
        </div>

        <div class="mb-3">
          <label class="form-label" for="password">Password</label>
          <input id="password" type="password" class="form-control" v-model="password" />
        </div>

        <div v-if="error" class="text-danger mb-2">{{ error }}</div>

        <button class="btn btn-primary" :disabled="loading">
          {{ loading ? 'Signing in…' : 'Login' }}
        </button>
      </form>

      <p class="text-muted mt-3">
        Demo: any username (≥3 chars) + any password (≥6 chars).
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuth } from '@/auth'

const username = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)
const router = useRouter()
const route = useRoute()
const { login } = useAuth()

async function onSubmit() {
  error.value = ''
  loading.value = true
  try {
    login({ username: username.value, password: password.value })
    const redirect = route.query.redirect || { name: 'Members' }
    router.replace(redirect)
  } catch (e) {
    error.value = e.message || 'Login failed.'
  } 
}
</script>
