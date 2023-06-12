<template>
  <AppCanvas @update="onUpdate" />
</template>

<script lang="ts" setup>
import { PaperChart } from '~/utils/paper/PaperChart'

const props = defineProps({
  points: {
    type: Array as () => number[][],
    default: () => [],
  },
})

const beam = new PaperChart()

const onUpdate = (canvasElement: HTMLCanvasElement) => {
  beam.draw({
    points: props.points,
    canvas: canvasElement,
    hasPattern: true,
  })
}
</script>
