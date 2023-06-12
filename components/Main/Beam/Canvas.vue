<template>
  <AppCanvas id="beam" @update="onUpdate" />
</template>

<script lang="ts" setup>
import { useMainStore } from '~/stores/useMainStore'
import { PaperBeam } from '~/utils/paper/PaperBeam'

const store = useMainStore()
const beam = new PaperBeam()

const onUpdate = (canvasElement: HTMLCanvasElement) => {
  beam.draw({
    units: store.units,
    canvas: canvasElement,
  })
}
</script>
