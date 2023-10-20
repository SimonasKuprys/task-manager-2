<template>
    <div>
      <div class="top-bar">
        <div class="nav-step" @click="showModal = true">
          <i class="icon fas fa-plus"></i>
          <span>New Task</span>
        </div>
        <div class="nav-step" @click="sortTasks">
          <i class="icon" :class="sortIconClass"></i>
          <span>Sort</span>
        </div>
        <div class="filter-container">
          <div class="nav-step" @click="filterTasks">
            <i class="icon fas fa-filter"></i>
            <span>Filter</span>
          </div>
          <FilterDropdown
            :isVisible="showFilterDropdown"
            @apply-filter="handleFilter"
            @close-dropdown="showFilterDropdown = false"
          />
        </div>
        <div class="nav-step" @click="goToStatistics">
          <i class="icon fas fa-chart-bar"></i>
          <span>Statistics</span>
        </div>
      </div>
      <AddTaskModal
    :isVisible="showModal"
    :tasks="tasks"
    @update:isVisible="showModal = $event"
/>
    </div>
</template>
  
<script lang="ts">
import { Task } from '../models/Task';
import { defineComponent, ref, computed } from 'vue';
import AddTaskModal from './AddTaskModal.vue';
import FilterDropdown from './FilterDropdown.vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'TopBar',
  components: {
    AddTaskModal,
    FilterDropdown,
  },
  props: {
    tasks: {
      type: Array as () => Task[],
      default: () => [],
    },
  },
  emits: ['new-task', 'sort-tasks', 'filter-applied'],
  setup(_, { emit }) {
    const showModal = ref(false);
    const showFilterDropdown = ref(false);
    const sortOrder = ref('asc');
    const router = useRouter();

    

    const filterTasks = () => {
      showFilterDropdown.value = !showFilterDropdown.value;
    };

    const handleFilter = (filterType: string) => {
      console.log("Received filter type in TopBar:", filterType);
      emit('filter-applied', filterType);
    };

    const sortIconClass = computed(() => {
      return sortOrder.value === 'asc'
        ? 'fas fa-sort-alpha-down'
        : 'fas fa-sort-alpha-up';
    });

    const sortTasks = () => {
      if (sortOrder.value === 'asc') {
        
        sortOrder.value = 'desc';
        emit('sort-tasks', 'desc'); 
      } else {
        sortOrder.value = 'asc';
        emit('sort-tasks', 'asc'); 
      }
    };

    const goToStatistics = () => {
      router.push({ name: 'Statistics' });
    };

    return {
      showModal,
      
      sortTasks,
      filterTasks,
      showFilterDropdown,
      handleFilter,
      sortIconClass,
      goToStatistics
    };
  },
});
</script>
  
  <style scoped>
  .top-bar {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #333;
    color: #fff;
    height: 60px;
    border-radius: 5px;
    padding: 0 20px;
  }
  
  .nav-step {
    display: flex;
    align-items: center;
    border-radius: 5px;
    padding: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .nav-step:hover {
    background-color: #444;
  }
  
  .icon {
    margin-right: 10px;
    
  }
  .filter-container {
    position: relative; 
  }
  
  @media (max-width: 768px) {
    .top-bar {
      height: 50px;
      flex-wrap: wrap;
      justify-content: space-around;
    }
  
    .nav-step {
      font-size: 0.9em;
      margin: 5px;
    }
  }
  
  @media (max-width: 480px) {
    .top-bar {
      height: auto;
      padding: 10px 5px;
    }
  
    .nav-step {
      flex-direction: column;
      align-items: center;
      font-size: 0.8em;
      margin: 8px 3px;
    }
  
    .icon {
      margin-right: 0;
      margin-bottom: 5px;
    }
  }
  </style>
  