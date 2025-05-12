<template>
  <div class="container-fluid login-container">
    <div class="row g-0">
      <!-- Login Form Section -->
      <div class="col-lg-6 login-form-section">
        <div class="login-form-wrapper">
          <div class="header">
            <p class="register-prompt">Don't have account? <a href="/register">Create Account</a></p>
            <h1 class="title">SIGN IN</h1>
          </div>

          <!-- Alert for validation errors -->
          <div v-if="alert.show" class="alert alert-dismissible fade show" :class="`alert-${alert.type}`">
            {{ alert.message }}
            <button type="button" class="btn-close" @click="alert.show = false"></button>
          </div>

          <form @submit.prevent="handleLogin" class="needs-validation" :class="{ 'was-validated': validated }" novalidate>
            <div class="mb-3">
              <label for="email" class="form-label">Email address</label>
              <input 
                type="email" 
                class="form-control" 
                id="email" 
                v-model="email" 
                required
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
              >
              <div class="invalid-feedback">
                Please enter a valid email address
              </div>
            </div>

            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <input 
                type="password" 
                class="form-control" 
                id="password" 
                v-model="password" 
                required
                minlength="6"
              >
              <div class="invalid-feedback">
                Password must be at least 6 characters
              </div>
            </div>

            <div class="mb-3 form-check">
              <input type="checkbox" class="form-check-input" id="remember" v-model="rememberMe">
              <label class="form-check-label" for="remember">Remember Me</label>
            </div>

            <!-- <div class="mb-3 text-start">
              <a href="/ForgetPassword" class="text-primary" >Forgot Password?</a>
            </div> -->
            <div class="mb-3 text-start">
  <a href="/ForgetPassword" class="text-primary">Forgot Password?</a>
</div>
  
            <button type="submit" class="continue-btn" :disabled="loading">
              <span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              {{ loading ? 'Signing In...' : 'Sign In →' }}
            </button>
          </form>

          <div class="social-login">
            <p class="divider"><span>OR</span></p>
            <button class="social-btn facebook-btn">
              <i class="bi bi-facebook"></i> Sign In with Facebook
            </button>
            <button class="social-btn google-btn">
              <i class="bi bi-google"></i> Sign In with Google
            </button>
          </div>
        </div>
      </div>

      <!-- Side Image Section -->
      <div class="col-lg-6 login-side-section">
        <div class="side-image-wrapper"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import axios from 'axios'

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const validated = ref(false)
const loading = ref(false)
const router = useRouter()
const authStore = useAuthStore()

const alert = ref({
  show: false,
  type: 'danger',
  message: ''
})

const showAlert = (type, message) => {
  alert.value = { show: true, type, message }
  setTimeout(() => { alert.value.show = false }, 5000)
}

const handleLogin = async () => {
  validated.value = true
  loading.value = true
  
  const form = document.querySelector('.needs-validation')
  if (!form.checkValidity()) {
    loading.value = false
    return
  }

  try {
    // Check if user exists in the database
    const response = await axios.get(`http://localhost:3000/users?email=${email.value}`)
    
    if (response.data.length === 0) {
      throw new Error('Email not found')
    }

    const user = response.data[0]
    
    // Verify password (in a real app, you should use hashed passwords)
    if (user.password !== password.value) {
      throw new Error('Invalid password')
    }
    
    // Set user in auth store
    authStore.user = user
    if (rememberMe.value) {
      localStorage.setItem('user', JSON.stringify(user))
    }
    
    showAlert('success', 'Login successful! Redirecting...')
    setTimeout(() => {
      // Redirect based on user role
      if (user.role === 'candidate') {
        router.push('/home')
      } else if (user.role === 'employer') {
        router.push('/home')
      } else {
        router.push('/home')
      }
    }, 1500)
    
  } catch (error) {
    loading.value = false
    showAlert('danger', error.message || 'Login failed. Please try again.')
  }
}
</script>

<style scoped>
@import './style.css';
</style>