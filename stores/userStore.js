import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    isAuthenticated: false,
  }),

  actions: {
    setUser(userData) {
      this.user = userData
      this.isAuthenticated = true
      localStorage.setItem('userData', JSON.stringify(userData))
    },

    clearUser() {
      this.user = null
      this.isAuthenticated = false
      localStorage.removeItem('userData')
    },

    restoreUser() {
      const storedUser = localStorage.getItem('userData')
      if (storedUser) {
        this.user = JSON.parse(storedUser)
        this.isAuthenticated = true
      } else {
        this.user = null
        this.isAuthenticated = false
      }
    },
  },
})