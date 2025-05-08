import { createRouter, createWebHistory } from "vue-router";

// Import your views
import CandidateOverview from "../views/candidate/CandidateOverview.vue";
import CandidateLayout from "../layouts/CandidateLayout.vue";
import JobDetails from "../pages/JobDetails.vue";
import ApplyJob from "../pages/ApplyJob.vue";
import ThankYouPage from "../pages/ThankYouPage.vue";
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
    path: '/job-details/:id',
    name: 'JobDetails',
    component: JobDetails,
    props: true
  },
  {
    path: '/apply',
    name: 'ApplyJob',
    component: ApplyJob,
    props: route => ({
      jobId: route.query.jobId,
      jobTitle: route.query.jobTitle
    })
  },
  { path: '/thank-you', name: 'ThankYouPage', component: ThankYouPage }
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
