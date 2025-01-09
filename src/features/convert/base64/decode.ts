export const decodeBase64 = (base64String: string) => {
  const latin1Uint8Array = atob(base64String)
  const unit8Array = new Uint8Array([...latin1Uint8Array].map((char) => char.charCodeAt(0)))
  const decoder = new TextDecoder()
  const text = decoder.decode(unit8Array)
  return text
}

const dataUrlPattern = /^data:(?<mediaType>[^;]+);base64,(?<base64String>.+)$/
const parseDataUrl = (dataUrl: string) => {
  const match = dataUrlPattern.exec(dataUrl)
  if (match === null) return { mediaType: 'text/plain', base64: dataUrl }

  const mediaType = match.groups?.mediaType ?? 'text/plain'
  const base64 = match.groups?.base64String ?? ''

  return { mediaType, base64 }
}

export const decodeBase64ToFile = (base64String: string, fileName: string) => {
  const { mediaType, base64 } = parseDataUrl(base64String)
  const latin1Uint8Array = atob(base64)
  const unit8Array = new Uint8Array([...latin1Uint8Array].map((char) => char.charCodeAt(0)))
  const file = new File([unit8Array], fileName, { type: mediaType })
  return file
}
