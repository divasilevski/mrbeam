<template>
  <VitePwaManifest />
  <LayoutToasts />
  <LayoutScroll>
    <LayoutHeader />
    <main>
      <NuxtPage />
    </main>
  </LayoutScroll>
</template>

<script lang="ts" setup>
onMounted(() => {
  // Fake events
  setTimeout(() => {
    window.GTMDataLayer = window.GTMDataLayer || []
    window.GTMDataLayer.push({
      event: 'fake_app_event',
      source: 'GTMDataLayer',
    })

    window.gtag?.('event', 'fake_app_event', { source: 'gtag' })
  }, 300)
})
</script>

<style lang="postcss" scoped>
main {
  @apply m-auto max-w-4xl px-4 pt-4 pb-16 text-secondary font-sans;
}
</style>
