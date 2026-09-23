<template>
  <article>
    <MainBeam />
    <MainInput />
    <MainTable />

    <Teleport to="body" :disabled="isDeactivated">
      <MainChart />
    </Teleport>
  </article>
</template>

<script lang="ts" setup>
const { isDeactivated } = useKeepAlive()
</script>

<style lang="postcss" scoped>
article {
  @apply flex flex-col gap-4;
}
</style>
