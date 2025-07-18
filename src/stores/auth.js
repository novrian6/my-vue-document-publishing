import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  // src/stores/auth.js
  state: () => ({
    token: localStorage.getItem('token') || '',
    user: null, // <--- Tambahkan ini
    error: '',
    loading: false,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    async login(username, password) {
      this.loading = true
      this.error = ''

      try {
        const params = new URLSearchParams()
        params.append('username', username)
        params.append('password', password)

        const res = await axios.post('http://localhost:8080/login', params, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        })

        this.token = res.data.token
        this.user = res.data.user || { name: 'User' } // Adjust based on actual API response
        localStorage.setItem('token', this.token)

        // Optionally store user info if needed across refresh
        localStorage.setItem('user', JSON.stringify(this.user))
      } catch (err) {
        this.error = err.response?.data?.error || err.message || 'Login failed'
      } finally {
        this.loading = false
      }
    },

    logout() {
      this.token = ''
      localStorage.removeItem('token')
    },
  },
})
