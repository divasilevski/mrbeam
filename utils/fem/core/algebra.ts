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
  // Just make a single matrix
  for (let i = 0; i < matrix.length; i++) {
    matrix[i].push(vector[i])
  }
  const n = matrix.length

  for (let i = 0; i < n; i++) {
    // Search for maximum in this column
    let maxEl = Math.abs(matrix[i][i])
    let maxRow = i

    for (let k = i + 1; k < n; k++) {
      if (Math.abs(matrix[k][i]) > maxEl) {
        maxEl = Math.abs(matrix[k][i])
        maxRow = k
      }
    }

    // Swap maximum row with current row (column by column)
    for (let k = i; k < n + 1; k++) {
      const tmp = matrix[maxRow][k]
      matrix[maxRow][k] = matrix[i][k]
      matrix[i][k] = tmp
    }

    // Make all rows below this one 0 in current column
    for (let k = i + 1; k < n; k++) {
      const c = -matrix[k][i] / matrix[i][i]
      for (let j = i; j < n + 1; j++) {
        if (i === j) {
          matrix[k][j] = 0
        } else {
          matrix[k][j] += c * matrix[i][j]
        }
      }
    }
  }

  function fillArray(i: number, n: number, v: number) {
    const a = []
    for (; i < n; i++) {
      a.push(v)
    }
    return a
  }

  // Solve equation Ax=b for an upper triangular matrix A
  const x = fillArray(0, n, 0)

  for (let i = n - 1; i > -1; i--) {
    x[i] = matrix[i][n] / matrix[i][i]
    for (let k = i - 1; k > -1; k--) {
      matrix[k][n] -= matrix[k][i] * x[i]
    }
  }

  return x
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
