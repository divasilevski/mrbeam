import { nanoid } from 'nanoid'

import { Elem } from '~/utils/fem/core/Elem'
import { decryption, parse } from '~/utils/fem/core/parse'

import { Node } from '~/utils/fem/types/element'
import { Unit } from '~/utils/fem/types/unit'

describe('decription function and Elem class setters', () => {
  const node1: Node = { x: 0, force: 0, moment: 0 }
  const node2: Node = { x: 1, force: 0, moment: 0 }

  const elems = [new Elem([node1, node2]), new Elem([node2, node2])]

  it('should add force to node', () => {
    decryption({ id: nanoid(), x: 1, type: 'force', value: -50 }, elems[1])
    expect(node2.force).toBe(-50)
  })

  it('should add moment to node', () => {
    decryption({ id: nanoid(), x: 1, type: 'moment', value: 10 }, elems[1])
    expect(node2.moment).toBe(10)
  })

  it('should add support to node', () => {
    decryption({ id: nanoid(), x: 0, type: 'fixed' }, elems[0])
    expect(node1.support).toBe('fixed')
  })

  it('should add distload to elem', () => {
    const id = nanoid()
    const u1: Unit = { id, x: [0, 1], type: 'distload', value: -50 }
    const u2: Unit = { id, x: [0, 1], type: 'distload', value: [50, -30] }

    decryption(u1, elems[0])
    decryption(u2, elems[0])

    expect(elems[0].distload[0]).toEqual({ x: [0, 1], value: -50 })
    expect(elems[0].distload[1]).toEqual({ x: [0, 1], value: [50, -30] })
  })

  it('should add material to elem', () => {
    const id = nanoid()
    const unit: Unit = { id, x: [0, 1], type: 'material', value: [33, 33, 33] }
    decryption(unit, elems[0])
    expect(elems[0].material).toEqual([33, 33, 33])
  })
})

describe('parse function create elems from units', () => {
  const units1: Unit[] = [
    { id: nanoid(), type: 'simple', x: 0 },
    { id: nanoid(), type: 'force', x: 4, value: 100 },
    { id: nanoid(), type: 'simple', x: 8 },
  ]

  const units2: Unit[] = [
    { id: nanoid(), type: 'material', x: [0, 11], value: [33, 33, 33] },
    { id: nanoid(), type: 'simple', x: 0 },
    { id: nanoid(), type: 'moment', x: 8, value: 80 },
    { id: nanoid(), type: 'hinge', x: 6 },
    { id: nanoid(), type: 'distload', x: [0, 11], value: [60, 60] },
    { id: nanoid(), type: 'simple', x: 11 },
  ]

  const elems1 = parse(units1)
  const elems2 = parse(units2)

  it('should be have right length', () => {
    expect(elems1.length).toBe(2)
    expect(elems2.length).toBe(3)
  })

  it('should be have equal nodes', () => {
    expect(elems1[0].nodes[1]).toEqual(elems1[1].nodes[0])
    expect(elems2[0].nodes[1]).toEqual(elems2[1].nodes[0])
    expect(elems2[1].nodes[1]).toEqual(elems2[2].nodes[0])
  })

  it('should be have right x', () => {
    expect(elems1[0].nodes[0].x).toBe(0)
    expect(elems1[1].nodes[0].x).toBe(4)
    expect(elems1[1].nodes[1].x).toBe(8)

    expect(elems2[0].nodes[0].x).toBe(0)
    expect(elems2[1].nodes[0].x).toBe(6)
    expect(elems2[1].nodes[1].x).toBe(8)
    expect(elems2[2].nodes[1].x).toBe(11)
  })

  it('should be have right forces and moments', () => {
    expect(elems1[0].nodes[1].force).toBe(100)

    expect(elems2[1].nodes[1].moment).toBe(80)
  })

  it('should be have right supports', () => {
    expect(elems1[0].nodes[0].support).toBe('simple')
    expect(elems1[1].nodes[1].support).toBe('simple')

    expect(elems2[1].nodes[0].support).toBe('hinge')
    expect(elems2[0].nodes[0].support).toBe('simple')
    expect(elems2[2].nodes[1].support).toBe('simple')
  })

  it('should be have right materials', () => {
    expect(elems2[0].material).toEqual([33, 33, 33])
    expect(elems2[1].material).toEqual([33, 33, 33])
    expect(elems2[2].material).toEqual([33, 33, 33])
  })

  it('should be have right distload', () => {
    expect(elems2[0].distload).toEqual([{ x: [0, 11], value: [60, 60] }])
    expect(elems2[1].distload).toEqual([{ x: [0, 11], value: [60, 60] }])
    expect(elems2[2].distload).toEqual([{ x: [0, 11], value: [60, 60] }])
  })
})
