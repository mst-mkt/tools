import { IconArrowRight, IconArrowsRightLeft, IconCopy, IconLink } from '@tabler/icons-react'
import { type ChangeEvent, type FC, useCallback, useMemo, useState } from 'react'
import { Button } from 'rizzui/button'
import { Flex } from 'rizzui/flex'
import { Input } from 'rizzui/input'
import { Textarea } from 'rizzui/textarea'
import { Title } from 'rizzui/typography'
import { Breadcrumb } from '../../../components/ui/Breadcrumb'
import { useCopyLocation } from '../../../hooks/useCopyLocation'
import { useInputState } from '../../../hooks/useInputState'
import { copy } from '../../../utils/copy'
import { isValidBaseN, isValidRadix, transformRadix } from './radix'

type RadixProps = {
  initialText: string
  initialFrom?: number
  initialTo?: number
}

export const Radix: FC<RadixProps> = ({ initialText, initialFrom = 10, initialTo = 2 }) => {
  const [inputText, onChangeInputText, setInputText] = useInputState(initialText)
  const [inputFrom, setInputFrom] = useState(`${initialFrom}`)
  const [inputTo, setInputTo] = useState(`${initialTo}`)
  const [from, setFrom] = useState(initialFrom)
  const [to, setTo] = useState(initialTo)

  const transformed = useMemo(() => transformRadix(inputText, from, to), [inputText, from, to])

  const handleChangeFromRadix = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const text = e.currentTarget.value
    if (text === '') return setInputFrom('')

    const radix = Number.parseInt(text, 10)
    if (Number.isNaN(radix)) return

    setInputFrom(radix.toString())
    if (isValidRadix(radix)) setFrom(radix)
  }, [])

  const handleChangeToRadix = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const text = e.currentTarget.value
    if (text === '') return setInputTo('')

    const radix = Number.parseInt(text, 10)
    if (Number.isNaN(radix)) return

    setInputTo(radix.toString())
    if (isValidRadix(radix)) setTo(radix)
  }, [])

  const handleReverse = useCallback(() => {
    setInputFrom(inputTo)
    setInputTo(inputFrom)
    setFrom(to)
    setTo(from)
    setInputText(transformed)
  }, [inputFrom, inputTo, from, to, transformed, setInputText])

  const errorMessages = useCallback((input: string) => {
    if (input === '') return undefined
    if (!isValidRadix(input)) return '2〜36の整数を入力'
    return undefined
  }, [])

  const copyLocation = useCopyLocation()

  return (
    <>
      <Breadcrumb
        items={[
          { label: 'tools', toOptions: { to: '/' } },
          { label: 'math', toOptions: { to: '/', hash: 'math' } },
          'radix',
        ]}
      />
      <Title className="text-xl">基数変換</Title>
      <Flex gap="4" align="start">
        <Input
          value={inputFrom}
          onChange={handleChangeFromRadix}
          placeholder="変換元"
          suffix="進数"
          error={errorMessages(inputFrom)}
        />
        <Flex align="center" justify="center" className="h-10 w-10">
          <IconArrowRight size={24} />
        </Flex>
        <Input
          value={inputTo}
          onChange={handleChangeToRadix}
          placeholder="変換先"
          suffix="進数"
          error={errorMessages(inputTo)}
        />
        <Button className="aspect-1 w-fit cursor-pointer p-2" onClick={handleReverse}>
          <IconArrowsRightLeft size={16} />
        </Button>
      </Flex>
      <Textarea
        value={inputText}
        onChange={onChangeInputText}
        placeholder={`変換する数字を ${from} 進数で入力`}
        label={`変換元 (${from}進数)`}
        labelWeight="bold"
        clearable={true}
        onClear={() => setInputText('')}
        error={isValidBaseN(inputText, from) ? undefined : '不正な文字が含まれています'}
      />
      <Textarea
        value={transformed}
        readOnly={true}
        placeholder={`変換結果を ${to} 進数で表示`}
        label={`変換先 (${to}進数)`}
        labelWeight="bold"
      />
      <Flex align="center" gap="4">
        <Button
          className="w-fit cursor-pointer gap-x-2 disabled:cursor-not-allowed"
          onClick={() => copyLocation('/math/radix', { text: inputText, from, to })}
          disabled={inputText.trim() === ''}
        >
          <IconLink size={16} />
          URLをコピー
        </Button>
        <Button
          className="w-fit cursor-pointer gap-x-2 disabled:cursor-not-allowed"
          onClick={() => copy(transformed)}
          disabled={transformed.trim() === ''}
        >
          <IconCopy size={16} />
          結果をコピー
        </Button>
      </Flex>
    </>
  )
}
