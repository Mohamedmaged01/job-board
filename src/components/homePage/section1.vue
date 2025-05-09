<template>
    <section class="job-search-section">
      <div class="hero-container">
        <div class="hero-content">
          <div class="search-header">
            <h1>Find a job that suits your interest & skills.</h1>
            <p class="subtitle">Aliquam vitae turpis in diam convallis finibus in at risus. Nullam in scelerisque leo, eget sollicitudin velit bestibulum.</p>
          </div>
  
          <div class="search-box">
            <div class="search-inputs">
              <div class="input-group">
                <span class="input-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                  </svg>
                </span>
                <input 
                  type="text" 
                  v-model="searchQuery" 
                  placeholder="Job Title, Keyword..."
                  @input="searchJobs"
                >
              </div>
  
              <div class="input-group">
                <span class="input-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                  </svg>
                </span>
                <input 
                  type="text" 
                  v-model="locationQuery" 
                  placeholder="Your Location"
                  @input="searchJobs"
                >
              </div>
  
              <button class="search-button" @click="searchJobs">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" class="search-icon">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>
                Search
              </button>
            </div>
  
            <div class="search-suggestions">
              <span class="suggestion-label">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16" class="suggestion-icon">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg>
                Suggestion:
              </span>
              <span 
                v-for="category in categories" 
                :key="category.id"
                class="suggestion-tag"
                @click="searchByCategory(category.name)"
              >
                {{ category.name }}
              </span>
            </div>
          </div>
  
          <!-- Search Results Section -->
          <div v-if="searchResults.length > 0" class="search-results">
            <div v-for="job in filteredJobs" :key="job.id" class="job-card">
              <div class="job-header">
                <div class="job-title">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" class="job-icon">
                    <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v8A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1h-3zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5zm1.886 6.914L15 7.151V12.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5V7.15l6.614 1.764a1.5 1.5 0 0 0 .772 0zM1.5 4h13a.5.5 0 0 1 .5.5v1.616L8.129 7.948a.5.5 0 0 1-.258 0L1 6.116V4.5a.5.5 0 0 1 .5-.5z"/>
                  </svg>
                  <h3>{{ job.title }}</h3>
                </div>
                <span class="job-company">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16" class="company-icon">
                    <path d="M4 16s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H4Zm4-5.95a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>
                    <path d="M2 1a2 2 0 0 0-2 2v9.5A1.5 1.5 0 0 0 1.5 14h.653a5.373 5.373 0 0 1 1.066-2H1V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v9h-2.219c.554.654.89 1.373 1.066 2h.653a1.5 1.5 0 0 0 1.5-1.5V3a2 2 0 0 0-2-2H2Z"/>
                  </svg>
                  {{ getEmployerName(job.employerId) }}
                </span>
              </div>
              <div class="job-details">
                <span class="job-location">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16" class="detail-icon">
                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                  </svg>
                  {{ job.location }}
                </span>
                <span class="job-salary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16" class="detail-icon">
                    <path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm0 5a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/>
                  </svg>
                  {{ job.salaryRange }}
                </span>
                <span class="job-type">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16" class="detail-icon">
                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                  </svg>
                  {{ job.jobType }}
                </span>
              </div>
              <div class="job-description">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16" class="description-icon">
                  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                  <path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
                </svg>
                {{ truncateDescription(job.description) }}
              </div>
              <div class="job-skills">
                <span 
                  v-for="skill in getJobSkills(job.id)" 
                  :key="skill.id"
                  class="skill-tag"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16" class="skill-icon">
                    <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v8A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1h-3zM6.5 2a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5zm3 0a.5.5 0 0 1 .5.5V3H9v-.5a.5.5 0 0 1 .5-.5z"/>
                  </svg>
                  {{ getSkillName(skill.skill_id) }}
                </span>
              </div>
            </div>
          </div>
  
          <div class="stats-container">
            <div class="stat-item">
              <div class="stat-number">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16" class="stat-icon">
                  <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v8A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1h-3zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5zm1.886 6.914L15 7.151V12.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5V7.15l6.614 1.764a1.5 1.5 0 0 0 .772 0zM1.5 4h13a.5.5 0 0 1 .5.5v1.616L8.129 7.948a.5.5 0 0 1-.258 0L1 6.116V4.5a.5.5 0 0 1 .5-.5z"/>
                </svg>
                {{ jobs.length }}
              </div>
              <div class="stat-label">Live Jobs</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16" class="stat-icon">
                  <path d="M4 16s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H4Zm4-5.95a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>
                  <path d="M2 1a2 2 0 0 0-2 2v9.5A1.5 1.5 0 0 0 1.5 14h.653a5.373 5.373 0 0 1 1.066-2H1V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v9h-2.219c.554.654.89 1.373 1.066 2h.653a1.5 1.5 0 0 0 1.5-1.5V3a2 2 0 0 0-2-2H2Z"/>
                </svg>
                {{ uniqueEmployers.length }}
              </div>
              <div class="stat-label">Companies</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16" class="stat-icon">
                  <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>
                </svg>
                {{ candidates.length }}
              </div>
              <div class="stat-label">Candidates</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16" class="stat-icon">
                  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z"/>
                  <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4z"/>
                </svg>
                {{ newJobsCount }}
              </div>
              <div class="stat-label">New Jobs</div>
            </div>
          </div>
        </div>
  
        <div class="hero-image">
          <img src="https://framerusercontent.com/images/TwNKOlvvIIIICip9RjbDbH8AC7A.png" alt="Job seekers">
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import axios from 'axios'
  
  // Data from db.json
  const jobs = ref([])
  const employers = ref([])
  const candidates = ref([])
  const jobSkills = ref([])
  const skills = ref([])
  const categories = ref([])
  
  const searchQuery = ref('')
  const locationQuery = ref('')
  const searchResults = ref([])
  
  // Filter out unwanted jobs
  const filteredJobs = computed(() => {
    return searchResults.value.filter(job => 
      job.title !== "Senior Vue.js Developer" && 
      job.title !== "Junior Frontend Developer"
    )
  })
  
  // Fetch data from db.json
  const fetchData = async () => {
    try {
      const baseUrl = 'http://localhost:3000' // Adjust if your JSON server runs on different port
      
      const [jobsRes, employersRes, candidatesRes, jobSkillsRes, skillsRes, categoriesRes] = await Promise.all([
        axios.get(`${baseUrl}/jobs`),
        axios.get(`${baseUrl}/users?role=employer`),
        axios.get(`${baseUrl}/users?role=candidate`),
        axios.get(`${baseUrl}/job_skills`),
        axios.get(`${baseUrl}/skills`),
        axios.get(`${baseUrl}/categories`)
      ])
  
      jobs.value = jobsRes.data
      employers.value = employersRes.data
      candidates.value = candidatesRes.data
      jobSkills.value = jobSkillsRes.data
      skills.value = skillsRes.data
      categories.value = categoriesRes.data
  
      // Initialize with all jobs
      searchResults.value = [...jobs.value]
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
  
  // Computed properties
  const uniqueEmployers = computed(() => {
    return [...new Set(jobs.value.map(job => job.employerId))]
  })
  
  const newJobsCount = computed(() => {
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
    return jobs.value.filter(job => new Date(job.createdAt) > oneWeekAgo).length
  })
  
  // Methods
  const searchJobs = () => {
    if (!searchQuery.value && !locationQuery.value) {
      searchResults.value = [...jobs.value]
      return
    }
  
    searchResults.value = jobs.value.filter(job => {
      const matchesTitle = job.title.toLowerCase().includes(searchQuery.value.toLowerCase())
      const matchesLocation = job.location.toLowerCase().includes(locationQuery.value.toLowerCase())
      return matchesTitle && matchesLocation
    })
  }
  
  const searchByCategory = (category) => {
    searchQuery.value = category
    locationQuery.value = ''
    searchJobs()
  }
  
  const getEmployerName = (employerId) => {
    const employer = employers.value.find(e => e.id == employerId)
    return employer ? employer.company : 'Unknown Company'
  }
  
  const getJobSkills = (jobId) => {
    return jobSkills.value.filter(js => js.job_id == jobId)
  }
  
  const getSkillName = (skillId) => {
    const skill = skills.value.find(s => s.id == skillId)
    return skill ? skill.name : 'Unknown Skill'
  }
  
  const truncateDescription = (description) => {
    if (!description) return ''
    return description.length > 100 ? description.substring(0, 100) + '...' : description
  }
  
  // Initialize
  onMounted(() => {
    fetchData()
  })
  </script>
  
  <style scoped>
  .job-search-section {
    background: linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%);
    padding: 100px 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
  
  .hero-container {
    display: flex;
    align-items: center;
    gap: 40px;
    max-width: 1600px; /* Increased from 1400px */
    margin: 0 auto;
    padding: 0 20px;
  }
  
  .hero-content {
    flex: 1;
    padding: 40px;
    max-width: 900px; /* Added max-width */
  }
  
  .hero-image {
    flex: 1;
    margin-top: -50px; /* Move image up */
  }
  
  .hero-image img {
    width: 100%;
    height: auto;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  }
  
  .search-header h1 {
    font-size: 3rem;
    font-weight: 700;
    color: #1a365d;
    margin-bottom: 25px;
    line-height: 1.2;
    text-align: left;
  }
  
  .search-header .subtitle {
    color: #4a5568;
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 50px;
    text-align: left;
    max-width: 80%;
  }
  
  .search-box {
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    padding: 40px;
    margin-bottom: 40px;
    text-align: left;
  }
  
  .search-inputs {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }
  
  .input-group {
    flex: 1;
    position: relative;
    display: flex;
    align-items: center;
  }
  
  .input-icon {
    position: absolute;
    left: 15px;
    color: #718096;
  }
  
  .input-group input {
    width: 100%;
    padding: 15px 15px 15px 45px;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    font-size: 1rem;
    transition: all 0.3s;
  }
  
  .input-group input:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
  
  .search-button {
    display: flex;
    align-items: center;
    gap: 8px;
    background-color: #3b82f6;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 0 25px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s;
    height: 100%;
  }
  
  .search-icon {
    width: 16px;
    height: 16px;
  }
  
  .search-button:hover {
    background-color: #2563eb;
  }
  
  .search-suggestions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
    font-size: 0.9rem;
  }
  
  .suggestion-label {
    display: flex;
    align-items: center;
    gap: 5px;
    color: #718096;
  }
  
  .suggestion-icon {
    width: 14px;
    height: 14px;
  }
  
  .suggestion-tag {
    background-color: #edf2f7;
    color: #2d3748;
    padding: 5px 12px;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.3s;
  }
  
  .suggestion-tag:hover {
    background-color: #e2e8f0;
  }
  
  /* Search Results */
  .search-results {
    margin-top: 30px;
  }
  
  .job-card {
    background: white;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  }
  
  .job-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  
  .job-title {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .job-icon {
    width: 16px;
    height: 16px;
    color: #4a5568;
  }
  
  .job-header h3 {
    margin: 0;
    font-size: 1.2rem;
  }
  
  .job-company {
    display: flex;
    align-items: center;
    gap: 5px;
    color: #4a5568;
    font-size: 0.9rem;
  }
  
  .company-icon {
    width: 14px;
    height: 14px;
  }
  
  .job-details {
    display: flex;
    gap: 15px;
    margin-bottom: 10px;
    font-size: 0.9rem;
    color: #4a5568;
  }
  
  .detail-icon {
    width: 14px;
    height: 14px;
    margin-right: 5px;
  }
  
  .job-description {
    display: flex;
    gap: 8px;
    color: #4a5568;
    margin-bottom: 15px;
    line-height: 1.5;
  }
  
  .description-icon {
    width: 14px;
    height: 14px;
    color: #4a5568;
    flex-shrink: 0;
    margin-top: 3px;
  }
  
  .job-skills {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  
  .skill-tag {
    display: flex;
    align-items: center;
    gap: 5px;
    background-color: #edf2f7;
    color: #2d3748;
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 0.8rem;
  }
  
  .skill-icon {
    width: 12px;
    height: 12px;
  }
  
  /* Statistics */
  .stats-container {
    display: flex;
    justify-content: flex-start;
    gap: 30px;
    flex-wrap: wrap;
    margin-top: 50px;
  }
  
  .stat-item {
    text-align: center;
    min-width: 120px;
  }
  
  .stat-number {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-size: 2rem;
    font-weight: 700;
    color: #3b82f6;
    margin-bottom: 5px;
  }
  
  .stat-icon {
    width: 24px;
    height: 24px;
  }
  
  .stat-label {
    color: #718096;
    font-size: 0.9rem;
  }
  
  @media (max-width: 1024px) {
    .hero-container {
      flex-direction: column;
    }
    
    .hero-image {
      order: -1;
      margin-bottom: 40px;
      max-width: 500px;
      margin-top: 0;
    }
    
    .search-header h1 {
      font-size: 2.5rem;
    }
  }
  
  @media (max-width: 768px) {
    .search-inputs {
      flex-direction: column;
    }
    
    .search-button {
      width: 100%;
      padding: 15px;
      justify-content: center;
    }
    
    .stats-container {
      gap: 20px;
    }
    
    .stat-item {
      min-width: 100px;
    }
    
    .search-header .subtitle {
      max-width: 100%;
    }
  }
  </style>