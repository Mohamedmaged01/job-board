

<template>
  <div class="register-container">
    <div class="register-form">
      <h1 class="title">Create account.</h1>
      <p class="login-link">Already have account? <a href="login">Log in</a></p>

      <form @submit.prevent="handleRegister" class="form needs-validation" novalidate :class="{ 'was-validated': formSubmitted }">
        <div class="form-group mb-3">
          <label for="name" class="form-label">Full Name</label>
          <input type="text" v-model="name" class="form-control" id="name" required>
          <div class="invalid-feedback">Please enter your full name</div>
        </div>

        <div class="form-group mb-3">
          <label for="username" class="form-label">Username</label>
          <input type="text" v-model="username" class="form-control" id="username" required>
          <div class="invalid-feedback">Please choose a username</div>
        </div>

        <div class="form-group mb-3">
          <label for="email" class="form-label">Email address</label>
          <input type="email" v-model="email" class="form-control" id="email" required>
          <div class="invalid-feedback">Please enter a valid email</div>
        </div>

        <div class="form-group mb-3">
          <label for="password" class="form-label">Password</label>
          <input type="password" v-model="password" class="form-control" id="password" required minlength="6">
          <div class="invalid-feedback">Password must be at least 6 characters</div>
        </div>

        <div class="form-group mb-3">
          <label for="confirmPassword" class="form-label">Confirm Password</label>
          <input type="password" v-model="confirmPassword" class="form-control" id="confirmPassword" required>
          <div class="invalid-feedback">Passwords must match</div>
        </div>

        <div class="terms-checkbox mb-3 form-check">
          <input type="checkbox" v-model="termsAccepted" class="form-check-input" id="terms" required>
          <label class="form-check-label" for="terms">I've read and agree with your Terms of Services</label>
          <div class="invalid-feedback">You must agree to the terms</div>
        </div>

        <button type="submit" class="submit-btn btn btn-primary w-100 mb-3">Create Account →</button>

        <div class="or-divider mb-3">
          <span>OR</span>
        </div>

        <div class="social-logins mb-3">
          <button type="button" class="social-btn facebook btn btn-outline-primary">
            <svg class="social-icon" viewBox="0 0 24 24">
              <path fill="#1877F2" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
            </svg>
            <span>Login with Facebook</span>
          </button>

          <button type="button" class="social-btn google btn btn-outline-danger">
            <svg class="social-icon" viewBox="0 0 24 24">
              <path fill="#DB4437" d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866.549 3.921 1.453l2.814-2.814C17.503 2.332 15.139 1.5 12.545 1.5 6.715 1.5 2 6.214 2 12.044s4.715 10.543 10.545 10.543c8.338 0 10.543-7.225 10.543-10.543 0-0.79-0.085-1.39-0.189-1.989H12.545z"/>
            </svg>
            <span>Login with Google</span>
          </button>
        </div>

        <div v-if="error" class="alert alert-danger">{{ error }}</div>
      </form>
    </div>

    <div class="stats-section">
      <div class="stats-content">
        <h3>Over 1,75,324 candidates waiting for good employees.</h3>
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
import { useRouter } from 'vue-router'
import axios from 'axios'

const name = ref('')
const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const termsAccepted = ref(false)
const error = ref('')
const formSubmitted = ref(false)
const router = useRouter()

const validatePasswordMatch = () => {
  return password.value === confirmPassword.value
}

const handleRegister = async () => {
  formSubmitted.value = true
  
  // Manually validate password match
  if (!validatePasswordMatch()) {
    document.getElementById('confirmPassword').classList.add('is-invalid')
    return
  } else {
    document.getElementById('confirmPassword').classList.remove('is-invalid')
  }

  // Check if form is valid
  const form = document.querySelector('.needs-validation')
  if (!form.checkValidity()) {
    return
  }

  try {
    // Check if email already exists
    const res = await axios.get(`http://localhost:3000/users?email=${email.value}`)
    if (res.data.length > 0) {
      error.value = 'Email already exists.'
      document.getElementById('email').classList.add('is-invalid')
      return
    }

    // Create new user
    const newUser = {
      name: name.value,
      username: username.value,
      email: email.value,
      password: password.value,
      role: 'candidate', // يمكنك تعيين قيمة افتراضية أو تمريرها كـ prop
    }

    await axios.post('http://localhost:3000/users', newUser)
    router.push('home')
  } catch (err) {
    error.value = 'Something went wrong.'
    console.error(err)
  }
}
</script>

<style scoped>
.register-container {
  display: flex;
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.register-form {
  flex: 0 0 50%;
  padding: 60px;
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.stats-section {
  flex: 0 0 50%;
  background-image: url('https://tax.thomsonreuters.com/blog/wp-content/uploads/sites/17/2024/12/AdobeStock_569537509-copy-scaled-1-800x450.jpeg');
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

.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.login-link {
  color: #666;
  margin-bottom: 30px;
}

.login-link a {
  color: #3b82f6;
  text-decoration: none;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
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
}

.submit-btn:hover {
  background-color: #2563eb;
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
  gap: 12px;
}

.social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  flex: 1;
}

.social-icon {
  width: 20px;
  height: 20px;
}

.stats-content {
  position: relative;
  z-index: 1;
  color: white;
  padding: 60px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.stats-section h3 {
  font-size: 20px;
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
  .register-container {
    flex-direction: column;
  }
  
  .register-form,
  .stats-section {
    flex: 0 0 100%;
    padding: 40px 20px;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>

