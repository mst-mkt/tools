import type { JSX } from 'react'
import { isValidElement } from 'react'
import { renderToString } from 'react-dom/server'
import { toast } from 'sonner'
import { P, match } from 'ts-pattern'
import { url, pipe, safeParse, string } from 'valibot'
import { play } from '../lib/snd'

export const copy = async (text: string, html?: string | JSX.Element) => {
  const htmlString = match(html)
    .when(
      (html) => isValidElement(html),
      (html) => renderToString(html),
    )
    .with(P.string, (html) => html)
    .when(
      () => safeParse(pipe(string(), url()), text).success,
      () => `<a href="${text}">${text}</a>`,
    )
    .otherwise(() => undefined)
  const plainTextBlob = new Blob([text], { type: 'text/plain' })
  const htmlBlob =
    htmlString !== undefined ? new Blob([htmlString], { type: 'text/html' }) : undefined

  const clipboardItems = new ClipboardItem({
    'text/plain': plainTextBlob,
    ...(htmlBlob !== undefined && { 'text/html': htmlBlob }),
  })

  try {
    await navigator.clipboard.write([clipboardItems]).catch(async () => {
      await navigator.clipboard.writeText(text)
    })
    toast.success('コピーしました。')
    play.notification()
  } catch {
    toast.error('コピーに失敗しました。')
    play.caution()
  }
}

export const copyFile = async (file: File, type?: string) => {
  const itemType = type ?? file.type
  const blob = new Blob([file], { type: itemType })
  const clipboardItems = new ClipboardItem({ [itemType]: blob })

  try {
    await navigator.clipboard.write([clipboardItems])
    toast.success('画像をコピーしました。')
    play.notification()
  } catch (e) {
    console.error(e)
    toast.error('画像のコピーに失敗しました。')
    play.caution()
  }
}
