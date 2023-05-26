<template>
  <VitePwaManifest />
  <LayoutPWAToast />
  <Simplebar id="main-scroll" style="height: 100vh">
    <LayoutHeader :floating="isFloating" />
    <main>
      <NuxtPage />
    </main>
  </Simplebar>
</template>

<script lang="ts" setup>
const route = useRoute()

const isFloating = computed(() => route.path !== '/')
</script>

<style lang="postcss">
html {
  @apply bg-background;
}

main {
  @apply m-auto max-w-4xl px-4 pt-4 pb-16 text-secondary font-sans;
}

/* Fix simplebar */
[data-simplebar] .simplebar-track {
  @apply opacity-30 w-[9px];
}
</style>
