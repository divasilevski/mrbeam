import { useUnits } from '~/composables/useUnits'

vi.mock('@vueuse/integrations/useIDBKeyval', async () => {
  const { ref } = await import('vue')
  const useIDBKeyval = () => {
    return { data: ref([]) }
  }
  return { useIDBKeyval }
})

describe('useUnits', () => {
  const testUnit: Unit = { id: '1', type: 'point', x: 0 }

  beforeEach(() => {
    useUnits().clear()
  })

  test('adds a unit to the units list', () => {
    const { units, add } = useUnits()
    add(testUnit)

    expect(units.value).toEqual([testUnit])
  })

  test('removes a unit from the units list by id', () => {
    const { units, add, removeById } = useUnits()
    add(testUnit)
    removeById('1')

    expect(units.value).toEqual([])
  })

  test('clears the units list', () => {
    const { units, add, clear } = useUnits()
    add(testUnit)
    clear()

    expect(units.value).toEqual([])
  })

  test('generates new units and updates the units list', () => {
    const { units, generateUnits } = useUnits()
    generateUnits()

    expect(units.value.length).toBeGreaterThan(0)
  })
})
