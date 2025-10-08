<script setup>
import BHeader from './components/BHeader.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const showHeader = computed(() => !String(route.name || '').includes('CountBookAPI'))

</script>

<template>
  <div>
    <BHeader v-if="showHeader" />
    <main>
      <div class="container page-container mt-5">
        <router-view />
      </div>
    </main>
  </div>
  
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
