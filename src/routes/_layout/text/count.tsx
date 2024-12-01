import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { Textarea } from '@/components/ui/textarea'
import { createFileRoute } from '@tanstack/react-router'
import { Copy, Share } from 'lucide-react'
import { type JSX, useCallback, useMemo } from 'react'
import twitterText from 'twitter-text'
import { z } from 'zod'
import { Head } from '../../../components/shared/Head'
import { useCopyLink } from '../../../hooks/useCopyLocation'
import { useInputState } from '../../../hooks/useInputState'
import { copy } from '../../../utils/clipboard/copy'

const searchParamsValidator = z.object({
  text: z.string().optional(),
})

export const Route = createFileRoute('/_layout/text/count')({
  validateSearch: (search) => searchParamsValidator.parse(search),
  component: () => <Counter />,
})

const Counter = () => {
  const { text: initialText } = Route.useSearch()
  const { copyLink } = useCopyLink(Route.id)
  const [text, setText] = useInputState(initialText ?? '')

  const countWithIntlSegmenter = useCallback(
    (text: string, granularity: 'grapheme' | 'word' | 'sentence') => {
      const segmenter = new Intl.Segmenter('ja', { granularity })
      const segments = segmenter.segment(text)
      return [...segments].length
    },
    [],
  )

  const textLengths = useMemo(
    () => ({
      characters: countWithIntlSegmenter(text, 'grapheme'),
      charactersWithoutSpaces: countWithIntlSegmenter(text.replace(/\s/g, ''), 'grapheme'),
      charactersForTwitter: twitterText.getTweetLength(text) / 2,
      words: countWithIntlSegmenter(text, 'word'),
      lines: text.split('\n').length,
      linesWithoutEmpty: text.split('\n').filter((line) => line.trim() !== '').length,
      sentences: countWithIntlSegmenter(text, 'sentence'),
      stringLength: text.length,
      stringLengthWithoutSpeces: text.replace(/\s/g, '').length,
      bytes: new TextEncoder().encode(text).length,
    }),
    [countWithIntlSegmenter, text],
  )

  const labels = useMemo<Record<string, string>>(
    () => ({
      characters: '文字数',
      charactersWithoutSpaces: '文字数 (空白,改行抜き)',
      charactersForTwitter: '文字数 (Twitter方式)',
      words: '単語数',
      sentences: '文章数',
      lines: '行数',
      linesWithoutEmpty: '行数 (空行抜き)',
      stringLength: '文字列長',
      stringLengthWithoutSpeces: '文字列長 (空白抜き)',
      bytes: 'バイト数',
    }),
    [],
  )

  const copyData = useMemo<[string, JSX.Element]>(() => {
    const plainText = Object.entries(textLengths)
      .map(([key, value]: [string, number]) => `${labels[key] ?? key}: ${value}`)
      .join('\n')
    const htmlData = (
      <table>
        <tbody>
          {Object.entries(textLengths).map(([key, value]: [string, number]) => (
            <tr key={key}>
              <td>{labels[key] ?? key}</td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
    return [plainText, htmlData]
  }, [labels, textLengths])

  return (
    <>
      <Head title="Text Counter" />
      <div className="flex flex-col gap-y-8">
        <div className="flex flex-col gap-y-2">
          <h1 className="font-bold text-lg">文字数カウント</h1>
          <Textarea
            value={text}
            onChange={setText}
            placeholder="カウントする文字列を入力"
            aria-label="カウントする文字列を入力"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <h2 className="font-bold">カウント結果</h2>
          <Table>
            <TableBody>
              {Object.entries(textLengths).map(([key, value]: [string, number]) => (
                <TableRow key={key}>
                  <TableCell>{labels[key] ?? key}</TableCell>
                  <TableCell>{value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex gap-x-2">
          <Button onClick={() => copyLink({ text })} disabled={text.length === 0}>
            <Share />
            Share Link
          </Button>
          <Button onClick={() => copy(...copyData)} disabled={text.length === 0}>
            <Copy />
            Copy Result
          </Button>
        </div>
      </div>
    </>
  )
}
