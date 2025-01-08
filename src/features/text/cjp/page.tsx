import { IconCopy, IconLink } from '@tabler/icons-react'
import { generate } from 'cjp'
import { type FC, useMemo } from 'react'
import { Button } from 'rizzui/button'
import { Flex } from 'rizzui/flex'
import { Textarea } from 'rizzui/textarea'
import { Title } from 'rizzui/typography'
import { useCopyLocation } from '../../../hooks/useCopyLocation'
import { useInputState } from '../../../hooks/useInputState'
import { copy } from '../../../utils/copy'

type CjpProps = {
  initialText: string
}

export const Cjp: FC<CjpProps> = ({ initialText }) => {
  const [inputText, onChangeInputText] = useInputState(initialText)
  const convertedText = useMemo(() => generate(inputText), [inputText])

  const copyLocation = useCopyLocation()

  return (
    <>
      <Title className="text-xl">怪レい日本语 変換</Title>
      <Title as="h2" className="text-base">
        変換元
      </Title>
      <Textarea value={inputText} onChange={onChangeInputText} placeholder="変換する文字列を入力" />
      <Title as="h2" className="text-base">
        変換結果
      </Title>
      <Textarea value={convertedText} readOnly={true} placeholder="変換結果" />
      <Flex align="center" gap="4">
        <Button
          className="w-fit cursor-pointer gap-x-2 disabled:cursor-not-allowed"
          onClick={() => copyLocation('/text/count', { text: inputText })}
          disabled={inputText.trim() === ''}
        >
          <IconLink size={16} />
          URLをコピー
        </Button>
        <Button
          className="w-fit cursor-pointer gap-x-2 disabled:cursor-not-allowed"
          onClick={() => copy(convertedText)}
          disabled={convertedText.trim() === ''}
        >
          <IconCopy size={16} />
          結果をコピー
        </Button>
      </Flex>
    </>
  )
}
