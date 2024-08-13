import { IconArrowsUpDown, IconCopy, IconShare } from '@tabler/icons-react'
import { createFileRoute } from '@tanstack/react-router'
import { useCallback, useMemo } from 'react'
import { z } from 'zod'
import { Head } from '../../../components/shared/Head'
import { IconButton } from '../../../components/ui/IconButton'
import { Select } from '../../../components/ui/Select'
import { Textarea } from '../../../components/ui/Textarea'
import { useCopyLink } from '../../../hooks/useCopyLocation'
import { useInputState } from '../../../hooks/useInputState'
import { decodeBase64 } from '../../../utils/base64/decode'
import { encodeBase64 } from '../../../utils/base64/encode'
import { copy } from '../../../utils/clipboard/copy'

const searchParamsValidator = z.object({
  text: z.string().optional(),
  type: z.union([z.literal('encode'), z.literal('decode')]).catch('encode'),
})

export const Route = createFileRoute('/_layout/convert/base64')({
  validateSearch: (search) => searchParamsValidator.parse(search),
  component: () => <Base64 />,
})

const Base64 = () => {
  const { text: initialText, type: initialType } = Route.useSearch()
  const [text, onSetText, setText] = useInputState(initialText ?? '')
  const [type, onSetType, setType] = useInputState(initialType ?? 'encode')
  const { copyLink } = useCopyLink(Route.id)

  const convertedText = useMemo(() => {
    return type === 'encode' ? encodeBase64(text) : decodeBase64(text)
  }, [text, type])

  const handleReverse = useCallback(() => {
    setType((prevType) => (prevType === 'encode' ? 'decode' : 'encode'))
    setText(convertedText)
  }, [setType, convertedText, setText])

  return (
    <>
      <Head title="Base64 converter" />
      <div className="flex flex-col gap-y-8">
        <h1 className="font-bold text-lg">Base64 converter</h1>
        <Textarea value={text} onChange={onSetText} placeholder="Enter text to convert" />
        <div className="flex items-center justify-between">
          <Select value={type} onChange={onSetType} options={['encode', 'decode']} />
          <IconButton icon={IconArrowsUpDown} label="Reverse" onClick={handleReverse} />
        </div>
        <Textarea value={convertedText} readOnly={true} />
        <div className="flex gap-x-2">
          <IconButton
            icon={IconShare}
            label="Copy link"
            disabled={text.trim() === ''}
            onClick={() => copyLink({ text, type })}
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
