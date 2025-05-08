import { createRouter, createWebHistory } from "vue-router";
import PostJob from "../components/PostJob.vue";
import dashboard from "../components/dashboard.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: dashboard,
  },
  {
    path: "/post-job",
    name: "PostJob",
    component: PostJob,
  },
  {
    path: "/myjobs",
    name: "MyJobs",
    component: () => import("../components/MyJobs.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
