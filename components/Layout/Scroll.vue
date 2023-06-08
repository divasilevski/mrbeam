<template>
  <Simplebar id="main-scroll" style="height: 100vh">
    <slot></slot>
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

watch(routeName, (to, from) => {
  if (from in pageScroll) {
    pageScroll[from] = y.value
  }

  y.value = to in pageScroll ? pageScroll[to] : pageScroll.default
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
