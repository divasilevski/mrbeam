import { formatNumber } from '~/utils/formatNumber'

describe('formatNumber', () => {
  it('should return a small formatted number when value is less than 0.001', () => {
    expect(formatNumber(0.0001)).toEqual('1e-4')
    expect(formatNumber(-0.00000123)).toEqual('-1.2e-6')
  })

  it('should return a big formatted number when value is greater than 1e15', () => {
    expect(formatNumber(1.2345678e16)).toEqual('1.2e16')
    expect(formatNumber(-1.1111111111111e17)).toEqual('-1.1e17')
  })

  it('should return a compact formatted number when value is between 0.001 and 1e15', () => {
    expect(formatNumber(1234)).toEqual('1.2K')
    expect(formatNumber(999999)).toEqual('1M')
    expect(formatNumber(-1.23e12)).toEqual('-1.2T')
  })
})
