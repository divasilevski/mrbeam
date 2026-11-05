<template>
  <article>
    <BeamHome />
    <InputHome />
    <TableHome />

    <Teleport to="body" :disabled="isDeactivated">
      <ChartHome />
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
