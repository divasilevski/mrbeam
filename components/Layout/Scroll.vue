<template>
  <Simplebar id="main-scroll" style="height: 100vh">
    <slot></slot>
  </Simplebar>
</template>

<style lang="postcss" scoped>
[data-simplebar] {
  @apply bg-background;
}

[data-simplebar] :deep(.simplebar-track) {
  @apply opacity-30 w-[9px];
}
</style>
