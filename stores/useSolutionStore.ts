import { defineStore } from 'pinia'
import { useUnitsStore } from '~/stores/useUnitsStore'

import { handleErrors } from '~/utils/fem/core/error'
import calculate from '~/utils/fem/calculate'

export const useSolutionStore = defineStore('solution-store', () => {
  const store = useUnitsStore()
  const { scrollTo } = useMainScroll()

  const solution = ref<Solution | null>(null)
  const solutionError = ref<string | null>(null)

  const isCalculated = computed(() => {
    return !solutionError.value
  })

  const hasSolution = computed(() => {
    return Boolean(solution.value)
  })

  const resetSolution = () => {
    solution.value = null
    solutionError.value = null
  }

  const calculateAsync = () => {
    if (store.units.length > 0) {
      try {
        const data = calculate(store.units)

        if (data) {
          scrollTo({ top: 0, behavior: 'smooth' })
          solution.value = data
        }
      } catch (error) {
        solutionError.value = 'Can`t calculate'
      }
    }
  }

  watchEffect(() => {
    try {
      handleErrors(store.units)
      solutionError.value = null
    } catch (error) {
      solutionError.value = (error as Error).message
    }
  })

  return {
    solution,
    hasSolution,
    isCalculated,
    solutionError,

    resetSolution,
    calculateAsync,
  }
})
