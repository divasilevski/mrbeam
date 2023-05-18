import { ErrorMessage } from '~/utils/fem/config/errors'
import { handleErrors } from '~/utils/fem/core/error'

describe('handleError function', () => {
  const someGoodUnits1 = [
    { x: 0, type: 'fixed' },
    { x: 1, type: 'force', value: 12 },
  ]
  const someGoodUnits2 = [
    { x: 0, type: 'simple' },
    { x: 1, type: 'force', value: 12 },
    { x: 2, type: 'simple' },
  ]

  const someBadUnits1 = [
    { x: 0, type: 'simple' },
    { x: 1, type: 'force', value: 12 },
  ]
  const someBadUnits2 = [
    { x: 0, type: 'hinge' },
    { x: 1, type: 'force', value: 12 },
    { x: 2, type: 'simple' },
  ]

  it(`should be error <${ErrorMessage.UnitsIsArray}> if data bad format`, () => {
    const exeption = ErrorMessage.UnitsIsArray

    expect(() => handleErrors()).toThrowError(exeption)
    expect(() => handleErrors(3)).toThrowError(exeption)
    expect(() => handleErrors('xs')).toThrowError(exeption)
    expect(() => handleErrors({ x: 12 })).toThrowError(exeption)
    expect(() => handleErrors(new Date())).toThrowError(exeption)
  })

  it(`should be error <${ErrorMessage.UnitsAreOjects}> if units bad format`, () => {
    const exeption = ErrorMessage.UnitsAreOjects

    expect(() => handleErrors(['dsad'])).toThrowError(exeption)
    expect(() => handleErrors([1, 2, 3])).toThrowError(exeption)
    expect(() => handleErrors([[], [1, 2, 3]])).toThrowError(exeption)
  })

  it(`should be error <${ErrorMessage.UnitsHasX}> if units havent <x> property`, () => {
    const exeption = ErrorMessage.UnitsHasX
    const unitsExample = [{ x: 0, type: 'simple' }, { type: 'disload' }]

    expect(() => handleErrors([{ type: 'simple' }])).toThrowError(exeption)
    expect(() => handleErrors(unitsExample)).toThrowError(exeption)
  })

  it(`should be error <${ErrorMessage.UnitsHasType}> if units havent <type> property`, () => {
    const exeption = ErrorMessage.UnitsHasType
    const unitsExample = [{ x: 0, type: 'simple' }, { x: 12 }]

    expect(() => handleErrors([{ x: 12 }])).toThrowError(exeption)
    expect(() => handleErrors(unitsExample)).toThrowError(exeption)
  })

  it(`should be error <${ErrorMessage.UnitsXType}> if units have bad <x> property`, () => {
    const exeption = ErrorMessage.UnitsXType
    const unitsExample1 = [{ x: 12, type: 'simple' }]
    const unitsExample2 = [{ x: '12', type: 'simple' }]
    const unitsExample3 = [{ x: [0, 4], type: 'simple' }]
    const unitsExample4 = [{ x: new Date(), type: 'simple' }]
    const unitsExample5 = [{ x: 's12', type: 'simple' }]
    const unitsExample6 = [{ x: { x: 1 }, type: 'simple' }]
    const unitsExample7 = [{ x: NaN, type: 'simple' }]

    expect(() => handleErrors(unitsExample1)).not.toThrowError(exeption)
    expect(() => handleErrors(unitsExample2)).not.toThrowError(exeption)
    expect(() => handleErrors(unitsExample3)).not.toThrowError(exeption)
    expect(() => handleErrors(unitsExample4)).not.toThrowError(exeption)
    expect(() => handleErrors(unitsExample5)).toThrowError(exeption)
    expect(() => handleErrors(unitsExample6)).toThrowError(exeption)
    expect(() => handleErrors(unitsExample7)).toThrowError(exeption)
  })

  it(`should be error <${ErrorMessage.UnitsTypeValue}> if units have bad <type> property`, () => {
    const exeption = ErrorMessage.UnitsTypeValue
    const example = (type: string) => [{ x: 0, type }]

    expect(() => handleErrors(example('simple'))).not.toThrowError(exeption)
    expect(() => handleErrors(example('distload'))).not.toThrowError(exeption)
    expect(() => handleErrors(example('simpleX'))).toThrowError(exeption)
    expect(() => handleErrors(example('distloadX'))).toThrowError(exeption)
  })

  it(`should be error <${ErrorMessage.UnitsHasValue}> if units havent <value> property`, () => {
    const exeption = ErrorMessage.UnitsHasValue
    const unitsExample1 = [{ x: 0, type: 'force', value: -32 }]
    const unitsExample2 = [{ x: 0, type: 'hinge' }]
    const unitsExample3 = [{ x: 0, type: 'force' }]
    const unitsExample4 = [{ x: 0, type: 'distload' }]

    expect(() => handleErrors(unitsExample1)).not.toThrowError(exeption)
    expect(() => handleErrors(unitsExample2)).not.toThrowError(exeption)
    expect(() => handleErrors(unitsExample3)).toThrowError(exeption)
    expect(() => handleErrors(unitsExample4)).toThrowError(exeption)
  })

  it(`should be error <${ErrorMessage.UnitsValueType}> if units have bad <value> property`, () => {
    const exeption = ErrorMessage.UnitsValueType
    const unitsExample1 = [{ x: 0, type: 'simple' }]
    const unitsExample2 = [{ x: 0, type: 'force', value: 12 }]
    const unitsExample3 = [{ x: 0, type: 'force', value: '12' }]
    const unitsExample4 = [{ x: 0, type: 'distload', value: [12, 21] }]
    const unitsExample5 = [{ x: 0, type: 'force', value: 's12' }]
    const unitsExample6 = [{ x: 0, type: 'force', value: NaN }]

    expect(() => handleErrors(unitsExample1)).not.toThrowError(exeption)
    expect(() => handleErrors(unitsExample2)).not.toThrowError(exeption)
    expect(() => handleErrors(unitsExample3)).not.toThrowError(exeption)
    expect(() => handleErrors(unitsExample4)).not.toThrowError(exeption)
    expect(() => handleErrors(unitsExample5)).toThrowError(exeption)
    expect(() => handleErrors(unitsExample6)).toThrowError(exeption)
  })

  it(`should be error <${ErrorMessage.NotEnough}> if units count is 0 or 1`, () => {
    const exeption = ErrorMessage.NotEnough

    expect(() => handleErrors(someGoodUnits1)).not.toThrowError(exeption)
    expect(() => handleErrors([])).toThrowError(exeption)
    expect(() => handleErrors([{ x: 0, type: 'fixed' }])).toThrowError(exeption)
  })

  it(`should be error <${ErrorMessage.MoreSupports}> if units count is 0 or 1`, () => {
    const exeption = ErrorMessage.MoreSupports

    expect(() => handleErrors(someGoodUnits1)).not.toThrowError(exeption)
    expect(() => handleErrors(someGoodUnits2)).not.toThrowError(exeption)
    expect(() => handleErrors(someBadUnits1)).toThrowError(exeption)
    expect(() => handleErrors(someBadUnits2)).toThrowError(exeption)
  })
})
