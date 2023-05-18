import generate, {
  randForce,
  randMaterial,
  initSettings,
  createUnits,
  addFixed,
  addHinge,
  addSimple,
  addSupport,
  addMaterial,
  addDistload,
  addAdvancedMaterial,
  addAdvancedDistload,
  finish,
} from '~/utils/fem/generate'

describe('generate: randForce', () => {
  it('should be a multiple of 10 between 50-100', () => {
    expect(Math.abs(randForce()) % 10).toBe(0)
    expect(Math.abs(randForce())).toBeGreaterThanOrEqual(50)
    expect(Math.abs(randForce())).toBeLessThanOrEqual(100)
  })
})

describe('generate: randMaterial', () => {
  it('should be values between 0-1', () => {
    const mock = vi.spyOn(global.Math, 'random')

    mock.mockReturnValue(0.3) // randInt(0, 1) => 0
    expect(randMaterial()[0]).toBeLessThan(1)
    expect(randMaterial()[1]).toBeLessThan(1)

    mock.mockReturnValue(0.6) // randInt(0, 1) => 1
    expect(randMaterial()[0]).toBeLessThan(1)
    expect(randMaterial()[1]).toBeLessThan(1)
  })

  it('should be array with 2 values', () => {
    expect(randMaterial().length).toBe(2)
  })
})

describe('generate: initSettings', () => {
  it('should be with complexity', () => {
    const elementary = initSettings({ complexity: 'elementary' })
    const intermediate = initSettings({ complexity: 'intermediate' })
    const advanced = initSettings({ complexity: 'advanced' })
    expect(elementary.complexity).toBe('elementary')
    expect(intermediate.complexity).toBe('intermediate')
    expect(advanced.complexity).toBe('advanced')
  })

  it('should be random complexity', () => {
    const complexity = ['elementary', 'intermediate', 'advanced']
    const random = initSettings({ complexity: 'random' })
    const without = initSettings({})

    expect(complexity).toContain(without.complexity)
    expect(complexity).toContain(random.complexity)
  })

  it('should be with units count', () => {
    const init = initSettings({ unitsCount: 5 })
    const random = initSettings({})

    expect(init.unitsCount).toBe(5)
    expect(random.unitsCount).toBeLessThanOrEqual(10)
    expect(random.unitsCount).toBeGreaterThanOrEqual(2)
  })

  it('should be with beam length', () => {
    const initWithZero = initSettings({ beamLength: 0 })
    const initWithNine = initSettings({ beamLength: 9 })
    const random = initSettings({})

    expect(initWithZero.beamLength).not.toBe(0)
    expect(initWithNine.beamLength).toBe(9)
    expect(random.beamLength).toBeLessThanOrEqual(16)
    expect(random.beamLength).toBeGreaterThanOrEqual(8)
  })
})

describe('generate: createUnits', () => {
  it('should be with have right count of units', () => {
    const units1 = createUnits(10, 1)
    const units2 = createUnits(20, 1)
    expect(units1.length).toBe(10)
    expect(units2.length).toBe(20)
  })

  it('should be with right length', () => {
    const units = createUnits(2, 10)
    expect(units[0].x).toBe(0)
    expect(units[1].x).toBe(10)
  })
})

describe('generate: addFixed', () => {
  it('should be add fixed at start', () => {
    const mock = vi.spyOn(global.Math, 'random')
    mock.mockReturnValue(0.6) // randInt(0, 1) => 1

    const units = createUnits(10, 10)
    addFixed(units)
    expect(units[0].type).toBe('fixed')
  })

  it('should be add fixed at end', () => {
    const mock = vi.spyOn(global.Math, 'random')
    mock.mockReturnValue(0.3) // randInt(0, 1) => 0

    const units = createUnits(10, 10)
    addFixed(units)
    expect(units[units.length - 1].type).toBe('fixed')
  })
})

