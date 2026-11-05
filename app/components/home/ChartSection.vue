<template>
  <section class="section">
    <h2 class="title">{{ props.title }}</h2>
    <div class="canvas">
      <SharedForceAlive>
        <ChartCanvas :points="props.points" />
      </SharedForceAlive>
    </div>
  </section>
</template>

<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  points: {
    type: Array as () => number[][],
    default: () => [],
  },
})
</script>

<style lang="scss" scoped>
.section {
  border-width: 1px;
  border-color: var(--color-background);

  .title {
    padding: 0 1rem;
    margin-bottom: 0.5rem;
    font-weight: 600;
  }

  .canvas {
    border-width: 1px;
    border-style: dashed;
  }
}
</style>
