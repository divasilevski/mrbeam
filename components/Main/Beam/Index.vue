<template>
  <section class="box">
    <AppButton @click="store.generateAsync">Generate</AppButton>
    <MainBeamCanvas />
  </section>
</template>

<script lang="ts" setup>
import { useUnitsStore } from '~/stores/useUnitsStore'

const store = useUnitsStore()
</script>

<style lang="postcss" scoped>
.box {
  @apply p-4 border-[1px] border-gray-100 bg-canvas;
}
</style>
