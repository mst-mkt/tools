export const transformRadix = (value: string, from: number, to: number) => {
  try {
    const decimalValue = Number.parseInt(value, from)
    if (Number.isNaN(decimalValue)) throw new Error('Invalid input')
    const transformedString = decimalValue.toString(to)
    return transformedString
  } catch {
    return ''
  }
}

export const isValidRadix = (value: string | number) => {
  if (typeof value === 'number') return value >= 2 && value <= 36

  const radix = Number.parseInt(value, 10)
  const isValid = [!Number.isNaN(radix), radix >= 2, radix <= 36].every(Boolean)

  return isValid
}

export const isValidBaseN = (value: string, radix: number) => {
  return value.split('').every((char) => {
    const v = Number.parseInt(char, 36)
    return !Number.isNaN(v) && v < radix
  })
}
