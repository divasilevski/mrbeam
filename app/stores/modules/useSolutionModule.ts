import { defineStore } from 'pinia'
import useMainScroll from '~/composables/useMainScroll'

import calculate from '~/utils/fem/calculate'
import checkUnits from '~/utils/fem/checkUnits'

export const useSolutionModule = defineStore('solution-module', () => {
  const { scrollTo } = useMainScroll()

  const hint = ref<string | null>(null)
  const solution = ref<Solution | null>(null)

  const setHint = (units: Unit[]) => {
    hint.value = checkUnits(units)
  }

  const resetSolution = () => {
    solution.value = null
    hint.value = null
  }

  const calculateSolution = (units: Unit[]) => {
    if (units.length > 0) {
      try {
        const data = calculate(units)

        if (data) {
          scrollTo({ top: 0, behavior: 'smooth' })
          solution.value = data
        }
      } catch (error) {
        hint.value = 'Woops!'
      }
    }
  }

  return {
    hint,
    solution,

    setHint,
    resetSolution,
    calculateSolution,
  }
})
