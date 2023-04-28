<template>
  <section class="box">
    <AppButton @click="store.generateAsync">Generate</AppButton>
  </section>
</template>

<script lang="ts" setup>
import { useUnitsStore } from '~/stores/useUnitsStore'

const store = useUnitsStore()
</script>

<style lang="postcss" scoped>
.box {
  @apply border-[1px] border-gray-100 p-4;
}
</style>
