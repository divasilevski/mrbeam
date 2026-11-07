import { useSolution } from '~/composables/useSolution'

vi.mock('@vueuse/integrations/useIDBKeyval', async () => {
  const { ref } = await import('vue')
  const useIDBKeyval = () => {
    return { data: ref([]) }
  }
  return { useIDBKeyval }
})

vi.mock('~/composables/useMainScroll', () => {
  const useMainScroll = () => ({ scrollTo: () => ({}) })
  return { default: useMainScroll }
})

// point + fixed + force: minimal valid system
const validUnits: Unit[] = [
  { id: '1', type: 'point', x: 0 },
  { id: '2', type: 'fixed', x: 1 },
  { id: '3', type: 'force', x: 6, value: -8 },
]

describe('useSolution', () => {
  beforeEach(() => {
    useSolution().resetSolution()
  })

  it('should set hint', () => {
    const { hint, setHint } = useSolution()
    setHint([{ id: '0', x: 0, type: 'fixed' }])

    expect(hint.value).not.toBeNull()
  })

  it('should reset solution', () => {
    const { solution, hint, calculateSolution, resetSolution } = useSolution()

    calculateSolution(validUnits)
    resetSolution()

    expect(solution.value).toBeNull()
    expect(hint.value).toBeNull()
  })

  it('should calculate solution', () => {
    const { solution, calculateSolution } = useSolution()
    calculateSolution(validUnits)

    expect(solution.value).not.toBeNull()
  })

  it('should return error if have one unit', () => {
    const { hint, calculateSolution } = useSolution()
    calculateSolution([{ id: '1', type: 'hinge', x: 0 }])

    expect(hint.value).not.toBeNull()
  })
})
