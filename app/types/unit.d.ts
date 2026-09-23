type UnitType =
  | 'point'
  | 'force'
  | 'moment'
  | 'distload'
  | 'fixed'
  | 'simple'
  | 'hinge'
  | 'material'

interface Unit {
  readonly id: string
  type: UnitType
  x: number | number[]
  value?: number | number[]
}
