import { defineStore } from 'pinia'
import { ref } from 'vue'
import { User } from '@/models/user'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)
  const user = ref<User | null>(null)

  const login = () => {
    isAuthenticated.value = true
    user.value = new User('Username')
  }

  return { isAuthenticated, user, login }
})
