<template>
  <div v-if="store.units.length" class="controls right">
    <AppUploadImage @image="predictByImage">
      <AppIconButton name="image"> IMAGE&nbsp;AI </AppIconButton>
    </AppUploadImage>

    <AppIconButton name="dice" @click="store.generateUnits">
      RANDOMIZE
    </AppIconButton>
  </div>

  <div v-else class="controls center">
    <AppUploadImage @image="predictByImage">
      <AppButton> IMAGE&nbsp;AI <AppIcon name="image" /></AppButton>
    </AppUploadImage>

    <AppButton @click="store.generateUnits">
      RANDOMIZE <AppIcon name="dice" />
    </AppButton>
  </div>
</template>

<script lang="ts" setup>
import useImagePredict from '~/composables/useImagePredict'
import { useMainStore } from '~/stores/useMainStore'

const store = useMainStore()
const { predictByImage } = useImagePredict()
</script>

<style lang="postcss" scoped>
.controls {
  @apply absolute inset-0;
}

.center {
  @apply flex items-center justify-center content-center flex-wrap gap-2;
}

.right {
  @apply flex items-start justify-end p-2;
}
</style>
