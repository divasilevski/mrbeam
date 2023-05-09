<template>
  <section class="section">
    <h2 class="title">{{ props.title }}</h2>
    <div class="canvas">
      <MainChartCanvas :points="props.points" />
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

<style lang="postcss" scoped>
.section {
  @apply border-[1px] border-white;

  .title {
    @apply px-6 mb-2 text-lg font-bold;
  }

  .canvas {
    @apply px-2 py-6 border-[1px] border-dashed;
  }
}
</style>
