<template>
  <canvas ref="canvasRef" resize />
</template>

<script lang="ts" setup>
import { PaperChart } from '~/utils/paper/PaperChart'

const props = defineProps({
  points: {
    type: Array as () => number[][],
    default: () => [],
  },
})

const route = useRoute()
const beam = new PaperChart()
const canvasRef = ref<HTMLCanvasElement>()

useResizeObserver(canvasRef, () => {
  if (canvasRef.value) {
    beam.draw({
      points: props.points,
      canvas: canvasRef.value,
      hasPattern: true,
    })
  }
})

watchEffect(() => {
  if (canvasRef.value) {
    beam.draw({
      points: props.points,
      canvas: canvasRef.value,
      hasPattern: true,
    })
  }
})

const updateCanvasWidth = () => {
  const el = document.getElementById('beam')

  if (el?.clientWidth && canvasRef.value) {
    canvasRef.value.width = el?.clientWidth
  }
}

watch(route, updateCanvasWidth, { flush: 'post' })
</script>

<style lang="postcss" scoped>
canvas {
  @apply w-full h-canvas;
}
</style>
