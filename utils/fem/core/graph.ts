import { Graph, GraphProps } from '../types/graph'

function calculateDeviation(array: number[]) {
  const n = array.length
  const mean = array.reduce((sum, x) => sum + x, 0) / n
  const squaredDiffs = array.map((x) => (x - mean) ** 2)
  const variance = squaredDiffs.reduce((sum, x) => sum + x, 0) / n
  return Math.sqrt(variance)
}

function checkDeviation(array: number[]) {
  const error = 1e-6
  const signs = 6

  if (calculateDeviation(array) < error) {
    return array.map((number) => parseFloat(number.toFixed(signs)))
  }

  return array
}

export function createGraph(props: GraphProps): Graph {
  const { elements, localSolutions, localReactions } = props
  const labels = []
  const shear = []
  const moment = []
  const displacement = []
  const slopeRadians = []
  const slopeDegrees = []

  for (const index in elements) {
    labels.push(elements[index].nodes[0].x, elements[index].nodes[1].x)
    shear.push(localReactions[index][0], -localReactions[index][2])
    moment.push(localReactions[index][1], -localReactions[index][3])

    displacement.push(localSolutions[index][0], localSolutions[index][2])
    slopeRadians.push(localSolutions[index][1], localSolutions[index][3])
    slopeDegrees.push(
      (localSolutions[index][1] * 180) / Math.PI,
      (localSolutions[index][3] * 180) / Math.PI
    )
  }

  return {
    labels: checkDeviation(labels),
    shear: checkDeviation(shear),
    moment: checkDeviation(moment),
    displacement: checkDeviation(displacement),
    slopeRadians: checkDeviation(slopeRadians),
    slopeDegrees: checkDeviation(slopeDegrees),
  }
}
