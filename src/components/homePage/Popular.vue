<template>
    <section class="how-it-works">
      <div class="container">
        <h2 class="section-title">How Jobpilot Works</h2>
        <div class="steps-container">
          <div class="step" v-for="(step, index) in steps" :key="index">
            <div class="step-number">{{ index + 1 }}</div>
            <h3 class="step-title">{{ step.title }}</h3>
            <p class="step-description">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  const steps = [
    {
      title: "Create account",
      description: "Allogum tactiles operate session, not tempori too infligger at."
    },
    {
      title: "Upload CV/Resume",
      description: "Cruzellur et amet maximus ligula. Nam a nulla ante. Nam sodales."
    },
    {
      title: "Find suitable job",
      description: "Plaesetur quis eleifend ex. Morbi nec fingulis nibh."
    },
    {
      title: "Apply job",
      description: "Cruzellur et amet maximus ligula. Nam a nulla ante. Nam sodales punis."
    }
  ]
  </script>
  
  <style scoped>
  .how-it-works {
    padding: 4rem 0;
    background-color: #f8fafc;
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
  }
  
  .section-title {
    text-align: center;
    font-size: 2rem;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 3rem;
  }
  
  .steps-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
  }
  
  .step {
    background: white;
    padding: 2rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    text-align: center;
    transition: transform 0.3s ease;
  }
  
  .step:hover {
    transform: translateY(-5px);
  }
  
  .step-number {
    width: 50px;
    height: 50px;
    background-color: #2563eb;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0 auto 1.5rem;
  }
  
  .step-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 1rem;
  }
  
  .step-description {
    color: #64748b;
    line-height: 1.6;
  }
  
  /* Responsive adjustments */
  @media (max-width: 768px) {
    .steps-container {
      grid-template-columns: 1fr 1fr;
    }
  }
  
  @media (max-width: 480px) {
    .steps-container {
      grid-template-columns: 1fr;
    }
    
    .section-title {
      font-size: 1.5rem;
    }
  }
  </style>