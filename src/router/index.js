import { createRouter, createWebHistory } from "vue-router";

// Import your views
import CandidateOverview from "../views/candidate/CandidateOverview.vue";
import CandidateLayout from "../layouts/CandidateLayout.vue";
import Home from "../views/Home.vue";
import Register from "../components/auth/Register.vue";
import Login from "../components/auth/Login.vue";

const routes = [
  {
    // path: "/candidate",
    // name: "candidate",
    // component: CandidateLayout,
    // children: [
    //   {
    //     path: "",
    //     name: "candidate-overview",
    //     component: CandidateOverview,
    //   },
    // ],
    
      path: '/',
      name: 'Home',
      component: Home
  },
  {
    path: '/candidate',
    name: 'CandidateOverview',
    component: CandidateOverview,
    },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  //pathb /home go to page home
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },

  // Add other routes here later
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    // Always scroll to top when navigating
    return { top: 0 };
  },
});

export default router;
