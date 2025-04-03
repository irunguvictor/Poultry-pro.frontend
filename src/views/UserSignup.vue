<template>
  <v-main>
    <v-container fluid fill-height class="signup-background">
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6" lg="4">
          <v-card elevation="10" class="pa-6 rounded-lg">
            <v-form @submit.prevent="register" ref="form">
              <div class="text-center mb-6">
                <h1 class="text-h4 font-weight-bold teal--text text--darken-2">
                  Join farm manager
                </h1>
                <p class="text-subtitle-1 mt-2">
                  Create an account to start monitoring your business
                </p>
              </div>

              <v-alert v-if="errorMessage" type="error" class="mb-4">
                {{ errorMessage }}
              </v-alert>

              <v-text-field
                v-model="name"
                label="Full Name"
                prepend-inner-icon="mdi-account"
                :rules="[v => !!v || 'Name is required']"
                required
                outlined
                dense
              ></v-text-field>

              <v-text-field
                v-model="email"
                label="Email"
                prepend-inner-icon="mdi-email"
                :rules="[
                  v => !!v || 'Email is required',
                  v => /.+@.+\..+/.test(v) || 'Email must be valid'
                ]"
                required
                outlined
                dense
              ></v-text-field>

              <v-text-field
                v-model="password"
                label="Password"
                prepend-inner-icon="mdi-lock"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
                :rules="[
                  v => !!v || 'Password is required',
                  v => v.length >= 8 || 'Password must be at least 8 characters'
                ]"
                required
                outlined
                dense
              ></v-text-field>

              <v-text-field
                v-model="password_confirmation"
                label="Confirm Password"
                prepend-inner-icon="mdi-lock-check"
                :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showConfirmPassword ? 'text' : 'password'"
                @click:append="showConfirmPassword = !showConfirmPassword"
                :rules="[
                  v => !!v || 'Please confirm your password',
                  v => v === password || 'Passwords must match'
                ]"
                required
                outlined
                dense
              ></v-text-field>

              <v-btn
                block
                color="teal darken-2"
                dark
                class="mt-4"
                large
                type="submit"
                :loading="loading"
              >
                Sign Up
              </v-btn>

              <div class="text-center mt-6">
                <p>
                  Already have an account?
                  <router-link to="/login" class="teal--text text--darken-2 font-weight-medium">
                    Log In
                  </router-link>
                </p>
              </div>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

const form = ref(null)
const name = ref('')
const email = ref('')
const password = ref('')
const password_confirmation = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const loading = ref(false)
const errorMessage = ref('')

// Use the environment variable defined in your Vue project’s .env file
const API_URL = process.env.VUE_APP_API_URL || 'http://localhost:8080/api'
console.log('API_URL:', API_URL) // Debug: verify API_URL is loaded

const register = async () => {
  // If using Vuetify's form validation, validate first
  if (form.value && typeof form.value.validate === 'function') {
    const isValid = form.value.validate()
    if (!isValid) return
  }

  loading.value = true
  errorMessage.value = ''

  const formData = new FormData()
  formData.append('name', name.value)
  formData.append('email', email.value)
  formData.append('password', password.value)
  formData.append('password_confirmation', password_confirmation.value)

  try {
    const response = await axios.post(`${API_URL}/register`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    // Store token and user information
    localStorage.setItem('auth-token', response.data.token)
    localStorage.setItem('user', JSON.stringify(response.data.user))

    // Navigate to the welcome page
    router.push('/welcome')
  } catch (error) {
    console.error('Registration error:', error)
    if (error.response) {
      if (error.response.data.errors) {
        const errors = error.response.data.errors
        const firstError = Object.values(errors)[0]
        errorMessage.value = firstError[0]
      } else {
        errorMessage.value = error.response.data.message || 'Registration failed. Please try again.'
      }
    } else if (error.request) {
      errorMessage.value = 'No response from server. Please check your connection or server status.'
    } else {
      errorMessage.value = 'Network error. Please check your connection.'
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.signup-background {
  background: linear-gradient(to right, #e0f2f1, #b2dfdb);
  min-height: 100vh;
}
</style>
