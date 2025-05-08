<template>
    <div class="register-container">
        <div class="register-form">
            <h1 class="title">Create account.</h1>
            <p class="login-link">Already have account? <a href="login">Log in</a></p>

            <h2 class="form-title">CREATE ACCOUNT As  A.</h2>

            <form @submit.prevent="handleRegister" class="form">
                <div class="role-selection">
                    <label class="role-option" :class="{ 'selected': role === 'candidate' }">
                        <input type="radio" v-model="role" value="candidate">
                        <UserIcon class="role-icon" />
                        <span class="role-label">Candidate</span>
                    </label>

                    <label class="role-option" :class="{ 'selected': role === 'employer' }">
                        <input type="radio" v-model="role" value="employer">
                        <BuildingOfficeIcon class="role-icon" />
                        <span class="role-label">Employer</span>
                    </label>
                </div>

                <div class="form-group">
                    <label>Full Name</label>
                    <input type="text" v-model="name"  class="form-input">
                </div>

                <div class="form-group">
                    <label>Username</label>
                    <input type="text" v-model="username"  class="form-input">
                </div>

                <div class="form-group">
                    <label>Email address</label>
                    <input type="email" v-model="email"  class="form-input">
                </div>

                <div class="form-group">
                    <label>Password</label>
                    <input type="password" v-model="password"  class="form-input">
                </div>

                <div class="form-group">
                    <label>Confirm Password</label>
                    <input type="password" v-model="confirmPassword"  class="form-input">
                </div>

                <div class="terms-checkbox">
                    <input type="checkbox" id="terms" required>
                    <label for="terms">I've read and agree with your Terms of Services</label>
                </div>

                <button type="submit" class="submit-btn">Create Account →</button>

                <div class="or-divider">
                    <span>OR</span>
                </div>

                <!-- <div class="social-logins">
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
          </div> -->

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

                <p v-if="error" class="error-message">{{ error }}</p>
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
import { UserIcon, BuildingOfficeIcon } from '@heroicons/vue/24/outline'


import { 
  ChatBubbleLeftRightIcon as FacebookIcon,
  GlobeAltIcon as GoogleIcon 
} from '@heroicons/vue/24/outline'
//npm i @heroicons/vue



const name = ref('')
const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const role = ref('candidate')
const error = ref('')
const router = useRouter()

const handleRegister = async () => {
    try {
        // Check if email already exists
        const res = await axios.get(`http://localhost:3000/users?email=${email.value}`)
        if (res.data.length > 0) {
            error.value = 'Email already exists.'
            return
        }

        // Check if passwords match
        if (password.value !== confirmPassword.value) {
            error.value = 'Passwords do not match.'
            return
        }

        // Create new user
        const newUser = {
            name: name.value,
            username: username.value,
            email: email.value,
            password: password.value,
            role: role.value,
        }

        await axios.post('http://localhost:3000/users', newUser)

        // Redirect to login after registration
        //home path 
        router.push('home')
        // router.push('/login')
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
  flex: 0 0 50%; /* 50% للفورم */
  padding: 60px;
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.stats-section {
  flex: 0 0 50%; /* 50% للصورة */
  background-image: url('https://tax.thomsonreuters.com/blog/wp-content/uploads/sites/17/2024/12/AdobeStock_569537509-copy-scaled-1-800x450.jpeg');
  background-size: cover;
  background-position: center;
  position: relative;
}

/* باقي الكود يبقى كما هو بدون تغيير */
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

.form-title {
  font-size: 18px;
  margin-bottom: 20px;
  color: #333;
  text-transform: uppercase;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.role-selection {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
}

.role-option {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 20px;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;
  background: white;
}

.role-option:hover {
  border-color: #93c5fd;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.role-option.selected {
  border-color: #3b82f6;
  background-color: #eff6ff;
}

.role-option input[type="radio"] {
  position: absolute;
  opacity: 0;
}

.role-icon {
  width: 22px;
  height: 22px;
  color: #6b7280;
  transition: all 0.3s ease;
}

.role-option:hover .role-icon {
  color: #3b82f6;
}

.role-option.selected .role-icon {
  color: #3b82f6;
}

.role-label {
  font-size: 16px;
  font-weight: 500;
  color: #4b5563;
  transition: all 0.3s ease;
}

.role-option:hover .role-label {
  color: #1e40af;
}

.role-option.selected .role-label {
  color: #1e40af;
  font-weight: 600;
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
  transition: border-color 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: #3b82f6;
}

.terms-checkbox {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  margin: 10px 0;
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

/* .social-logins {
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

.error-message {
  color: #ef4444;
  font-size: 14px;
  text-align: center;
  margin: 10px 0;
  padding: 8px;
  background: #fee2e2;
  border-radius: 4px;
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
} */


.social-logins {
  display: flex;
  gap: 12px; /* المسافة بين الأزرار */
  flex-direction: row; /* العناصر في صف واحد */
  justify-content: center; /* توسيط الأزرار أفقيًا */
}

.social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 16px; /* تعديل الحشوة لتناسب العرض الجديد */
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  border: 1px solid #e5e7eb;
  background: white;
  flex: 1; /* لجعل الأزرار تأخذ مساحة متساوية */
  min-width: 180px; /* حد أدنى لعرض الأزرار */
}

/* باقي الأنماط تبقى كما هي */
.social-btn.facebook {
  color: #1877F2;
  border-color: #1877F2;
}

.social-btn.google {
  color: #DB4437;
  border-color: #DB4437;
}

.social-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px -3px rgba(0, 0, 0, 0.1);
}

.social-icon {
  width: 20px;
  height: 20px;
}
</style>
