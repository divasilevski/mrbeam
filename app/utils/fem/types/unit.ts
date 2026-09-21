import { unitsTypes } from '../config/units'

export type UnitType = (typeof unitsTypes)[number]

export interface Unit {
  readonly id: string
  type: UnitType
  x: number | number[]
  value?: number | number[]
}
