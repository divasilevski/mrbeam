<template>
  <article>
    <BeamHome data-testid="beam" />
    <InputHome data-testid="inputs" />
    <TableHome data-testid="units" />

    <Teleport to="body" :disabled="isDeactivated">
      <ChartHome data-testid="charts" />
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
