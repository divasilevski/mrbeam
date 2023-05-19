import { CalculateOptions, Skeleton } from './types/calculate'
import { Element } from './types/element'
import { Unit } from './types/unit'

import { fragmentation } from './core/fragmentation'
import { createGraph } from './core/graph'
import { parse } from './core/parse'
import { handleErrors } from './core/error'
import { multiply, solve } from './core/algebra'

export function buildSkeleton(elems: Element[]): Skeleton {
  let counter = 0 // Общее кол-во элементов в матрице индексов
  const indexMatrix = [] // Матрица индексов
  const sups = new Set() // Запоминаем места с заделками

  const temp = []
  for (let i = 0; i < elems.length; i++) {
    for (let j = 0; j < 4; j++) {
      // definition vector building
      const isIncludesNodeOne = ['fixed', 'simple'].includes(
        elems[i].nodes[0].support || ''
      )
      const isIncludesNodeTwo = ['fixed', 'simple'].includes(
        elems[i].nodes[1].support || ''
      )

      if (j === 0 && isIncludesNodeOne) sups.add(counter)
      if (j === 1 && elems[i].nodes[0].support === 'fixed') sups.add(counter)
      if (j === 2 && isIncludesNodeTwo) sups.add(counter)
      if (j === 3 && elems[i].nodes[1].support === 'fixed') sups.add(counter)

      // index matrix building
      if (j === 1 && elems[i].nodes[0].support === 'hinge') counter++
      temp[j] = counter
      counter++
    }
    indexMatrix[i] = [...temp]
    counter -= 2
  }
  return {
    indexMatrix,
    sups: Array.from(sups) as number[],
    counter: counter + 2,
  }
}

export function buildGlobalM(elems: Element[], skeleton: Skeleton) {
  const { indexMatrix, sups, counter } = skeleton

  const matrix = Array.from(Array(counter), () =>
    Array.from(Array(counter), () => 0)
  )

  for (let i = 0; i < elems.length; i++) {
    for (let j = 0; j < 4; j++) {
      for (let k = 0; k < 4; k++) {
        matrix[indexMatrix[i][j]][indexMatrix[i][k]] +=
          elems[i].localMatrix[j][k]
      }
    }
  }

  // registrate definitions:
  for (const j of sups) {
    for (let k = 0; k < counter; k++) {
      matrix[k][j] = 0
      matrix[j][k] = 0
    }
    matrix[j][j] = 1
  }

  return matrix
}

export function buildGlobalV(elems: Element[], skeleton: Skeleton) {
  const { indexMatrix, sups, counter } = skeleton
  const vector = new Array(counter).fill(0)

  let i
  for (i = 0; i < elems.length; i++) {
    const index0 = indexMatrix[i][0]
    const index1 = indexMatrix[i][1]
    const index2 = indexMatrix[i][2]
    const index3 = indexMatrix[i][3]

    const force = elems[i].nodes[0].force || 0
    const moment = elems[i].nodes[0].moment || 0

    vector[index0] += elems[i].distVector[0] + force
    vector[index1] += elems[i].distVector[1] + moment
    vector[index2] += elems[i].distVector[2]
    vector[index3] += elems[i].distVector[3]
  }

  i--
  vector[indexMatrix[i][2]] += elems[i].nodes[1].force
  vector[indexMatrix[i][3]] += elems[i].nodes[1].moment

  // registrate definitions:
  for (const j of sups) vector[j] = 0

  return vector
}

export default function calculate(
  units: Unit[],
  options: CalculateOptions = { count: 100 }
) {
  handleErrors(units)

  const elements = fragmentation(parse(units), options)

  const skeleton: Skeleton = buildSkeleton(elements)
  const GM = buildGlobalM(elements, skeleton)
  const GV = buildGlobalV(elements, skeleton)
  const solution = solve(GM, GV)

  const localSolutions = []
  const localReactions = []

  for (let i = 0; i < elements.length; i++) {
    const localSolution = skeleton.indexMatrix[i].map((el) => solution[el])
    localSolutions.push(localSolution)

    localReactions.push(
      multiply(elements[i].localMatrix, localSolution).map(
        (element, index) => element - elements[i].distVector[index]
      )
    )
  }

  return createGraph({ elements, localSolutions, localReactions })
}
