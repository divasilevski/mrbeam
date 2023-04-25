<template>
  <div class="app">Nuxt app</div>
  <Icon name="home" />
</template>

<script lang="ts" setup>
useHead({
  title: 'Nuxt app',
  htmlAttrs: { lang: 'en' },
})
</script>

<style lang="postcss">
.app {
  @apply p-4 text-primary font-bold;
}
</style>
