<script setup>
import BHeader from './components/BHeader.vue'
</script>

<template>
  <BHeader />
  <main>
    <div class="container page-container mt-5">
      <router-view />
    </div>
  </main>
</template>

<style scoped>
.page-container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 80vw;
  margin: 0 auto;
  padding: 20px;
  /* background-color: #e0bfbf; */
  border-radius: 10px;
}

</style>
