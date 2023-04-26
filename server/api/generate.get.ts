import generate from '../services/fem/generate'

export default defineEventHandler(() => {
  return JSON.stringify(generate(), null, 4)
})
