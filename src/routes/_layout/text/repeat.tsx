import { IconCopy, IconShare } from '@tabler/icons-react'
import { createFileRoute } from '@tanstack/react-router'
import { useMemo } from 'react'
import { z } from 'zod'
import { Head } from '../../../components/shared/Head'
import { IconButton } from '../../../components/ui/IconButton'
import { NumberInput } from '../../../components/ui/NumberInput'
import { RangeInput } from '../../../components/ui/RangeInput'
import { Textarea } from '../../../components/ui/Textarea'
import { useCopyLink } from '../../../hooks/useCopyLocation'
import { useInputState } from '../../../hooks/useInputState'
import { copy } from '../../../utils/clipboard/copy'

const searchParamsValidator = z.object({
  text: z.string().optional(),
  repeat: z.number().int().positive().optional(),
})

export const Route = createFileRoute('/_layout/text/repeat')({
  validateSearch: (search) => searchParamsValidator.parse(search),
  component: () => <Repeater />,
})

const Repeater = () => {
  const { text: initialText, repeat: initialRepeat } = Route.useSearch()
  const [text, setText] = useInputState(initialText ?? '')
  const [repeat, setRepeat] = useInputState(initialRepeat ?? 1)
  const { copyLink } = useCopyLink(Route.id)

  const repeatedText = useMemo(() => text.repeat(repeat), [text, repeat])

  return (
    <>
      <Head title="Text Repeater" />
      <div className="it flex flex-col gap-y-8">
        <h1 className="font-bold text-lg">文字列反復</h1>
        <Textarea
          value={text}
          onChange={setText}
          placeholder="反復する文字を入力"
          aria-label="反復したい文字列を入力"
        />
        <div className="flex flex-col gap-y-2">
          <p className="text-sm">反復回数</p>
          <div className="flex items-center gap-x-2">
            <RangeInput
              value={repeat}
              onChange={setRepeat}
              min={1}
              max={100}
              aria-label="反復回数をスライダーで選択"
            />
            <NumberInput
              value={repeat}
              onChange={setRepeat}
              min={1}
              aria-label="反復回数を数値で入力"
            />
          </div>
        </div>
        <Textarea
          value={repeatedText}
          readOnly={true}
          placeholder="反復された文字列"
          aria-label="反復された文字列の表示"
        />
        <div className="flex gap-x-2">
          <IconButton
            onClick={() => copyLink({ text, repeat })}
            icon={IconShare}
            label="Share Link"
            disabled={repeatedText === ''}
          />
          <IconButton
            onClick={() => copy(repeatedText)}
            icon={IconCopy}
            label="Copy Result"
            disabled={repeatedText === ''}
          />
        </div>
      </div>
    </>
  )
}
