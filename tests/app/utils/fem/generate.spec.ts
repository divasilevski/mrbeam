import generate, {
  getRandomPattern,
  appendReversal,
  getRandomLoad,
  getRandomStep,
  createUnits,
  Type,
} from '~/utils/fem/generate'

describe('getRandomStep', () => {
  it('should be return number greater then 0', () => {
    const step = getRandomStep()
    expect(typeof step).toBe('number')
    expect(step).greaterThan(0)
  })
})

describe('getRandomPattern', () => {
  const spyRandInt = vi.spyOn(Math, 'random')

  it('should be return easy pattern', () => {
    spyRandInt.mockReturnValue(0.3)
    const pattern = getRandomPattern()
    expect(pattern).not.toContain(Type.Hinge)
  })

  it('should be return hard pattern', () => {
    spyRandInt.mockReturnValue(0.1)
    const pattern = getRandomPattern()
    expect(pattern).toContain(Type.Hinge)
  })
})

describe('appendReversal', () => {
  const spyRandInt = vi.spyOn(Math, 'random')

  it('should be reverse pattern', () => {
    spyRandInt.mockReturnValue(0.1) // 0
    const pattern = [Type.Fixed, Type.Force]
    const finalPattern = appendReversal(pattern)
    expect(finalPattern).toEqual([Type.Force, Type.Fixed])
  })

  it('should be not reverse pattern', () => {
    spyRandInt.mockReturnValue(0.9) // 1
    const pattern = [Type.Fixed, Type.Force]
    const finalPattern = appendReversal(pattern)
    expect(finalPattern).toEqual([Type.Fixed, Type.Force])
  })
})

describe('getRandomLoad', () => {
  it('should be return number', () => {
    const load = getRandomLoad()
    expect(typeof load).toBe('number')
  })
})

describe('createUnits', () => {
  it('should be return array of units', () => {
    const pattern = [Type.Force, Type.Distload, Type.Point, Type.Fixed]
    const step = getRandomStep()
    const units = createUnits(pattern, step)

    expect(units.length > 0).toBe(true)
    expect(units[0].x).not.toBeUndefined()
    expect(units[0].id).not.toBeUndefined()
    expect(units[0].type).not.toBeUndefined()
  })
})

describe('generate', () => {
  it('should be return array of units', () => {
    const units = generate()
    expect(Array.isArray(units)).toBe(true)
    expect(units.length > 0).toBe(true)
  })
})
