import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import api from "@/services/api";

export const useAuthStore = defineStore( "application", () => { 
    // base URL for API
    const baseURL = import.meta.env.APP_API_BASE_URL + '/application';
    // state
    const applications = ref( [] );
    

});