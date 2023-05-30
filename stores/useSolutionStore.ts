import { defineStore } from 'pinia'
import { useUnitsStore } from '~/stores/useUnitsStore'
import useMainScroll from '~/composables/useMainScroll'

import calculate from '~/utils/fem/calculate'
import checkUnits from '~/utils/fem/checkUnits'

export const useSolutionStore = defineStore('solution-store', () => {
  const store = useUnitsStore()
  const { scrollTo } = useMainScroll()

  const solution = ref<Solution | null>(null)
  const errorMessage = ref<string | null>(null)

  const isCalculated = computed(() => {
    return !errorMessage.value
  })

  const hasSolution = computed(() => {
    return Boolean(solution.value)
  })

  const resetSolution = () => {
    solution.value = null
    errorMessage.value = null
  }

  const calculateSolution = () => {
    if (store.units.length > 0) {
      try {
        const data = calculate(store.units)

        if (data) {
          scrollTo({ top: 0, behavior: 'smooth' })
          solution.value = data
        }
      } catch (error) {
        errorMessage.value = 'Woops!'
      }
    }
  }

  watchEffect(() => {
    errorMessage.value = checkUnits(store.units || [])
  })

  return {
    solution,
    hasSolution,
    isCalculated,
    errorMessage,

    resetSolution,
    calculateSolution,
  }
})
