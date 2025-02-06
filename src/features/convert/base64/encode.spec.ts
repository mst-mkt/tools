import { describe, expect, it } from 'vitest'
import { testEmpty, testPngMini, testText, testTextJa } from '../../../__tests__/files'
import { decodeBase64 } from './decode'
import { encodeBase64, encodeBase64FromFile } from './encode'

describe('文字列のbase64エンコード', () => {
  it('文字列をbase64エンコードできる', () => {
    const text = 'hello world'
    const encoded = encodeBase64(text)
    expect(encoded).toBe('aGVsbG8gd29ybGQ=')
  })

  it('空文字列をbase64エンコードできる', () => {
    const text = ''
    const encoded = encodeBase64(text)
    expect(encoded).toBe('')
  })

  it('日本語をbase64エンコードできる', () => {
    const text = 'こんにちは'
    const encoded = encodeBase64(text)
    expect(encoded).toBe('44GT44KT44Gr44Gh44Gv')
  })

  it('特殊文字をbase64エンコードできる', () => {
    const text = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'
    const encoded = encodeBase64(text)
    expect(encoded).toBe('ISIjJCUmJygpKissLS4vOjs8PT4/QFtcXV5fYHt8fX4=')
  })

  it('改行をbase64エンコードできる', () => {
    const text = 'hello\nworld'
    const encoded = encodeBase64(text)
    expect(encoded).toBe('aGVsbG8Kd29ybGQ=')
  })

  it('タブをbase64エンコードできる', () => {
    const text = 'hello\tworld'
    const encoded = encodeBase64(text)
    expect(encoded).toBe('aGVsbG8Jd29ybGQ=')
  })

  it('スペースをbase64エンコードできる', () => {
    const text = 'hello world'
    const encoded = encodeBase64(text)
    expect(encoded).toBe('aGVsbG8gd29ybGQ=')
  })

  it('制御文字をbase64エンコードできる', () => {
    const text = '\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b\x0c\x0d\x0e\x0f'
    const encoded = encodeBase64(text)
    expect(encoded).toBe('AAECAwQFBgcICQoLDA0ODw==')
  })

  it('エンコードした文字列をデコードできる', () => {
    const text =
      'hello world, こんにちは, !"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~, \n, \t, \x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b\x0c\x0d\x0e\x0f'
    const encoded = encodeBase64(text)
    const decoded = decodeBase64(encoded)

    expect(decoded).toBe(text)
  })
})

describe('ファイルのbase64エンコード', () => {
  it('ファイルをbase64エンコードできる', async () => {
    const { file, base64 } = testText
    const encoded = await encodeBase64FromFile(file)
    expect(encoded).toBe(base64)
  })

  it('日本語ファイルをbase64エンコードできる', async () => {
    const { file, base64 } = testTextJa
    const encoded = await encodeBase64FromFile(file)
    expect(encoded).toBe(base64)
  })

  it('空ファイルをbase64エンコードできる', async () => {
    const { file, base64 } = testEmpty
    const encoded = await encodeBase64FromFile(file)
    expect(encoded).toBe(base64)
  })

  it('画像ファイルをbase64エンコードできる', async () => {
    const { file, base64 } = testPngMini
    const encoded = await encodeBase64FromFile(file)
    expect(encoded).toBe(base64)
  })
})
