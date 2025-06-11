<template>
  <v-container class="mt-10">
    <v-card>
      <v-card-title> Welcome, {{ userName }} </v-card-title>
      <v-card-text>
        You have successfully logged in. This is your dashboard or homepage.
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { computed } from 'vue'

const auth = useAuthStore()

const userName = computed(() => {
  return auth.user?.name || 'User'
})
</script>
