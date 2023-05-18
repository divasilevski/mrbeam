import { defineStore } from 'pinia'
import { useSolutionStore } from '~/stores/useSolutionStore'
import generateSimple from '~/utils/fem/generateSimple'

export const useUnitsStore = defineStore('units-store', () => {
  const store = useSolutionStore()

  const units = ref<Unit[]>([])

  const add = (unit: Unit) => {
    units.value = [...units.value, unit]
    store.resetSolution()
  }

  const clear = () => {
    units.value = []
    store.resetSolution()
  }

  const removeById = (id: string) => {
    units.value = units.value.filter((unit: Unit) => unit.id !== id)
    store.resetSolution()
  }

  const generateAsync = () => {
    const data = generateSimple()

    if (data) {
      units.value = data
      store.calculateAsync()
    }
  }

  return {
    units,

    add,
    clear,
    removeById,
    generateAsync,
  }
})
