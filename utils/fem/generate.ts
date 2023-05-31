import { nanoid } from 'nanoid'

import { Unit } from './types/unit'
import { randInt } from './core/algebra'

export enum Type {
  Point = 'point',
  Fixed = 'fixed',
  Hinge = 'hinge',
  Simple = 'simple',

  Force = 'force',
  Moment = 'moment',
  Distload = 'distload',
}

const EASY_PATTERNS = [
  [Type.Fixed, Type.Force],
  [Type.Fixed, Type.Moment],
  [Type.Fixed, Type.Distload, Type.Point],

  [Type.Fixed, Type.Moment, Type.Force],
  [Type.Fixed, Type.Distload, Type.Moment],

  [Type.Simple, Type.Distload, Type.Simple],
  [Type.Simple, Type.Force, Type.Simple],
  [Type.Simple, Type.Moment, Type.Simple],
  [Type.Force, Type.Simple, Type.Simple],

  [Type.Simple, Type.Force, Type.Force, Type.Simple],
  [Type.Simple, Type.Moment, Type.Moment, Type.Simple],

  [Type.Force, Type.Simple, Type.Simple, Type.Force],
  [Type.Moment, Type.Simple, Type.Simple, Type.Moment],
  [Type.Point, Type.Simple, Type.Simple, Type.Distload, Type.Point],
]

const HARD_PATTERNS = [
  [Type.Fixed, Type.Force, Type.Hinge, Type.Force, Type.Fixed],
  [Type.Fixed, Type.Force, Type.Hinge, Type.Force, Type.Simple],
  [Type.Fixed, Type.Moment, Type.Hinge, Type.Moment, Type.Fixed],
  [Type.Fixed, Type.Moment, Type.Hinge, Type.Moment, Type.Simple],

  [Type.Fixed, Type.Hinge, Type.Distload, Type.Fixed],
  [Type.Fixed, Type.Hinge, Type.Distload, Type.Simple],
  [Type.Fixed, Type.Hinge, Type.Simple, Type.Distload],
  [Type.Fixed, Type.Hinge, Type.Simple, Type.Distload],
]

export function getRandomStep() {
  const options = [2, 3, 4]
  return options[randInt(0, options.length - 1)]
}

export function getRandomPattern() {
  return randInt(0, 100) > 15
    ? EASY_PATTERNS[randInt(0, EASY_PATTERNS.length - 1)] // 85%
    : HARD_PATTERNS[randInt(0, HARD_PATTERNS.length - 1)] // 15%
}

export function appendReversal(pattern: Type[]) {
  return randInt(0, 1) ? pattern : pattern.reverse()
}

export function getRandomLoad() {
  const sign = [-1, 1][randInt(0, 1)]
  return sign * randInt(5, 10) * 10
}

export function createUnits(pattern: Type[], step: number) {
  let hasDistload = false
  const units: Unit[] = []

  pattern.forEach((type, index) => {
    const id = nanoid(8)
    const x = index * step
    const value = getRandomLoad()

    switch (type) {
      case Type.Force:
      case Type.Moment:
        units.push({ id, value, type, x })
        break

      case Type.Distload:
        if (!hasDistload) {
          const length = step * (pattern.length - 1)
          units.push({ id, type, x: [0, length], value: value / 10 })
          hasDistload = true
        }
        break
      case Type.Point:
        break

      default:
        units.push({ id, type, x })
        break
    }
  })

  return units
}

export default function generate() {
  const step = getRandomStep()
  const pattern = getRandomPattern()
  const finalPattern = appendReversal(pattern)
  return createUnits(finalPattern, step)
}
