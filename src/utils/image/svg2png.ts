export const svg2Png = async (svg: File, size = 512) => {
  const svgText = await svg.text()

  const svgBlob = new Blob([svgText], { type: 'image/svg+xml' })
  const svgUrl = URL.createObjectURL(svgBlob)

  const img = new Image()
  img.src = svgUrl

  await new Promise((resolve, reject) => {
    img.onload = resolve
    img.onerror = reject
  })

  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')

  if (ctx === null) throw new Error('Failed to get 2D context')
  ctx.drawImage(img, 0, 0)

  const pngBlob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob((blob) => resolve(blob), 'image/png'),
  )
  if (pngBlob === null) throw new Error('Failed to generate PNG Blob')

  const filenameWithoutExtension = svg.name.split('.').slice(0, -1).join('.')
  return new File([pngBlob], `${filenameWithoutExtension}.png`, {
    type: 'image/png',
  })
}
