<template>
  <div class="role-selection-page">
    <div class="header">
      <p class="login-prompt">Already have account? <a href="login">Log in</a></p>
      <h1 class="title">CREATE ACCOUNT AS A.</h1>
    </div>

    <div class="role-selection">
      <div class="error-message" v-if="error">{{ error }}</div>
      
      <div class="role-options">
        <label class="role-option" :class="{ 'selected': role === 'candidate' }">
          <input type="radio" v-model="role" value="candidate" required>
          <div class="role-content">
            <div class="role-icon">👤</div>
            <span class="role-label">Candidate</span>
          </div>
        </label>

        <label class="role-option" :class="{ 'selected': role === 'employer' }">
          <input type="radio" v-model="role" value="employer" required>
          <div class="role-content">
            <div class="role-icon">🏢</div>
            <span class="role-label">Employer</span>
          </div>
        </label>
      </div>
    </div>

    <button class="continue-btn" @click="validateSelection">Continue →</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const role = ref('')
const error = ref('')
const router = useRouter()

const validateSelection = () => {
  if (!role.value) {
    error.value = 'Please select a role'
    return
  }
  
  router.push({
    path: '/register',
    query: { role: role.value }
  })
}
</script>
<style scoped>
.role-selection-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #f9fafb;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.header {
  margin-bottom: 2rem;
  text-align: center;
}

.login-prompt {
  color: #777;
  margin-bottom: 1rem;
  font-size: 0.95rem;
}

.login-prompt a {
  color: #4f46e5;
  text-decoration: underline;
  transition: color 0.3s;
}

.login-prompt a:hover {
  color: #312e81;
}

.title {
  font-size: 1.8rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 2rem;
}

.role-selection {
  width: 100%;
  max-width: 500px;
  margin-bottom: 1.5rem;
}

.role-options {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.role-option {
  flex: 1;
  border: 2px solid #e0e7ff;
  border-radius: 0.75rem;
  padding: 1.5rem;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 0 rgba(0, 0, 0, 0);
}

.role-option:hover {
  border-color: #a5b4fc;
  transform: translateY(-4px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.05);
}

.role-option.selected {
  border-color: #6366f1;
  background-color: #eef2ff;
}

.role-option input[type="radio"] {
  position: absolute;
  opacity: 0;
}

.role-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.role-icon {
  font-size: 2rem;
}

.role-label {
  font-size: 1rem;
  font-weight: 500;
  color: #374151;
}

.role-option.selected .role-label {
  color: #4338ca;
  font-weight: 600;
}

.error-message {
  color: #dc2626;
  font-size: 0.875rem;
  text-align: center;
  margin-top: 0.5rem;
}

.continue-btn {
  width: 100%;
  max-width: 500px;
  background-color: #4f46e5;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.continue-btn:hover {
  background-color: #4338ca;
  transform: scale(1.02);
}
</style>


<!-- <style scoped>
.role-selection-page {
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.header {
  margin-bottom: 2rem;
  text-align: center;
}

.login-prompt {
  color: #666;
  margin-bottom: 1.5rem;
}

.login-prompt a {
  color: #3b82f6;
  text-decoration: none;
}

.title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 2rem;
}

.role-selection {
  margin-bottom: 2rem;
}

.role-options {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.role-option {
  flex: 1;
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.role-option:hover {
  border-color: #93c5fd;
  transform: translateY(-2px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.role-option.selected {
  border-color: #3b82f6;
  background-color: #eff6ff;
}

.role-option input[type="radio"] {
  position: absolute;
  opacity: 0;
}

.role-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.role-icon {
  font-size: 2rem;
}

.role-label {
  font-size: 1rem;
  font-weight: 500;
  color: #4b5563;
}

.role-option.selected .role-label {
  color: #1e40af;
  font-weight: 600;
}

.error-message {
  color: #dc3545;
  font-size: 0.875rem;
  text-align: center;
  margin-top: 0.5rem;
}

.continue-btn {
  width: 100%;
  background-color: #3b82f6;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.continue-btn:hover {
  background-color: #2563eb;
}
</style> -->