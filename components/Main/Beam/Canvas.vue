<template>
  <AppCanvas id="beam" @update="onUpdate" />
</template>

<script lang="ts" setup>
import { useUnitsStore } from '~/stores/useUnitsStore'
import { PaperBeam } from '~/utils/paper/PaperBeam'

const store = useUnitsStore()
const beam = new PaperBeam()

const onUpdate = (canvasElement: HTMLCanvasElement) => {
  beam.draw({
    units: store.units,
    canvas: canvasElement,
  })
}
</script>
