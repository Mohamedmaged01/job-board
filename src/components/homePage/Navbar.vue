<template>
    <header class="navbar">
      <div class="container">
        <div class="navbar-content">
          <!-- Logo -->
          <router-link to="/" class="logo">
            <span>Jobpilot</span>
          </router-link>
  
          <!-- Location Dropdown -->
          <div class="location-selector" @click="toggleLocationDropdown">
            <MapPinIcon class="icon" />
            <span class="location-text">{{ selectedLocation }}</span>
            <ChevronDownIcon class="chevron" :class="{ 'rotate-180': showLocationDropdown }" />
            
            <div v-if="showLocationDropdown" class="dropdown-menu">
              <div 
                v-for="location in locations" 
                :key="location"
                class="dropdown-item"
                @click="selectLocation(location)"
              >
                {{ location }}
              </div>
            </div>
          </div>
  
          <!-- Search Bar -->
          <div class="search-bar">
            <MagnifyingGlassIcon class="search-icon" />
            <input 
              type="text" 
              placeholder="Job title, keyword, company" 
              v-model="searchQuery"
              @keyup.enter="performSearch"
            />
          </div>
  
          <!-- Action Buttons -->
          <div class="action-buttons">
            <button class="btn btn-login" @click="navigateToLogin">
              Sign In
            </button>
            <button class="btn btn-primary" @click="navigateToPostJob">
              Post A Job
            </button>
          </div>
        </div>
      </div>
    </header>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { MapPinIcon, ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/outline'
  
  const router = useRouter()
  const showLocationDropdown = ref(false)
  const selectedLocation = ref('India')
  const searchQuery = ref('')
  
  const locations = [
    'India',
    'United States',
    'United Kingdom',
    'Canada',
    'Australia',
    'Germany',
    'Singapore'
  ]
  
  const toggleLocationDropdown = () => {
    showLocationDropdown.value = !showLocationDropdown.value
  }
  
  const selectLocation = (location) => {
    selectedLocation.value = location
    showLocationDropdown.value = false
  }
  
  const performSearch = () => {
    if (searchQuery.value.trim()) {
      router.push({ path: '/jobs', query: { q: searchQuery.value } })
    }
  }
  
  const navigateToLogin = () => {
    router.push('/Register')
  }
  
  const navigateToPostJob = () => {
    router.push('/post-job')
  }
  </script>
  
  <style scoped>
  /* Your existing styles remain exactly the same */
  .navbar {
    background: white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
    padding: 1rem 0;
    position: sticky;
    top: 0;
    z-index: 1000;
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
  }
  
  /* ... rest of your styles ... */
  .navbar {
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.navbar-content {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2563eb;
  text-decoration: none;
  margin-right: 1rem;
}

.location-selector {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  background: #f8fafc;
  min-width: 120px;
}

.location-selector:hover {
  background: #f1f5f9;
}

.location-text {
  font-weight: 500;
  font-size: 0.9rem;
}

.icon {
  width: 1rem;
  height: 1rem;
  color: #64748b;
}

.chevron {
  width: 1rem;
  height: 1rem;
  color: #64748b;
  transition: transform 0.2s;
}

.rotate-180 {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border-radius: 6px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  z-index: 10;
  margin-top: 0.5rem;
}

.dropdown-item {
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
}

.dropdown-item:hover {
  background: #f8fafc;
}

.search-bar {
  flex: 1;
  display: flex;
  align-items: center;
  background: #f8fafc;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  max-width: 500px;
}

.search-icon {
  width: 1rem;
  height: 1rem;
  color: #64748b;
  margin-right: 0.5rem;
}

.search-bar input {
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  font-size: 0.9rem;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  margin-left: auto;
}

.btn {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 500;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-login {
  border: 1px solid #e2e8f0;
  background: white;
  color: #334155;
}

.btn-login:hover {
  background: #f8fafc;
}

.btn-primary {
  background: #2563eb;
  color: white;
  border: none;
}

.btn-primary:hover {
  background: #1d4ed8;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .navbar-content {
    gap: 1rem;
  }
  
  .search-bar {
    max-width: 300px;
  }
}

@media (max-width: 768px) {
  .navbar-content {
    flex-wrap: wrap;
  }
  
  .search-bar {
    order: 3;
    width: 100%;
    max-width: 100%;
    margin-top: 0.5rem;
  }
}
  </style>