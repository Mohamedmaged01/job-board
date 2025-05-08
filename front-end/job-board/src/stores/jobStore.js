import { defineStore } from "pinia";
import { ref, computed } from "vue";
import api from "@/services/api";

export const useJobStore = defineStore("jobs", () => {
  // State
  const jobs = ref([]);
  const isLoading = ref(false);
  const error = ref(null);

  // Getters
  const jobCount = computed(() => jobs.value.length);
  const jobTitles = computed(() => jobs.value.map((job) => job.title));
  const jobLocations = computed(() => jobs.value.map((job) => job.location));

  // Actions
  const fetchJobs = async () => {
    try {
      isLoading.value = true;
      const response = await api.get("/jobs");
      jobs.value = response.data;
    } catch (err) {
      error.value = err.response?.data?.message || "Failed to fetch jobs";
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    jobs,
    isLoading,
    error,
    jobCount,
    jobTitles,
    jobLocations,
    fetchJobs,
  };
});