describe('generate: addHinge', () => {
  it('should be add 1 hinge type', () => {
    const mock = vi.spyOn(global.Math, 'random')
    mock.mockReturnValue(0.6) // randInt(0, 1) => 1

    const units = createUnits(10, 10)
    addHinge(units, 'advanced', [0, 10])

    const filtered = units.filter((unit) => unit.type === 'hinge')
    expect(filtered.length).toBe(1)
  })

  it('should be add 0 hinge type for low complexity', () => {
    const units = createUnits(10, 10)
    addHinge(units, 'intermediate', [0, 10])

    const filtered = units.filter((unit) => unit.type === 'hinge')
    expect(filtered.length).toBe(0)
  })

  it('should be add 0 hinge type for units count < 4', () => {
    const units = createUnits(3, 10)
    addHinge(units, 'advanced', [0, 10])

    const filtered = units.filter((unit) => unit.type === 'hinge')
    expect(filtered.length).toBe(0)
  })

  it('should be add 1 hinge with reverse simples', () => {
    const mock = vi.spyOn(global.Math, 'random')
    mock.mockReturnValue(0.6) // randInt(0, 1) => 1

    const units = createUnits(10, 10)
    addHinge(units, 'advanced', [10, 0])

    const filtered = units.filter((unit) => unit.type === 'hinge')
    expect(filtered.length).toBe(1)
  })

  it('should be add 0 hinge with small simples distance', () => {
    const mock = vi.spyOn(global.Math, 'random')
    mock.mockReturnValue(0.6) // randInt(0, 1) => 1

    const units = createUnits(10, 10)
    addHinge(units, 'advanced', [0, 1])

    const filtered = units.filter((unit) => unit.type === 'hinge')
    expect(filtered.length).toBe(0)
  })
})

describe('generate: addSimple', () => {
  it('should be can generate center position', () => {
    vi.spyOn(global.Math, 'random')
      .mockReturnValueOnce(0.1) // shift => 0
      .mockReturnValueOnce(0.6) // randInt(0, 1) => 1

    const units = createUnits(10, 10)
    addSimple(units, 'elementary')
    expect(units[0].type).toBe('simple')
    expect(units[units.length - 1].type).toBe('simple')
  })

  it('should be generated together at start', () => {
    vi.spyOn(global.Math, 'random')
      .mockReturnValueOnce(0.1) // shift => 0
      .mockReturnValueOnce(0.3) // randInt(0, 1) => 0
      .mockReturnValueOnce(0.6) // randInt(0, 1) => 1
      .mockReturnValueOnce(0.6) // randInt(0, 1) => 1

    const units = createUnits(10, 10)
    addSimple(units, 'elementary')
    expect(units[0].type).toBe('simple')
    expect(units[1].type).toBe('simple')
  })

  it('should be generated together at end', () => {
    vi.spyOn(global.Math, 'random')
      .mockReturnValueOnce(0.1) // shift => 0
      .mockReturnValueOnce(0.3) // randInt(0, 1) => 0
      .mockReturnValueOnce(0.6) // randInt(0, 1) => 1
      .mockReturnValueOnce(0.3) // randInt(0, 1) => 0

    const units = createUnits(10, 10)
    addSimple(units, 'elementary')
    expect(units[units.length - 1].type).toBe('simple')
    expect(units[units.length - 2].type).toBe('simple')
  })

  it('should be generated on the edge start', () => {
    vi.spyOn(global.Math, 'random')
      .mockReturnValueOnce(0.2) // shift => 1
      .mockReturnValueOnce(0.3) // randInt(0, 1) => 0
      .mockReturnValueOnce(0.3) // randInt(0, 1) => 0
      .mockReturnValueOnce(0.6) // randInt(0, 1) => 1

    const units = createUnits(10, 10)
    addSimple(units, 'elementary')
    expect(units[0].type).toBe('simple')
    expect(units[units.length - 2].type).toBe('simple')
  })

  it('should be generated on the edge end', () => {
    vi.spyOn(global.Math, 'random')
      .mockReturnValueOnce(0.2) // shift => 1
      .mockReturnValueOnce(0.3) // randInt(0, 1) => 0
      .mockReturnValueOnce(0.3) // randInt(0, 1) => 0
      .mockReturnValueOnce(0.3) // randInt(0, 1) => 0

    const units = createUnits(10, 10)
    addSimple(units, 'elementary')
    expect(units[1].type).toBe('simple')
    expect(units[units.length - 1].type).toBe('simple')
  })
})

describe('generate: addSupport', () => {
  it('should be have fixed for units.length < 3', () => {
    const units = createUnits(2, 10)
    addSupport(units, 'elementary')

    const filtered = units.filter((unit) => unit.type === 'fixed')
    expect(filtered.length).toBe(1)
  })

  it('should be have simple for units.length > 5', () => {
    const units = createUnits(10, 10)
    addSupport(units, 'elementary')

    const filtered = units.filter((unit) => unit.type === 'simple')
    expect(filtered.length).toBe(2)
  })

  it('should be have simple for units.length 3-5', () => {
    vi.spyOn(global.Math, 'random').mockReturnValue(0.8) // randInt(0, 1) => !0

    const units = createUnits(4, 10)
    addSupport(units, 'elementary')

    const filtered = units.filter((unit) => unit.type === 'simple')
    expect(filtered.length).toBe(2)
  })

  it('should be have fixed for units.length 3-5', () => {
    vi.spyOn(global.Math, 'random').mockReturnValue(0.2) // randInt(0, 1) => 0

    const units = createUnits(4, 10)
    addSupport(units, 'elementary')

    const filtered = units.filter((unit) => unit.type === 'fixed')
    expect(filtered.length).toBe(1)
  })
})

