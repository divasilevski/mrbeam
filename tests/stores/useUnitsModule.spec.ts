import { setActivePinia, createPinia } from 'pinia'

import { useUnitsModule } from '@/stores/modules/useUnitsModule'

describe('useUnitsModule', () => {
  const testUnit: Unit = { id: '1', type: 'point', x: 0 }

  beforeEach(() => {
    setActivePinia(createPinia())

    vi.mock('@vueuse/integrations/useIDBKeyval', () => {
      const useIDBKeyval = () => {
        return { data: ref([]) }
      }
      return { useIDBKeyval }
    })
  })

  test('adds a unit to the units list', () => {
    const store = useUnitsModule()
    store.add(testUnit)

    expect(store.units).toEqual([testUnit])
  })

  test('removes a unit from the units list by id', () => {
    const store = useUnitsModule()
    store.add(testUnit)
    store.removeById('1')

    expect(store.units).toEqual([])
  })

  test('clears the units list', () => {
    const store = useUnitsModule()
    store.add(testUnit)
    store.clear()

    expect(store.units).toEqual([])
  })

  test('generates new units asynchronously and updates the units list', () => {
    const store = useUnitsModule()
    store.generateUnits()

    expect(store.units.length).toBeGreaterThan(0)
  })
})
