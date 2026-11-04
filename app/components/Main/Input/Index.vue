<template>
  <section>
    <MainInputTabs v-model="tab" />
    <MainInputForm :tab="tab" />
  </section>
</template>

<script lang="ts" setup>
const tab = ref('force')
</script>

<style lang="scss" scoped>
section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem 1rem;
}
</style>
