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

<style lang="scss" scoped>
main {
  margin: auto;
  padding: 1rem 1rem 4rem;
  max-width: 56rem;
  color: var(--color-secondary);
  font-family: var(--font-sans);
}
</style>
