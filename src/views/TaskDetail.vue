<template>
  <div v-if="task">
    
    <h2>{{ task.taskName }}</h2>
    <p>Priority: {{ task.priority }}</p>
    <p>Description: {{ task.description }}</p>
    <p>Created on: {{ task.creationDate }}</p>
    <p>Due by: {{ task.dueDate }}</p>

    
    <div>
      <h3>Edit Task</h3>
      <input v-model="editedTask.taskName" placeholder="Task Name"/>
      <select v-model="editedTask.priority">
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
      <textarea v-model="editedTask.description" placeholder="Description"></textarea>
      <input type="date" v-model="editedTask.dueDate"/>
      <button @click="saveChanges">Save Changes</button>
    </div>
  </div>
  <div v-else>
    <p>The task you're looking for does not exist or was removed.</p>
    <router-link to="/">Go back to task list</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { Task } from '../models/Task';

export default defineComponent({
  name: 'TaskDetail',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const taskId = route.params.id;
    const task = store.state.tasks.find((t: Task) => t.id === taskId);

    const editedTask = ref({ ...task });

    const saveChanges = () => {
 
  store.commit("updateTask", editedTask.value);
  
  
  router.push('/');
};


    return {
      task,
      editedTask,
      saveChanges
    };
  },
});
</script>