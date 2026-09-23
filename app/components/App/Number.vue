<template>
  <span class="number">
    <span
      v-if="hasTooltip"
      ref="valueRef"
      class="values"
      @mouseenter="onMouseenter"
      @mouseleave="onMouseleave"
      @touchend="onTouchend"
    >
      <span v-text="formatedValues" />
      <sup>★</sup>
    </span>
    <span v-else v-text="formatedValues" />
    <div v-if="isShown" class="tooltip" v-html="tooltipValues" />
  </span>
</template>

<script lang="ts" setup>
type Value = number | number[]

const props = defineProps<{ value: Value }>()

const isNumber = (value: Value): value is number => {
  return !Array.isArray(value)
}

const formatedValues = computed(() => {
  if (isNumber(props.value)) {
    return formatNumber(props.value)
  } else {
    return props.value.map(formatNumber).join(' ... ')
  }
})

const tooltipValues = computed(() => {
  if (isNumber(props.value)) {
    return props.value
  } else {
    return props.value.map((value) => `<div>${value}</div>`).join('')
  }
})

const unformatedValues = computed(() => {
  if (isNumber(props.value)) {
    return props.value.toString()
  } else {
    return props.value.join(' ... ')
  }
})

const hasTooltip = computed(() => {
  return formatedValues.value !== unformatedValues.value
})

// tooltip
const valueRef = ref()
const isShown = ref(false)

const onMouseenter = () => {
  isShown.value = true
}

const onMouseleave = () => {
  isShown.value = false
}

const onTouchend = () => {
  isShown.value = !isShown.value
}

onClickOutside(valueRef, () => {
  isShown.value = false
})
</script>

<style lang="postcss" scoped>
.number {
  @apply relative;

  .values {
    @apply relative cursor-pointer;
  }

  .tooltip {
    @apply absolute top-0 -left-2 -translate-y-full px-2 py-1 text-sm bg-background border;
  }
}
</style>
