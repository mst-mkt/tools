export const convertRadix = (number: string, from: number, to: number) => {
  try {
    return Number.parseInt(number, from).toString(to)
  } catch {
    return ''
  }
}
