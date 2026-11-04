import { useBeam } from '~/composables/useBeam'

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

// point + fixed + force: минимальная корректная система
const validUnits: Unit[] = [
  { id: '1', type: 'point', x: 0 },
  { id: '2', type: 'fixed', x: 1 },
  { id: '3', type: 'force', x: 6, value: -8 },
]

describe('useBeam', () => {
  beforeEach(() => {
    useBeam().clearUnits()
  })

  it('adds a unit and resets the solution', () => {
    const { units, solution, addUnit, calculateSolution } = useBeam()
    validUnits.forEach((unit) => addUnit(unit))
    calculateSolution()
    addUnit({ id: '4', type: 'moment', x: 3, value: 5 })

    expect(units.value).toHaveLength(4)
    expect(solution.value).toBeNull()
  })

  it('removes a unit by id', () => {
    const { units, addUnit, removeUnit } = useBeam()
    addUnit(validUnits[0])
    removeUnit('1')

    expect(units.value).toEqual([])
  })

  it('clears all units', () => {
    const { units, addUnit, clearUnits } = useBeam()
    addUnit(validUnits[0])
    clearUnits()

    expect(units.value).toEqual([])
  })

  it('generates units', () => {
    const { units, generateUnits } = useBeam()
    generateUnits()

    expect(units.value.length).toBeGreaterThan(0)
  })

  it('calculates the solution for a valid system', () => {
    const { solution, hasSolution, addUnit, calculateSolution } = useBeam()
    validUnits.forEach((unit) => addUnit(unit))
    calculateSolution()

    expect(solution.value).not.toBeNull()
    expect(hasSolution.value).toBe(true)
  })

  it('sets hint when calculation fails', () => {
    const { hint, addUnit, calculateSolution } = useBeam()
    addUnit({ id: 'h', type: 'hinge', x: 0 })
    calculateSolution()

    expect(hint.value).toBe('Woops!')
  })

  it('syncs hint with units', async () => {
    const { hint, isUnitsValid, addUnit } = useBeam()
    addUnit(validUnits[0])
    await nextTick()

    expect(hint.value).not.toBeNull()
    expect(isUnitsValid.value).toBe(false)
  })

  it('marks a valid system as valid', async () => {
    const { hint, isUnitsValid, addUnit } = useBeam()
    validUnits.forEach((unit) => addUnit(unit))
    await nextTick()

    expect(hint.value).toBeNull()
    expect(isUnitsValid.value).toBe(true)
  })
})
