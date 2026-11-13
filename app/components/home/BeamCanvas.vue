<template>
  <AppCanvas id="beam" @update="onUpdate" />
</template>

<script lang="ts" setup>
import { PaperBeam } from '~/utils/paper/PaperBeam'

const { units } = useBeam()
const beam = new PaperBeam()

onUnmounted(() => beam.dispose())

const onUpdate = (canvasElement: HTMLCanvasElement) => {
  beam.draw({
    units: units.value,
    canvas: canvasElement,
  })
}
</script>
