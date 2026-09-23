<template>
  <section class="box">
    <SharedForceAlive>
      <MainBeamCanvas />
    </SharedForceAlive>
    <MainBeamControls />
  </section>
</template>

<style lang="postcss" scoped>
.box {
  @apply relative border border-dashed;
}
</style>
