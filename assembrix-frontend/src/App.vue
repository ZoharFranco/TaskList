<!-- App.vue -->
<template>
  <div id="app">
    <nav>
      <router-link to="/dashboard">Dashboard</router-link>
      <router-link to="/register">Register</router-link>
      <router-link to="/login">Login</router-link>
      <router-link to="/logout">Logout</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'App',
});
</script>

<style>
nav {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ddd;
}
</style>
