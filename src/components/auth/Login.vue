<template>
    <div class="login-container">
      <div class="login-form">
        <h1 class="title">Welcome back.</h1>
        <p class="register-link">Don't have an account? <router-link to="/register">Register</router-link></p>
  
        <h2 class="form-title">LOGIN TO YOUR ACCOUNT</h2>
  
        <form @submit.prevent="handleLogin" class="form">
          <div class="form-group">
            <label>Email address</label>
            <input type="email" v-model="email" required class="form-input">
          </div>
  
          <div class="form-group">
            <label>Password</label>
            <input type="password" v-model="password" required class="form-input">
          </div>
  
          <div class="forgot-password">
            <router-link to="/forgot-password">Forgot password?</router-link>
          </div>
  
          <p v-if="authStore.error" class="error-message">{{ authStore.error }}</p>
  
          <button type="submit" class="submit-btn" :disabled="authStore.isLoading">
            {{ authStore.isLoading ? 'Logging in...' : 'Login →' }}
          </button>
  
          <div class="or-divider">
            <span>OR</span>
          </div>
  
          <div class="social-logins">
            <button type="button" class="social-btn facebook">
              <svg class="social-icon" viewBox="0 0 24 24">
                <path fill="#1877F2" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
              </svg>
              <span>Login with Facebook</span>
            </button>
  
            <button type="button" class="social-btn google">
              <svg class="social-icon" viewBox="0 0 24 24">
                <path fill="#DB4437" d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866.549 3.921 1.453l2.814-2.814C17.503 2.332 15.139 1.5 12.545 1.5 6.715 1.5 2 6.214 2 12.044s4.715 10.543 10.545 10.543c8.338 0 10.543-7.225 10.543-10.543 0-0.79-0.085-1.39-0.189-1.989H12.545z"/>
              </svg>
              <span>Login with Google</span>
            </button>
          </div>
        </form>
      </div>
  
      <div class="stats-section">
        <div class="stats-content">
          <h3>Over 1,75,324 candidates<br>waiting for good employees.</h3>
          <div class="stats-grid">
            <div class="stat-item">
              <div class="stat-number">1,75,324</div>
              <div class="stat-label">Live Job</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">97,354</div>
              <div class="stat-label">Companies</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">7,532</div>
              <div class="stat-label">New Jobs</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useAuthStore } from '@/stores/authStore'
  
  const email = ref('')
  const password = ref('')
  const authStore = useAuthStore()
  
  const handleLogin = async () => {
    await authStore.login(email.value, password.value)
  }
  </script>
  
  <style scoped>
  .error-message {
    color: #ef4444;
    font-size: 14px;
    text-align: center;
    margin-bottom: 15px;
  }
  .login-container {
    display: flex;
    min-height: 100vh;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
  
  .login-form {
    flex: 0 0 60%;
    padding: 60px;
    max-width: 600px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  
  .stats-section {
    flex: 0 0 40%;
    background-image: url('https://www.theabacus.com.au/wp-content/uploads/2020/12/mob-TA-About-us-page-img01.jpg');
    background-size: cover;
    background-position: center;
    position: relative;
  }
  
  .stats-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 0;
  }
  
  .stats-content {
    position: relative;
    z-index: 1;
    color: white;
    padding: 60px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  
  .title {
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .register-link {
    color: #666;
    margin-bottom: 30px;
  }
  
  .register-link a {
    color: #3b82f6;
    text-decoration: none;
  }
  
  .form-title {
    font-size: 20px;
    margin-bottom: 30px;
    color: #333;
    text-transform: uppercase;
  }
  
  .form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  .form-group label {
    font-size: 14px;
    color: #555;
    font-weight: 500;
  }
  
  .form-input {
    padding: 14px 16px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 16px;
  }
  
  .forgot-password {
    text-align: right;
    margin-top: -10px;
  }
  
  .forgot-password a {
    color: #3b82f6;
    text-decoration: none;
    font-size: 14px;
  }
  
  .submit-btn {
    background-color: #3b82f6;
    color: white;
    padding: 14px;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-top: 10px;
  }
  
  .submit-btn:hover {
    background-color: #2563eb;
  }
  
  .submit-btn:disabled {
    background-color: #93c5fd;
    cursor: not-allowed;
  }
  
  .or-divider {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #999;
    margin: 20px 0;
  }
  
  .or-divider::before,
  .or-divider::after {
    content: "";
    flex: 1;
    height: 1px;
    background-color: #ddd;
  }
  
  .social-logins {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  .social-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 12px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s;
    border: 1px solid #e5e7eb;
    background: white;
  }
  
  .social-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px -3px rgba(0, 0, 0, 0.1);
  }
  
  .social-btn.facebook {
    color: #1877F2;
    border-color: #1877F2;
  }
  
  .social-btn.google {
    color: #DB4437;
    border-color: #DB4437;
  }
  
  .social-icon {
    width: 20px;
    height: 20px;
  }
  
  .stats-section h3 {
    font-size: 24px;
    margin-bottom: 30px;
    line-height: 1.4;
  }
  
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
  
  .stat-item {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(5px);
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
  
  .stat-number {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  .stat-label {
    font-size: 14px;
    opacity: 0.9;
  }
  
  @media (max-width: 768px) {
    .login-container {
      flex-direction: column;
    }
    
    .login-form,
    .stats-section {
      flex: 0 0 100%;
      padding: 40px 20px;
    }
    
    .stats-grid {
      grid-template-columns: 1fr;
    }
  }
  </style>