<template>
    <div
      class="offcanvas offcanvas-start"
      tabindex="-1"
      id="filterSidebar"
      aria-labelledby="filterSidebarLabel"
    >
      <div class="offcanvas-header">
        <h5 class="offcanvas-title fw-semibold" id="filterSidebarLabel">Job Filters</h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div class="offcanvas-body">
        <form>
          <div class="mb-4">
            <h6 class="fw-medium mb-3">Job Type</h6>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value="Full Time"
                v-model="localJobTypeFilters"
                id="jobTypeFullTime"
                @change="emitFilters"
              />
              <label class="form-check-label" for="jobTypeFullTime">Full Time</label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value="Part Time"
                v-model="localJobTypeFilters"
                id="jobTypePartTime"
                @change="emitFilters"
              />
              <label class="form-check-label" for="jobTypePartTime">Part Time</label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value="Contract"
                v-model="localJobTypeFilters"
                id="jobTypeContract"
                @change="emitFilters"
              />
              <label class="form-check-label" for="jobTypeContract">Contract</label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value="Internship"
                v-model="localJobTypeFilters"
                id="jobTypeInternship"
                @change="emitFilters"
              />
              <label class="form-check-label" for="jobTypeInternship">Internship</label>
            </div>
          </div>
          <div class="mb-4">
            <h6 class="fw-medium mb-3">Experience Level</h6>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value="Entry Level"
                v-model="localExperienceLevelFilters"
                id="expEntryLevel"
                @change="emitFilters"
              />
              <label class="form-check-label" for="expEntryLevel">Entry Level</label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value="Mid Level"
                v-model="localExperienceLevelFilters"
                id="expMidLevel"
                @change="emitFilters"
              />
              <label class="form-check-label" for="expMidLevel">Mid Level</label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value="Senior Level"
                v-model="localExperienceLevelFilters"
                id="expSeniorLevel"
                @change="emitFilters"
              />
              <label class="form-check-label" for="expSeniorLevel">Senior Level</label>
            </div>
          </div>
          <button
            type="button"
            class="btn btn-primary w-100"
            data-bs-dismiss="offcanvas"
            @click="applyFilters"
          >
            Apply Filters
          </button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, watch } from 'vue';
  
  export default {
    name: 'FilterSidebar',
    props: {
      jobTypeFilters: {
        type: Array,
        default: () => [],
      },
      experienceLevelFilters: {
        type: Array,
        default: () => [],
      },
    },
    setup(props, { emit }) {
      const localJobTypeFilters = ref([...props.jobTypeFilters]);
      const localExperienceLevelFilters = ref([...props.experienceLevelFilters]);
  
      // Sync props with local state
      watch(() => props.jobTypeFilters, (newVal) => {
        localJobTypeFilters.value = [...newVal];
      });
      watch(() => props.experienceLevelFilters, (newVal) => {
        localExperienceLevelFilters.value = [...newVal];
      });
  
      const emitFilters = () => {
        emit('update:jobTypeFilters', localJobTypeFilters.value);
        emit('update:experienceLevelFilters', localExperienceLevelFilters.value);
      };
  
      const applyFilters = () => {
        emit('apply-filters', {
          jobTypeFilters: localJobTypeFilters.value,
          experienceLevelFilters: localExperienceLevelFilters.value,
        });
      };
  
      return {
        localJobTypeFilters,
        localExperienceLevelFilters,
        emitFilters,
        applyFilters,
      };
    },
  };
  </script>
  
  <style scoped>
  .offcanvas {
    width: 300px !important;
  }
  </style>