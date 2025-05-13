<template>
    <div class="card h-100 shadow-sm">
      <div class="card-body">
        <h3 class="card-title h5 fw-semibold text-primary">{{ job.title }}</h3>
        <p class="card-text text-dark fw-medium">{{ job.company }}</p>
        <p class="card-text text-muted small">{{ job.location }}</p>
        <div class="d-flex gap-2">
          <span class="badge bg-primary-subtle text-primary">{{ job.type }}</span>
          <span class="badge bg-secondary-subtle text-secondary">{{ job.experience }}</span>
        </div>
      </div>
      <div class="card-footer bg-transparent border-0 pt-0">
        <button class="btn btn-primary w-100" @click="applyToJob">Apply Now</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'JobCard',
    props: {
      job: {
        type: Object,
        required: true,
      },
    },
    methods: {
      applyToJob() {
        // Emit event or handle application logic
        console.log(`Applying to ${this.job.title} at ${this.job.company}`);
      },
    },
  };
  </script>
  
  <style scoped>
  .card {
    transition: box-shadow 0.2s;
  }
  .card:hover {
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
  }
  </style>