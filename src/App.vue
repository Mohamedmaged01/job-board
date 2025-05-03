<template>
  <div id="app">
    <AppHeader />
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import AppHeader from './components/homePage/AppHeader.vue'
import Navbar from './components/homePage/Navbar.vue' // Changed from 'navbar'

export default {
  name: 'App',
  components: {
    AppHeader,
    Navbar
  }
}
</script>