<template>
  <Simplebar style="height: 100vh">
    <main>
      <NuxtPage />
    </main>
  </Simplebar>
</template>

<script lang="ts" setup>
useHead({
  title: 'MrBeam',
  htmlAttrs: { lang: 'en' },
})
</script>

<style lang="postcss">
main {
  @apply m-auto max-w-4xl p-4 pb-16;
}
</style>
