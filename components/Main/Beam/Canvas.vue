<template>
  <canvas id="beam" ref="canvasRef" resize />
</template>

<script lang="ts" setup>
import { PaperBeam } from '~/utils/paper/PaperBeam'
import { useUnitsStore } from '~/stores/useUnitsStore'

const route = useRoute()
const beam = new PaperBeam()
const store = useUnitsStore()
const canvasRef = ref<HTMLCanvasElement>()

useResizeObserver(canvasRef, () => {
  if (canvasRef.value) {
    beam.draw({
      units: store.units,
      canvas: canvasRef.value,
    })
  }
})

watchEffect(() => {
  if (canvasRef.value) {
    beam.draw({
      units: store.units,
      canvas: canvasRef.value,
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
