<template>
  <div class="recent-jobs-section">
    <div class="section-header">
      <h3>Recently Applied Jobs</h3>
      <router-link to="/jobs" class="view-all">View All</router-link>
    </div>

    <div v-if="loading" class="loading-state">
      <!-- Loading skeleton or spinner -->
      <JobCards :jobs="jobs" />
    </div>

    <div v-else-if="error" class="error-state">
      <p>Failed to load jobs. {{ error }}</p>
      <button @click="fetchJobs">Retry</button>
    </div>

    <div v-else class="jobs-list">
      <div v-for="job in jobs" :key="job.id" class="job-card">
        <div class="job-header">
          <div class="company-logo">
            <img src="@/assets/image1.png"
              alt="job.company"
            />
          </div>
          <div class="job-info">
            <h4>{{ job.title }}</h4>
            <p class="company">{{ job.company }}</p>
          </div>
        </div>

        <div class="job-details">
          <div class="detail-item">
            <i class="icon location"></i>
            <span>{{ job.location }}</span>
          </div>
          <div class="detail-item">
            <i class="icon salary"></i>
            <span>{{ job.salaryRange }}</span>
          </div>
          <div class="detail-item">
            <div class="status-container">
              <span class="status-badge" :class="job.status.toLowerCase()">
                <span class="status-dot"></span>
                {{ formatStatus(job.status) }}
              </span>
            </div>
          </div>
          <div class="detail-item">
            <i class="icon time"></i>
            <span>{{ formatDate(job.createdAt) }}</span>
          </div>
        </div>

        <div class="job-actions">
          <button class="btn-outline" @click="viewJob(job.id)">
            View Details
          </button>
          <button class="btn-icon" @click="toggleSaveJob(job.id)">
            <i :class="['icon', isSaved(job.id) ? 'saved' : 'save']"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "@/services/api";
import { useRouter } from "vue-router";
import { useApplicationStore } from "@/stores/applicationStore";
import JobCard from "@/components/candidate/JobCard.vue";
const router = useRouter();
const applicationStore = useApplicationStore();

const jobs = ref([]);
const loading = ref(false);
const error = ref(null);

const fetchJobs = async () => {
  try {
    loading.value = true;
    error.value = null;
    const response = await api.get(
      "/jobs?_limit=3&_sort=createdAt&_order=desc"
    );
    jobs.value = response.data;
  } catch (err) {
    error.value = err.message || "Failed to fetch jobs";
  } finally {
    loading.value = false;
  }
};

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const viewJob = (jobId) => {
  router.push(`/jobs/${jobId}`);
};

const toggleSaveJob = (jobId) => {
  // Implement save/unsave logic
};

const isSaved = (jobId) => {
  // Check if job is saved
  return false;
};

onMounted(() => {
  fetchJobs();
} );
const formatStatus = (status) => {
  const statusMap = {
    applied: 'Applied',
    pending: 'Pending',
    interview: 'Interview',
    offer: 'Offer',
    rejected: 'Not Selected',
    saved: 'Saved'
  }
  return statusMap[status.toLowerCase()] || status
}
</script>

<style scoped>
.recent-jobs-section {
  margin-top: 2rem;
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.view-all {
  color: var(--primary-color);
  font-size: 0.9rem;
  text-decoration: none;
}

.jobs-list {
  display: grid;
  gap: 1rem;
}

.job-card {
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 1.25rem;
  transition: transform 0.2s, box-shadow 0.2s;
}

.job-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
.job-status {
  font-size: 0.9rem;
  color: var(--text-secondary);
}
.job-status.applied {
  color: var(--status-applied);
}
.job-status.interview {
  color: var(--status-interview);
}
.job-status.offer {
  color: var(--status-offer);
}
.job-status.rejected {
  color: var(--status-rejected);
}
.job-status.saved {
  color: var(--status-saved);
}

.job-header {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1rem;
}

.company-logo {
  width: 50px;
  height: 50px;
  border-radius: 8px;
  overflow: hidden;
  background: #f5f5f5;
}

.company-logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.job-info h4 {
  margin: 0;
  font-size: 1.1rem;
  color: var(--text-primary);
}

.company {
  margin: 0.25rem 0 0;
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.job-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 0.75rem;
  margin: 1rem 0;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.job-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn-outline {
  padding: 0.5rem 1rem;
  border: 1px solid var(--primary-color);
  color: var(--primary-color);
  background: transparent;
  border-radius: 6px;
  cursor: pointer;
}

.btn-icon {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-secondary);
}

.loading-state {
  display: grid;
  gap: 1rem;
}

.job-card-skeleton {
  height: 150px;
  background: #f5f5f5;
  border-radius: 8px;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 0.6;
  }
  50% {
    opacity: 0.3;
  }
}
.status-container {
  display: flex;
  align-items: center;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: capitalize;
  background-color: var(--status-bg, #f5f5f5);
  color: var(--status-color, #666);
}

.status-dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background-color: currentColor;
}

/* Status-specific colors */
.status-badge.applied {
  --status-bg: rgba(0, 150, 136, 0.1);
  --status-color: #009688;
}

.status-badge.pending {
  --status-bg: rgba(255, 152, 0, 0.1);
  --status-color: #ff9800;
}

.status-badge.interview {
  --status-bg: rgba(33, 150, 243, 0.1);
  --status-color: #2196f3;
}

.status-badge.offer {
  --status-bg: rgba(56, 142, 60, 0.1);
  --status-color: #388e3c;
}

.status-badge.rejected {
  --status-bg: rgba(211, 47, 47, 0.1);
  --status-color: #d32f2f;
}

.status-badge.saved {
  --status-bg: rgba(156, 39, 176, 0.1);
  --status-color: #9c27b0;
}

/* Make sure detail-items have consistent height */
.detail-item {
  min-height: 2rem;
  display: flex;
  align-items: center;
}
</style>
