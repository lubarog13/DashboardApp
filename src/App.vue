<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from './components/main/Header.vue'
</script>

<template>
  <div class="app">
    <Header />
    <RouterView />
  </div>
</template>

<style scoped>
.app {
  width: 100%;
  height: 100%;
  padding: 41px 0 58px;
  overflow: auto;
}

@media (max-width: 768px) {
  .app {
    padding: 20px 0 30px;
  }
}
</style>
