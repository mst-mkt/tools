import { describe, expect, it } from 'vitest'
import { testEmpty, testPngMini, testText, testTextJa } from '../../../__tests__/files'
import { decodeBase64, decodeBase64ToFile } from './decode'
import { encodeBase64 } from './encode'

describe('文字列のbase64デコード', () => {
  it('base64エンコードされた文字列をデコードできる', () => {
    const encoded = 'aGVsbG8gd29ybGQ='
    const text = decodeBase64(encoded)
    expect(text).toBe('hello world')
  })

  it('空文字列をデコードできる', () => {
    const encoded = ''
    const text = decodeBase64(encoded)
    expect(text).toBe('')
  })

  it('日本語をデコードできる', () => {
    const encoded = '44GT44KT44Gr44Gh44Gv'
    const text = decodeBase64(encoded)
    expect(text).toBe('こんにちは')
  })

  it('特殊文字をデコードできる', () => {
    const encoded = 'ISIjJCUmJygpKissLS4vOjs8PT4/QFtcXV5fYHt8fX4='
    const text = decodeBase64(encoded)
    expect(text).toBe('!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~')
  })

  it('改行をデコードできる', () => {
    const encoded = 'aGVsbG8Kd29ybGQ='
    const text = decodeBase64(encoded)
    expect(text).toBe('hello\nworld')
  })

  it('タブをデコードできる', () => {
    const encoded = 'aGVsbG8Jd29ybGQ='
    const text = decodeBase64(encoded)
    expect(text).toBe('hello\tworld')
  })

  it('スペースをデコードできる', () => {
    const encoded = 'aGVsbG8gd29ybGQ='
    const text = decodeBase64(encoded)
    expect(text).toBe('hello world')
  })

  it('制御文字をデコードできる', () => {
    const encoded = 'AAECAwQFBgcICQoLDA0ODw=='
    const text = decodeBase64(encoded)
    expect(text).toBe('\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b\x0c\x0d\x0e\x0f')
  })

  it('デコードした文字列をエンコードできる', () => {
    const text =
      'hello world, こんにちは, !"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~, \n, \t, \x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b\x0c\x0d\x0e\x0f'
    const encoded = encodeBase64(text)
    const decoded = decodeBase64(encoded)

    expect(decoded).toBe(text)
  })
})

describe('ファイルのbase64デコード', () => {
  it('base64エンコードされたテキストファイルをデコードできる', async () => {
    const { file, base64 } = testText
    const dataUrl = `data:${file.type};base64,${base64}`

    const decoded = decodeBase64ToFile(dataUrl, file.name)

    expect(decoded.name).toBe(file.name)
    expect(decoded.type).toBe(file.type)
    expect(decoded.size).toBe(file.size)

    const decodedArrayBuffer = await decoded.arrayBuffer()
    const originalArrayBuffer = await file.arrayBuffer()

    expect(decodedArrayBuffer).toEqual(originalArrayBuffer)
  })

  it('base64エンコードされた日本語テキストファイルをデコードできる', async () => {
    const { file, base64 } = testTextJa
    const dataUrl = `data:${file.type};base64,${base64}`
    const decoded = decodeBase64ToFile(dataUrl, file.name)

    expect(decoded.name).toBe(file.name)
    expect(decoded.type).toBe(file.type)
    expect(decoded.size).toBe(file.size)

    const decodedArrayBuffer = await decoded.arrayBuffer()
    const originalArrayBuffer = await file.arrayBuffer()

    expect(decodedArrayBuffer).toEqual(originalArrayBuffer)
  })

  it('base64エンコードされた空文字列ファイルをデコードできる', async () => {
    const { file, base64 } = testEmpty
    const decoded = decodeBase64ToFile(base64, file.name)

    expect(decoded.name).toBe(file.name)
    expect(decoded.type).toBe(file.type)
    expect(decoded.size).toBe(file.size)

    const decodedArrayBuffer = await decoded.arrayBuffer()
    const originalArrayBuffer = await file.arrayBuffer()

    expect(decodedArrayBuffer).toEqual(originalArrayBuffer)
  })

  it('base64エンコードされた画像ファイルをデコードできる', async () => {
    const { file, base64 } = testPngMini
    const imageDataUrl = `data:${file.type};base64,${base64}`
    const decoded = decodeBase64ToFile(imageDataUrl, file.name)

    expect(decoded.name).toBe(file.name)
    expect(decoded.type).toBe(file.type)
    expect(decoded.size).toBe(file.size)

    const decodedArrayBuffer = await decoded.arrayBuffer()
    const originalArrayBuffer = await file.arrayBuffer()
    expect(decodedArrayBuffer).toEqual(originalArrayBuffer)
  })
})
