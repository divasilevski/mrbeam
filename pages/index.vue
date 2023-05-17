<template>
  <article>
    <MainBeam />
    <MainInput />
    <MainTable />
    <MainChart />
  </article>
</template>

<script lang="ts" setup>
useHead({
  title: 'MrBeam',
})
</script>

<style lang="postcss" scope>
article {
  @apply flex flex-col gap-4;
}
</style>
