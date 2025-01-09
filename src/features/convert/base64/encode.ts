export const encodeBase64 = (text: string) => {
  const encoder = new TextEncoder()
  const unit8Array = encoder.encode(text)
  const latin1Uint8Array = [...unit8Array].map((byte) => String.fromCharCode(byte)).join('')
  const base64String = btoa(latin1Uint8Array)
  return base64String
}

export const encodeBase64FromFile = async (file: File) => {
  const fileArrayBuffer = await file.arrayBuffer()
  const unit8Array = new Uint8Array(fileArrayBuffer)
  const latin1Uint8Array = [...unit8Array].map((byte) => String.fromCharCode(byte)).join('')
  const base64String = btoa(latin1Uint8Array)
  return base64String
}
