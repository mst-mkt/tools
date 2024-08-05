export const toPascalCase = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}
