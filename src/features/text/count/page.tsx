import { IconCopy, IconLink } from '@tabler/icons-react'
import { type FC, useMemo } from 'react'
import { Button } from 'rizzui/button'
import { Flex } from 'rizzui/flex'
import { Table } from 'rizzui/table'
import { Textarea } from 'rizzui/textarea'
import { Title } from 'rizzui/typography'
import { Breadcrumb } from '../../../components/ui/Breadcrumb'
import { useCopyLocation } from '../../../hooks/useCopyLocation'
import { useInputState } from '../../../hooks/useInputState'
import { copy } from '../../../utils/copy'
import { generateCopyResult } from './copy-data'
import { count } from './count'
import { countMethodLabel, isCountMethod } from './count-methods'

type TextCountProps = {
  initialText: string
}

export const TextCount: FC<TextCountProps> = ({ initialText }) => {
  const [inputText, onChangeInputText] = useInputState(initialText)
  const textLengthes = useMemo(() => count(inputText), [inputText])
  const [copytextData, copyHtmlData] = useMemo(
    () => generateCopyResult(textLengthes),
    [textLengthes],
  )

  const copyLocation = useCopyLocation()

  return (
    <>
      <Breadcrumb
        items={[
          { label: 'tools', toOptions: { to: '/' } },
          { label: 'text', toOptions: { to: '/', hash: 'text' } },
          'count',
        ]}
      />
      <Title className="text-xl">文字数カウント</Title>
      <Textarea
        value={inputText}
        onChange={onChangeInputText}
        placeholder="カウントする文字列を入力"
      />
      <Flex direction="col" align="stretch" gap="4">
        <Title as="h2" className="text-base">
          カウント結果
        </Title>
        <Table>
          <Table.Body>
            {Object.entries(textLengthes).map(
              ([key, value]) =>
                isCountMethod(key) && (
                  <Table.Row key={key} className="!bg-transparent not-last:!border-b border-muted">
                    <Table.Cell className="!p-2">{countMethodLabel[key]}</Table.Cell>
                    <Table.Cell className="!p-2 text-right">{value}</Table.Cell>
                  </Table.Row>
                ),
            )}
          </Table.Body>
        </Table>
      </Flex>
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
          onClick={() => copy(copytextData, copyHtmlData)}
          disabled={inputText.trim() === ''}
        >
          <IconCopy size={16} />
          結果をコピー
        </Button>
      </Flex>
    </>
  )
}
