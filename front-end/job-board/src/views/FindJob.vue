<template>
    <div class="min-vh-100 bg-light font-poppins">
      <!-- Hero Section -->
      <section class="bg-white text-white py-2 py-md-7">
        <div class="container">
          <!-- <h1 class="display-4 fw-semibold text-center mb-3">Find Your Perfect Job</h1> -->
          <!-- <p class="lead text-center mb-4 opacity-75">Explore thousands of opportunities from top employers</p> -->
          <SearchBar
            v-model:searchQuery="searchQuery"
            v-model:locationQuery="locationQuery"
            @search="searchJobs"
          />
        </div>
        <!-- <div class="col-12 col-md-3">
            <button
              class="btn btn-outline-primary w-100"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#filterSidebar"
              aria-controls="filterSidebar"
            >
              <i class="fas fa-filter me-2"></i>Filters
            </button>
          </div> -->
      </section>
  
      <!-- Filters Section -->
      <section class="container py-4">
        <div class="row g-3 align-items-center">
          <!-- <div class="col-12 col-md-3">
            <button
              class="btn btn-outline-primary w-100"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#filterSidebar"
              aria-controls="filterSidebar"
            >
              <i class="fas fa-filter me-2"></i>Filters
            </button>
          </div> -->
          <!-- <div class="col-12 col-md-3">
            <select
              v-model="jobType"
              class="form-select"
              aria-label="Job type"
              @change="applyFilters"
            >
              <option value="">Job Type</option>
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </div> -->
          <!-- <div class="col-12 col-md-3">
            <select
              v-model="experienceLevel"
              class="form-select"
              aria-label="Experience level"
              @change="applyFilters"
            >
              <option value="">Experience Level</option>
              <option value="Entry Level">Entry Level</option>
              <option value="Mid Level">Mid Level</option>
              <option value="Senior Level">Senior Level</option>
            </select>
          </div> -->
        </div>
  
        <FilterSidebar
          :jobTypeFilters.sync="jobTypeFilters"
          :experienceLevelFilters.sync="experienceLevelFilters"
          @apply-filters="applyFilters"
        />
      </section>
  
      <!-- Job Listings -->
      <JobList :filteredJobs="filteredJobs" />
    </div>
  </template>
  
  <script>
  import { ref, computed } from 'vue';
  import SearchBar from '../components/SearchBar.vue';
  import FilterSidebar from '../components/FilterSidebar.vue';
  import JobList from '../components/JobList.vue';
  
  export default {
    name: 'FindJob',
    components: {
      SearchBar,
      FilterSidebar,
      JobList,
    },
    setup() {
      // Reactive state
      const searchQuery = ref('');
      const locationQuery = ref('');
      const jobType = ref('');
      const experienceLevel = ref('');
      const jobTypeFilters = ref([]);
      const experienceLevelFilters = ref([]);
  
      // Sample job data (replace with API in production)
      const jobs = ref([
        {
          id: 1,
          title: 'Frontend Developer',
          company: 'TechCorp',
          location: 'Remote',
          type: 'Full Time',
          experience: 'Mid Level',
        },
        {
          id: 2,
          title: 'UI/UX Designer',
          company: 'Designify',
          location: 'New York, NY',
          type: 'Contract',
          experience: 'Senior Level',
        },
        {
          id: 3,
          title: 'Backend Engineer',
          company: 'DataSolutions',
          location: 'San Francisco, CA',
          type: 'Full Time',
          experience: 'Entry Level',
        },
      ]);
  
      // Filtered jobs
      const filteredJobs = computed(() => {
        return jobs.value.filter((job) => {
          const matchesSearch = job.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                               job.company.toLowerCase().includes(searchQuery.value.toLowerCase());
          const matchesLocation = job.location.toLowerCase().includes(locationQuery.value.toLowerCase());
          const matchesType = (jobType.value ? job.type === jobType.value : true) &&
                              (jobTypeFilters.value.length ? jobTypeFilters.value.includes(job.type) : true);
          const matchesExperience = (experienceLevel.value ? job.experience === experienceLevel.value : true) &&
                                    (experienceLevelFilters.value.length ? experienceLevelFilters.value.includes(job.experience) : true);
          return matchesSearch && matchesLocation && matchesType && matchesExperience;
        });
      });
  
      // Search function
      const searchJobs = (searchParams) => {
        console.log('Searching jobs:', {
          searchQuery: searchParams.searchQuery,
          locationQuery: searchParams.locationQuery,
          jobType: jobType.value,
          experienceLevel: experienceLevel.value,
          jobTypeFilters: jobTypeFilters.value,
          experienceLevelFilters: experienceLevelFilters.value,
        });
        // Add API call here in production
      };
  
      // Apply filters
      const applyFilters = (filterParams) => {
        if (filterParams) {
          jobTypeFilters.value = filterParams.jobTypeFilters;
          experienceLevelFilters.value = filterParams.experienceLevelFilters;
        }
        console.log('Applying filters:', {
          jobTypeFilters: jobTypeFilters.value,
          experienceLevelFilters: experienceLevelFilters.value,
        });
      };
  
      return {
        searchQuery,
        locationQuery,
        jobType,
        experienceLevel,
        jobTypeFilters,
        experienceLevelFilters,
        filteredJobs,
        searchJobs,
        applyFilters,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Poppins font applied via CDN in index.html */
  .font-poppins {
    font-family: 'Poppins', sans-serif;
  }
  </style>