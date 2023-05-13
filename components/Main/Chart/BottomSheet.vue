<template>
  <AppBottomSheet :ident="hasSolution" :min-height="42" :max-height="maxHeight">
    <slot />

    <template #float="{ toggleHeight, isMaxHeight }">
      <button
        type="button"
        class="float-button"
        :style="floatButtonStyle"
        @click="clickFloatButton(toggleHeight)"
      >
        <span class="sr-only">Calculate</span>

        <AppLoader v-if="loading" />
        <AppIcon v-else-if="!hasSolution" name="equals" />
        <AppIcon v-else name="arrow" :class="{ revert: isMaxHeight }" />
      </button>
    </template>
  </AppBottomSheet>
</template>

<script lang="ts" setup>
import { useUnitsStore } from '~/stores/useUnitsStore'

const { scrollTo } = useMainScroll()

const store = useUnitsStore()
const { height } = useWindowSize()

const maxHeight = computed(() => height.value - 215)

const hasSolution = computed(() => store.hasSolution)

const floatButtonStyle = computed(() => {
  return `transform: translateY(${store.isCalculated ? 0 : 100}px)`
})

const loading = ref(false)

const calculate = async () => {
  loading.value = true

  scrollTo({ top: 0, behavior: 'smooth' })

  await store.calculateAsync()
  loading.value = false
}

const clickFloatButton = (toggle: () => void) => {
  store.hasSolution ? toggle() : calculate()
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
