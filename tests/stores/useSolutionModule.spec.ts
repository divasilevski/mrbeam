import { setActivePinia, createPinia } from 'pinia'

import { useUnitsModule } from '~/stores/modules/useUnitsModule'
import { useSolutionModule } from '~/stores/modules/useSolutionModule'

describe('useSolutionModule', () => {
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

  it('should set hint', () => {
    const store = useSolutionModule()
    store.setHint([{ id: '0', x: 0, type: 'fixed' }])

    expect(store.hint).not.toBeNull()
  })

  it('should reset solution', () => {
    const unitsStore = useUnitsModule()
    unitsStore.generateUnits()

    const store = useSolutionModule()
    store.resetSolution()

    expect(store.solution).toBeNull()
  })

  it('should calculate solution', () => {
    const store = useSolutionModule()
    const unitsStore = useUnitsModule()

    unitsStore.generateUnits()
    store.calculateSolution(unitsStore.units)

    expect(store.solution).not.toBeNull()
  })

  it('should return error if have one unit', () => {
    const store = useSolutionModule()

    store.calculateSolution([{ id: '1', type: 'hinge', x: 0 }])
    expect(store.hint).not.toBeNull()
  })
})
