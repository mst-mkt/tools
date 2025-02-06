export const repeat = (text: string, count: number) => {
  if (count <= 0) return ''
  return text.repeat(count)
}
