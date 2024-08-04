import type { JSX } from 'react'
import { isValidElement } from 'react'
import { renderToString } from 'react-dom/server'
import { P, match } from 'ts-pattern'
import { z } from 'zod'

export const copy = async (text: string, html?: string | JSX.Element) => {
  const htmlString = match(html)
    .when(
      (html) => isValidElement(html),
      (html) => renderToString(html),
    )
    .with(P.string, (html) => html)
    .when(
      () => z.string().url().safeParse(text).success,
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

  await navigator.clipboard.write([clipboardItems]).catch(async () => {
    await navigator.clipboard.writeText(text)
  })
}
