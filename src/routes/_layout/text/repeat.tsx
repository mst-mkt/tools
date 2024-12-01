import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { Textarea } from '@/components/ui/textarea'
import { createFileRoute } from '@tanstack/react-router'
import { Copy, Share } from 'lucide-react'
import { useMemo } from 'react'
import { z } from 'zod'
import { Head } from '../../../components/shared/Head'
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
  const [text, onSetText] = useInputState(initialText ?? '')
  const [repeat, onSetRepeat, setRepeat] = useInputState(initialRepeat ?? 1)
  const { copyLink } = useCopyLink(Route.id)

  const repeatedText = useMemo(() => text.repeat(repeat), [text, repeat])

  return (
    <>
      <Head title="Text Repeater" />
      <div className="it flex flex-col gap-y-8">
        <h1 className="font-bold text-lg">文字列反復</h1>
        <Textarea
          value={text}
          onChange={onSetText}
          placeholder="反復する文字を入力"
          aria-label="反復したい文字列を入力"
        />
        <div className="flex flex-col gap-y-2">
          <p className="text-sm">反復回数</p>
          <div className="flex items-stretch gap-x-2">
            <div className="w-full rounded-lg border p-4 shadow-sm">
              <Slider
                value={[repeat]}
                onValueChange={([value]) => value !== undefined && setRepeat(value)}
                min={1}
                max={100}
                aria-label="反復回数をスライダーで選択"
              />
            </div>
            <div className="w-full">
              <Input
                className="h-full"
                value={repeat}
                onChange={onSetRepeat}
                min={1}
                aria-label="反復回数を数値で入力"
              />
            </div>
          </div>
        </div>
        <Textarea
          value={repeatedText}
          readOnly={true}
          placeholder="反復された文字列"
          aria-label="反復された文字列の表示"
        />
        <div className="flex gap-x-2">
          <Button onClick={() => copyLink({ text, repeat })} disabled={repeatedText === ''}>
            <Share />
            Share Link
          </Button>
          <Button onClick={() => copy(repeatedText)} disabled={repeatedText === ''}>
            <Copy />
            Copy Result
          </Button>
        </div>
      </div>
    </>
  )
}
