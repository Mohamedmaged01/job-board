<template>
    <div>
      <AppHeader />
      <Navbar />
      <section1 />
      <Popular />
      <AppFooter />
    </div>
  </template>
  
  <script >
  import Popular from '../components/homePage/Popular.vue';
  import Navbar from '../components/homePage/Navbar.vue';
  import AppHeader from '../components/homePage/AppHeader.vue';
  import AppFooter from '../components/homePage/AppFooter.vue';
  import section1 from '../components/homePage/section1.vue';

 


  export default {
    name: 'Home',
    components: { 
      Navbar,
      AppHeader,
      section1,
      Popular,
      AppFooter
      

    },

  }
  </script>