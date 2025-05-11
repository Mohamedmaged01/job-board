<template>
  <div
    class="offcanvas offcanvas-start"
    tabindex="-1"
    id="filterSidebar"
    aria-labelledby="filterSidebarLabel"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title fw-semibold" id="filterSidebarLabel">Filters</h5>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body">
      <div class="mb-4">
        <h6 class="fw-medium mb-3">Active Filters:</h6>
        <div class="alert alert-light p-2 mb-3">
          <div v-if="searchQuery">{{ searchQuery }}</div>
          <div v-if="industryFilter">Industry: {{ industryFilter }}</div>
          <div v-if="localJobTypeFilters.length > 0">
            Job Type: {{ localJobTypeFilters.join(', ') }}
          </div>
          <div v-if="minSalary || maxSalary">
            Salary: {{ minSalary ? `$${minSalary}` : '' }}{{ minSalary && maxSalary ? ' - ' : '' }}{{ maxSalary ? `$${maxSalary}` : '' }}
          </div>
          <div v-if="remoteOnly">Remote Only</div>
          <div v-if="!searchQuery && !industryFilter && localJobTypeFilters.length === 0 && !minSalary && !maxSalary && !remoteOnly">
            No active filters
          </div>
        </div>
      </div>

      <form>
        <div class="mb-4">
          <h6 class="fw-medium mb-3">Search</h6>
          <input 
            type="text" 
            class="form-control" 
            v-model="searchQuery" 
            placeholder="UI/UX Prague, Czech"
            @input="emitFilters"
          >
        </div>

        <div class="mb-4">
          <h6 class="fw-medium mb-3">Industry</h6>
          <select class="form-select" v-model="industryFilter" @change="emitFilters">
            <option value="">All Category</option>
            <option value="Developments">Developments</option>
            <option value="Business">Business</option>
            <option value="Finance & Accounting">Finance & Accounting</option>
            <option value="IT & Software">IT & Software</option>
            <option value="Office Productivity">Office Productivity</option>
            <option value="Personal Development">Personal Development</option>
            <option value="Design">Design</option>
            <option value="Marketing">Marketing</option>
            <option value="Photography & Video">Photography & Video</option>
          </select>
        </div>

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
            <label class="form-check-label" for="jobTypePartTime">Part-Time</label>
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
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value="Temporary"
              v-model="localJobTypeFilters"
              id="jobTypeTemporary"
              @change="emitFilters"
            />
            <label class="form-check-label" for="jobTypeTemporary">Temporary</label>
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
            <label class="form-check-label" for="jobTypeContract">Contract Base</label>
          </div>
        </div>

        <div class="mb-4">
          <h6 class="fw-medium mb-3">Salary (yearly)</h6>
          <div class="d-flex mb-2">
            <div class="me-2">
              <label class="form-label small">Min:</label>
              <input 
                type="text" 
                class="form-control" 
                v-model="minSalary" 
                placeholder="$70,000"
                @input="emitFilters"
              >
            </div>
            <div>
              <label class="form-label small">Max:</label>
              <input 
                type="text" 
                class="form-control" 
                v-model="maxSalary" 
                placeholder="$120,000"
                @input="emitFilters"
              >
            </div>
          </div>
          <div class="btn-group-vertical w-100" role="group">
            <button type="button" class="btn btn-outline-secondary text-start" @click="setSalaryRange(10, 100)">$10 - $100</button>
            <button type="button" class="btn btn-outline-secondary text-start" @click="setSalaryRange(100, 1000)">$100 - $1,000</button>
            <button type="button" class="btn btn-outline-secondary text-start" @click="setSalaryRange(1000, 10000)">$1,000 - $10,000</button>
            <button type="button" class="btn btn-outline-secondary text-start" @click="setSalaryRange(10000, 100000)">$10,000 - $100,000</button>
            <button type="button" class="btn btn-outline-secondary text-start" @click="setSalaryRange(100000, 0)">$100,000 Up</button>
          </div>
        </div>

        <div class="form-check mb-4">
          <input 
            class="form-check-input" 
            type="checkbox" 
            id="remoteJob" 
            v-model="remoteOnly" 
            @change="emitFilters"
          >
          <label class="form-check-label" for="remoteJob">Remote Job</label>
        </div>

        <button
          type="button"
          class="btn btn-primary w-100"
          data-bs-dismiss="offcanvas"
          @click="applyFilters"
        >
          Apply Filter
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
    initialSearchQuery: {
      type: String,
      default: ''
    }
  },
  setup(props, { emit }) {
    const localJobTypeFilters = ref([...props.jobTypeFilters]);
    const industryFilter = ref('');
    const searchQuery = ref(props.initialSearchQuery);
    const minSalary = ref('');
    const maxSalary = ref('');
    const remoteOnly = ref(false);

    // Sync props with local state
    watch(() => props.jobTypeFilters, (newVal) => {
      localJobTypeFilters.value = [...newVal];
    });
    watch(() => props.initialSearchQuery, (newVal) => {
      searchQuery.value = newVal;
    });

    const setSalaryRange = (min, max) => {
      minSalary.value = min === 0 ? '' : min.toString();
      maxSalary.value = max === 0 ? '' : max.toString();
      emitFilters();
    };

    const emitFilters = () => {
      emit('update:jobTypeFilters', localJobTypeFilters.value);
      emit('update:industryFilter', industryFilter.value);
      emit('update:searchQuery', searchQuery.value);
      emit('update:minSalary', minSalary.value);
      emit('update:maxSalary', maxSalary.value);
      emit('update:remoteOnly', remoteOnly.value);
    };

    const applyFilters = () => {
      emit('apply-filters', {
        searchQuery: searchQuery.value,
        jobTypeFilters: localJobTypeFilters.value,
        industryFilter: industryFilter.value,
        minSalary: minSalary.value,
        maxSalary: maxSalary.value,
        remoteOnly: remoteOnly.value
      });
    };

    return {
      localJobTypeFilters,
      industryFilter,
      searchQuery,
      minSalary,
      maxSalary,
      remoteOnly,
      setSalaryRange,
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
.btn-group-vertical button {
  text-align: left;
  padding: 8px 12px;
  border-radius: 0 !important;
}
.alert-light div {
  margin-bottom: 4px;
}
.alert-light div:last-child {
  margin-bottom: 0;
}
</style>