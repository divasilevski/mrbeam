import calculate from '../services/fem/calculate'

export function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message
  return String(error)
}

export default defineEventHandler(async (event) => {
  try {
    const data = await readBody(event)
    return JSON.stringify(calculate(data), null, 4)
  } catch (error) {
    throw createError({
      statusCode: 400,
      message: getErrorMessage(error),
    })
  }
})
