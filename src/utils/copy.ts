import type { JSX } from 'react'
import { isValidElement } from 'react'
import { renderToString } from 'react-dom/server'
import { toast } from 'sonner'
import { P, match } from 'ts-pattern'
import { url, pipe, safeParse, string } from 'valibot'
import {} from '../lib/tanstack-router/routeTree.gen'

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
  } catch {
    toast.error('コピーに失敗しました。')
  }
}
