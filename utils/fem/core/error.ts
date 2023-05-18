import { ErrorMessage } from '../config/errors'
import { unitsTypes } from '../config/units'
import { valuesTypes } from '../config/values'

function pointIsInvalid(point: number | number[]) {
  const isNumber = typeof point === 'number'
  return !isNumber && !Array.isArray(point) && Number.isNaN(+point)
}

export function handleErrors(units?: unknown) {
  let countOfFixed = 0
  let countOfSimple = 0

  // Type errors
  if (!Array.isArray(units)) {
    throw new TypeError(ErrorMessage.UnitsIsArray)
  }

  for (const unit of units) {
    if (unit.toString() !== '[object Object]') {
      throw new Error(ErrorMessage.UnitsAreOjects)
    }

    if (unit.x === undefined) {
      throw new Error(ErrorMessage.UnitsHasX)
    }

    if (unit.type === undefined) {
      throw new Error(ErrorMessage.UnitsHasType)
    }

    if (pointIsInvalid(unit.x) || Number.isNaN(unit.x)) {
      throw new Error(ErrorMessage.UnitsXType)
    }

    if (!unitsTypes.includes(unit.type)) {
      throw new Error(ErrorMessage.UnitsTypeValue)
    }

    if (valuesTypes.includes(unit.type)) {
      if (unit.value === undefined) {
        throw new Error(ErrorMessage.UnitsHasValue)
      } else if (pointIsInvalid(unit.value) || Number.isNaN(unit.value)) {
        throw new Error(ErrorMessage.UnitsValueType)
      }
    }

    if (unit.type === 'fixed') countOfFixed++
    if (unit.type === 'simple') countOfSimple++
  }

  // Format errors
  if (units.length === 0 || units.length === 1) {
    throw new Error(ErrorMessage.NotEnough)
  }

  if (countOfFixed === 0 && countOfSimple < 2) {
    throw new Error(ErrorMessage.MoreSupports)
  }
}
