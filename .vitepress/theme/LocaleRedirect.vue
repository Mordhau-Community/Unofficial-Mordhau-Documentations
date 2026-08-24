<script setup lang="ts">
import { onMounted } from "vue";
import { withBase } from "vitepress";

const target = withBase("/en/");

onMounted(() => {
  window.location.replace(target);
});
</script>

<template>
  <main class="locale-redirect">
    <p>Opening the English documentation…</p>
    <a :href="target">Continue to Mordhau Guides</a>
  </main>
</template>

<style scoped>
.locale-redirect {
  display: grid;
  place-content: center;
  min-height: calc(100vh - var(--vp-nav-height));
  padding: 32px;
  text-align: center;
}

.locale-redirect p {
  margin: 0 0 10px;
  color: var(--vp-c-text-2);
}

.locale-redirect a {
  color: var(--vp-c-brand-1);
}
</style>
