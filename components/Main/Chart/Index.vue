<template>
  <section class="box">
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
    <AppButton v-if="!store.solution" @click="store.calculateAsync">
      Calculate
    </AppButton>
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
  @apply border-[1px] border-gray-100 p-4;
}
</style>
