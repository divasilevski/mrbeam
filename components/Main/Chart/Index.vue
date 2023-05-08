<template>
  <section class="box">
    <MainChartBottomSheet>
      <MainChartCanvas
        v-if="shearPoints.length > 1"
        :points="shearPoints"
        title="Plot of forces"
      />
      <MainChartCanvas
        v-if="momentPoints.length > 1"
        :points="momentPoints"
        title="Plot of moments"
      />
    </MainChartBottomSheet>

    <div v-if="store.solutionError">{{ store.solutionError }}</div>
  </section>
</template>

<script lang="ts" setup>
import { useUnitsStore } from '~/stores/useUnitsStore'

const store = useUnitsStore()

const shearPoints = computed(() => {
  if (Array.isArray(store.solution?.labels)) {
    return (
      store.solution?.labels.map((x, index) => {
        const y = store.solution?.shear[index] as number
        return [Number(x.toPrecision(3)), Number(y.toPrecision(3))]
      }) || []
    )
  }
  return []
})

const momentPoints = computed(() => {
  if (Array.isArray(store.solution?.labels)) {
    return (
      store.solution?.labels.map((x, index) => {
        const y = store.solution?.moment[index] as number
        return [Number(x.toPrecision(3)), Number(y.toPrecision(3))]
      }) || []
    )
  }
  return []
})
</script>

<style lang="postcss" scoped>
.box {
  @apply p-4;

  .float {
    @apply fixed right-0 bottom-9;
  }
}
</style>
