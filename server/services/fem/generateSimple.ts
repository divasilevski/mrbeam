import { nanoid } from 'nanoid'

import { Unit } from './types/unit'

import { randInt, shuffleArray } from './core/algebra'

export function randForce() {
  return (randInt(0, 5) * 10 + 50) * (randInt(0, 1) ? 1 : -1)
}

export function createUnits(unitsCount: number, beamLength: number) {
  const units: Unit[] = []

  for (let i = 0; i < unitsCount; i++) {
    units.push({
      id: nanoid(10),
      type: 'point',
      x: (beamLength / (unitsCount - 1)) * i,
    })
  }

  return units
}

export function addFixed(units: Unit[]) {
  if (randInt(0, 1)) {
    units[0].type = 'fixed'
  } else {
    units[units.length - 1].type = 'fixed'
  }
}

export function addHinge(units: Unit[], simples: number[]) {
  if (units.length < 4) return

  if (simples[1] < simples[0]) {
    ;[simples[0], simples[1]] = [simples[1], simples[0]]
  }

  if (simples[1] - simples[0] < 2) return

  const rand = randInt(simples[0] + 1, simples[1] - 1)

  if (randInt(0, 1)) {
    units[rand].type = 'hinge'
  }
}

export function addSimple(units: Unit[]) {
  const shift = randInt(0, Math.floor(units.length / 2) - 1)

  // 50% left and right positions
  if (randInt(0, 1)) {
    // 25% points together
    if (randInt(0, 1)) {
      units[shift].type = 'simple'
      units[shift + 1].type = 'simple'
    } else {
      units[units.length - shift - 1].type = 'simple'
      units[units.length - shift - 2].type = 'simple'
    }

    // 25% one point on the edge 22
  } else if (randInt(0, 1)) {
    units[0].type = 'simple'
    units[units.length - shift - 1].type = 'simple'

    addHinge(units, [0, units.length - shift - 1])
  } else {
    units[shift].type = 'simple'
    units[units.length - 1].type = 'simple'

    addHinge(units, [shift, units.length - 1])
  }
}

export function addSupport(units: Unit[]) {
  if (units.length < 3) addFixed(units)

  if (units.length > 2 && units.length < 6) {
    if (randInt(0, 2)) {
      // 66% simple
      addSimple(units)
    } else {
      // 33% fixed
      addFixed(units)
    }
  }

  if (units.length > 5) addSimple(units)
}

export function addDistload(units: Unit[], beamLength: number | number[]) {
  if (randInt(0, 2)) return false

  shuffleArray(units)
  for (let i = units.length - 1; i >= 0; i--) {
    if (units[i].type === 'point') {
      units[i].type = 'distload'
      units[i].x = typeof beamLength === 'number' ? [0, beamLength] : beamLength
      units[i].value = randInt(0, 1) ? randForce() : [randForce(), randForce()]
      return true
    }
  }
  return false
}

export function finish(units: Unit[]) {
  const type = randInt(0, 2) ? 'force' : 'moment'

  for (let i = 0; i < units.length; i++) {
    if (units[i].type === 'point') {
      units[i].type = type
      units[i].value = randForce()
    }
  }
}

export default function generateSimple() {
  const unitsCount = randInt(1, 4) * 2
  const beamLength = randInt(4, 6) * 2

  const units = createUnits(unitsCount, beamLength)

  addSupport(units)
  addDistload(units, beamLength)
  finish(units)

  return units
}
