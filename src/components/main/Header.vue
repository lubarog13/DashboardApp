<template>
  <header class="header">
    <div class="container">
      <div class="header__inner">
        <div class="header__logo">
          MyApp
        </div>
        <div class="header__user">
          {{ authStore.user?.username }}
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { onBeforeMount } from 'vue'

const authStore = useAuthStore()

onBeforeMount(() => {
  authStore.login()
})
</script>
<style scoped>
.header__inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.header__logo {
  font-size: 32px;
  font-weight: 700;
}

.header__user {
  font-size: 16px;
}

@media (max-width: 768px) {
  .header__logo {
    font-size: 24px;
  }

  .header__user {
    font-size: 14px;
  }
}
</style>
