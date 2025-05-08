import { defineStore } from "pinia";
import { ref, computed } from "vue";
import api from "@/services/api";

export const useUserStore = defineStore("user", () => {
  // State
  const user = ref(null);
  const isLoading = ref(false);
  const error = ref(null);

  // Getters
  const isAuthenticated = computed(() => !!user.value);
  const userName = computed(() => user.value?.name || "Guest");

  // Actions
  const fetchUserProfile = async () => {
    try {
      isLoading.value = true;
      const response = await api.get("/user");
      user.value = response.data;
    } catch (err) {
      error.value =
        err.response?.data?.message || "Failed to fetch user profile";
      throw err;
    } finally {
      isLoading.value = false;
    }
  };
  const fetchEmployers = async () => {
    const response = await api.get("/users?role=employer");
    this.employers = response.data;
  };
  return {
    user,
    isLoading,
    error,
    isAuthenticated,
    userName,
      fetchUserProfile,
    fetchEmployers,
  };
});
