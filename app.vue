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

<style lang="postcss" scoped>
main {
  @apply m-auto max-w-4xl px-4 pt-4 pb-16 text-secondary font-sans;
}
</style>
