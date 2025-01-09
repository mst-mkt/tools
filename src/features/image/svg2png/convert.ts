import { encodeBase64 } from '../../convert/base64/encode'

type ConvertOption = {
  width?: number
  height?: number
}

const toSvgText = async (svg: string | File) => {
  if (typeof svg === 'string') return svg

  if (svg.type !== 'image/svg+xml') {
    throw new Error('Invalid file type')
  }

  return await svg.text()
}

const drawSvg = async (svg: string | File, { width, height }: ConvertOption) => {
  const svgString = await toSvgText(svg)
  const image = new Image()
  image.src = `data:image/svg+xml;base64,${encodeBase64(svgString)}`
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')

  if (context === null) {
    throw new Error('Failed to create canvas context')
  }

  await image.decode()

  const originalWidth = image.width
  const originalHeight = image.height

  const scaleX = width ? width / originalWidth : 1
  const scaleY = height ? height / originalHeight : 1
  const scale = Math.min(scaleX, scaleY)

  const scaledWidth = originalWidth * scale
  const scaledHeight = originalHeight * scale

  canvas.width = width ?? scaledWidth
  canvas.height = height ?? scaledHeight

  const offsetX = (canvas.width - scaledWidth) / 2
  const offsetY = (canvas.height - scaledHeight) / 2

  context.drawImage(image, offsetX, offsetY, scaledWidth, scaledHeight)

  return canvas
}

export const svgToPngDataUrl = async (
  svg: string | File,
  { width, height }: ConvertOption = {},
) => {
  const canvas = await drawSvg(svg, { width, height })
  return canvas.toDataURL()
}

export const svgToPngBlob = async (svg: string | File, { width, height }: ConvertOption) => {
  const canvas = await drawSvg(svg, { width, height })

  return new Promise<Blob>((resolve) => {
    canvas.toBlob((blob) => {
      if (blob === null) {
        throw new Error('Failed to create blob')
      }

      resolve(blob)
    })
  })
}

const svgExtRegex = /\.svg$/
export const svgToPngFile = async (svg: string | File, { width, height }: ConvertOption) => {
  const prevFilename = typeof svg === 'string' ? 'image.svg' : svg.name
  const filename = prevFilename.replace(svgExtRegex, '.png')
  const blob = await svgToPngBlob(svg, { width, height })
  return new File([blob], filename, { type: 'image/png' })
}
