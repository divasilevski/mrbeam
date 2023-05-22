import checkUnits, { getUnitValue } from '~/utils/fem/checkUnits'
import { ErrorMessage } from '~/utils/fem/config/errors'

describe('checkUnits', () => {
  it('should be return NotEnough', () => {
    const units: Unit[] = [{ id: '0', x: 0, type: 'force', value: 10 }]
    const msg = checkUnits(units)
    expect(msg).toBe(ErrorMessage.NotEnough)
  })

  it('should be return MoreSupports', () => {
    const units: Unit[] = [
      { id: '0', x: 0, type: 'force', value: 10 },
      { id: '1', x: 1, type: 'force', value: 10 },
    ]
    const msg = checkUnits(units)
    expect(msg).toBe(ErrorMessage.MoreSupports)
  })

  it('should be return IndeterminateSystem', () => {
    const units: Unit[] = [
      { id: '0', x: 0, type: 'fixed' },
      { id: '1', x: 5, type: 'hinge' },
    ]
    const msg = checkUnits(units)
    expect(msg).toBe(ErrorMessage.IndeterminateSystem)
  })

  it('should be return MultipleSuppots', () => {
    const units: Unit[] = [
      { id: '0', x: 0, type: 'fixed' },
      { id: '1', x: 0, type: 'simple' },
    ]
    const msg = checkUnits(units)
    expect(msg).toBe(ErrorMessage.MultipleSuppots)
  })

  it('should be return NoLoads', () => {
    const units: Unit[] = [
      { id: '0', x: 0, type: 'simple' },
      { id: '1', x: 1, type: 'simple' },
    ]
    const msg = checkUnits(units)
    expect(msg).toBe(ErrorMessage.NoLoads)
  })

  it('should be return NoLoads if value 0', () => {
    const units: Unit[] = [
      { id: '0', x: 0, type: 'simple' },
      { id: '1', x: 1, type: 'force', value: 0 },
      { id: '1', x: 1, type: 'simple' },
    ]
    const msg = checkUnits(units)
    expect(msg).toBe(ErrorMessage.NoLoads)
  })

  it('should be return null', () => {
    const units: Unit[] = [
      { id: '0', x: 0, type: 'simple' },
      { id: '1', x: 1, type: 'force', value: 10 },
      { id: '2', x: 2, type: 'simple' },
    ]
    const msg = checkUnits(units)
    expect(msg).toBeNull()
  })
})

describe('getUnitValue', () => {
  it('should be return positive value', () => {
    const value = getUnitValue({ id: '0', x: 0, type: 'force', value: 10 })
    expect(value).toBe(10)
  })

  it('should be return positive value', () => {
    const posValue = getUnitValue({ id: '0', x: 0, type: 'force', value: 10 })
    const negValue = getUnitValue({ id: '0', x: 0, type: 'force', value: -10 })
    expect(posValue).toBeGreaterThan(0)
    expect(negValue).toBeGreaterThan(0)
  })

  it('should be return 0 if units without value', () => {
    const forceValue = getUnitValue({ id: '0', x: 0, type: 'force' })
    const simpleValue = getUnitValue({ id: '0', x: 0, type: 'simple' })
    expect(forceValue).toBe(0)
    expect(simpleValue).toBe(0)
  })

  it('should be return 1 if units with Array value', () => {
    const value = getUnitValue({ id: '0', x: 0, type: 'force', value: [5, 6] })
    expect(value).toBe(1)
  })
})
