import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

export const testSvg = (() => {
  const path = resolve(__dirname, 'test_svg.svg')
  const content = readFileSync(path, 'utf-8')
  const base64 = Buffer.from(content).toString('base64')
  const blob = new Blob([content], { type: 'image/svg+xml' })
  const file = new File([blob], 'test_svg.svg', { type: 'image/svg+xml' })

  return { base64, file }
})()

export const testPngMini = (() => {
  const path = resolve(__dirname, 'test_image_64.png')
  const content = readFileSync(path, 'utf-8')
  const base64 = Buffer.from(content).toString('base64')
  const blob = new Blob([content], { type: 'image/png' })
  const file = new File([blob], 'test_image_64.png', { type: 'image/png' })

  return { base64, file }
})()

export const testPngLarge = (() => {
  const path = resolve(__dirname, 'test_image_256.png')
  const content = readFileSync(path, 'utf-8')
  const base64 = Buffer.from(content).toString('base64')
  const blob = new Blob([content], { type: 'image/png' })
  const file = new File([blob], 'test_image_256.png', { type: 'image/png' })

  return { base64, file }
})()

export const testText = (() => {
  const path = resolve(__dirname, 'test_text.txt')
  const content = readFileSync(path, 'utf-8')
  const base64 = Buffer.from(content).toString('base64')
  const blob = new Blob([content], { type: 'text/plain' })
  const file = new File([blob], 'test_text.txt', { type: 'text/plain' })

  return { base64, file }
})()

export const testTextJa = (() => {
  const path = resolve(__dirname, 'test_text_ja.txt')
  const content = readFileSync(path, 'utf-8')
  const base64 = Buffer.from(content).toString('base64')
  const blob = new Blob([content], { type: 'text/plain' })
  const file = new File([blob], 'test_text_ja.txt', { type: 'text/plain' })

  return { base64, file }
})()

export const testEmpty = (() => {
  const path = resolve(__dirname, 'test_empty')
  const content = readFileSync(path, 'utf-8')
  const base64 = Buffer.from(content).toString('base64')
  const blob = new Blob([content], { type: 'text/plain' })
  const file = new File([blob], 'test_empty', { type: 'text/plain' })

  return { base64, file }
})()
