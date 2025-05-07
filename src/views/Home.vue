<template>
    <div>
      <AppHeader />
      <Navbar />
      <Popular />
      <AppFooter />
    </div>
  </template>
  
  <script >
  import Popular from '../components/homePage/Popular.vue';
  import Navbar from '../components/homePage/Navbar.vue';
  import AppHeader from '../components/homePage/AppHeader.vue';
  import AppFooter from '../components/homePage/AppFooter.vue';


  export default {
    name: 'Home',
    components: { 
      Navbar,
      AppHeader,
      Popular,
      AppFooter
      

     
    }
  }
  </script>