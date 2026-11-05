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

<style lang="scss" scoped>
.controls {
  position: absolute;
  inset: 0;
}

.center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.right {
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  padding: 0.5rem;
}
</style>
