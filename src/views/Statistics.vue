<template>
  <div class="statistics">
    <h3>Task Statistics</h3>
    <div data-testid="total-tasks">Total Tasks: {{ totalTasks }}</div>
    <div data-testid="completed-tasks">
      Completed Tasks: {{ completedTasks }}
    </div>
    <div data-testid="pending-tasks">Pending Tasks: {{ pendingTasks }}</div>
    <div data-testid="completion-rate">
      Completion Rate: {{ completionRate }}%
    </div>
    <div v-if="priorityDistribution.high" data-testid="high-priority">
      High Priority: {{ priorityDistribution.high }}
    </div>
    <div v-if="priorityDistribution.medium" data-testid="medium-priority">
      Medium Priority: {{ priorityDistribution.medium }}
    </div>
    <div v-if="priorityDistribution.low" data-testid="low-priority">
      Low Priority: {{ priorityDistribution.low }}
    </div>
  </div>
</template>

<script lang="ts">
import { Task } from '../models/Task';
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'Statistics',
  setup() {
    const store = useStore();
    const tasks = computed(() => store.state.tasks);

    return {
      tasks,
      totalTasks: computed(() => tasks.value.length),
      completedTasks: computed(() => tasks.value.filter((task : Task) => task.isCompleted).length),
      pendingTasks: computed(() => tasks.value.filter((task : Task) => !task.isCompleted).length),
      completionRate: computed(() => {
        return tasks.value.length === 0
          ? 0
          : parseFloat(
              ((tasks.value.filter((task : Task) => task.isCompleted).length / tasks.value.length) * 100).toFixed(2)
            );
      }),
      priorityDistribution: computed(() => {
        return {
          high: tasks.value.filter((task : Task) => task.priority === 'high').length,
          medium: tasks.value.filter((task : Task) => task.priority === 'medium').length,
          low: tasks.value.filter((task : Task) => task.priority === 'low').length,
        };
      })
    };
  }
});
</script>
  
  <style scoped>
  .statistics {
    background-color: #f7f7f7;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    padding: 15px;
    margin-top: 10px;
    width: 100%;
    max-width: 300px;
    
  }
  
  .statistics h3 {
    text-align: center;
    border-bottom: 2px solid #e1e1e1;
    padding-bottom: 10px;
    margin-bottom: 10px;
  }
  
  .statistics > div {
    font-size: 0.9em;
    padding: 5px 0;
    display: flex;
    justify-content: space-between;
  }
  
  @media only screen and (min-width: 601px) and (max-width: 1024px) {
    .statistics {
      max-width: 300px;
    }
    .statistics > div {
      font-size: 1em;
    }
  }
  
  @media only screen and (max-width: 600px) {
    .statistics {
      max-width: none;
    }
    .statistics h3 {
      font-size: 1.2em;
    }
    .statistics > div {
      font-size: 1em;
      padding: 7px 0;
    }
  }
  </style>
  