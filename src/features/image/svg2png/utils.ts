export const computeAspectRatio = (height: number, width: number) => {
  const aspectRatio = width / height

  const isInvalidAspectRatio = [
    Number.isNaN(aspectRatio),
    [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY].includes(aspectRatio),
    aspectRatio <= 0,
  ].some(Boolean)

  return isInvalidAspectRatio ? undefined : aspectRatio
}

export const getNumberValue = (value: number | number[] | string) => {
  if (typeof value === 'string') {
    try {
      return Number.parseFloat(value)
    } catch {
      return 0
    }
  }
  return Array.isArray(value) ? (value[0] ?? 0) : value
}

export const getSvgSize = async (svg: File) => {
  if (svg.type !== 'image/svg+xml') {
    throw new Error('Invalid file type')
  }

  const svgText = await svg.text()
  const parser = new DOMParser()
  const doc = parser.parseFromString(svgText, 'image/svg+xml')
  const svgElement = doc.documentElement

  const widthString = svgElement.getAttribute('width')
  const heightString = svgElement.getAttribute('height')

  if (widthString === null || heightString === null) return

  const width = Number.parseFloat(widthString)
  const height = Number.parseFloat(heightString)

  return { width, height }
}

export const getSvgAspectRatio = async (svg: File) => {
  const svgSize = await getSvgSize(svg)
  if (svgSize === undefined) return

  return computeAspectRatio(svgSize.height, svgSize.width)
}
