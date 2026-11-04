<template>
  <AppBottomSheet
    ref="bsRef"
    :has-ident="hasSolution"
    :min-height="minHeight"
    :max-height="maxHeight"
  >
    <slot />

    <template #float>
      <button
        type="button"
        class="float-button"
        :style="floatStyle"
        @click="onClick()"
      >
        <span class="sr-only">Calculate</span>

        <AppIcon v-if="!hasSolution" class="equals-icon" name="equals" />
        <AppIcon
          v-else
          :class="{ downward: isDownward }"
          name="arrow"
          size="40"
        />
      </button>
    </template>
  </AppBottomSheet>
</template>

<script lang="ts" setup>
import layout from '~~/constants/layout'

// heights
const { height } = useWindowSize()

const topIdent = layout.canvasHeight + layout.headerHeight + layout.padding
const minHeight = layout.bottomSheetMinHeight
const maxHeight = computed(() => height.value - topIdent)

// logic
const bsRef = ref()
const { solution, hasSolution, isUnitsValid, calculateSolution } = useBeam()

const isDownward = computed(() => bsRef.value?.isChangeToMax)

const floatStyle = computed(() => {
  const translate = isUnitsValid.value ? 0 : minHeight + 48 / 2
  const pointerEvents = isUnitsValid.value ? 'auto' : 'none'
  return `transform: translateY(${translate}px); pointer-events: ${pointerEvents};`
})

const onClick = () => {
  if (hasSolution.value) {
    bsRef.value?.toggleStatus()
  } else {
    calculateSolution()
  }
}

watch(solution, () => {
  const { Status, status, toggleStatus } = bsRef.value

  if (status === Status.MinHeight && hasSolution.value) {
    toggleStatus()
  }
})
</script>

<style lang="postcss" scoped>
.float-button {
  @apply flex items-center justify-center h-12 w-12 rounded-full
    text-background bg-primary shadow-md cursor-pointer hover:bg-primaryDark
    transition-all duration-500;

  .icon {
    @apply transition-transform duration-500;
  }

  .downward {
    @apply -rotate-180;
  }
}
</style>
