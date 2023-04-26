import calculate from '../services/fem/calculate'

export default defineEventHandler(async (event) => {
  const data = await readBody(event)
  return JSON.stringify(calculate(data), null, 4)
})
