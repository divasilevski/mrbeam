import { handleErrors } from './core/error'

export default function checkErrors(units: Unit[]) {
  try {
    handleErrors(units)
    return null
  } catch (error) {
    return (error as Error).message
  }
}
