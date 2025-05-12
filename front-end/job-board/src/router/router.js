import { createRouter, createWebHistory } from "vue-router";
import PostJob from "../components/PostJob.vue";
import dashboard from "../components/dashboard.vue";
import MyJobs from "../components/MyJobs.vue";
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
    component: MyJobs,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
