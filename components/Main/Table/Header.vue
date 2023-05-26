<template>
  <div class="header">
    <div>
      <AppIconHint v-if="error" name="warning">{{ error }}</AppIconHint>
    </div>
    <div />
    <div />
    <div>
      <AppIconButton name="bin" @click="onRemove">Remove all</AppIconButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useUnitsStore } from '~/stores/useUnitsStore'
import { useSolutionStore } from '~/stores/useSolutionStore'

const unitsStore = useUnitsStore()
const solutionStore = useSolutionStore()

const error = computed(() => solutionStore.errorMessage)

const onRemove = () => {
  unitsStore.clear()
}
</script>

<style lang="postcss" scoped>
.header {
  @apply grid grid-cols-[50px,1fr,1fr,auto] sm:grid-cols-[100px,1fr,1fr,auto]
    gap-4 w-full px-3;

  div {
    @apply flex items-center;
  }
}
</style>
