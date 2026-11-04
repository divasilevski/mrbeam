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

<style lang="scss" scoped>
article {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
