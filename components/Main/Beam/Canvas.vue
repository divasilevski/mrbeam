<template>
  <canvas id="beam" ref="canvasRef" resize />
</template>

<script lang="ts" setup>
import { PaperBeam } from '~/utils/paper/PaperBeam'
import { useUnitsStore } from '~/stores/useUnitsStore'

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
</script>

<style lang="postcss" scoped>
canvas {
  width: 100%;
  height: 150px;
}
</style>
