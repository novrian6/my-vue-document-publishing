<template>
  <v-app>
    <!-- Optional App Bar -->
    <v-app-bar app color="primary" dark>
      <v-app-bar-title>My Vuetify Login App</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="isAuthenticated" @click="logout" text>Logout</v-btn>
    </v-app-bar>

    <!-- Main Content -->
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

const logout = () => {
  auth.logout()
  window.location.href = '/login'
}

const isAuthenticated = auth.isAuthenticated
</script>

<style>
/* You can customize global styles here if needed */
</style>
