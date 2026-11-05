import { useIDBKeyval } from '@vueuse/integrations/useIDBKeyval'

import generate from '~/utils/fem/generate'

// Singleton pattern for a client
const { data: units } = useIDBKeyval<Unit[]>('units-store', [])

export const useUnits = () => {
  const add = (unit: Unit) => {
    units.value = [...toRaw(units.value), unit]
  }

  const clear = () => {
    units.value = []
  }

  const removeById = (id: string) => {
    units.value = toRaw(units.value).filter((unit: Unit) => unit.id !== id)
  }

  const generateUnits = () => {
    const data = generate()

    if (data) {
      units.value = data
      return data
    }
  }

  return {
    units,

    add,
    clear,
    removeById,
    generateUnits,
  }
}
