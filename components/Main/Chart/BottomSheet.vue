<template>
  <AppBottomSheet :ident="ident" :min-height="60" :max-height="maxHeight">
    <slot />

    <template #float="{ toggleHeight, isMaxHeight }">
      <AppButton
        :style="{
          transform: `translateY(${!store.units.length ? 100 : 0}px)`,
          transition: `transform 0.5s`,
        }"
        @click="click(toggleHeight)"
      >
        <span v-if="!store.solution">culc</span>
        <span v-else-if="isMaxHeight">down</span>
        <span v-else>up</span>
      </AppButton>
    </template>
  </AppBottomSheet>
</template>

<script lang="ts" setup>
import { useUnitsStore } from '~/stores/useUnitsStore'

const { height } = useWindowSize()
const maxHeight = computed(() => height.value - 230)

const store = useUnitsStore()

const ident = computed(() => {
  return !!store.solution
})

const loading = ref(false)

const calculate = async () => {
  loading.value = true
  await store.calculateAsync()
  loading.value = false
}

const click = (toggle: () => void) => {
  if (!store.solution) {
    calculate()
  } else {
    toggle()
  }
}
</script>
