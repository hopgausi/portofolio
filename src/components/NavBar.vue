<template>
  <header class="bg-white shadow sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
      <h1 class="text-xl font-bold text-primary">Hopson</h1>
      <nav class="hidden md:flex gap-6 text-textMain">
        <RouterLink to="/" class="hover:text-primary">Home</RouterLink>
        <RouterLink to="/about" class="hover:text-primary">About</RouterLink>
        <RouterLink to="/projects" class="hover:text-primary">Projects</RouterLink>
        <RouterLink to="/contact" class="hover:text-primary">Contact</RouterLink>
      </nav>
      <!-- Mobile menu button -->
      <button class="md:hidden" @click="toggleMenu">
        <svg class="w-6 h-6 text-textMain" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>

    <!-- Mobile menu -->
    <div v-if="menuOpen" class="md:hidden bg-white px-4 py-2">
      <RouterLink to="/" class="block py-2" @click="toggleMenu">Home</RouterLink>
      <RouterLink to="/about" class="block py-2" @click="toggleMenu">About</RouterLink>
      <RouterLink to="/projects" class="block py-2" @click="toggleMenu">Projects</RouterLink>
      <RouterLink to="/contact" class="block py-2" @click="toggleMenu">Contact</RouterLink>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
const menuOpen = ref(false)
const toggleMenu = () => menuOpen.value = !menuOpen.value
</script>
