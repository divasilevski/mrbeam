<template>
  <section>
    <div v-if="store.units.length" class="tools">
      <AppIconButton name="bin" @click="store.clear" />
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
  @apply flex flex-col gap-2;

  .tools {
    @apply flex justify-end;
  }
}
</style>
