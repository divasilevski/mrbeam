import generateSimple from '../services/fem/generateSimple'

export default defineEventHandler(() => {
  return JSON.stringify(generateSimple(), null, 4)
})
