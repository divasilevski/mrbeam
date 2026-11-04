import { useSolution } from '~/composables/useSolution'
import { useUnits } from '~/composables/useUnits'

const unitsModule = useUnits()
const solutionModule = useSolution()

// Singleton pattern for a client
const hasSolution = computed(() => !!solutionModule.solution.value)
const isUnitsValid = computed(() => !solutionModule.hint.value)

watchEffect(() => solutionModule.setHint(unitsModule.units.value))

export const useBeam = () => {
  const addUnit = (unit: Unit) => {
    unitsModule.add(unit)
    solutionModule.resetSolution()
  }

  const clearUnits = () => {
    unitsModule.clear()
    solutionModule.resetSolution()
  }

  const removeUnit = (id: string) => {
    unitsModule.removeById(id)
    solutionModule.resetSolution()
  }

  const generateUnits = () => {
    const data = unitsModule.generateUnits()

    if (data) {
      solutionModule.calculateSolution(data)
    }
  }

  const calculateSolution = () => {
    solutionModule.calculateSolution(unitsModule.units.value)
  }

  return {
    // readonly
    units: computed(() => unitsModule.units.value),
    solution: computed(() => solutionModule.solution.value),
    hint: computed(() => solutionModule.hint.value),
    hasSolution,
    isUnitsValid,

    addUnit,
    clearUnits,
    removeUnit,
    generateUnits,
    calculateSolution,
  }
}
