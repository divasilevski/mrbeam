<template>
  <main>
    <NuxtPage />
  </main>
</template>

<script lang="ts" setup>
useHead({
  title: 'MrBeam',
  htmlAttrs: { lang: 'en' },
})
</script>

<style lang="postcss" scoped>
main {
  @apply m-auto max-w-4xl p-4;
}
</style>
