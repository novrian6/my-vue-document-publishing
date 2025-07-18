<template>
  <v-card>
    <v-card-title class="text-center">Register</v-card-title>
    <v-card-text>
      <v-form @submit.prevent="onSubmit" ref="formRef" v-model="valid">
        <v-text-field v-model="username" label="Username" :rules="usernameRules" />
        <v-text-field v-model="email" label="Email" :rules="emailRules" />
        <v-text-field v-model="password" label="Password" type="password" :rules="passwordRules" />
        <v-select v-model="role" :items="roles" label="Role" :rules="roleRules" />
        <v-btn type="submit" color="primary" block :loading="loading">Register</v-btn>
        <v-alert v-if="error" type="error" class="mt-3">{{ error }}</v-alert>
        <v-alert v-if="success" type="success" class="mt-3">{{ success }}</v-alert>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const username = ref('')
const email = ref('')
const password = ref('')
const role = ref('user')
const roles = ['user', 'admin']
const valid = ref(false)
const formRef = ref(null)

const usernameRules = [(v) => !!v || 'Username is required']
const emailRules = [(v) => !!v || 'Email is required']
const passwordRules = [(v) => !!v || 'Password is required']
const roleRules = [(v) => !!v || 'Role is required']

const loading = ref(false)
const error = ref('')
const success = ref('')

const onSubmit = async () => {
  if (!formRef.value.validate()) return
  loading.value = true
  error.value = ''
  success.value = ''
  try {
    await axios.post(
      'http://localhost:8080/register',
      {
        username: username.value,
        email: email.value,
        passwordhash: password.value,
        role: role.value,
      },
      {
        headers: { 'Content-Type': 'application/json' },
      },
    )
    success.value = 'Registration successful!'
    username.value = ''
    email.value = ''
    password.value = ''
    role.value = 'user'
  } catch (err) {
    error.value = err.response?.data?.error || 'Registration failed'
  } finally {
    loading.value = false
  }
}
</script>
