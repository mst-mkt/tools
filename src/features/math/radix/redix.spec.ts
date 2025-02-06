import { describe, expect, it } from 'vitest'
import { isValidBaseN, isValidRadix, transformRadix } from './radix'

describe('基数変換', () => {
  it('10進数を2進数に変換できる', () => {
    const transformed = transformRadix('10', 10, 2)
    expect(transformed).toBe('1010')
  })

  it('10進数を8進数に変換できる', () => {
    const transformed = transformRadix('10', 10, 8)
    expect(transformed).toBe('12')
  })

  it('10進数を16進数に変換できる', () => {
    const transformed = transformRadix('10', 10, 16)
    expect(transformed).toBe('a')
  })

  it('2進数を10進数に変換できる', () => {
    const transformed = transformRadix('1010', 2, 10)
    expect(transformed).toBe('10')
  })

  it('8進数を10進数に変換できる', () => {
    const transformed = transformRadix('12', 8, 10)
    expect(transformed).toBe('10')
  })

  it('16進数を10進数に変換できる', () => {
    const transformed = transformRadix('A', 16, 10)
    expect(transformed).toBe('10')
  })

  it('2進数を8進数に変換できる', () => {
    const transformed = transformRadix('1010', 2, 8)
    expect(transformed).toBe('12')
  })

  it('2進数を16進数に変換できる', () => {
    const transformed = transformRadix('1010', 2, 16)
    expect(transformed).toBe('a')
  })

  it('8進数を2進数に変換できる', () => {
    const transformed = transformRadix('12', 8, 2)
    expect(transformed).toBe('1010')
  })

  it('8進数を16進数に変換できる', () => {
    const transformed = transformRadix('12', 8, 16)
    expect(transformed).toBe('a')
  })

  it('16進数を2進数に変換できる', () => {
    const transformed = transformRadix('A', 16, 2)
    expect(transformed).toBe('1010')
  })

  it('16進数を8進数に変換できる', () => {
    const transformed = transformRadix('A', 16, 8)
    expect(transformed).toBe('12')
  })
})

describe('基数の範囲', () => {
  it('基数が2以上の場合はfalse', () => {
    const isValid = isValidRadix(1)
    expect(isValid).toBeFalsy()
  })

  it('基数が36以下の場合はfalse', () => {
    const isValid = isValidRadix(37)
    expect(isValid).toBeFalsy()
  })

  it('基数が2以上かつ36以下の場合はtrue', () => {
    const isValid = isValidRadix(10)
    expect(isValid).toBeTruthy()
  })

  it('奇数の入力がNaNの場合はfalse', () => {
    const isValid = isValidRadix(Number.NaN)
    expect(isValid).toBeFalsy()
  })

  it('文字列の入力がNaNの場合はfalse', () => {
    const isValid = isValidRadix('a')
    expect(isValid).toBeFalsy()
  })

  it('文字列の入力が2以上かつ36以下の場合はtrue', () => {
    const isValid = isValidRadix('10')
    expect(isValid).toBeTruthy()
  })
})

describe('正しいn進数かどうかの判定', () => {
  it('正しい2進数の場合はtrue', () => {
    const isValid = isValidBaseN('1010', 2)
    expect(isValid).toBeTruthy()
  })

  it('誤った2進数の場合はfalse', () => {
    const isValid = isValidBaseN('1020', 2)
    expect(isValid).toBeFalsy()
  })

  it('正しい8進数の場合はtrue', () => {
    const isValid = isValidBaseN('17', 8)
    expect(isValid).toBeTruthy()
  })

  it('誤った8進数の場合はfalse', () => {
    const isValid = isValidBaseN('18', 8)
    expect(isValid).toBeFalsy()
  })

  it('正しい10進数の場合はtrue', () => {
    const isValid = isValidBaseN('10', 10)
    expect(isValid).toBeTruthy()
  })

  it('誤った10進数の場合はfalse', () => {
    const isValid = isValidBaseN('a', 10)
    expect(isValid).toBeFalsy()
  })

  it('正しい16進数の場合はtrue', () => {
    const isValid = isValidBaseN('a', 16)
    expect(isValid).toBeTruthy()
  })

  it('誤った16進数の場合はfalse', () => {
    const isValid = isValidBaseN('g', 16)
    expect(isValid).toBeFalsy()
  })

  it('正しい36進数の場合はtrue', () => {
    const isValid = isValidBaseN('z', 36)
    expect(isValid).toBeTruthy()
  })

  it('誤った36進数の場合はfalse', () => {
    const isValid = isValidBaseN(';', 36)
    expect(isValid).toBeFalsy()
  })

  it('空文字列の場合はtrue', () => {
    const isValid = isValidBaseN('', 10)
    expect(isValid).toBeTruthy()
  })
})
