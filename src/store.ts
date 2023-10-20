import { createStore } from "vuex";
import { Task } from "./models/Task";

interface State {
  tasks: Task[];
}

export const store = createStore<State>({
  state: {
    tasks: JSON.parse(localStorage.getItem("tasks") || "[]"),
  },
  mutations: {
    setTasks(state, tasks: Task[]) {
      state.tasks = tasks;
    },
    addTask(state, task: Task) {
      state.tasks = [...state.tasks, task];
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    deleteTask(state, taskId: string) {
      state.tasks = state.tasks.filter((task) => task.id !== taskId);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    sortTasks(state, order) {
      if (order === "asc") {
        state.tasks.sort((a, b) => a.taskName.localeCompare(b.taskName));
      } else {
        state.tasks.sort((a, b) => b.taskName.localeCompare(a.taskName));
      }
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    updateSortedTasks(state, sortedTasks) {
      state.tasks = sortedTasks;
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    updateTaskCompletion(state, payload) {
      const task = state.tasks.find(task => task.id === payload.id);
      if (task) {
        task.isCompleted = payload.isCompleted;
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
      }
    },
    updateTask(state, updatedTask: Task) {
      const taskIndex = state.tasks.findIndex((task) => task.id === updatedTask.id);
      if (taskIndex !== -1) {
        state.tasks[taskIndex] = updatedTask;
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
      }
    },
    
  },
  actions: {
    initializeStore(context) {
      const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      context.commit("setTasks", savedTasks);
    },
    
    
  },
});