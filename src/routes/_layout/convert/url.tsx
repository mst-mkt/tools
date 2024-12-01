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
import { useMemo, useState } from 'react'
import { z } from 'zod'
import { Head } from '../../../components/shared/Head'
import { useCopyLink } from '../../../hooks/useCopyLocation'
import { useInputState } from '../../../hooks/useInputState'
import { copy } from '../../../utils/clipboard/copy'

const searchParamsValidator = z.object({
  text: z.string().optional(),
  type: z.union([z.literal('encode'), z.literal('decode')]).catch('encode'),
})

export const Route = createFileRoute('/_layout/convert/url')({
  validateSearch: (search) => searchParamsValidator.parse(search),
  component: () => <Url />,
})

const Url = () => {
  const { text: initialText, type: initialType } = Route.useSearch()
  const [text, onSetText, setText] = useInputState(initialText ?? '')
  const [type, setType] = useState(initialType ?? 'encode')
  const { copyLink } = useCopyLink(Route.id)

  const convertedText = useMemo(() => {
    if (type === 'encode') return encodeURIComponent(text)
    if (type === 'decode') return decodeURIComponent(text)
    return text
  }, [text, type])

  const handleReverse = () => {
    setType((prevType) => (prevType === 'encode' ? 'decode' : 'encode'))
    setText(convertedText)
  }

  return (
    <>
      <Head title="URL Encoder / Decoder" />
      <div className="flex flex-col gap-y-8">
        <h1 className="font-bold text-lg">URL Encoder / Decoder</h1>
        <Textarea value={text} onChange={onSetText} placeholder="変換するテキストを入力" />
        <div className="flex items-center justify-between gap-x-4">
          <Select onValueChange={(value: 'encode' | 'decode') => setType(value)} value={type}>
            <SelectTrigger>
              <SelectValue defaultValue={type} />
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
