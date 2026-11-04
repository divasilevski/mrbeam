<template>
  <section class="box">
    <SharedForceAlive>
      <MainBeamCanvas />
    </SharedForceAlive>
    <MainBeamControls />
  </section>
</template>

<style lang="scss" scoped>
.box {
  position: relative;
  border-width: 1px;
  border-style: dashed;
}
</style>
