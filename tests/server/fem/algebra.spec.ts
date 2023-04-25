import * as algebra from '~/server/services/fem/core/algebra'
const { randInt, solve, shuffleArray, multiply } = algebra

describe('randInt', () => {
  it('shoud be return 0 if interval 0-0', () => {
    expect(randInt(0, 0)).toBeCloseTo(0)
  })

  it('shoud be return 1 if interval 1-1', () => {
    expect(randInt(1, 1)).toBe(1)
  })

  it('shoud be return 0 or 1 if interval 0-1', () => {
    expect(randInt(0, 1)).toBeGreaterThan(-1)
    expect(randInt(0, 1)).toBeLessThan(2)
  })
})

describe('solve', () => {
  it('shoud be give right solution', () => {
    const matrix = [
      [2, 2, 1],
      [1, 3, -2],
      [3, -1, -1],
    ]
    const solution = solve(matrix, [-3, 1, 2])
    expect(solution[0]).toBeCloseTo(-1 / 15)
    expect(solution[1]).toBeCloseTo(-2 / 3)
    expect(solution[2]).toBeCloseTo(-23 / 15)
  })
})

describe('shuffleArray', () => {
  it('shoud be the same length', () => {
    const array = [3, 2, 3, 4, 5]
    const shuffled = shuffleArray(array)
    expect(shuffled.length).toBe(array.length)
  })
})

describe('shuffleArray', () => {
  it('shoud be the same length', () => {
    const array = [3, 2, 3, 4, 5]
    const shuffled = shuffleArray(array)
    expect(shuffled.length).toBe(array.length)
  })

  it('shoud be the same elements', () => {
    const array = [3, 2, 3, 4, 5]
    const shuffled = shuffleArray(array)
    expect([...new Set(array)]).toEqual([...new Set(shuffled)])
  })
})

describe('multiply', () => {
  it('shoud be multiply matrix on vector', () => {
    const matrix = [
      [2, 4, 0],
      [-2, 1, 3],
      [-1, 0, 1],
    ]
    const solution = multiply(matrix, [1, 2, -1])
    expect(solution[0]).toBeCloseTo(10)
    expect(solution[1]).toBeCloseTo(-3)
    expect(solution[2]).toBeCloseTo(-2)
  })
})
