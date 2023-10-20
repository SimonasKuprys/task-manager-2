<template>
  <div class="app">
    
    <header class="app-header">
      <h1>Everyday Task manager</h1>
     
    </header>

    
    <main class="app-main">
      <router-view></router-view>
    </main>

    
    <footer class="app-footer">
      <p>&copy; 2023 Your App's Name. All rights reserved.</p>
    </footer>
  </div>
</template>

<script lang="ts">
export default {
  name: 'App',
};
</script>

<style>

.app {
  font-family: 'Arial', sans-serif;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
margin: 10px;
}

.app-header {
  text-align: center;
  background-color: #333;
  color: white;
  padding: 1rem 2rem;
  border-radius: 5px;
  margin-bottom: 10px;
}

.app-main {
  flex: 1;
  /* padding: 1rem; */
}

.app-footer {
  background-color: #f5f5f5;
  padding: 1rem 2rem;
  text-align: center;
}
</style>