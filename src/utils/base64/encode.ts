export const encodeBase64 = (text: string) => {
  const encoder = new TextEncoder()
  const unit8Array = encoder.encode(text)
  const latin1Uint8Array = [...unit8Array].map((byte) => String.fromCharCode(byte)).join('')
  const base64String = btoa(latin1Uint8Array)
  return base64String
}
