<!-- customize routes
<script setup>
import HelloWorld from "./components/HelloWorld.vue";

import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <nav>
       <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink> 
    </nav>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style scoped>
nav {
  padding: 1rem;
  background: #f0f0f0;
}

nav a {
  margin-right: 1rem;
}

nav a.router-link-active {
  font-weight: bold;
}
</style>
 -->





 <template>
  <router-view />
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
</style>