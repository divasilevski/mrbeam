import { elements } from './helpers'
import { fragmentation } from '~/server/services/fem/core/fragmentation'

describe('function fragmentation', () => {
  const cloneElems = () => elements.map((el) => el.getClone())

  it('should be have right count of elements', () => {
    const elements1 = fragmentation(cloneElems(), {})
    const elements2 = fragmentation(cloneElems(), { count: 500 })
    const elements3 = fragmentation(cloneElems(), { count: 150 })
    const elements4 = fragmentation(cloneElems(), { count: 50 })
    const elements5 = fragmentation(cloneElems(), { count: 25 })
    const elements6 = fragmentation(cloneElems(), { count: 3 })

    expect(elements1.length).toBeCloseTo(100, -1)
    expect(elements2.length).toBeCloseTo(200, -1)
    expect(elements3.length).toBeCloseTo(150, -1)
    expect(elements4.length).toBeCloseTo(50, -1)
    expect(elements5.length).toBeCloseTo(25, -1)
    expect(elements6.length).toBe(5)
  })

  it('should be have initial points', () => {
    const elems = fragmentation(cloneElems(), { count: 10 })
    const xNodes = elements.map((el) => el.nodes[0].x)
    xNodes.forEach((i) => {
      expect(elems.map((el) => el.nodes[0].x)).toContain(i)
    })
  })

  it('should be have good sequence of numbers', () => {
    const sortedElems = cloneElems().sort((a, b) => a.nodes[0].x - b.nodes[0].x)

    const elems = fragmentation(sortedElems, { count: 30 })

    const elements2 = elems
      .map((el) => el.getClone())
      .sort((a, b) => a.nodes[0].x - b.nodes[0].x)

    expect(elems).toEqual(elements2)
  })

  it('should be have only one nodes with simple', () => {
    const elems = fragmentation(cloneElems(), { count: 10 })

    elems.sort((a, b) => a.nodes[0].x - b.nodes[0].x)

    expect(elems[elems.length - 1].nodes[1].support).toBe('simple')
    expect(elems[elems.length - 1].nodes[0].support).toBeUndefined()
    expect(elems[elems.length - 2].nodes[1].support).toBeUndefined()
  })

  it('should be have right distload', () => {
    const elems = fragmentation(cloneElems(), { count: 25 })

    for (const i in elems) {
      if (elems[i].nodes[0].x < 10) {
        expect(elems[i].distload[0].value).toEqual([-90, 70])
        expect(elems[i].distload[0].x).toEqual([0, 10])
      } else {
        expect(elems[i].distload[0]).toBeUndefined()
      }
    }
  })

  it('should be have right material', () => {
    const elems = fragmentation(cloneElems(), { count: 50 })

    elems.sort((a, b) => a.nodes[0].x - b.nodes[0].x)

    for (const i in elems) {
      if (elems[i].nodes[0].x < 8) {
        expect(elems[i].material).toBe(elements[0].material)
      } else {
        expect(elems[i].material).toBe(elems[elems.length - 1].material)
      }
    }
  })
})
