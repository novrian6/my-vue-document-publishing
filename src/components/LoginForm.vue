<template>
  <v-card>
    <v-card-title class="text-center">Login</v-card-title>
    <v-card-text>
      <v-form @submit.prevent="onSubmit" ref="formRef" v-model="valid">
        <v-text-field v-model="email" label="Email" :rules="emailRules" />
        <v-text-field v-model="password" label="Password" type="password" :rules="passwordRules" />
        <v-btn type="submit" color="primary" block :loading="auth.loading">Login</v-btn>
        <v-alert v-if="auth.error" type="error" class="mt-3">{{ auth.error }}</v-alert>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const valid = ref(false)
const formRef = ref(null)

const emailRules = [(v) => !!v || 'Email is required']
const passwordRules = [(v) => !!v || 'Password is required']

const auth = useAuthStore()
const router = useRouter()

const onSubmit = async () => {
  if (!formRef.value.validate()) return
  await auth.login(email.value, password.value)
  if (auth.isAuthenticated) {
    router.push('/')
  }
}
</script>
