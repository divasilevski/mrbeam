<template>
  <div v-if="units.length" class="controls right">
    <AppIconButton name="dice" size="20" @click="generateUnits">
      RANDOMIZE
    </AppIconButton>
  </div>

  <div v-else class="controls center">
    <AppButton @click="generateUnits">
      RANDOMIZE
      <AppIcon class="dice-icon" name="dice" size="20" />
    </AppButton>
  </div>
</template>

<script lang="ts" setup>
const { units, generateUnits } = useBeam()
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
