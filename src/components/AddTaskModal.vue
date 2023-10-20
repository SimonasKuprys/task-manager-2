<template>
    <div v-if="isVisible">
      <div class="overlay" @click="closeModal"></div>
      <div class="modal">
        <input type="date" v-model="dueDate" placeholder="Select due date" />
        <input v-model="newTask" placeholder="Enter task name" />
        <textarea
          v-model="taskDescription"
          placeholder="Enter task description"
        ></textarea>
        <p v-if="taskExists" class="error-message">
          A task with this name already exists!
        </p>
  
        <select v-model="selectedPriority">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button @click="addTask" :disabled="taskExists">Add</button>
        <button @click="closeModal">Cancel</button>
      </div>
    </div>
    <div v-if="showFeedback" class="feedback">Task added successfully!</div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, computed } from 'vue';
  import { Task } from '../models/Task';
  import { useStore } from 'vuex';
  import { v4 as uuidv4 } from 'uuid';
  
  export default defineComponent({
    name: 'AddTaskModal',
    props: {
      isVisible: {
        type: Boolean,
        required: true,
      },
      tasks: {
        type: Array as () => Task[],
        default: () => [],
      },
    },
    emits: ['update:isVisible'],
    setup(props, { emit }) {
      const store = useStore();
    const showFeedback = ref(false);
      const newTask = ref('');
      const dueDate = ref('');
      const taskDescription = ref('');
      const selectedPriority = ref('medium');
      const taskExists = computed(() =>
        props.tasks.some(task => task.taskName === newTask.value)
      );
  
      const addTask = () => {
  if (newTask.value && !taskExists.value) {
    const task: Task = {
      id: uuidv4(),
      taskName: newTask.value,
      priority: selectedPriority.value,
      description: taskDescription.value,
      dueDate: dueDate.value ? new Date(dueDate.value) : undefined,
      isCompleted: false,             
      creationDate: new Date(),  
    };

        store.commit('addTask', task);

        resetFields();
        closeModal();

        // Show feedback for 2 seconds
        showFeedback.value = true;
        setTimeout(() => (showFeedback.value = false), 2000);
      }
    };

    const closeModal = () => {
      resetFields();
      emit('update:isVisible', false);
    };

    const resetFields = () => {
      newTask.value = '';
      taskDescription.value = '';
      selectedPriority.value = 'medium';
      dueDate.value = '';
    }
  
      return {
        newTask,
        taskDescription,
        addTask,
        closeModal,
        selectedPriority,
        taskExists,
        dueDate,
        showFeedback
      };
    },
  });
  </script>
  
  <style scoped>
  .modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #343436;
    color: #fff;
    padding: 20px;
    border: 1px solid #444;
    border-radius: 5px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    z-index: 1000;
  }
  
  .overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(50, 50, 50, 0.7);
    backdrop-filter: blur(5px);
    z-index: 999;
  }
  
  .error-message {
    color: red;
    font-size: 0.8em;
    margin-top: 8px;
  }
  
  .modal input,
  .modal textarea,
  .modal select {
    width: 100%;
    margin-bottom: 10px;
    padding: 5px;
    background-color: #2d2d2f;
    color: #fff;
    border: 1px solid #444;
    border-radius: 4px;
  }
  
  .modal button {
    background-color: #444;
    color: #fff;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .modal button:hover {
    background-color: #555;
  }
  
  .modal button:disabled {
    background-color: #666;
    cursor: not-allowed;
  }
  .feedback {
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #4CAF50;
  color: white;
  padding: 12px 24px;
  border-radius: 4px;
  z-index: 1000;
}
  @media only screen and (min-width: 601px) and (max-width: 1024px) {
    .modal {
      width: 70%;
      padding: 15px;
    }
  }
  
  @media only screen and (max-width: 600px) {
    .modal {
      width: 90%;
      padding: 10px;
    }
  
    .modal input,
    .modal textarea,
    .modal select {
      font-size: 14px;
      padding: 4px;
    }
  
    .modal button {
      font-size: 14px;
      padding: 4px 8px;
    }
  
    .error-message {
      font-size: 0.7em;
    }
  }
  </style>
  