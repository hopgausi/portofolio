<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/NavBar.vue'
</script>

<template>
  <div>
    <Navbar />
  <router-view />
  </div>
</template>

<style scoped>

</style>