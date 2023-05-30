<template>
  <Simplebar id="main-scroll" style="height: 100vh">
    <slot></slot>
  </Simplebar>
</template>

<script lang="ts" setup>
const router = useRouter()
const { scrollTo } = useMainScroll()

onMounted(() => {
  router.options.scrollBehavior = () => {
    scrollTo({ top: 0 })
    return false
  }
})
</script>

<style lang="postcss" scoped>
[data-simplebar] {
  @apply bg-background;
}

[data-simplebar] :deep(.simplebar-track) {
  @apply opacity-30 w-[9px];
}
</style>
