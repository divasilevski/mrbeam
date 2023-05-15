<template>
  <section>
    <MainTableHeader v-if="sorted.length" />
    <MainTableItem v-for="unit in sorted" :key="unit.id" :unit="unit" />
  </section>
</template>

<script lang="ts" setup>
import { useUnitsStore } from '~/stores/useUnitsStore'

type NumberUnit = Unit & { x: number }

const store = useUnitsStore()

const sorted = computed(() => {
  const byArray = (unit: Unit) => Array.isArray(unit.x)
  const byNumber = (unit: Unit) => !Array.isArray(unit.x)

  const arrayUnits = store.units.filter(byArray)
  const numberUnits = store.units.filter(byNumber) as NumberUnit[]
  const sortedUnits = numberUnits.sort((a, b) => a.x - b.x)

  return [...sortedUnits, ...arrayUnits]
})
</script>

<style lang="postcss" scoped>
section {
  @apply flex flex-col gap-2;
}
</style>
