import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import api from "@/services/api";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);

  const getCurrentUser = () => {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      api
        .get("/auth/me")
        .then((response) => {
          user.value = response.data;
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          user.value = null;
        });
    }
    return user;
  };
  user = getCurrentUser();
});
