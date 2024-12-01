import punycode from 'punycode'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { createFileRoute } from '@tanstack/react-router'
import { ArrowUpDown, Copy, Share } from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'
import { match } from 'ts-pattern'
import { z } from 'zod'
import { Head } from '../../../components/shared/Head'
import { useCopyLink } from '../../../hooks/useCopyLocation'
import { useInputState } from '../../../hooks/useInputState'
import { copy } from '../../../utils/clipboard/copy'

const searchParamsValidator = z.object({
  text: z.string().optional(),
  type: z.union([z.literal('encode'), z.literal('decode')]).catch('encode'),
})

export const Route = createFileRoute('/_layout/convert/punycode')({
  validateSearch: (search) => searchParamsValidator.parse(search),
  component: () => <Punycode />,
})

const Punycode = () => {
  const { text: initialText, type: initialType } = Route.useSearch()
  const [text, onSetText, setText] = useInputState(initialText ?? '')
  const [type, setType] = useState(initialType ?? 'encode')
  const { copyLink } = useCopyLink(Route.id)

  const convert = useCallback(
    (text: string) => {
      return match(type)
        .with('encode', () => punycode.toASCII(text))
        .with('decode', () => punycode.toUnicode(text))
        .exhaustive()
    },
    [type],
  )

  const convertedText = useMemo(() => {
    const isUrl = text.startsWith('http://') || text.startsWith('https://')
    if (!isUrl) return convert(text)

    const [protocol, url] = text.split('://')
    const [host, ...path] = url?.split('/') ?? []
    const converted = convert(host ?? '')
    const urlPath = [converted, ...path].filter((text) => text !== '').join('/')
    return `${protocol}://${urlPath}`
  }, [text, convert])

  const handleReverse = () => {
    setType((prevType) => (prevType === 'encode' ? 'decode' : 'encode'))
    setText(convertedText)
  }

  return (
    <>
      <Head title="Punycode converter" />
      <div className="flex flex-col gap-y-8">
        <h1 className="font-bold text-lg">Punycode 変換</h1>
        <Textarea value={text} onChange={onSetText} placeholder="変換するテキストを入力" />
        <div className="flex items-center justify-between gap-x-4">
          <Select value={type} onValueChange={(value: 'encode' | 'decode') => setType(value)}>
            <SelectTrigger>
              <SelectValue defaultValue="encode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="encode">Encode</SelectItem>
              <SelectItem value="decode">Decode</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleReverse}>
            <ArrowUpDown />
            Reverse
          </Button>
        </div>
        <Textarea value={convertedText} readOnly={true} placeholder="変換したテキスト" />
        <div className="flex gap-x-2">
          <Button onClick={() => copyLink({ text, type })} disabled={text.trim() === ''}>
            <Share />
            Share Link
          </Button>
          <Button onClick={() => copy(convertedText)} disabled={convertedText.trim() === ''}>
            <Copy />
            Copy Result
          </Button>
        </div>
      </div>
    </>
  )
}
