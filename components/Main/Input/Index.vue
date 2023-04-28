<template>
  <section>
    <MainInputTabs v-model="tab" />
    <MainInputForm :tab="tab" />
  </section>
</template>

<script lang="ts" setup>
const tab = ref('force')
</script>

<style lang="postcss" scoped>
section {
  @apply border-[1px] border-gray-100 p-4 flex flex-col gap-4;
}
</style>
