import { basicComplexity } from '../config/complexity'

export type Complexity = (typeof basicComplexity)[number] | 'random'

export interface GenerateSettings {
  complexity: Complexity
  unitsCount: number
  beamLength: number
}

export interface GenerateParams {
  complexity?: Complexity
  unitsCount?: number
  beamLength?: number
}
