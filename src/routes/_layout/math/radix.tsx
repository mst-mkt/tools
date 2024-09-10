import { IconArrowsRightLeft, IconCopy, IconShare } from '@tabler/icons-react'
import { createFileRoute } from '@tanstack/react-router'
import { useCallback, useMemo } from 'react'
import { z } from 'zod'
import { Head } from '../../../components/shared/Head'
import { IconButton } from '../../../components/ui/IconButton'
import { NumberInput } from '../../../components/ui/NumberInput'
import { Textarea } from '../../../components/ui/Textarea'
import { useCopyLink } from '../../../hooks/useCopyLocation'
import { useInputState } from '../../../hooks/useInputState'
import { copy } from '../../../utils/clipboard/copy'

const searchParamsValidator = z.object({
  number: z.string().optional(),
  fromRadix: z.number().int().min(2).catch(10),
  toRadix: z.number().int().min(2).catch(10),
})

export const Route = createFileRoute('/_layout/math/radix')({
  validateSearch: (search) => searchParamsValidator.parse(search),
  component: () => <Radix />,
})

const convertRadix = (number: string, fromRadix: number, toRadix: number) => {
  try {
    return Number.parseInt(number, fromRadix).toString(toRadix)
  } catch {
    return ''
  }
}

const Radix = () => {
  const {
    number: initialNumber,
    fromRadix: initialFromRadix,
    toRadix: initialToRadix,
  } = Route.useSearch()
  const [number, onSetNumber] = useInputState(initialNumber ?? '0')
  const [fromRadix, onSetFromRadix, setFromRadix] = useInputState(initialFromRadix ?? 10)
  const [toRadix, onSetToRadix, onToRadix] = useInputState(initialToRadix ?? 10)
  const { copyLink } = useCopyLink(Route.id)

  const convertedNumber = useMemo(
    () => convertRadix(number, fromRadix, toRadix),
    [number, fromRadix, toRadix],
  )

  const handlerReverse = useCallback(() => {
    setFromRadix(toRadix)
    onToRadix(fromRadix)
  }, [fromRadix, onToRadix, setFromRadix, toRadix])

  return (
    <>
      <Head title="Radix Converter" />
      <div className="flex flex-col gap-y-8">
        <h1 className="font-bold text-lg">基数変換</h1>
        <Textarea
          value={number}
          onChange={onSetNumber}
          placeholder="変換する数値を入力"
          aria-label="変換する数値を入力"
        />
        <div className="justify- flex gap-x-4">
          <NumberInput
            value={fromRadix}
            onChange={onSetFromRadix}
            min={1}
            max={36}
            aria-label="変換元の基数を数値で入力"
          />
          <IconButton icon={IconArrowsRightLeft} label="Reverse" onClick={handlerReverse} />
          <NumberInput
            value={toRadix}
            onChange={onSetToRadix}
            min={1}
            max={36}
            aria-label="変換先の基数を数値で入力"
          />
        </div>
        <Textarea
          value={convertedNumber}
          readOnly={true}
          placeholder="変換された数値"
          aria-label="変換された数値の表示"
        />
        <div className="flex gap-x-2">
          <IconButton
            onClick={() => copyLink({ number, fromRadix, toRadix })}
            icon={IconShare}
            label="Share Link"
            disabled={convertedNumber === ''}
          />
          <IconButton
            onClick={() => copy(convertedNumber)}
            icon={IconCopy}
            label="Copy Result"
            disabled={convertedNumber === ''}
          />
        </div>
      </div>
    </>
  )
}
