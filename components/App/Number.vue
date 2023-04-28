<template>
  <span :data-value="props.value">{{ formatValue }}</span>
</template>

<script lang="ts" setup>
const props = defineProps({
  value: {
    type: Number,
    default: 0,
  },
})

const formatter = Intl.NumberFormat('en', {
  notation: 'compact',
})

const formatValue = computed(() => {
  if (Math.abs(props.value) < 0.001) {
    return Number(props.value)
      .toExponential(1)
      .replace(/\.0/, '')
      .replace(/e\+0/, '')
  }
  return formatter.format(props.value)
})
</script>

<style lang="postcss" scoped>
span {
  @apply relative cursor-pointer;
}

span:hover::before {
  display: block;
}

span::before {
  display: none;
  content: attr(data-value);

  @apply absolute bottom-2 p-1 bg-white rounded shadow-sm;
}
</style>
