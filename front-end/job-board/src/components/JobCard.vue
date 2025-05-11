<template>
  <div class="job-card">
    <h3 class="job-title">{{ job.title }}</h3>
    <div class="job-details">
      <span class="job-type">
        <svg class="icon" viewBox="0 0 24 24" width="16" height="16">
          <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z"/>
        </svg>
        {{ job.type }}
      </span>
      <span class="job-salary">
        <svg class="icon" viewBox="0 0 24 24" width="16" height="16">
          <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z"/>
        </svg>
        Salary: {{ job.salary }}
      </span>
    </div>
    <p class="job-company">
      <svg class="icon" viewBox="0 0 24 24" width="16" height="16">
        <path fill="currentColor" d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
      </svg>
      {{ job.company }}
    </p>
    <p class="job-location">
      <svg class="icon" viewBox="0 0 24 24" width="16" height="16">
        <path fill="currentColor" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
      {{ job.location }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'JobCard',
  props: {
    job: {
      type: Object,
      required: true,
      default: () => ({
        title: 'Junior Graphic Designer',
        type: 'INTERNSHIP',
        salary: '$20,000 - $25,000',
        company: 'Google Inc.',
        location: 'Dhaka, Bangladesh'
      })
    }
  }
}
</script>

<style scoped>
.job-card {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding: 20px;
  border: 1px solid #eaeaea;
  border-radius: 12px;
  max-width: 320px;
  background: white;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  transition: transform 0.2s, box-shadow 0.2s;
}

.job-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0,0,0,0.12);
}

.job-title {
  font-size: 20px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 14px 0;
  background: linear-gradient(45deg, #3498db, #9b59b6);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.job-details {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  align-items: center;
}

.job-type {
  font-size: 12px;
  font-weight: bold;
  color: white;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  background-color: #eecb57;
  border-radius: 20px;
}

.job-salary {
  font-size: 14px;
  font-weight: 600;
  color: #27ae60;
  display: flex;
  align-items: center;
  gap: 6px;
}

.job-company {
  font-size: 16px;
  font-weight: 600;
  color: #2980b9;
  margin: 0 0 10px 0;
  display: flex;
  align-items: center;
  gap: 6px;
}

.job-location {
  font-size: 14px;
  color: #7f8c8d;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 0;
  border-top: 1px dashed #ecf0f1;
}

.icon {
  opacity: 0.8;
}
</style>