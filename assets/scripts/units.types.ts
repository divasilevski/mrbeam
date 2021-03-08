export type UnitType =
  | 'point'
  | 'force'
  | 'moment'
  | 'distload'
  | 'fixed'
  | 'simple'
  | 'hinge'
  | 'material'

export type GenerateComplexity =
  | 'elementary'
  | 'intermediate'
  | 'advanced'
  | 'random'

export interface GenerateParameters {
  complexity?: GenerateComplexity
  unitsCount?: number
  beamLength?: number
}

export interface Unit {
  readonly id: string
  type: UnitType
  x: number | number[]
  value?: number | number[]
}
