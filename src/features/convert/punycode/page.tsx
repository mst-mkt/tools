import punycode from 'punycode'
import { IconArrowsUpDown, IconCopy, IconLink } from '@tabler/icons-react'
import { type FC, useCallback, useMemo, useState } from 'react'
import { Button } from 'rizzui/button'
import { Flex } from 'rizzui/flex'
import { Select, type SelectOption } from 'rizzui/select'
import { Textarea } from 'rizzui/textarea'
import { Title } from 'rizzui/typography'
import { match } from 'ts-pattern'
import { Breadcrumb } from '../../../components/ui/Breadcrumb'
import { useCopyLocation } from '../../../hooks/useCopyLocation'
import { useInputState } from '../../../hooks/useInputState'
import { copy } from '../../../utils/copy'

const typeOptions = [
  { label: 'エンコード', value: 'encode' },
  { label: 'デコード', value: 'decode' },
] satisfies SelectOption[]

type PunycodeProps = {
  initialText: string
  initialType?: 'encode' | 'decode'
}

export const Punycode: FC<PunycodeProps> = ({ initialText, initialType = 'encode' }) => {
  const [inputText, onChangeInputText, setInputText] = useInputState(initialText)
  const [type, setType] = useState(initialType)

  const convert = useCallback(
    (text: string) =>
      match(type)
        .with('encode', () => punycode.toASCII(text))
        .with('decode', () => punycode.toUnicode(text))
        .exhaustive(),
    [type],
  )

  const convertedText = useMemo(() => {
    const isUrl = inputText.startsWith('http://') || inputText.startsWith('https://')
    if (!isUrl) return convert(inputText)

    const [protocol, url] = inputText.split('://')
    const [host, ...path] = url?.split('/') ?? []
    const converted = convert(host ?? '')
    const urlPath = [converted, ...path].filter((text) => text !== '').join('/')

    return `${protocol}://${urlPath}`
  }, [inputText, convert])

  const copyLocation = useCopyLocation()

  const handleReverse = useCallback(() => {
    setInputText(convertedText)
    setType((prev) => (prev === 'encode' ? 'decode' : 'encode'))
  }, [convertedText, setInputText])

  return (
    <>
      <Breadcrumb
        items={[
          { label: 'tools', toOptions: { to: '/' } },
          { label: 'convert', toOptions: { to: '/', hash: 'convert' } },
          'punycode',
        ]}
      />
      <Title className="text-xl">Punycode 変換</Title>
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
          onClick={() => copyLocation('/convert/punycode', { text: inputText, type })}
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
