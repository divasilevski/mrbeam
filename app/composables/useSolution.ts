import useMainScroll from '~/composables/useMainScroll'

import calculate from '~/utils/fem/calculate'
import checkUnits from '~/utils/fem/checkUnits'

const { scrollTo } = useMainScroll()

// Singleton pattern for a client
const hint = ref<string | null>(null)
const solution = ref<Solution | null>(null)

export const useSolution = () => {
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
      } catch {
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
}
