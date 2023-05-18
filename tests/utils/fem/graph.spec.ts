import { elements } from './helpers'

import { createGraph } from '~/utils/fem/core/graph'

function generateMatrix(length: number) {
  return Array.from(new Array(length)).map(() =>
    Array.from(new Array(length).fill(1))
  )
}

describe('createGraph', () => {
  const length = elements.length
  const graph = createGraph({
    elements,
    localSolutions: generateMatrix(length),
    localReactions: generateMatrix(length),
  })

  it('should be return fields', () => {
    expect(graph.labels).not.toBeUndefined()
    expect(graph.shear).not.toBeUndefined()
    expect(graph.moment).not.toBeUndefined()
    expect(graph.displacement).not.toBeUndefined()
    expect(graph.slopeRadians).not.toBeUndefined()
    expect(graph.slopeDegrees).not.toBeUndefined()
  })

  it('should be return fields with double elements length', () => {
    expect(graph.labels.length).toBe(length * 2)
    expect(graph.shear.length).toBe(length * 2)
    expect(graph.moment.length).toBe(length * 2)
    expect(graph.displacement.length).toBe(length * 2)
    expect(graph.slopeRadians.length).toBe(length * 2)
    expect(graph.slopeDegrees.length).toBe(length * 2)
  })
})
