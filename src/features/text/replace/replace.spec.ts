import { describe, expect, it } from 'vitest'
import { replaceText } from './replace'
import type { ReplaceRule } from './rules'

describe('文字列置換', () => {
  it('単一のルールで文字列を置換できる', () => {
    const text = 'hello world'
    const rules: ReplaceRule[] = [{ from: 'hello', to: 'hi' }]
    const result = replaceText(text, rules)
    expect(result).toBe('hi world')
  })

  it('複数のルールで文字列を置換できる', () => {
    const text = 'hello world'
    const rules: ReplaceRule[] = [
      { from: 'hello', to: 'hi' },
      { from: 'world', to: 'everyone' },
    ]
    const result = replaceText(text, rules)
    expect(result).toBe('hi everyone')
  })

  it('置換が連続して行われる', () => {
    const text = 'ababab'
    const rules: ReplaceRule[] = [
      { from: 'ab', to: 'cd' },
      { from: 'cd', to: 'ef' },
    ]
    const result = replaceText(text, rules)
    expect(result).toBe('efefef')
  })

  it('置換が行われない場合は元の文字列が返る', () => {
    const text = 'unchanged text'
    const rules: ReplaceRule[] = []
    const result = replaceText(text, rules)
    expect(result).toBe('unchanged text')
  })

  it('空文字列に対して置換が行われる', () => {
    const text = ''
    const rules: ReplaceRule[] = [{ from: 'a', to: 'b' }]
    const result = replaceText(text, rules)
    expect(result).toBe('')
  })

  it('fromが空文字列の場合は何もしない', () => {
    const text = 'hello world'
    const rules: ReplaceRule[] = [{ from: '', to: 'test' }]
    const result = replaceText(text, rules)
    expect(result).toBe('hello world')
  })

  it('toが空文字列の場合はfromにマッチした文字列を削除する', () => {
    const text = 'abcde'
    const rules: ReplaceRule[] = [{ from: 'c', to: '' }]
    const result = replaceText(text, rules)
    expect(result).toBe('abde')
  })
})
