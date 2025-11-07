<template>
  <v-app-bar app class="app-header" elevation="1" flat>
    <v-app-bar-nav-icon aria-label="menu" class="me-2" />

    <v-toolbar-title class="text-h6 me-4">EcoCompanion</v-toolbar-title>

    <div class="nav-buttons">
      <v-btn class="mx-1" size="small" to="/" variant="text">Home</v-btn>
      <v-btn class="mx-1" size="small" to="/about" variant="text">About</v-btn>
      <v-btn class="mx-1" size="small" to="/hardware" variant="text">Hardware</v-btn>
      <v-btn class="mx-1" size="small" to="/settings" variant="text">Settings</v-btn>
    </div>

    <v-spacer />

    <v-btn aria-label="search" icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script setup lang="ts">
</script>

<style scoped>
</style>
