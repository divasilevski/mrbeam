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

<style lang="scss" scoped>
canvas {
  width: 100%;
  height: var(--height-canvas);
}
</style>
