<template>
  <article>
    <MainChartBottomSheet>
      <div class="charts">
        <MainChartSection
          v-if="shearPoints.length > 1"
          :points="shearPoints"
          title="Shear Force Diagram"
        />
        <MainChartSection
          v-if="momentPoints.length > 1"
          :points="momentPoints"
          title="Bending Moment Diagram"
        />
      </div>
    </MainChartBottomSheet>
  </article>
</template>

<script lang="ts" setup>
import { useSolutionStore } from '~/stores/useSolutionStore'

const store = useSolutionStore()

const shearPoints = computed(() => {
  if (store.solution?.labels) {
    return store.solution.labels.map((x, index) => {
      const y = store.solution?.shear[index]
      return [Number(x), Number(y)]
    })
  }
  return []
})

const momentPoints = computed(() => {
  if (store.solution?.labels) {
    return store.solution.labels.map((x, index) => {
      const y = store.solution?.moment[index]
      return [Number(x), Number(y)]
    })
  }
  return []
})
</script>

<style lang="postcss" scoped>
.charts {
  @apply flex flex-col gap-4 pb-4;
}
</style>
