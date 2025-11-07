<template>
  <v-footer app class="app-footer" elevation="1" height="56">
    <div class="footer-inner">
      <div class="text-caption">EcoCompanion</div>
      <v-spacer />
      <nav class="footer-nav d-none d-sm-flex">
        <RouterLink class="footer-link" to="/">Home</RouterLink>
        <span aria-hidden="true" class="sep">·</span>
        <RouterLink class="footer-link" to="/about">About</RouterLink>
        <span aria-hidden="true" class="sep">·</span>
        <RouterLink class="footer-link" to="/hardware">Hardware</RouterLink>
        <span aria-hidden="true" class="sep">·</span>
        <RouterLink class="footer-link" to="/settings">Settings</RouterLink>
        <span aria-hidden="true" class="sep">|</span>
        <a
          class="footer-link external"
          href="https://github.com/PaulPruenster/ecocompanion"
          rel="noopener noreferrer"
          target="_blank"
        >
          GitHub
        </a>
      </nav>
      <div class="text-caption text-medium-emphasis ms-4">&copy; {{ new Date().getFullYear() }}</div>
    </div>
  </v-footer>
</template>

<script setup lang="ts">
  // Simple branded footer
</script>

<style scoped>
.app-footer {
  padding-inline: 16px;
}
.footer-inner {
  display: flex;
  align-items: center;
  width: 100%;
}
.footer-nav {
  display: flex;
  align-items: center;
}
.footer-link {
  font-size: 0.75rem; /* caption */
  color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
  text-decoration: none;
}
.footer-link:hover {
  text-decoration: underline;
}
.sep {
  margin: 0 6px;
  color: rgba(var(--v-theme-on-surface), var(--v-disabled-opacity));
}
</style>
