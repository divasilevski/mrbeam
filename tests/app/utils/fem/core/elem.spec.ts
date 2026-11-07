import { elements } from '../helpers'
import { shuffleArray } from '~/utils/fem/core/algebra'
import { Elem, getDistInCoord } from '~/utils/fem/core/Elem'

import type { Element } from '~/utils/fem/types/element'

describe('class Elem: getDistInCoord', () => {
  it('should be return 1 if value 0, 2 or 1 on 0, 2', () => {
    expect(getDistInCoord({ x: [0, 2], value: [0, 2] }, 1)).toBe(1)
    expect(getDistInCoord({ x: [0, 2], value: [1, 1] }, 1)).toBe(1)
    expect(getDistInCoord({ x: [0, 0], value: [1, 1] }, 1)).toBe(1)
  })
})

describe('class Elem: distVector', () => {
  let elem: Element

  beforeEach(() => {
    elem = new Elem([{ x: 0, support: 'fixed' }, { x: 2 }])
  })

  it('should be return zero vector if no distload', () => {
    expect(elem.distVector).toEqual([0, 0, 0, 0])
  })

  it('should be return vector for equal disload', () => {
    elem.addDistload([0, 2], 10)
    expect(elem.distVector).toEqual([10, 40 / 12, 10, -40 / 12])
  })

  it('should be return vector for triangle distload', () => {
    elem.addDistload([0, 4], [0, 10])
    expect(elem.distVector).toEqual([(1 / 3) * 5, 0, (2 / 3) * 5, 0])
  })

  it('should be return vector for double distload', () => {
    elem.addDistload([0, 2], 10)
    elem.addDistload([0, 4], [0, 10])
    expect(elem.distVector).toEqual([
      (2 / 3) * 10 + (1 / 3) * 15,
      0,
      (1 / 3) * 10 + (2 / 3) * 15,
      0,
    ])
  })
})

describe('class Elem: static method getLength', () => {
  const getLength = () => {
    return Elem.getLength(shuffleArray(elements.map((el) => el.getClone())))
  }

  it('should be right start', () => {
    expect(getLength().start).toBe(0)
  })

  it('should be right end', () => {
    expect(getLength().end).toBe(14)
  })

  it('should be right length', () => {
    expect(getLength().length).toBe(14)
  })
})

describe('class Elem: local matrix', () => {
  let elem: Elem

  beforeEach(() => {
    elem = new Elem([{ x: 0, support: 'fixed' }, { x: 2 }])
  })

  it('should be matrix', () => {
    expect(elem.localMatrix[0]).toBeTruthy()
    expect(elem.localMatrix[0][0]).toBeTruthy()
  })

  it('should be 4x4', () => {
    expect(elem.localMatrix.length).toBe(4)
    expect(elem.localMatrix[0].length).toBe(4)
  })

  it('should be have right values', () => {
    expect(elem.localMatrix[0][0]).toBe(1.5)
    elem.addMaterial([2, 1, 1])
    expect(elem.localMatrix[0][0]).toBe(3)
  })
})

const createCloneFixture = () => {
  const elem = new Elem([{ x: 0, support: 'fixed' }, { x: 2 }])
  elem.addMaterial([1, 2, 1])
  elem.addDistload([1, 2], 10)

  return { elem, clone: elem.getClone() }
}

describe('class Elem: getClone', () => {
  it('should be have same values', () => {
    const { elem, clone } = createCloneFixture()

    expect(clone.material).toEqual([1, 2, 1])
    expect(clone.distload).toEqual(elem.distload)
  })

  it('should be change material', () => {
    const { elem, clone } = createCloneFixture()

    elem.addMaterial([1, 3, 1])
    expect(clone.material).not.toEqual([1, 3, 1])
  })

  it('should be change distload', () => {
    const { elem, clone } = createCloneFixture()

    elem.addDistload([1, 2], 10)
    expect(clone.distload).not.toEqual(elem.distload)
    clone.setDistload(elem.distload)
    expect(clone.distload).toEqual(elem.distload)
  })
})
