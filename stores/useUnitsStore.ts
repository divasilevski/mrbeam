import { defineStore } from 'pinia'
import { useSolutionStore } from '~/stores/useSolutionStore'

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

  const generateAsync = async () => {
    const { data } = await useFetch('/api/generate')

    if (data.value) {
      units.value = JSON.parse(data.value)
      await store.calculateAsync()
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
