import { IconLoader2 } from '@tabler/icons-react'
import { type FC, useEffect, useMemo, useState } from 'react'
import { type Highlighter, createHighlighter } from 'shiki'
import { useTheme } from '../../hooks/useTheme'

type CodeProps = {
  code: string
  lang?: string
}

export const Code: FC<CodeProps> = ({ code, lang = 'ts' }) => {
  const [highlighter, setHighlighter] = useState<Highlighter | null>(null)
  const { theme } = useTheme()

  useEffect(() => {
    createHighlighter({
      themes: ['github-dark', 'github-light'],
      langs: [lang],
    }).then(setHighlighter)
  }, [lang])

  const codeTheme = useMemo(() => {
    return theme === 'dark' ? 'github-dark' : 'github-light'
  }, [theme])

  const html = useMemo(() => {
    const htmlSting = highlighter?.codeToHtml(code, {
      lang,
      theme: codeTheme,
    })
    if (htmlSting === undefined) return null

    const html = new DOMParser().parseFromString(htmlSting, 'text/html')
    const pre = html.querySelector('pre')
    if (pre !== null) {
      pre.tabIndex = -1
    }
    return html.body.innerHTML
  }, [highlighter, code, lang, codeTheme])

  if (html == null) {
    return (
      <div className="flex w-full items-center justify-center">
        <IconLoader2 className="animate-spin text-accent" />
      </div>
    )
  }

  return (
    <div
      // biome-ignore lint/security/noDangerouslySetInnerHtml: embed html generated by shiki
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
