const formatter = Intl.NumberFormat('en', { notation: 'compact' })

export const formatNumber = (value: number) => {
  if (Math.abs(value) < 0.001) {
    return Number(value).toExponential(1).replace(/\.0/, '').replace(/e\+0/, '')
  } else if (Math.abs(value) > 1e15) {
    return Number(value).toExponential(1).replace(/\+/, '')
  }
  return formatter.format(value)
}
