<template>
  <div class="min-vh-100 bg-light font-poppins">
    <!-- Hero Section -->
    <section class="hero-section text-white py-4 py-md-7">
      <div class="container">
        <div class="text-center mb-5">
          <h1 class="display-5 fw-bold mb-3 text-white">
            <i class="fas fa-search me-2"></i>Find Your Perfect Job
          </h1>
          <p class="lead mb-4 text-blue-100">
            <i class="fas fa-bullseye me-2"></i>Explore thousands of opportunities from top employers
          </p>
        </div>
        <SearchBar
          v-model:searchQuery="searchQuery"
          v-model:locationQuery="locationQuery"
          @search="searchJobs"
        />
      </div>
    </section>

    <!-- Filters Section -->
    <section class="container py-4">
      <div class="row g-3 align-items-center mb-4">
        <div class="col-12 col-md-3">
          <button
            class="btn btn-blue-600 w-100 d-flex align-items-center justify-content-center"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#filterSidebar"
            aria-controls="filterSidebar"
          >
            <i class="fas fa-filter me-2"></i>Filters
          </button>
        </div>
        <div class="col-12 col-md-3">
          <div class="input-group">
            <span class="input-group-text bg-blue-500 text-white">
              <i class="fas fa-briefcase"></i>
            </span>
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
          </div>
        </div>
        <div class="col-12 col-md-3">
          <div class="input-group">
            <span class="input-group-text bg-blue-400 text-white">
              <i class="fas fa-chart-line"></i>
            </span>
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
          </div>
        </div>
        <div class="col-12 col-md-3">
          <button @click="resetFilters" class="btn btn-outline-blue-400 w-100">
            <i class="fas fa-sync-alt me-2"></i>Reset Filters
          </button>
        </div>
      </div>

      <div class="d-flex align-items-center mb-3">
        <i class="fas fa-info-circle me-2 text-blue-400"></i>
        <small class="text-blue-700">
          Showing {{ filteredJobs.length }} of {{ jobs.length }} jobs
        </small>
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

    // Sample job data
    const jobs = ref([
      {
        id: 1,
        title: 'Frontend Developer',
        company: 'TechCorp',
        location: 'Remote',
        type: 'Full Time',
        experience: 'Mid Level',
        salary: '$90,000 - $120,000',
        posted: '2 days ago',
        logo: 'https://via.placeholder.com/40'
      },
      {
        id: 2,
        title: 'UI/UX Designer',
        company: 'Designify',
        location: 'New York, NY',
        type: 'Contract',
        experience: 'Senior Level',
        salary: '$80,000 - $100,000',
        posted: '1 week ago',
        logo: 'https://via.placeholder.com/40'
      },
      {
        id: 3,
        title: 'Backend Engineer',
        company: 'DataSolutions',
        location: 'San Francisco, CA',
        type: 'Full Time',
        experience: 'Entry Level',
        salary: '$70,000 - $90,000',
        posted: '3 days ago',
        logo: 'https://via.placeholder.com/40'
      },
    ]);

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

    const searchJobs = (searchParams) => {
      console.log('Searching jobs:', searchParams);
    };

    const applyFilters = (filterParams) => {
      if (filterParams) {
        jobTypeFilters.value = filterParams.jobTypeFilters;
        experienceLevelFilters.value = filterParams.experienceLevelFilters;
      }
    };

    const resetFilters = () => {
      searchQuery.value = '';
      locationQuery.value = '';
      jobType.value = '';
      experienceLevel.value = '';
      jobTypeFilters.value = [];
      experienceLevelFilters.value = [];
    };

    return {
      searchQuery,
      locationQuery,
      jobType,
      experienceLevel,
      jobTypeFilters,
      experienceLevelFilters,
      jobs,
      filteredJobs,
      searchJobs,
      applyFilters,
      resetFilters,
    };
  },
};
</script>

<style scoped>
.font-poppins {
  font-family: 'Poppins', sans-serif;
}

/* Blue Color Palette */
.bg-blue-50 { background-color: #eff6ff; }
.bg-blue-100 { background-color: #dbeafe; }
.bg-blue-200 { background-color: #bfdbfe; }
.bg-blue-300 { background-color: #93c5fd; }
.bg-blue-400 { background-color: #60a5fa; }
.bg-blue-500 { background-color: #3b82f6; }
.bg-blue-600 { background-color: #2563eb; }
.bg-blue-700 { background-color: #1d4ed8; }
.bg-blue-800 { background-color: #1e40af; }
.bg-blue-900 { background-color: #1e3a8a; }

.text-blue-100 { color: #dbeafe; }
.text-blue-400 { color: #60a5fa; }
.text-blue-500 { color: #3b82f6; }
.text-blue-600 { color: #2563eb; }
.text-blue-700 { color: #1d4ed8; }
.text-blue-800 { color: #1e40af; }

.btn-blue-600 {
  background-color: #2563eb;
  color: white;
  border: none;
}

.btn-blue-600:hover {
  background-color: #1d4ed8;
}

.btn-outline-blue-400 {
  color: #60a5fa;
  border-color: #60a5fa;
}

.btn-outline-blue-400:hover {
  background-color: #60a5fa;
  color: white;
}

.hero-section {
  background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
  border-radius: 0 0 20px 20px;
  box-shadow: 0 4px 20px rgba(30, 58, 138, 0.2);
}

.job-card {
  transition: all 0.3s ease;
  border-left: 4px solid #3b82f6;
}

.job-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(59, 130, 246, 0.15);
}

.input-group-text {
  border-right: none;
}

.form-select {
  border-left: none;
}
</style>