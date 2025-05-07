<template>
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-brand">
          <h2 class="logo">Jobpilot</h2>
        </div>
  
        <div class="footer-section">
          <h3 class="section-title">Quick Link</h3>
          <ul class="link-list">
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
  
        <div class="footer-section">
          <h3 class="section-title">Candidate</h3>
          <ul class="link-list">
            <li><a href="/browse-jobs">Browse Jobs</a></li>
            <li><a href="/browse-employers">Browse Employers</a></li>
            <li><a href="/dashboard">Candidate Dashboard</a></li>
            <li><a href="/saved-jobs">Saved Jobs</a></li>
          </ul>
        </div>
  
        <div class="footer-section">
          <h3 class="section-title">Employers</h3>
          <ul class="link-list">
            <li><a href="/post-job">Post a Job</a></li>
            <li><a href="/browse-candidates">Browse Candidates</a></li>
            <li><a href="/employer-dashboard">Employers Dashboard</a></li>
            <li><a href="/applications">Applications</a></li>
          </ul>
        </div>
  
        <div class="footer-section">
          <h3 class="section-title">Support</h3>
          <ul class="link-list">
            <li><a href="/faq">FAQ</a></li>
            <li><a href="/privacy-policy">Privacy Policy</a></li>
            <li><a href="/terms">Terms & Conditions</a></li>
          </ul>
        </div>
  
        <div class="footer-contact">
          <div class="contact-item">
            <PhoneIcon class="contact-icon" />
            <span>Call now: (319) 555-0115</span>
          </div>
          <div class="contact-item">
            <MapPinIcon class="contact-icon" />
            <address>
              6391 Egin St. China, Delaware 00280<br>
              New York, United States of America
            </address>
          </div>
        </div>
  
        <div class="footer-bottom">
          <p>&copy; 2023 Jobpilot - Job Portal. All rights Reserved</p>
        </div>
      </div>
    </footer>
  </template>
  
  <script setup>
  import { PhoneIcon, MapPinIcon } from '@heroicons/vue/24/outline'
  </script>
  
  <style scoped>
  .footer {
    background-color: #f8fafc;
    color: #334155;
    padding: 3rem 1rem;
    border-top: 1px solid #e2e8f0;
  }
  
  .footer-container {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
  }
  
  .logo {
    font-size: 1.75rem;
    font-weight: 700;
    color: #2563eb;
    margin-bottom: 1rem;
  }
  
  .section-title {
    font-weight: 600;
    font-size: 1.1rem;
    margin-bottom: 1rem;
    color: #1e293b;
  }
  
  .link-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .link-list li {
    margin-bottom: 0.75rem;
  }
  
  .link-list a {
    color: #64748b;
    text-decoration: none;
    transition: color 0.2s;
  }
  
  .link-list a:hover {
    color: #2563eb;
  }
  
  .footer-contact {
    grid-column: 1 / -1;
    margin-top: 1rem;
  }
  
  .contact-item {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
  
  .contact-icon {
    width: 1.2rem;
    height: 1.2rem;
    color: #64748b;
    flex-shrink: 0;
    margin-top: 0.2rem;
  }
  
  address {
    font-style: normal;
    line-height: 1.5;
  }
  
  .footer-bottom {
    grid-column: 1 / -1;
    text-align: center;
    padding-top: 2rem;
    margin-top: 2rem;
    border-top: 1px solid #e2e8f0;
    color: #64748b;
    font-size: 0.9rem;
  }
  
  @media (max-width: 768px) {
    .footer-container {
      grid-template-columns: 1fr 1fr;
    }
    
    .footer-contact {
      grid-column: 1 / -1;
    }
  }
  
  @media (max-width: 480px) {
    .footer-container {
      grid-template-columns: 1fr;
    }
  }
  </style> 


  