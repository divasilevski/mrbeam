<template>
  <div class="header">
    <div>
      <AppIconHint v-if="hint" name="warning" data-testid="error-indicator">
        {{ hint }}
      </AppIconHint>
    </div>
    <div />
    <div />
    <div>
      <AppIconButton name="bin" @click="onRemove">Remove all</AppIconButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { hint, clearUnits } = useBeam()

const onRemove = () => {
  clearUnits()
}
</script>

<style lang="scss" scoped>
.header {
  display: grid;
  grid-template-columns: 50px 1fr 1fr auto;
  gap: 1rem;
  width: 100%;
  padding: 0 0.75rem;

  @media (min-width: 640px) {
    grid-template-columns: 100px 1fr 1fr auto;
  }

  div {
    display: flex;
    align-items: center;
  }
}
</style>
