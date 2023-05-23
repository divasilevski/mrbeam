import generate from '~/utils/fem/generate'

describe('generate', () => {
  it('should be return array of units', () => {
    const units = generate()
    expect(Array.isArray(units)).toBe(true)
    expect(units.length > 0).toBe(true)
  })
})
