import { Element } from './element'

export interface GraphProps {
  elements: Element[]
  localSolutions: number[][]
  localReactions: number[][]
}

export interface Graph {
  labels: number[]
  shear: number[]
  moment: number[]
  displacement: number[]
  slopeRadians: number[]
  slopeDegrees: number[]
}
