<template>
    <section class="container pb-5">
      <h2 class="h4 fw-semibold text-dark mb-4">Job Opportunities</h2>
      <div v-if="filteredJobs.length" class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        <div v-for="job in filteredJobs" :key="job.id" class="col">
          <JobCard :job="job" />
        </div>
      </div>
      <p v-else class="text-muted text-center lead">No jobs match your criteria. Try different filters.</p>
    </section>
  </template>
  
  <script>
  import JobCard from './JobCard.vue';
  
  export default {
    name: 'JobList',
    components: {
      JobCard,
    },
    props: {
      filteredJobs: {
        type: Array,
        required: true,
      },
    },
  };
  </script>