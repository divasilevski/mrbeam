<template>
  <div v-if="store.units.length" class="controls right">
    <AppIconButton name="dice" @click="store.generateUnits">
      RANDOMIZE
    </AppIconButton>
  </div>

  <div v-else class="controls center">
    <AppButton @click="store.generateUnits">
      RANDOMIZE
      <AppIcon name="dice" />
    </AppButton>
  </div>
</template>

<script lang="ts" setup>
import { useMainStore } from '~/stores/useMainStore'

const store = useMainStore()
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
