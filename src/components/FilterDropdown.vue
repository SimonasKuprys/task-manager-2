<template>
    <transition name="fade-slide-dropdown">
      <div v-if="isVisible" class="filter-dropdown">
        <div @click="applyFilter('priority-high')">High Priority</div>
        <div @click="applyFilter('priority-medium')">Medium Priority</div>
        <div @click="applyFilter('priority-low')">Low Priority</div>
      </div>
    </transition>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'FilterDropdown',
    props: {
      isVisible: {
        type: Boolean,
        required: true
      }
    },
    methods: {
      applyFilter(filterType: string) {
        this.$emit('apply-filter', filterType);
        this.closeDropdown(); 
      },
      closeDropdown() {
        this.$emit('close-dropdown'); 
      }
    }
  });
  </script>
  
  <style scoped>
  .filter-dropdown {
    border: 1px solid #444;
    background-color: #343436;
    color: #fff;
    position: absolute;
    top: 100%; 
    left: 0;
    width: 150px;
    z-index: 10;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    border-radius: 5px;
    transition: background-color 0.3s, transform 0.3s;
    transform-origin: top center;
  }
  
  .filter-dropdown div {
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
  }
  
  .filter-dropdown div:hover {
    background-color: #2d2d2f;
    transform: scale(1.02);
  }
  
  .fade-slide-dropdown-enter-active, .fade-slide-dropdown-leave-active {
    transition: opacity 0.3s, transform 0.3s;
  }
  .fade-slide-dropdown-enter, .fade-slide-dropdown-leave-to {
    opacity: 0;
    transform: scaleY(0.95);
  }
  
  
  @media only screen and (max-width: 600px) {
    .filter-dropdown {
      width: 120px;
    }
  }
  </style>