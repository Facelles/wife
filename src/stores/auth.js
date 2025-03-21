import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    currentUser: null,
    isAuthenticated: false,
  }),

  actions: {
    login(username, password) {
      if (username === 'зайчик' && password === 'ilovemarta') {
        this.currentUser = { id: 1, name: 'Зайчик', role: 'user' }
        this.isAuthenticated = true
        return true
      } else if (username === 'кицюня' && password === 'ilovevladick') {
        this.currentUser = { id: 2, name: 'Кицюня', role: 'user' }
        this.isAuthenticated = true
        return true
      }
      return false
    },

    logout() {
      this.currentUser = null
      this.isAuthenticated = false
    },
  },
}) 