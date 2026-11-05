<template>
  <section class="box">
    <SharedForceAlive>
      <BeamCanvas />
    </SharedForceAlive>
    <BeamControls />
  </section>
</template>

<style lang="scss" scoped>
.box {
  position: relative;
  border-width: 1px;
  border-style: dashed;
}
</style>
