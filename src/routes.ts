import { createRouter, createWebHistory } from 'vue-router';
import TaskList from './views/TaskList.vue';
import TaskDetail from './views/TaskDetail.vue';
import Statistics from './views/Statistics.vue';

const routes = [
  {
    path: '/',
    name: 'TaskList',
    component: TaskList
  },
  {
    path: '/task/:id',
    name: 'TaskDetail',
    component: TaskDetail
  },
  {
    path: '/statistics',
    name: 'Statistics',
    component: Statistics
  }
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});