describe('generate: addMaterial', () => {
  it('should be added if points exist', () => {
    const units = createUnits(10, 10)
    addMaterial(units, 10)

    const filtered = units.filter((unit) => unit.type === 'material')
    expect(filtered.length).toBe(1)
    expect(filtered[0].x).toEqual([0, 10])
  })

  it('should be return false if no points', () => {
    const units = createUnits(2, 10)
    addSimple(units, 'elementary')
    const result = addMaterial(units, 10)

    expect(result).toBeFalsy()
  })
})

describe('generate: addDistload', () => {
  it('should be added if points exist', () => {
    const units = createUnits(10, 10)
    addDistload(units, 10)

    const filtered = units.filter((unit) => unit.type === 'distload')
    expect(filtered.length).toBe(1)
    expect(filtered[0].x).toEqual([0, 10])
  })

  it('should be return false if no points', () => {
    const units = createUnits(2, 10)
    addSimple(units, 'elementary')
    const result = addDistload(units, 10)

    expect(result).toBeFalsy()
  })
})

describe('generate: addAdvancedMaterial', () => {
  it('should be add one material', () => {
    vi.spyOn(global.Math, 'random').mockReturnValueOnce(0.6) // randInt(0, 1) => 1
    const units = createUnits(10, 10)
    addAdvancedMaterial(units, 10)

    const filtered = units.filter((unit) => unit.type === 'material')
    expect(filtered.length).toBe(1)
  })

  it('should be add two materials', () => {
    vi.spyOn(global.Math, 'random').mockReturnValueOnce(0.3) // randInt(0, 1) => 0
    const units = createUnits(10, 10)
    addAdvancedMaterial(units, 10)

    const filtered = units.filter((unit) => unit.type === 'material')
    expect(filtered.length).toBe(2)
  })
})

describe('generate: addAdvancedDistload', () => {
  it('should be add zero distloads', () => {
    vi.spyOn(global.Math, 'random').mockReturnValueOnce(0.3) // randInt(0, 2) => 0
    const units = createUnits(10, 10)
    addAdvancedDistload(units, 10, 1)

    const filtered = units.filter((unit) => unit.type === 'distload')
    expect(filtered.length).toBe(0)
  })

  it('should be add one distload', () => {
    vi.spyOn(global.Math, 'random')
      .mockReturnValueOnce(0.8) // randInt(0, 2) => 1
      .mockReturnValue(0.6) // randInt(0, 1) => 1

    const units = createUnits(10, 10)
    addAdvancedDistload(units, 10, 1)

    const filtered = units.filter((unit) => unit.type === 'distload')
    expect(filtered.length).toBe(1)
  })

  it('should be add one distload', () => {
    vi.spyOn(global.Math, 'random')
      .mockReturnValueOnce(0.8) // randInt(0, 2) => 1
      .mockReturnValue(0.3) // randInt(0, 1) => 0

    const units = createUnits(10, 10)
    addAdvancedDistload(units, 10, 1)

    const filtered = units.filter((unit) => unit.type === 'distload')
    expect(filtered.length).toBe(1)
  })
})

describe('generate: finish', () => {
  it('should be add forces', () => {
    vi.spyOn(global.Math, 'random').mockReturnValueOnce(0.8) // randInt(0, 2) => 1
    const units = createUnits(10, 10)
    finish(units)

    const filtered = units.filter((unit) => unit.type === 'force')
    expect(filtered.length).toBeGreaterThanOrEqual(1)
  })

  it('should be add moments', () => {
    vi.spyOn(global.Math, 'random').mockReturnValueOnce(0.3) // randInt(0, 2) => 0
    const units = createUnits(10, 10)
    finish(units)

    const filtered = units.filter((unit) => unit.type === 'moment')
    expect(filtered.length).toBeGreaterThanOrEqual(1)
  })
})

describe('generate: generate', () => {
  it('should be generated with different complexity', () => {
    const elementary = generate({ complexity: 'elementary' })
    const intermediate = generate({ complexity: 'intermediate' })
    const advanced = generate({ complexity: 'advanced' })

    expect(elementary).toBeTruthy()
    expect(intermediate).toBeTruthy()
    expect(advanced).toBeTruthy()
  })

  it('should be generated with beamLength', () => {
    const units = generate({ beamLength: 10 })
    expect(units[units.length - 1].x).toBe(10)
  })

  it('should be generated with unitsCount', () => {
    const units = generate({ unitsCount: 10 })
    expect(units.length).toBe(10)
  })
})
