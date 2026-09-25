<template>
  <div ref="hintRef" class="hint" @touchstart="onTouchstart">
    <div @mouseenter="onMouseenter" @mouseleave="onMouseleave">
      <slot />
    </div>

    <div class="content" :class="{ opened: isOpened }">
      <slot name="hint" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const isOpened = ref(false)
const hintRef = ref()

const onMouseenter = () => {
  isOpened.value = true
}

const onMouseleave = () => {
  isOpened.value = false
}

const onTouchstart = () => {
  isOpened.value = !isOpened.value
}

onClickOutside(hintRef, () => {
  isOpened.value = false
})
</script>

<style lang="postcss">
.hint {
  @apply relative flex items-center justify-center;

  .content {
    @apply absolute bottom-full left-0 hidden w-max px-2 py-1 bg-white border shadow-sm;
  }

  .content.opened {
    @apply block;
  }
}
</style>
