<template>
  <section class="box">
    <canvas v-if="store.solution" ref="chart" />
    <AppButton v-else @click="store.calculateAsync">Calculate</AppButton>
  </section>
</template>

<script lang="ts" setup>
import { Chart } from 'chart.js/auto'
import { useUnitsStore } from '~/stores/useUnitsStore'

const store = useUnitsStore()
const chart = ref()

watchEffect(() => {
  if (store.solution && chart.value) {
    const charts = new Chart(chart.value, {
      type: 'line',
      data: {
        labels: store.solution.labels.map((value: number) => value.toFixed(2)),
        datasets: [
          {
            label: 'Shear',
            data: store.solution.shear,
            tension: 0.1,
          },
          {
            label: 'Moment',
            data: store.solution.moment,
            tension: 0.1,
          },
        ],
      },
    })
    charts.render()
  }
})
</script>

<style lang="postcss" scoped>
.box {
  @apply border-[1px] border-gray-100 p-4;
}
</style>
