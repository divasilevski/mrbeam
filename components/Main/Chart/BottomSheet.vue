<template>
  <AppBottomSheet
    ref="bsRef"
    :has-ident="hasIdent"
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

        <AppIcon v-if="!hasIdent" name="equals" />
        <AppIcon v-else name="arrow" :class="{ downward: isDownward }" />
      </button>
    </template>
  </AppBottomSheet>
</template>

<script lang="ts" setup>
import layout from '~/constants/layout'
import { useSolutionStore } from '~/stores/useSolutionStore'

// heights
const { height } = useWindowSize()

const topIdent = layout.canvasHeight + layout.headerHeight + layout.padding
const minHeight = layout.bottomSheetMinHeight
const maxHeight = computed(() => height.value - topIdent)

// logic
const bsRef = ref()
const store = useSolutionStore()

const hasIdent = computed(() => store.hasSolution)
const isDownward = computed(() => bsRef.value?.isChangeToMax)

const floatStyle = computed(() => {
  const translate = store.isCalculated ? 0 : minHeight + 48 / 2
  const pointerEvents = store.isCalculated ? 'auto' : 'none'
  return `transform: translateY(${translate}px); pointer-events: ${pointerEvents};`
})

const onClick = () => {
  if (store.hasSolution) {
    bsRef.value?.toggleStatus()
  } else {
    store.calculateSolution()
  }
}

watch(toRef(store, 'solution'), () => {
  const { Status, status, toggleStatus } = bsRef.value

  if (status === Status.MinHeight && store.hasSolution) {
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
