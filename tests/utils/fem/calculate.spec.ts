import { nanoid } from 'nanoid'

import { Unit } from '~/utils/fem/types/unit'

import { parse } from '~/utils/fem/core/parse'
import generate from '~/utils/fem/generate'
import calculate, {
  buildGlobalM,
  buildGlobalV,
  buildSkeleton,
} from '~/utils/fem/calculate'

const units: Unit[] = [
  { id: nanoid(), x: [0, 6], value: [3, 1, 1], type: 'material' },
  { id: nanoid(), x: [11, 15], value: [2, 1, 1], type: 'material' },
  { id: nanoid(), x: 0, type: 'fixed' },
  { id: nanoid(), x: 11, type: 'simple' },
  { id: nanoid(), x: 15, type: 'simple' },
  { id: nanoid(), x: [0, 15], value: -4, type: 'distload' },
  { id: nanoid(), x: 6, value: -8, type: 'force' },
  { id: nanoid(), x: 6, type: 'hinge' },
]

const units2: Unit[] = [
  { id: nanoid(), x: 0, type: 'point' },
  { id: nanoid(), x: 1, type: 'fixed' },
  { id: nanoid(), x: 6, value: -8, type: 'force' },
]

const elems = parse(units)
const skeleton = buildSkeleton(elems)
const GM = buildGlobalM(elems, skeleton)
const GV = buildGlobalV(elems, skeleton)

describe('calculate function', () => {
  it('should be return graph', () => {
    const graph1 = calculate(units)
    const graph2 = calculate(units2)
    expect(graph1.labels).toBeTruthy()
    expect(graph2.labels).toBeTruthy()
  })
})

describe('GV function', () => {
  it('should be create right vector', () => {
    expect(GV[0]).toBeCloseTo(0)
    expect(GV[1]).toBeCloseTo(0)
    expect(GV[2]).toBeCloseTo(-30)
    expect(GV[3]).toBeCloseTo(12)
    expect(GV[4]).toBeCloseTo(-8.333, 3)
    expect(GV[5]).toBeCloseTo(0)
    expect(GV[6]).toBeCloseTo(3)
    expect(GV[7]).toBeCloseTo(0)
    expect(GV[8]).toBeCloseTo(5.333, 3)
  })
})

describe('GM function', () => {
  it('should be create right matrix', () => {
    expect(GM[0][0]).toBeCloseTo(1)
    expect(GM[1][1]).toBeCloseTo(1)
    expect(GM[2][2]).toBeCloseTo(0.263, 3)
    expect(GM[3][3]).toBeCloseTo(2)
    expect(GM[4][4]).toBeCloseTo(0.8, 1)
    expect(GM[5][5]).toBeCloseTo(1)
    expect(GM[6][6]).toBeCloseTo(2.8, 1)
    expect(GM[7][7]).toBeCloseTo(1)
    expect(GM[8][8]).toBeCloseTo(2)
  })
})

describe('skeleton function', () => {
  const someResult = buildSkeleton(parse(generate()))

  it('should be have right counter', () => {
    expect(someResult.counter).toBe(
      someResult.indexMatrix[someResult.indexMatrix.length - 1][3] + 1,
    )
    expect(skeleton.counter).toBe(9)
  })

  it('should be have right indexMatrix', () => {
    const im = [
      [0, 1, 2, 3],
      [2, 4, 5, 6],
      [5, 6, 7, 8],
    ]
    expect(skeleton.indexMatrix).toEqual(im)
  })

  it('should be have defenitions', () => {
    expect(skeleton.sups).toContain(0)
    expect(skeleton.sups).toContain(1)
    expect(skeleton.sups).toContain(5)
    expect(skeleton.sups).toContain(7)
  })
})
