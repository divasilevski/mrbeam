<template>
  <div
    ref="hintRef"
    class="hint"
    @mouseenter="onMouseenter"
    @mouseleave="onMouseleave"
    @touchstart="onTouchstart"
  >
    <AppIcon :name="props.name" />

    <div class="content" :class="{ opened: isOpened }">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
})

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
  @apply relative flex items-center justify-center w-8 h-8 rounded-full;

  .icon {
    @apply transition-colors text-secondary cursor-pointer hover:text-accent;
  }

  .content {
    @apply absolute bottom-full left-0 hidden max-w-sm w-[calc(100vw-60px)] px-2 py-1 bg-white border shadow-sm;
  }

  .content.opened {
    @apply block;
  }
}
</style>
