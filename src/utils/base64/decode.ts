export const decodeBase64 = (base64String: string) => {
  const latin1Uint8Array = atob(base64String)
  const unit8Array = new Uint8Array([...latin1Uint8Array].map((char) => char.charCodeAt(0)))
  const decoder = new TextDecoder()
  const text = decoder.decode(unit8Array)
  return text
}

export const decodeBase64ToFile = (base64String: string, fileName: string) => {
  const latin1Uint8Array = atob(base64String)
  const unit8Array = new Uint8Array([...latin1Uint8Array].map((char) => char.charCodeAt(0)))
  const file = new File([unit8Array], fileName)
  return file
}
