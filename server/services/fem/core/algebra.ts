export function randInt(start: number, end: number): number {
  const random = start - 0.5 + Math.random() * (end - start + 1)
  return Math.round(random)
}

export function shuffleArray<T>(array: Array<T>): Array<T> {
  let length = array.length
  let element: T, index: number

  while (length) {
    index = Math.floor(Math.random() * length--)
    element = array[length]
    array[length] = array[index]
    array[index] = element
  }

  return array
}

export function solve(matrix: number[][], vector: number[]): number[] {
  // size
  const n = matrix.length

  // create SLAU
  for (let i = 0; i < n; i++) matrix[i].push(vector[i])

  // go along the diagonal elements
  for (let i = 0; i < n; i++) {
    // make diagonal equal one
    if (matrix[i][i] !== 1) {
      const aii = matrix[i][i]
      for (let j = 0; j < n + 1; j++) matrix[i][j] /= aii
    }

    // change the other lines
    for (let j = 0; j < n; j++) {
      if (j === i || matrix[j][i] === 0) continue

      const aji = matrix[j][i]
      for (let k = i; k < n + 1; k++) {
        matrix[j][k] -= matrix[i][k] * aji
      }
    }
  }

  return matrix.map((element) => element[n])
}

export function multiply(matrix: number[][], vector: number[]): number[] {
  let sum: number
  const result: number[] = []
  for (let i = 0; i < matrix.length; i++) {
    sum = 0
    for (let j = 0; j < matrix[0].length; j++) {
      sum += matrix[i][j] * vector[j]
    }
    result.push(sum)
  }
  return result
}
