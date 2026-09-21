<template>
  <canvas :id="props.id" ref="canvasRef" resize />
</template>

<script lang="ts" setup>
const props = defineProps({
  id: {
    type: String,
    default: undefined,
  },
})

const emit = defineEmits(['update'])

const canvasRef = ref<HTMLCanvasElement>()

useResizeObserver(canvasRef, () => {
  if (canvasRef.value) {
    emit('update', toValue(canvasRef))
  }
})

watchEffect(() => {
  if (canvasRef.value) {
    emit('update', toValue(canvasRef))
  }
})
</script>

<style lang="postcss" scoped>
canvas {
  @apply w-full h-canvas;
}
</style>
