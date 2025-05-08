import { createRouter, createWebHistory } from 'vue-router'
import JobDetails from '../pages/JobDetails.vue'
import ApplyJob from '../pages/ApplyJob.vue'
import ThankYouPage from '../pages/ThankYouPage.vue'

const routes = [
    { path: '/', redirect: '/job-details/1' },
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
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router