<template>
    
    <TopBar @sort-tasks="handleSort" @filter-applied="handleFilter" />

    <div v-for="task in tasks" :key="task.id">
      <router-link :to="`/task/${task.id}`"> 
        <TaskItem
          :key="task.id"
          :id="task.id"
          :taskName="task.taskName"
          :priority="task.priority"
          :isCompleted="task.isCompleted"
          :dueDate="task.dueDate"
          @delete-task="deleteTask"
          @edit-task="editTask"
          @update-completion="handleCompletionUpdate"
        />
      </router-link>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { useStore } from "vuex";
import TaskItem from "../components/TaskItem.vue";
import TopBar from "../components/TopBar.vue";
import { Task } from "../models/Task";

export default defineComponent({
  name: "TaskList",
  components: {
    TaskItem,
    TopBar,
  },
  setup() {
    const store = useStore();
    const allTasks = computed(() => store.state.tasks);
    const activeFilter = ref<string | null>(null);

    const tasks = computed(() => {
      if (!activeFilter.value) {
        return allTasks.value;
      }

      
      return allTasks.value.filter(
        (task: Task) => task.priority === activeFilter.value
      );
    });

    const deleteTask = (id: string) => {
      store.commit("deleteTask", id);
    };

    const editTask = (id: string) => {
      
    };

    const handleSort = (order: string) => {
      const sortedTasks = [...tasks.value];

      if (order === "asc") {
        sortedTasks.sort((a, b) => a.taskName.localeCompare(b.taskName));
      } else {
        sortedTasks.sort((a, b) => b.taskName.localeCompare(a.taskName));
      }

      
      store.commit("updateSortedTasks", sortedTasks);
    };

    const handleCompletionUpdate = (payload: {
      id: string;
      isCompleted: boolean;
    }) => {
      store.commit("updateTaskCompletion", payload);
    };

    const handleFilter = (filterType: string) => {
      console.log("Received filter type in TaskList:", filterType);
      switch (filterType) {
        case "priority-high":
          activeFilter.value = "high"; 
          break;
        case "priority-medium":
          activeFilter.value = "medium";
          break;
        case "priority-low":
          activeFilter.value = "low";
          break;
        default:
          activeFilter.value = null;
          break;
      }
    };

    return {
      tasks,
      allTasks,
      deleteTask,
      editTask,
      handleSort,
      handleFilter,
      handleCompletionUpdate,
    };
  },
});
</script>
