<template>
  <div v-if="store.units.length" class="controls right">
    <AppIconButton name="dice" size="20" @click="store.generateUnits">
      RANDOMIZE
    </AppIconButton>
  </div>

  <div v-else class="controls center">
    <AppButton @click="store.generateUnits">
      RANDOMIZE
      <AppIcon class="dice-icon" name="dice" size="20" />
    </AppButton>
  </div>
</template>

<script lang="ts" setup>
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
