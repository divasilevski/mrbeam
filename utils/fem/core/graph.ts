import { Graph, GraphProps } from '../types/graph'

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
    labels,
    shear,
    moment,
    displacement,
    slopeRadians,
    slopeDegrees,
  }
}
