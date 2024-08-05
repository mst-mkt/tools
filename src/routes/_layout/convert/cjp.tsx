import { IconCopy, IconShare } from '@tabler/icons-react'
import { createFileRoute } from '@tanstack/react-router'
import { generate } from 'cjp'
import { useMemo } from 'react'
import { z } from 'zod'
import { Head } from '../../../components/shared/Head'
import { IconButton } from '../../../components/ui/IconButton'
import { Textarea } from '../../../components/ui/Textarea'
import { useCopyLink } from '../../../hooks/useCopyLocation'
import { useInputState } from '../../../hooks/useInputState'
import { copy } from '../../../utils/clipboard/copy'

const searchParamsValidator = z.object({
  text: z.string().optional(),
})

export const Route = createFileRoute('/_layout/convert/cjp')({
  validateSearch: (search) => searchParamsValidator.parse(search),
  component: () => <Cjp />,
})

const Cjp = () => {
  const { text: initialText } = Route.useSearch()
  const [text, setText] = useInputState(initialText ?? '')
  const { copyLink } = useCopyLink(Route.id)

  const cjpText = useMemo(() => generate(text), [text])

  return (
    <>
      <Head title="CJP converter" />
      <div className="it flex flex-col gap-y-8">
        <h1 className="font-bold text-lg">怪レい日本语 変換</h1>
        <div className="flex flex-col gap-y-2">
          <h2 className="text-sm">日本語</h2>
          <Textarea
            value={text}
            onChange={setText}
            placeholder="変換する日本語を入力"
            aria-label="変換する日本語を入力"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <h2 className="text-sm">怪レい日本语</h2>
          <Textarea
            value={cjpText}
            readOnly={true}
            placeholder="変換した怪レい日本语"
            aria-label="変換した怪レい日本语"
          />
        </div>
      </div>
      <div className="flex gap-x-2">
        <IconButton
          icon={IconShare}
          label="Share Link"
          onClick={() => copyLink({ text })}
          disabled={text.trim() === ''}
        />
        <IconButton
          icon={IconCopy}
          label="Copy Result"
          onClick={() => copy(cjpText)}
          disabled={cjpText.trim() === ''}
        />
      </div>
    </>
  )
}
