<template>
  <div class="min-vh-100 font-poppins">
    <!-- Hero Section with 1.jpg and Soft Blue Effect -->
    <section class="intro-hero position-relative overflow-hidden">
      <div class="intro-image">
        <div class="soft-blue-overlay"></div>
      </div>
      <div class="container position-relative z-index-1 text-center text-white d-flex flex-column justify-content-center" style="height: 100%;">
        <h1 class="display-4 fw-bold mb-4">Find Your Dream Job</h1>
        <p class="lead mb-5 fs-4 opacity-85">
          <i class="fas fa-arrow-down me-2"></i>Scroll to browse opportunities
        </p>
      </div>
    </section>

    <!-- Job Board Section -->
    <section class="job-board-section bg-white">
      <!-- Search Section -->
      <section class="hero-section text-white py-4 py-md-7 position-relative overflow-hidden">
        <div class="background-animation">
          <div class="gradient-overlay"></div>
        </div>
        <div class="container position-relative z-index-1">
          <div class="text-center mb-5">
            <h1 class="display-5 fw-bold mb-3 text-white">
              <i class="fas fa-search me-2"></i>Job Search
            </h1>
            <p class="lead mb-4 text-blue-100">
              <i class="fas fa-bullseye me-2"></i>Find your perfect match
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
      <section class="container py-4 bg-light">
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
    </section>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
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

    // Parallax effect for the hero image
    onMounted(() => {
      const handleScroll = () => {
        const introImage = document.querySelector('.intro-image');
        if (introImage) {
          introImage.style.transform = `translateY(${window.scrollY * 0.3}px)`;
        }
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    });

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

/* Hero Section with 1.jpg */
.intro-hero {
  position: relative;
  height: 100vh;
  min-height: 600px;
}

.intro-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    url('@/assets/1.jpg') center/cover no-repeat;
  z-index: 0;
  will-change: transform;
  transition: transform 0.5s ease-out;
}

.soft-blue-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, 
    rgba(96, 165, 250, 0.5) 0%, 
    rgba(59, 130, 246, 0.7) 100%);
  animation: softPulse 12s ease infinite;
}

@keyframes softPulse {
  0% { opacity: 0.85; }
  50% { opacity: 0.95; }
  100% { opacity: 0.85; }
}

/* Text styling for hero section */
.intro-hero h1 {
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  font-weight: 700;
  letter-spacing: 0.5px;
}

.intro-hero .lead {
  text-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
}

/* Job Board Section */
.job-board-section {
  position: relative;
  z-index: 2;
  background: white;
}

/* Search Section */
.hero-section {
  position: relative;
  border-radius: 0 0 20px 20px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(30, 58, 138, 0.2);
}

.background-animation {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%),
    url('https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80');
  background-blend-mode: overlay;
  background-size: cover;
  background-position: center;
  z-index: 0;
}

.gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, 
    rgba(30, 58, 138, 0.8) 0%, 
    rgba(59, 130, 246, 0.8) 50%, 
    rgba(96, 165, 250, 0.8) 100%);
  animation: gradientPulse 15s ease infinite;
  background-size: 200% 200%;
  z-index: 1;
}

@keyframes gradientPulse {
  0% {
    background-position: 0% 50%;
    opacity: 0.8;
  }
  50% {
    background-position: 100% 50%;
    opacity: 0.9;
  }
  100% {
    background-position: 0% 50%;
    opacity: 0.8;
  }
}

.position-relative {
  position: relative;
}

.z-index-1 {
  z-index: 1;
}

/* Job Card Styles */
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