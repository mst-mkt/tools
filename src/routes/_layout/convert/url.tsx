import { IconArrowsUpDown, IconCopy, IconShare } from '@tabler/icons-react'
import { createFileRoute } from '@tanstack/react-router'
import { useMemo } from 'react'
import { z } from 'zod'
import { Head } from '../../../components/shared/Head'
import { IconButton } from '../../../components/ui/IconButton'
import { Select } from '../../../components/ui/Select'
import { Textarea } from '../../../components/ui/Textarea'
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
  const [type, onSetType, setType] = useInputState(initialType ?? 'encode')
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
        <div className="flex items-center justify-between">
          <Select value={type} onChange={onSetType} options={['encode', 'decode']} />
          <IconButton icon={IconArrowsUpDown} label="Reverse" onClick={handleReverse} />
        </div>
        <Textarea value={convertedText} readOnly={true} placeholder="変換したテキスト" />
        <div className="flex gap-x-2">
          <IconButton
            icon={IconShare}
            label="Share Link"
            onClick={() => copyLink({ text, type })}
            disabled={text.trim() === ''}
          />
          <IconButton
            icon={IconCopy}
            label="Copy Result"
            onClick={() => copy(convertedText)}
            disabled={convertedText.trim() === ''}
          />
        </div>
      </div>
    </>
  )
}
