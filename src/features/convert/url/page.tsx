import { IconArrowsUpDown, IconCopy, IconLink } from '@tabler/icons-react'
import { type FC, useCallback, useMemo, useState } from 'react'
import { Button, Flex, Select, type SelectOption, Textarea, Title } from 'rizzui'
import { match } from 'ts-pattern'
import { Breadcrumb } from '../../../components/ui/Breadcrumb'
import { useCopyLocation } from '../../../hooks/useCopyLocation'
import { useInputState } from '../../../hooks/useInputState'
import { copy } from '../../../utils/copy'

const typeOptions = [
  { label: 'エンコード', value: 'encode' },
  { label: 'デコード', value: 'decode' },
] satisfies SelectOption[]

type UrlProps = {
  initialText: string
  initialType?: 'encode' | 'decode'
}

export const Url: FC<UrlProps> = ({ initialText, initialType = 'encode' }) => {
  const [inputText, onChangeInputText, setInputText] = useInputState(initialText)
  const [type, setType] = useState(initialType)

  const convertedText = useMemo(() => {
    return match(type)
      .with('encode', () => encodeURIComponent(inputText))
      .with('decode', () => decodeURIComponent(inputText))
      .exhaustive()
  }, [inputText, type])

  const handleReverse = useCallback(() => {
    setInputText(convertedText)
    setType((prev) => (prev === 'encode' ? 'decode' : 'encode'))
  }, [convertedText, setInputText])

  const copyLocation = useCopyLocation()

  return (
    <>
      <Breadcrumb
        items={[
          { label: 'tools', toOptions: { to: '/' } },
          { label: 'convert', toOptions: { to: '/', hash: 'convert' } },
          'url',
        ]}
      />
      <Title className="text-xl">URL エンコード / デコード</Title>
      <Textarea value={inputText} onChange={onChangeInputText} placeholder="変換する文字列を入力" />
      <Flex align="center" gap="4">
        <Select
          value={type}
          options={typeOptions}
          onChange={({ value }) => setType(value)}
          displayValue={(value) => typeOptions.find((option) => option.value === value)?.label}
        />
        <Button className="w-fit shrink-0 cursor-pointer gap-x-2" onClick={handleReverse}>
          <IconArrowsUpDown size={16} />
          逆変換
        </Button>
      </Flex>
      <Textarea value={convertedText} readOnly={true} placeholder="変換結果" />
      <Flex align="center" gap="4">
        <Button
          className="w-fit cursor-pointer gap-x-2 disabled:cursor-not-allowed"
          onClick={() => copyLocation('/convert/url', { text: inputText, type })}
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
