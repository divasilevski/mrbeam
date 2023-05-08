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
  @apply flex flex-col gap-4 px-4 py-8;
}
</style>
