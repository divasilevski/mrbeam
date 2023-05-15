<template>
  <div v-if="store.units.length" class="controls right">
    <AppIconButton name="dice" @click="store.generateAsync">
      Randomize
    </AppIconButton>
  </div>

  <div v-else class="controls center">
    <AppButton @click="store.generateAsync">
      <AppIcon name="dice" />
      Randomize
    </AppButton>
  </div>
</template>

<script lang="ts" setup>
import { useUnitsStore } from '~/stores/useUnitsStore'

const store = useUnitsStore()
</script>

<style lang="postcss" scoped>
.controls {
  @apply absolute inset-0;
}

.center {
  @apply flex items-center justify-center;
}

.right {
  @apply flex items-start justify-end p-2;
}
</style>
