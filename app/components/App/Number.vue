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

<style lang="scss" scoped>
.number {
  position: relative;

  .values {
    position: relative;
    cursor: pointer;
  }

  .tooltip {
    position: absolute;
    top: 0;
    left: -0.5rem;
    padding: 0.25rem 0.5rem;
    border-width: 1px;
    font-size: 0.875rem;
    line-height: 1.25rem;
    background: var(--color-background);
    transform: translateY(-100%);
  }
}
</style>
