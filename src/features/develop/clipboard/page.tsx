import { IconCircleX, IconCopy, IconTrash } from '@tabler/icons-react'
import { type ClipboardEvent, type FC, useCallback, useMemo, useState } from 'react'
import { Button, Empty, Flex, Title } from 'rizzui'
import { match } from 'ts-pattern'
import { Breadcrumb } from '../../../components/ui/Breadcrumb'
import { copy, copyFile } from '../../../utils/copy'
import { ClipboardData } from './data'
import { type ClipboardDataType, isClipboardDataType } from './types'

export const Clipboard: FC = () => {
  const [clipboardData, setClipboardData] = useState<ClipboardDataType[]>()

  const handlePaste = useCallback((e: ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault()

    const clipboardData = e.clipboardData
    const clipboardDataItems = [...clipboardData.items]
    const clipboardDatum = clipboardDataItems
      .map((item) =>
        match(item.kind)
          .with('string', () => ({
            datatype: 'text' as const,
            type: item.type,
            data: clipboardData.getData(item.type),
          }))
          .when(
            () => item.type.startsWith('image'),
            () => ({
              datatype: 'image' as const,
              type: item.type,
              data: item.getAsFile(),
            }),
          )
          .with('file', () => ({
            datatype: 'file' as const,
            type: item.type,
            data: item.getAsFile(),
          }))
          .otherwise(() => null),
      )
      .filter((item) => item !== null && item.data !== null)

    if (clipboardDatum.every(isClipboardDataType)) {
      setClipboardData(clipboardDatum)
    }
  }, [])

  const displayData = useMemo(() => {
    if (clipboardData === undefined) return null

    const textPlainData = clipboardData.find((item) => item.type === 'text/plain')
    const textData = clipboardData.find((item) => item.datatype === 'text')
    const imageData = clipboardData.find((item) => item.datatype === 'image')

    return textPlainData ?? textData ?? imageData ?? null
  }, [clipboardData])

  return (
    <>
      <Breadcrumb
        items={[
          { label: 'tools', toOptions: { to: '/' } },
          { label: 'develop', toOptions: { to: '/', hash: 'develop' } },
          'clipboard',
        ]}
      />
      <Title className="text-xl">クリップボードデータ確認</Title>
      <Flex gap="4" direction="col">
        <ClipboardData
          data={displayData}
          setDatum={setClipboardData}
          contentEditable={true}
          placeholderShow={clipboardData === undefined}
          onPaste={handlePaste}
        />
        <Flex gap="4">
          <Button
            onClick={() => setClipboardData(undefined)}
            disabled={clipboardData === undefined}
            className="w-fit cursor-pointer gap-x-2 disabled:cursor-not-allowed"
          >
            <IconCircleX size={20} />
            クリア
          </Button>
          <Button
            color="danger"
            onClick={() => navigator.clipboard.writeText('')}
            className="w-fit cursor-pointer gap-x-2 disabled:cursor-not-allowed"
          >
            <IconTrash size={16} />
            クリップボードを空にする
          </Button>
        </Flex>
      </Flex>
      {clipboardData !== undefined && (
        <>
          <Title as="h2" className="text-lg">
            クリップボードデータ
          </Title>
          {clipboardData.length === 0 && (
            <Empty text="データがありません" textClassName="leading-16" />
          )}
          {clipboardData.map((item) => (
            <Flex key={item.type} gap="4" direction="col">
              <Flex gap="2" align="center" justify="between">
                <Title as="h3" className="grow text-base">
                  {item.type}
                  {item.data instanceof File && ` - ${item.data.name} (${item.data.size} bytes)`}
                </Title>
                <Button
                  variant="flat"
                  onClick={() => (item.datatype === 'text' ? copy(item.data) : copyFile(item.data))}
                  className="aspect-1 w-fit grow-0 cursor-pointer bg-transparent p-2"
                >
                  <IconCopy size={16} />
                </Button>
              </Flex>
              <ClipboardData data={item} />
            </Flex>
          ))}
        </>
      )}
    </>
  )
}
