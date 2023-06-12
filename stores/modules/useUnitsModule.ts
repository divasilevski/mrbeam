import { defineStore } from 'pinia'
import { useIDBKeyval } from '@vueuse/integrations/useIDBKeyval'

import generate from '~/utils/fem/generate'

export const useUnitsModule = defineStore('units-module', () => {
  const { data: units } = useIDBKeyval<Unit[]>('units-store', [])

  const add = (unit: Unit) => {
    units.value = [...units.value, unit]
  }

  const clear = () => {
    units.value = []
  }

  const removeById = (id: string) => {
    units.value = units.value.filter((unit: Unit) => unit.id !== id)
  }

  const generateUnits = () => {
    const data = generate()

    if (data) {
      units.value = data
      return data
    }

    return null
  }

  return {
    units,

    add,
    clear,
    removeById,
    generateUnits,
  }
})
