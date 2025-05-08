import { defineStore } from "pinia";
import { ref, computed } from "vue";
import api from "@/services/api";

export const useApplicationStore = defineStore("applications", () => {
  // State
  const applications = ref([]);
  const savedJobs = ref([]);
  const isLoading = ref(false);
  const error = ref(null);

  // Getters
  const appliedJobs = computed(() => applications.value);
  const savedJobIds = computed(() => savedJobs.value.map((job) => job.id));
  const applicationStats = computed(() => ({
    total: applications.value.length,
    pending: applications.value.filter((app) => app.status === "pending")
      .length,
    reviewed: applications.value.filter((app) => app.status === "reviewed")
      .length,
    accepted: applications.value.filter((app) => app.status === "accepted")
      .length,
    rejected: applications.value.filter((app) => app.status === "rejected")
      .length,
  }));

  // Actions
  const fetchApplications = async () => {
    try {
      isLoading.value = true;
      const response = await api.get("/applications?_expand=job");
      applications.value = response.data;
    } catch (err) {
      error.value =
        err.response?.data?.message || "Failed to fetch applications";
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const fetchSavedJobs = async () => {
    try {
      isLoading.value = true;
      const response = await api.get("/saved-jobs?_expand=job");
      savedJobs.value = response.data;
    } catch (err) {
      error.value = err.response?.data?.message || "Failed to fetch saved jobs";
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const applyForJob = async (jobId, coverLetter = "") => {
    try {
      isLoading.value = true;
      const response = await api.post("/applications", {
        jobId,
        coverLetter,
        status: "pending",
        appliedAt: new Date().toISOString(),
      });
      applications.value.push(response.data);
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || "Application failed";
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const withdrawApplication = async (applicationId) => {
    try {
      isLoading.value = true;
      await api.delete(`/applications/${applicationId}`);
      applications.value = applications.value.filter(
        (app) => app.id !== applicationId
      );
    } catch (err) {
      error.value = err.response?.data?.message || "Withdrawal failed";
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const toggleSaveJob = async (jobId) => {
    try {
      isLoading.value = true;
      if (savedJobIds.value.includes(jobId)) {
        await api.delete(`/saved-jobs/${jobId}`);
        savedJobs.value = savedJobs.value.filter((job) => job.id !== jobId);
      } else {
        const response = await api.post("/saved-jobs", { jobId });
        savedJobs.value.push(response.data);
      }
    } catch (err) {
      error.value = err.response?.data?.message || "Save operation failed";
      throw err;
    } finally {
      isLoading.value = false;
    }
  };
    


  return {
    // State
    applications,
    savedJobs,
    isLoading,
    error,

    // Getters
    appliedJobs,
    savedJobIds,
    applicationStats,

    // Actions
    fetchApplications,
    fetchSavedJobs,
    applyForJob,
    withdrawApplication,
    toggleSaveJob,
  };
});
