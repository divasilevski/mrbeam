import { setActivePinia, createPinia } from 'pinia'
import { useSolutionStore } from '~/stores/useSolutionStore'
import { useUnitsStore } from '~/stores/useUnitsStore'

describe('useSolutionStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())

    vi.mock('@vueuse/integrations/useIDBKeyval', () => {
      const useIDBKeyval = () => {
        return { data: ref([]) }
      }
      return { useIDBKeyval }
    })

    vi.mock('~/composables/useMainScroll', () => {
      const useMainScroll = () => ({ scrollTo: () => ({}) })
      return { default: useMainScroll }
    })
  })

  it('should reset solution', () => {
    const unitsStore = useUnitsStore()
    unitsStore.generateUnits()

    const store = useSolutionStore()

    expect(store.hasSolution).toBeTruthy()

    store.resetSolution()

    expect(store.hasSolution).toBeFalsy()
    expect(store.solution).toBeNull()
  })

  it('should calculate solution', () => {
    const store = useSolutionStore()

    store.calculateSolution()

    expect(store.isCalculated).toBeFalsy()

    const unitsStore = useUnitsStore()
    unitsStore.generateUnits()
    store.resetSolution()

    store.calculateSolution()

    expect(store.isCalculated).toBeTruthy()
    expect(store.hasSolution).toBeTruthy()
  })

  it('should return false for hasSolution if solution was reset', () => {
    const unitsStore = useUnitsStore()
    const store = useSolutionStore()

    unitsStore.generateUnits()

    expect(store.hasSolution).toBeTruthy()

    store.resetSolution()

    expect(store.hasSolution).toBeFalsy()
  })

  it('should return isCalculated false if have one unit', () => {
    const unitsStore = useUnitsStore()
    const store = useSolutionStore()

    unitsStore.add({ id: '1', type: 'hinge', x: 0 })

    store.calculateSolution()
    expect(store.isCalculated).toBeFalsy()
  })
})
