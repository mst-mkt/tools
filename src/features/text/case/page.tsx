import { IconCopy, IconLink } from '@tabler/icons-react'
import { type FC, useCallback, useMemo, useState } from 'react'
import { Button } from 'rizzui/button'
import { Flex } from 'rizzui/flex'
import { Input } from 'rizzui/input'
import { Textarea } from 'rizzui/textarea'
import { Title } from 'rizzui/typography'
import { camelCase, flatCase, kebabCase, pascalCase, snakeCase, titleCase, trainCase } from 'scule'
import { match } from 'ts-pattern'
import { Breadcrumb } from '../../../components/ui/Breadcrumb'
import { useCopyLocation } from '../../../hooks/useCopyLocation'
import { useInputState } from '../../../hooks/useInputState'
import { copy } from '../../../utils/copy'
import { CaseSelect } from './select'

type CaseProps = {
  initialText: string
  initialTo: 'pascal' | 'camel' | 'kebab' | 'snake' | 'flat' | 'train' | 'title'
}

export const Case: FC<CaseProps> = ({ initialText, initialTo }) => {
  const [text, onChangeText] = useInputState(initialText)
  const [to, setTo] = useState(initialTo)

  const convert = useCallback(
    (text: string) =>
      match(to)
        .with('pascal', () => pascalCase(text))
        .with('camel', () => camelCase(text))
        .with('kebab', () => kebabCase(text))
        .with('snake', () => snakeCase(text))
        .with('flat', () => flatCase(text))
        .with('train', () => trainCase(text))
        .with('title', () => titleCase(text))
        .exhaustive(),
    [to],
  )

  const converted = useMemo(() => {
    return text
      .replaceAll(' ', '_')
      .split('\n')
      .filter((text) => text.trim() !== '')
      .map(convert)
  }, [text, convert])

  const copyLocation = useCopyLocation()

  return (
    <>
      <Breadcrumb
        items={[
          { label: 'tools', toOptions: { to: '/' } },
          { label: 'text', toOptions: { to: '/', hash: 'text' } },
          'case',
        ]}
      />
      <Title className="text-xl">文字ケース変換</Title>
      <CaseSelect value={to} onChange={setTo} />
      <Textarea
        value={text}
        onChange={onChangeText}
        placeholder="変換したいテキストを入力 (複数行可)"
      />
      {converted.length > 0 && (
        <>
          <Title as="h2" className="text-lg">
            変換後
          </Title>
          <Flex direction="col" gap="2">
            {converted.map((text, index) => (
              <Flex gap="2" key={`${index}-${text}`}>
                <Input value={text} readOnly={true} className="w-full" />
                <Button
                  onClick={() => copy(text)}
                  variant="flat"
                  className="aspect-1 w-fit cursor-pointer p-2"
                >
                  <IconCopy size={20} />
                </Button>
              </Flex>
            ))}
          </Flex>
          <Flex align="center" gap="4">
            <Button
              className="w-fit cursor-pointer gap-x-2 disabled:cursor-not-allowed"
              onClick={() => copyLocation('/text/case', { text, to })}
              disabled={text.trim() === ''}
            >
              <IconLink size={16} />
              URLをコピー
            </Button>
            <Button
              className="w-fit cursor-pointer gap-x-2 disabled:cursor-not-allowed"
              onClick={() => copy(converted.join('\n'))}
              disabled={converted.length === 0}
            >
              <IconCopy size={16} />
              結果をコピー
            </Button>
          </Flex>
        </>
      )}
    </>
  )
}
