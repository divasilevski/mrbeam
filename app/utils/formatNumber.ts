function formatSmallNumber(value: number) {
  return Number(value).toExponential(1).replace(/\.0/, '').replace(/e\+0/, '')
}

function formatBigNumber(value: number) {
  return Number(value).toExponential(1).replace(/\+/, '')
}

export const formatNumber = (value: number) => {
  if (Math.abs(value) < 0.001) {
    return formatSmallNumber(value)
  }

  if (Math.abs(value) > 1e15) {
    return formatBigNumber(value)
  }

  const formatter = Intl.NumberFormat('en', { notation: 'compact' })
  return formatter.format(value)
}
