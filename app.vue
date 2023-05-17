<template>
  <Simplebar id="main-scroll" style="height: 100vh">
    <main>
      <LayoutHeader />
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
  @apply m-auto max-w-4xl px-4 pb-16 text-primary;
}

/* Fix simplebar */
[data-simplebar] .simplebar-track {
  @apply opacity-30 w-[9px] -z-10;
}
</style>
