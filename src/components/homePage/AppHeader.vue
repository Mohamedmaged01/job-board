<template>
    <header class="header">
      <nav class="nav-container">
        <div class="nav-links">
          <router-link to="/" class="nav-link">Home</router-link>
          <router-link to="/find-job" class="nav-link">Find Job</router-link>
          <router-link to="/employers" class="nav-link">Employers</router-link>
          <router-link to="/candidates" class="nav-link">Candidates</router-link>
          <router-link to="/pricing" class="nav-link">Pricing Plans</router-link>
          <router-link to="/support" class="nav-link">Customer Support</router-link>
        </div>
        
        <div class="nav-contact">
          <PhoneIcon class="icon" />
          <span class="phone">+1-202-555-0178 332</span>
          <GlobeAltIcon class="icon" />
          <span class="language">English</span>
        </div>
      </nav>
    </header>
  </template>
  
  <script setup>
  import { PhoneIcon, GlobeAltIcon } from '@heroicons/vue/24/outline'
  </script>
  
  <style scoped>
  .header {
    background-color: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 1rem 2rem;
  }
  
  .nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .nav-links {
    display: flex;
    gap: 1.5rem;
  }
  
  .nav-link {
    text-decoration: none;
    color: #333;
    font-weight: 500;
    transition: color 0.3s;
  }
  
  .nav-link:hover {
    color: #0066cc;
  }
  
  .nav-contact {
    display: flex;
    gap: 1rem;
    align-items: center;
  }
  
  .phone, .language {
    color: #555;
    font-size: 0.9rem;
  }
  
  .icon {
    width: 1.2rem;
    height: 1.2rem;
    color: #64748b;
  }
  </style>