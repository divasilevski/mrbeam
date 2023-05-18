import { nanoid } from 'nanoid'

import { Complexity, GenerateSettings, GenerateParams } from './types/generate'
import { Unit } from './types/unit'

import { randInt, shuffleArray } from './core/algebra'
import { materialsValues } from './config/materials'
import { basicComplexity } from './config/complexity'

export function randForce() {
  return (randInt(0, 5) * 10 + 50) * (randInt(0, 1) ? 1 : -1)
}

export function randMaterial() {
  const size = randInt(10, 30) * 0.01

  if (randInt(0, 1)) {
    return [(size * size * size * size) / 12, size * size]
  }
  return [
    (size * size * size * size * Math.PI) / 64,
    (size * size * Math.PI) / 4,
  ]
}

export function initSettings(gp: GenerateParams) {
  if (!gp.complexity || gp.complexity === 'random') {
    gp.complexity = basicComplexity[randInt(0, 2)]
  }

  if (!gp.unitsCount || gp.unitsCount < 2) {
    gp.unitsCount = randInt(2, 6)
    if (gp.complexity === 'intermediate') gp.unitsCount = randInt(4, 8)
    if (gp.complexity === 'advanced') gp.unitsCount = randInt(6, 10)
  }

  if (!gp.beamLength || gp.beamLength === 0) {
    gp.beamLength = randInt(8, 16)
  }

  return gp as GenerateSettings
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

export function addHinge(units: Unit[], level: Complexity, simples: number[]) {
  if (level !== 'advanced') return
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

export function addSimple(units: Unit[], complexity: Complexity) {
  const shift = randInt(0, Math.floor(units.length / 2) - 1)

  // 50% center position
  if (randInt(0, 1)) {
    units[shift].type = 'simple'
    units[units.length - shift - 1].type = 'simple'

    addHinge(units, complexity, [shift, units.length - shift - 1])
    return
  }

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

    addHinge(units, complexity, [0, units.length - shift - 1])
  } else {
    units[shift].type = 'simple'
    units[units.length - 1].type = 'simple'

    addHinge(units, complexity, [shift, units.length - 1])
  }
}

export function addSupport(units: Unit[], complexity: Complexity) {
  if (units.length < 3) addFixed(units)

  if (units.length > 2 && units.length < 6) {
    if (randInt(0, 2)) {
      // 66% simple
      addSimple(units, complexity)
    } else {
      // 33% fixed
      addFixed(units)
    }
  }

  if (units.length > 5) addSimple(units, complexity)
}

export function addMaterial(units: Unit[], beamLength: number | number[]) {
  // shuffleArray(units)
  for (let i = units.length - 1; i >= 0; i--) {
    if (units[i].type === 'point') {
      units[i].type = 'material'
      units[i].x = typeof beamLength === 'number' ? [0, beamLength] : beamLength
      units[i].value = [
        materialsValues[randInt(0, materialsValues.length - 1)],
        ...randMaterial(),
      ]
      return true
    }
  }
  return false
}

export function addDistload(units: Unit[], beamLength: number | number[]) {
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

export function addAdvancedMaterial(units: Unit[], beamLength: number) {
  if (randInt(0, 1)) {
    addMaterial(units, beamLength)
  } else {
    const center: number = units[Math.ceil(units.length / 2)].x as number
    addMaterial(units, [0, center])
    addMaterial(units, [center, beamLength])
  }
}

export function addAdvancedDistload(
  units: Unit[],
  beamLength: number,
  count: number
) {
  if (randInt(0, 2)) {
    const part = beamLength / (count - 1)
    const rand = randInt(0, count - 1)

    return randInt(0, 1)
      ? addDistload(units, [0, (1 + rand) * part])
      : addDistload(units, [rand * part, beamLength])
  }

  return true
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

export default function generate(gp: GenerateParams = {}) {
  const { complexity, unitsCount, beamLength } = initSettings(gp)
  const units = createUnits(unitsCount, beamLength)

  // Добавление закреплений и шарнира
  addSupport(units, complexity) // 1-2 or 1-3 for advanced

  if (complexity === 'intermediate' && unitsCount > 3) {
    // Добавление материала на всей длине балки
    addMaterial(units, beamLength)

    // Добавление распределнной нагрузки на всей длине балки
    addDistload(units, beamLength)
  }

  if (complexity === 'advanced' && unitsCount > 5) {
    // Добавление нескольких материалов или одного
    addAdvancedMaterial(units, beamLength) // 2 max

    // Добавление распределнных нагрузок
    addAdvancedDistload(units, beamLength, unitsCount) // 1 max
  }

  // Добиваем оставшиеся точки моментами и силами
  finish(units)

  return units
}
