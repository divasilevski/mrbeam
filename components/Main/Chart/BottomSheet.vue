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
        :style="`transform: translateY(${translate}px)`"
        @click="onClick()"
      >
        <span class="sr-only">Calculate</span>

        <AppLoader v-if="store.loading" />
        <AppIcon v-else-if="!hasIdent" name="equals" />
        <AppIcon v-else name="arrow" :class="{ downward: isDownward }" />
      </button>
    </template>
  </AppBottomSheet>
</template>

<script lang="ts" setup>
import constants from '~/constants'
import { useSolutionStore } from '~/stores/useSolutionStore'

// heights
const { height } = useWindowSize()

const topIdent = constants.canvasSize + constants.header + constants.padding * 3
const minHeight = constants.bottomSheetMinHeight
const maxHeight = computed(() => height.value - topIdent)

// logic
const bsRef = ref()
const store = useSolutionStore()

const hasIdent = computed(() => store.hasSolution)
const isDownward = computed(() => bsRef.value?.isChangeToMax)
const translate = computed(() => (store.isCalculated ? 0 : minHeight + 48 / 2))

const onClick = () => {
  if (store.hasSolution) {
    bsRef.value?.toggleStatus()
  } else {
    store.calculateAsync()
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
  @apply flex items-center justify-center h-12 w-12 rounded-full text-bg bg-accent shadow-md cursor-pointer hover:bg-accent-dark transition-colors;
  @apply transition-transform duration-500;

  .icon {
    @apply transition-transform duration-500;
  }

  .downward {
    @apply -rotate-180;
  }
}
</style>
