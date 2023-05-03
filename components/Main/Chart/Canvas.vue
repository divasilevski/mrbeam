<template>
  <span>{{ props.title }}</span>
  <canvas ref="canvasRef" resize />
</template>

<script lang="ts" setup>
import { PaperChart } from '~/utils/paper/PaperChart'

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  points: {
    type: Array as () => number[][],
    default: () => [],
  },
})

const beam = new PaperChart()

const canvasRef = ref<HTMLCanvasElement>()

useResizeObserver(canvasRef, () => {
  if (canvasRef.value) {
    beam.draw({
      points: props.points,
      canvas: canvasRef.value,
    })
  }
})

watchEffect(() => {
  if (canvasRef.value) {
    beam.draw({
      points: props.points,
      canvas: canvasRef.value,
    })
  }
})
</script>

<style lang="postcss" scoped>
canvas {
  @apply w-full h-[150px] bg-canvas;
}
</style>
