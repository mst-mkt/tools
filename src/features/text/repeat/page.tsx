import { IconCopy, IconLink } from '@tabler/icons-react'
import { type FC, useMemo } from 'react'
import { Box, Button, Flex, Input, Textarea, Title } from 'rizzui'
import { RangeSlider } from '../../../components/rizzui/slider'
import { useCopyLocation } from '../../../hooks/useCopyLocation'
import { useInputState } from '../../../hooks/useInputState'
import { copy } from '../../../utils/copy'
import { repeat } from './repeat'

type TextRepeatProps = {
  initialText: string
  initialCount: number
}

export const TextRpeat: FC<TextRepeatProps> = ({ initialText, initialCount }) => {
  const [inputText, onChangeInputText] = useInputState(initialText)
  const [count, onChangeCount, setCount] = useInputState(initialCount)
  const resultText = useMemo(() => repeat(inputText, count), [inputText, count])

  const copyLocation = useCopyLocation()

  return (
    <>
      <Title className="text-xl">文字数カウント</Title>
      <Textarea value={inputText} onChange={onChangeInputText} placeholder="反復する文字列を入力" />
      <Flex direction="col" align="stretch" gap="4">
        <Title as="h3" className="text-base">
          反復回数
        </Title>
        <Flex align="center" gap="4">
          <Box className="w-full shrink rounded-md border border-muted px-4 py-3 shadow-xs">
            <RangeSlider
              value={count}
              onChange={(v) => setCount(Array.isArray(v) ? (v.at(0) ?? 0) : v)}
              min={1}
              max={100}
            />
          </Box>
          <Input
            value={count}
            onChange={onChangeCount}
            type="number"
            min={1}
            placeholder="反復回数を入力"
            className="w-full shrink"
          />
        </Flex>
      </Flex>
      <Textarea value={resultText} readOnly={true} placeholder="反復結果" />
      <Flex align="center" gap="4">
        <Button
          className="w-fit cursor-pointer gap-x-2 disabled:cursor-not-allowed"
          onClick={() => copyLocation('/text/repeat', { text: inputText })}
          disabled={inputText.trim() === ''}
        >
          <IconLink size={16} />
          URLをコピー
        </Button>
        <Button
          className="w-fit cursor-pointer gap-x-2 disabled:cursor-not-allowed"
          onClick={() => copy(resultText)}
          disabled={resultText.trim() === ''}
        >
          <IconCopy size={16} />
          結果をコピー
        </Button>
      </Flex>
    </>
  )
}
