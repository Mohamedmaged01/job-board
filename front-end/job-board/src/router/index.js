import { createRouter, createWebHistory } from "vue-router";

// Import your views
import CandidateOverview from "../views/candidate/CandidateOverview.vue";
import CandidateLayout from "../layouts/CandidateLayout.vue";
const routes = [
  {
    path: "/candidate",
    name: "candidate",
    component: CandidateLayout,
    children: [
      {
        path: "",
        name: "candidate-overview",
        component: CandidateOverview,
      },
    ],
  },
  {
    path: '/find-job',
    name: 'FindJob',
    component: () => import('../views/FindJob.vue'),
  }
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
