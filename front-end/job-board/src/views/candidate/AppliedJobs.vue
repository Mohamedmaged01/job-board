<template>
  <div class="applied-jobs">
    <div class="header">
      <h1>Your Job Applications</h1>
      <div class="controls">
        <div class="filter">
          <label for="status-filter">Filter by:</label>
          <select id="status-filter" v-model="statusFilter" @change="filterApplications">
            <option value="all">All Applications</option>
            <option value="pending">Pending</option>
            <option value="reviewed">Under Review</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>
    </div>

    <div v-if="loading" class="loading">
      <div v-for="n in 3" :key="n" class="job-card-skeleton"></div>
    </div>

    <div v-else-if="error" class="error">
      <p>Error loading applications: {{ error }}</p>
      <button @click="fetchApplications" class="retry-btn">Try Again</button>
    </div>

    <div v-else-if="filteredApplications.length === 0" class="empty-state">
      <img src="@/assets/image1.png" alt="No applications">
      <h3>No applications found</h3>
      <p v-if="statusFilter !== 'all'">You don't have any {{ statusFilter }} applications</p>
      <p v-else>You haven't applied to any jobs yet</p>
      <router-link to="/jobs" class="browse-btn">Browse Jobs</router-link>
    </div>

    <div v-else class="jobs-grid">
      <JobCard
        v-for="application in filteredApplications"
        :key="application.id"
        :job="application.job"
        :application-status="application.status"
        :applied-date="application.appliedAt"
        @view="viewJobDetails(application.job.id)"
        @withdraw="withdrawApplication(application.id)"
      />
    </div>

    <div v-if="filteredApplications.length > 0" class="pagination">
      <button 
        @click="prevPage" 
        :disabled="currentPage === 1"
        class="pagination-btn"
      >
        &larr; Previous
      </button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button 
        @click="nextPage" 
        :disabled="currentPage === totalPages"
        class="pagination-btn"
      >
        Next &rarr;
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import JobCard from "@/components/candidate/JobCard.vue"
import { useApplicationStore } from '@/stores/applicationStore'
import { useJobStore } from '@/stores/jobStore'

const router = useRouter()
const applicationStore = useApplicationStore()
const jobStore = useJobStore()

// State
const loading = ref(true)
const error = ref(null)
const statusFilter = ref('all')
const currentPage = ref(1)
const itemsPerPage = ref(6)

// Fetch data on mount
onMounted(async () => {
  await fetchApplications()
})

// Fetch applications with related job data
const fetchApplications = async () => {
  try {
    loading.value = true
    error.value = null
    await applicationStore.fetchApplications()
    await jobStore.fetchJobs()
  } catch (err) {
    error.value = err.message || 'Failed to load applications'
  } finally {
    loading.value = false
  }
}

// Combine application and job data
const applicationsWithJobs = computed(() => {
  return applicationStore.applications.map(app => ({
    ...app,
    job: jobStore.jobs.find(job => job.id === app.jobId) || {}
  }))
})

// Filter applications based on status
const filteredApplications = computed(() => {
  let filtered = applicationsWithJobs.value
  
  // Apply status filter
  if (statusFilter.value !== 'all') {
    filtered = filtered.filter(app => app.status === statusFilter.value)
  }
  
  // Sort by most recent first
  filtered = [...filtered].sort((a, b) => 
    new Date(b.appliedAt) - new Date(a.appliedAt)
  )
  
  // Pagination
  const start = (currentPage.value - 1) * itemsPerPage.value
  return filtered.slice(start, start + itemsPerPage.value)
})

// Pagination controls
const totalPages = computed(() => {
  const filtered = statusFilter.value === 'all' 
    ? applicationsWithJobs.value 
    : applicationsWithJobs.value.filter(app => app.status === statusFilter.value)
  return Math.ceil(filtered.length / itemsPerPage.value)
})

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}

const filterApplications = () => {
  currentPage.value = 1
}

// Actions
const viewJobDetails = (jobId) => {
  router.push(`/jobs/${jobId}`)
}

const withdrawApplication = async (applicationId) => {
  try {
    await applicationStore.withdrawApplication(applicationId)
  } catch (err) {
    error.value = err.message || 'Failed to withdraw application'
  }
}
</script>

<style scoped>
.applied-jobs {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.header {
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.header h1 {
  font-size: 2rem;
  color: #1A1A1A;
  margin: 0;
}

.controls {
  display: flex;
  gap: 1rem;
}

.filter {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.filter label {
  font-weight: 500;
  color: #6B6B6B;
}

.filter select {
  padding: 0.5rem;
  border: 1px solid #EAEAEA;
  border-radius: 6px;
  background: white;
  cursor: pointer;
}

.jobs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.loading {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.job-card-skeleton {
  height: 220px;
  background: #F5F5F5;
  border-radius: 12px;
  animation: pulse 1.5s infinite;
}

.error {
  text-align: center;
  padding: 2rem;
  color: #EA4335;
}

.retry-btn {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: white;
  border: 1px solid #EA4335;
  color: #EA4335;
  border-radius: 6px;
  cursor: pointer;
}

.empty-state {
  text-align: center;
  padding: 3rem 1rem;
}

.empty-state img {
  width: 200px;
  margin-bottom: 1.5rem;
  opacity: 0.8;
}

.empty-state h3 {
  margin-bottom: 0.5rem;
  color: #1A1A1A;
}

.empty-state p {
  color: #6B6B6B;
  margin-bottom: 1.5rem;
}

.browse-btn {
  padding: 0.75rem 1.5rem;
  background: #1967D2;
  color: white;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
  display: inline-block;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  margin-top: 2rem;
}

.pagination-btn {
  padding: 0.5rem 1rem;
  background: white;
  border: 1px solid #EAEAEA;
  border-radius: 6px;
  cursor: pointer;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@keyframes pulse {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 0.3; }
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .jobs-grid {
    grid-template-columns: 1fr;
  }
}
</style>
