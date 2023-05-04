<template>
  <div class="sheet">
    <div class="content" :class="{ drag: isDrag }" :style="style">
      <header class="controls">
        <div ref="draggbleRef" class="draggable-area">
          <div class="draggable-thumb" />
        </div>

        <button class="close-sheet" type="button" title="Close the sheet">
          &times;
        </button>
      </header>

      <div class="body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const draggbleRef = ref()
const isDrag = ref(false)

const { y } = useDraggable(draggbleRef, {
  initialValue: { x: 0, y: 40 },
  onStart: () => {
    isDrag.value = true
  },
  onEnd: () => {
    isDrag.value = false
  },
})

const { height } = useWindowSize()

const style = computed(() => {
  const value = height.value - y.value
  return `height: ${value}px`
})

watchEffect(() => {
  if (!isDrag.value && y.value > 200) {
    y.value = 200
  }
})
</script>

<style lang="postcss" scoped>
.sheet {
  @apply fixed bottom-0 left-0 right-0 m-auto max-w-4xl select-none touch-none;

  .content {
    @apply flex flex-col rounded-t-2xl max-h-[100vh] h-[30vh] bg-gray-200;

    .controls {
      @apply flex;

      .draggable-area {
        @apply w-12 m-auto p-4 cursor-grab;
      }

      .draggable-thumb {
        @apply w-12 h-1 bg-slate-500 rounded-sm;
      }

      .close-sheet {
        @apply border-none p-3;
      }
    }

    .body {
      @apply flex flex-col flex-grow gap-4 h-full p-4 overflow-y-auto;
    }
  }

  .content:not(.drag) {
    transition: height 0.5s;
  }
}
</style>
