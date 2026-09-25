const UPPER_START = 0x1d468
const LOWER_START = 0x1d482

const A_UPPER = 0x41
const Z_UPPER = 0x5a
const A_LOWER = 0x61
const Z_LOWER = 0x7a

export function toMathSymbol(str: string) {
  return [...str]
    .map((ch) => {
      const code = ch.codePointAt(0)!

      if (code >= A_UPPER && code <= Z_UPPER) {
        return String.fromCodePoint(UPPER_START + (code - A_UPPER))
      }

      if (code >= A_LOWER && code <= Z_LOWER) {
        return String.fromCodePoint(LOWER_START + (code - A_LOWER))
      }

      return ch
    })
    .join('')
}
