<template>
    <div class="card search-bar-card">
      <div class="card-body">
        <div class="row g-2 align-items-center">
          <div class="col-12 col-md-5">
            <input
              v-model="searchQuery"
              type="text"
              class="form-control search-input"
              placeholder="Search by: Job title, Position, Keyword..."
              aria-label="Search jobs"
              @input="emitSearch"
            />
          </div>
          <div class="col-12 col-md-4">
            <input
              v-model="locationQuery"
              type="text"
              class="form-control search-input"
              placeholder="City, state or zip code"
              aria-label="Location"
              @input="emitSearch"
            />
          </div>
          <div class="col-12 col-md-2">
            <button
              class="btn filter-button"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#filterSidebar"
              aria-controls="filterSidebar"
            >
              <i class="fas fa-filter me-2"></i>Filters
            </button>
          </div>
          <div class="col-12 col-md-1">
            <button
              @click="searchJobs"
              class="btn search-button btn btn-outline-primary"
            >
              Find Job
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    name: 'SearchBar',
    setup(_, { emit }) {
      const searchQuery = ref('');
      const locationQuery = ref('');
  
      const searchJobs = () => {
        emit('search', { searchQuery: searchQuery.value, locationQuery: locationQuery.value });
      };
  
      const emitSearch = () => {
        emit('update:searchQuery', searchQuery.value);
        emit('update:locationQuery', locationQuery.value);
      };
  
      return {
        searchQuery,
        locationQuery,
        searchJobs,
        emitSearch,
      };
    },
  };
  </script>
  
  <style scoped>
  .search-bar-card {
    border-radius: 8px;
    border: none;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    max-width: 1000px;
    margin: 0 auto;
  }
  
  .card-body {
    padding: 1rem 1.5rem;
  }
  
  .search-input {
    border: 1px solid #e2e8f0;
    padding: 0.65rem 1rem;
    font-size: 0.95rem;
    border-radius: 6px;
    transition: all 0.2s;
    height: 44px;
  }
  
  .search-input:focus {
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
    border-color: #93c5fd;
    outline: none;
  }
  
  .filter-button {
    background-color: transparent;
    border: 1px solid #e2e8f0;
    color: #4b5563;
    padding: 0.65rem 1rem;
    border-radius: 6px;
    font-size: 0.95rem;
    height: 44px;
    width: 100%;
    transition: all 0.2s;
  }
  
  .filter-button:hover {
    background-color: #f8fafc;
    border-color: #d1d5db;
  }
  
  .search-button {
    background-color: #3b82f6;
    color: white;
    font-weight: 500;
    padding: 0.65rem 1rem;
    border-radius: 6px;
    border: none;
    font-size: 0.95rem;
    height: 44px;
    width: 100%;
    transition: all 0.2s;
  }
  
  .search-button:hover {
    background-color: #2563eb;
    transform: translateY(-1px);
  }
  
  @media (max-width: 768px) {
    .search-input,
    .filter-button,
    .search-button {
      margin-bottom: 0.75rem;
      height: 42px;
    }
    
    .search-bar-card {
      max-width: 100%;
    }
  }
  </style>