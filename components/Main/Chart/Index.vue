<template>
  <article>
    <MainChartBottomSheet>
      <div class="charts">
        <MainChartSection
          v-if="shearPoints.length > 1"
          :points="shearPoints"
          title="Forces"
        />
        <MainChartSection
          v-if="momentPoints.length > 1"
          :points="momentPoints"
          title="Moments"
        />
      </div>
    </MainChartBottomSheet>

    <div v-if="store.solutionError">{{ store.solutionError }}</div>
  </article>
</template>

<script lang="ts" setup>
import { useSolutionStore } from '~/stores/useSolutionStore'

const store = useSolutionStore()

const shearPoints = computed(() => {
  if (Array.isArray(store.solution?.labels)) {
    return (
      store.solution?.labels.map((x, index) => {
        const y = Number(store.solution?.shear[index]) as number
        return [Number(Number(x).toPrecision(3)), Number(y.toPrecision(3))]
      }) || []
    )
  }
  return []
})

const momentPoints = computed(() => {
  if (Array.isArray(store.solution?.labels)) {
    return (
      store.solution?.labels.map((x, index) => {
        const y = Number(store.solution?.moment[index]) as number
        return [Number(Number(x).toPrecision(3)), Number(y.toPrecision(3))]
      }) || []
    )
  }
  return []
})
</script>

<style lang="postcss" scoped>
.charts {
  @apply flex flex-col gap-4 pb-4;
}
</style>
