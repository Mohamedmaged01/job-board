import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  // Add your routes here
  // Example:
  // { path: '/', component: () => import('../views/Home.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router