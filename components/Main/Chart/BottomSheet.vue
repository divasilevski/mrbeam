<template>
  <AppBottomSheet
    ref="bsRef"
    :has-ident="hasSolution"
    :min-height="42"
    :max-height="maxHeight"
  >
    <slot />

    <template #float>
      <button
        type="button"
        class="float-button"
        :style="floatButtonStyle"
        @click="clickFloatButton()"
      >
        <span class="sr-only">Calculate</span>

        <AppLoader v-if="store.loading" />
        <AppIcon v-else-if="!hasSolution" name="equals" />
        <AppIcon v-else name="arrow" :class="{ revert: isMaxHeight }" />
      </button>
    </template>
  </AppBottomSheet>
</template>

<script lang="ts" setup>
import { useUnitsStore } from '~/stores/useUnitsStore'

const bsRef = ref()

const store = useUnitsStore()
const { height } = useWindowSize()

const maxHeight = computed(() => height.value - 215)

const hasSolution = computed(() => store.hasSolution)

const isMaxHeight = computed(() => bsRef.value?.isChangeToMax)

const floatButtonStyle = computed(() => {
  return `transform: translateY(${store.isCalculated ? 0 : 100}px)`
})

const calculate = async () => {
  await store.calculateAsync()
}

const clickFloatButton = () => {
  store.hasSolution ? bsRef.value.toggleStatus() : calculate()
}
</script>

<style lang="postcss" scoped>
.float-button {
  @apply flex items-center justify-center h-12 w-12 rounded-full text-white bg-blue-500 shadow-md cursor-pointer;
  @apply transition-transform duration-500;

  .icon {
    @apply transition-transform duration-500;
  }

  .revert {
    @apply -rotate-180;
  }
}
</style>
