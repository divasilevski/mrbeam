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
const { solution } = useBeam()

const shearPoints = computed(() => {
  const data = solution.value

  if (data) {
    return data.labels.map((x, index) => {
      const y = data.shear[index]
      return [Number(x), Number(y)]
    })
  }
  return []
})

const momentPoints = computed(() => {
  const data = solution.value

  if (data) {
    return data.labels.map((x, index) => {
      const y = data.moment[index]
      return [Number(x), Number(y)]
    })
  }
  return []
})
</script>

<style lang="scss" scoped>
.charts {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-bottom: 1rem;
}
</style>
