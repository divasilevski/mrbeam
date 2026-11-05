<template>
  <Simplebar id="main-scroll" style="height: 100vh">
    <slot />
  </Simplebar>
</template>

<script lang="ts" setup>
const pageScroll = {
  default: 0,
  docs: 0,
}

const scrollElement = ref()
const { y } = useScroll(scrollElement)

const route = useRoute()
const routeName = computed(() => route.name as keyof typeof pageScroll)

onMounted(() => {
  scrollElement.value = useMainScroll().getScrollElement()
})

// Save scroll positions
watch(routeName, (to, from) => {
  if (from in pageScroll) {
    pageScroll[from] = y.value
  }

  y.value = to in pageScroll ? pageScroll[to] : pageScroll.default
})
</script>

<style lang="scss" scoped>
[data-simplebar] {
  background: var(--color-background);
}

[data-simplebar] :deep(.simplebar-track) {
  opacity: 0.3;
  width: 9px;
}
</style>
