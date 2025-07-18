<template>
  <v-app>
    <!-- App Bar -->
    <v-app-bar app color="primary" dark flat elevate-on-scroll>
      <!-- Hamburger icon only on small screens -->
      <v-app-bar-nav-icon v-if="isMobile" @click.stop="drawer = !drawer" />
      <v-app-bar-title class="text-h6 font-weight-bold">MyApp</v-app-bar-title>
      <v-spacer></v-spacer>
      <!-- Desktop Navigation -->
      <template v-if="!isMobile">
        <v-btn variant="text" color="white" to="/dashboard">Dashboard</v-btn>
        <v-btn variant="text" color="white" to="/about">About</v-btn>
        <template v-if="isAuthenticated">
          <v-btn @click="handleLogout" variant="text" color="white">Logout</v-btn>
        </template>
        <template v-else>
          <v-btn @click="goToRegister" variant="text" color="white">Register</v-btn>
          <v-btn @click="goToLogin" variant="text" color="white">Login</v-btn>
        </template>
      </template>
    </v-app-bar>

    <!-- Mobile Navigation Drawer -->
    <v-navigation-drawer v-model="drawer" temporary location="left" elevation="0" rounded>
      <v-list nav density="comfortable">
        <v-list-item to="/dashboard" @click="closeDrawer" title="Dashboard" />
        <v-list-item to="/about" @click="closeDrawer" title="About" />
        <v-divider class="my-2" />
        <template v-if="isAuthenticated">
          <v-list-item @click="handleLogoutFromDrawer" title="Logout" prepend-icon="mdi-logout" />
        </template>
        <template v-else>
          <v-list-item
            @click="handleRegisterFromDrawer"
            title="Register"
            prepend-icon="mdi-account-plus"
          />
          <v-list-item @click="handleLoginFromDrawer" title="Login" prepend-icon="mdi-login" />
        </template>
      </v-list>
    </v-navigation-drawer>

    <!-- Main Content -->
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'
import { useAuthStore } from '@/stores/auth'

// Router + Display (breakpoints)
const router = useRouter()
const { smAndDown } = useDisplay() // true on small and down screens
const isMobile = computed(() => smAndDown.value)

// Drawer state
const drawer = ref(false)

// Auth store
const auth = useAuthStore()
const isAuthenticated = auth.isAuthenticated

// Navigation / actions
const handleLogout = () => {
  auth.logout()
  router.push('/login')
}

const goToRegister = () => {
  router.push('/register')
}

const goToLogin = () => {
  router.push('/login')
}

// Drawer helpers
const closeDrawer = () => {
  drawer.value = false
}

const handleLogoutFromDrawer = () => {
  closeDrawer()
  handleLogout()
}

const handleRegisterFromDrawer = () => {
  closeDrawer()
  goToRegister()
}

const handleLoginFromDrawer = () => {
  closeDrawer()
  goToLogin()
}
</script>

<style>
/* You can customize global styles here if needed */
.v-app-bar {
  backdrop-filter: blur(8px);
}
.v-btn {
  text-transform: none;
  font-weight: 500;
}
</style>
