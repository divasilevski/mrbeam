<template>
  <div class="header">
    <div />
    <div />
    <div />
    <div>
      <AppIconButton name="bin" @click="onRemove">Remove all</AppIconButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useUnitsStore } from '~/stores/useUnitsStore'

const store = useUnitsStore()

const onRemove = () => {
  store.clear()
}
</script>

<style lang="postcss" scoped>
.header {
  @apply grid grid-cols-[60px,1fr,1fr,auto] gap-4 w-full px-3;
}
</style>
