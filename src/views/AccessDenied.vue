<template>
  <div class="container mt-5">
    <h1 class="mb-3">Access Denied</h1>
    <p>You must be logged in to view this page.</p>
    <router-link :to="{ name: 'Login', query: { redirect: $route.query.redirect || '/' } }"
    class="btn btn-primary">
      Go to Login
    </router-link>
  </div>
</template>
