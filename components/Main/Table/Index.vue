<template>
  <section>
    <div>
      <AppButton @click="store.clear">Clear</AppButton>
    </div>
    <MainTableItem v-for="unit in store.units" :key="unit.id" :unit="unit" />
  </section>
</template>

<script lang="ts" setup>
import { useUnitsStore } from '~/stores/useUnitsStore'

const store = useUnitsStore()
</script>

<style lang="postcss" scoped>
section {
  @apply border-[1px] border-gray-100 p-4 flex flex-col gap-2;
}
</style>
