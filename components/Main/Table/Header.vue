<template>
  <div class="header">
    <div>
      <AppIconHint v-if="hint" name="warning">{{ hint }}</AppIconHint>
    </div>
    <div />
    <div />
    <div>
      <AppIconButton name="bin" @click="onRemove">Remove all</AppIconButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useMainStore } from '~/stores/useMainStore'

const store = useMainStore()

const hint = computed(() => store.solutionHint)

const onRemove = () => {
  store.clearUnits()
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
