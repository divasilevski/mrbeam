import type { Unit } from './types/unit'
import { ErrorMessage } from './config/errors'

// Load magnitude for the NoLoads check; non-load types count as 0.
export function getUnitValue(unit: Unit) {
  const unitsWithValue = ['moment', 'distload', 'force']

  if (unitsWithValue.includes(unit.type)) {
    const values = Array.isArray(unit.value) ? unit.value : [unit.value || 0]
    return values.reduce((sum, value) => sum + Math.abs(value), 0)
  }

  return 0
}

export function isIntersect(array1: unknown[], array2: unknown[]) {
  for (let i = 0; i < array1.length; i++) {
    if (array2.includes(array1[i])) {
      return true
    }
  }
  return false
}

// NaN or Infinity in any unit turns the whole solution into NaN.
export function hasInvalidValue(units: Unit[]) {
  const isFinite = (value: number | number[] | undefined) => {
    return value === undefined || [value].flat().every(Number.isFinite)
  }

  return units.some((unit) => !isFinite(unit.x) || !isFinite(unit.value))
}

export default function checkUnits(units: Unit[]) {
  if (units.length === 0 || units.length === 1) {
    return ErrorMessage.NotEnough
  }

  if (hasInvalidValue(units)) {
    return ErrorMessage.InvalidValue
  }

  // Supports
  const count = { fixed: 0, simple: 0, hinge: 0 }
  const positions = []
  const supports = []

  for (const unit of units) {
    switch (unit.type) {
      case 'simple':
        count.simple++
        positions.push(unit.x)
        supports.push(unit.x)
        break
      case 'fixed':
        count.fixed++
        positions.push(unit.x)
        supports.push(unit.x)
        break
      case 'hinge':
        count.hinge++
        positions.push(unit.x)
        break
      default:
        break
    }
  }

  if (count.fixed === 0 && count.simple < 2) {
    return ErrorMessage.MoreSupports
  }

  if (count.fixed * 2 + count.simple * 1 - 2 < count.hinge) {
    return ErrorMessage.IndeterminateSystem
  }

  if (positions.length !== new Set(positions).size) {
    return ErrorMessage.MultipleSupports
  }

  // Every unit at one coordinate leaves no elements to calculate.
  const coordinates = units.flatMap((unit) =>
    Array.isArray(unit.x) ? unit.x : [unit.x],
  )

  if (new Set(coordinates).size < 2) {
    return ErrorMessage.NoLength
  }

  // Loads
  const absoluteSum = units.reduce((currSum, currUnit) => {
    return currSum + getUnitValue(currUnit)
  }, 0)

  if (!absoluteSum) {
    return ErrorMessage.NoLoads
  }

  const forces = units
    .filter((unit) => unit.type === 'force' && unit.value !== 0)
    .map((unit) => unit.x)

  if (isIntersect(forces, supports)) {
    return ErrorMessage.SupportWithForce
  }

  return null
}
