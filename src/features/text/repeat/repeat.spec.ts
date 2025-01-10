import { describe, expect, it } from 'vitest'
import { repeat } from './repeat'

describe('文字列繰り返し', () => {
  it('指定回数だけ文字列を繰り返す', () => {
    const text = 'a'
    const count = 3
    const result = repeat(text, count)
    expect(result).toBe('aaa')
  })

  it('繰り返し回数が0の場合は空文字列を返す', () => {
    const text = 'a'
    const count = 0
    const result = repeat(text, count)
    expect(result).toBe('')
  })

  it('空文字列を繰り返す', () => {
    const text = ''
    const count = 3
    const result = repeat(text, count)
    expect(result).toBe('')
  })

  it('負の回数の場合は空文字列を返す', () => {
    const text = 'a'
    const count = -1
    const result = repeat(text, count)
    expect(result).toBe('')
  })
})
