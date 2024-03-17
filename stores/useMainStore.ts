import { defineStore } from 'pinia'

import { useUnitsModule } from './modules/useUnitsModule'
import { useSolutionModule } from './modules/useSolutionModule'

export const useMainStore = defineStore('main-store', () => {
  const unitsModule = useUnitsModule()
  const solutionModule = useSolutionModule()

  const addUnit = (unit: Unit) => {
    unitsModule.add(unit)
    solutionModule.resetSolution()
  }

  const setUnits = (units: Unit[]) => {
    unitsModule.set(units)
    solutionModule.resetSolution()

    nextTick(() => {
      if (!solutionModule.hint) {
        solutionModule.calculateSolution(units)
      }
    })
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
    const units = unitsModule.generateUnits()

    if (units) {
      solutionModule.calculateSolution(units)
    }
  }

  const calculateSolution = () => {
    solutionModule.calculateSolution(unitsModule.units)
  }

  watchEffect(() => {
    solutionModule.setHint(unitsModule.units)
  })

  return {
    units: computed(() => unitsModule.units),
    solution: computed(() => solutionModule.solution),
    solutionHint: computed(() => solutionModule.hint),
    hasSolution: computed(() => !!solutionModule.solution),
    hasHint: computed(() => !solutionModule.hint),

    addUnit,
    setUnits,
    clearUnits,
    removeUnit,
    generateUnits,
    calculateSolution,
  }
})
