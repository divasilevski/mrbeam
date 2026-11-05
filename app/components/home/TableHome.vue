<template>
  <section>
    <TableHeader v-if="sorted.length" />
    <TableItem v-for="unit in sorted" :key="unit.id" :unit="unit" />
  </section>
</template>

<script lang="ts" setup>
type NumberUnit = Unit & { x: number }

const { units } = useBeam()

const sorted = computed(() => {
  const byArray = (unit: Unit) => Array.isArray(unit.x)
  const byNumber = (unit: Unit) => !Array.isArray(unit.x)

  const arrayUnits = units.value.filter(byArray)
  const numberUnits = units.value.filter(byNumber) as NumberUnit[]
  const sortedUnits = numberUnits.sort((a, b) => a.x - b.x)

  return [...sortedUnits, ...arrayUnits]
})
</script>

<style lang="scss" scoped>
section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
