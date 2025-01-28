import { match } from 'ts-pattern'

export type ClipboardDataType =
  | {
      datatype: 'text'
      type: string
      data: string
    }
  | {
      datatype: 'image'
      type: string
      data: File
    }
  | {
      datatype: 'file'
      type: string
      data: File
    }

export const isClipboardDataType = (data: unknown): data is ClipboardDataType => {
  if (typeof data !== 'object' || data === null) return false

  const { datatype, type, data: dataValue } = data as Partial<ClipboardDataType>
  if (typeof datatype !== 'string' || typeof type !== 'string') return false

  return match(datatype)
    .with('text', () => typeof dataValue === 'string')
    .with('image', () => dataValue instanceof File)
    .with('file', () => dataValue instanceof File)
    .otherwise(() => false)
}
