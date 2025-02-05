import { IconCopy, IconLink } from '@tabler/icons-react'
import { type JSX, useMemo, useState } from 'react'
import { Button } from 'rizzui/button'
import { Flex } from 'rizzui/flex'
import { Table } from 'rizzui/table'
import { Title } from 'rizzui/typography'
import { Breadcrumb } from '../../../components/ui/Breadcrumb'
import { useCopyLocation } from '../../../hooks/useCopyLocation'
import { useDocumentEvent } from '../../../hooks/useDocumentEvent'
import { copy } from '../../../utils/copy'

export const Keyboard = () => {
  const [keyHistory, setKeyHistory] = useState<KeyboardEvent[]>([])

  useDocumentEvent('keydown', (event) => {
    event.preventDefault()
    setKeyHistory((prev) => [event, ...prev].slice(0, 8))
  })

  const keyEventInfo = useMemo(() => {
    const latestEvent = keyHistory[0]
    if (latestEvent === undefined) return undefined

    return {
      key: latestEvent.key,
      keyCode: latestEvent.keyCode,
      charCode: latestEvent.charCode,
      code: latestEvent.code,
      which: latestEvent.which,
      location: latestEvent.location,
      ctrlKey: `${latestEvent.ctrlKey}`,
      shiftKey: `${latestEvent.shiftKey}`,
      altKey: `${latestEvent.altKey}`,
      metaKey: `${latestEvent.metaKey}`,
      isComposing: `${latestEvent.isComposing}`,
      repeat: `${latestEvent.repeat}`,
    }
  }, [keyHistory])

  const copyData = useMemo<[string, JSX.Element] | null>(() => {
    if (keyEventInfo === undefined) return null
    const plainText = Object.entries(keyEventInfo)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n')

    const jsx = (
      <table>
        <tbody>
          {Object.entries(keyEventInfo).map(([key, value]) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{`${value}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )

    return [plainText, jsx]
  }, [keyEventInfo])

  const copyLocation = useCopyLocation()

  return (
    <>
      <Breadcrumb
        items={[
          { label: 'tools', toOptions: { to: '/' } },
          { label: 'develop', toOptions: { to: '/', hash: 'develop' } },
          'keyboard',
        ]}
      />
      <Title className="text-xl">キーボードイベント確認</Title>
      {keyEventInfo === undefined ? (
        <Flex
          justify="center"
          className="rounded-md border border-muted p-8 font-bold text-lg shadow-xs"
        >
          何かしらのキーを押してください
        </Flex>
      ) : (
        <Table>
          <Table.Body>
            {Object.entries(keyEventInfo).map(([key, value]) => (
              <Table.Row key={key} className="!bg-transparent not-last:!border-b border-muted">
                <Table.Cell className="!p-2">{key}</Table.Cell>
                <Table.Cell className="!p-2 text-right">{value}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
      <Flex align="center" gap="4">
        <Button
          className="w-fit cursor-pointer gap-x-2"
          onClick={() => copyLocation('/develop/keyboard')}
        >
          <IconLink size={16} />
          URLをコピー
        </Button>
        <Button
          className="w-fit cursor-pointer gap-x-2 disabled:cursor-not-allowed"
          onClick={() => copyData !== null && copy(...copyData)}
          disabled={copyData === null}
        >
          <IconCopy size={16} />
          結果をコピー
        </Button>
      </Flex>
      {keyHistory.length > 0 && (
        <>
          <Title as="h2" className="text-base">
            イベント履歴
          </Title>
          <Table>
            <Table.Body>
              {keyHistory.map((event, index) => (
                <Table.Row
                  key={`${index}-${event.key}`}
                  className="!bg-transparent not-last:!border-b border-muted"
                >
                  <Table.Cell className="!p-2">
                    <span className="rounded-sm border border-background-100 bg-background-50 p-1">
                      {event.key}
                    </span>
                  </Table.Cell>
                  <Table.Cell className="!p-2 text-right">{`${event.code} (${event.keyCode})`}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </>
      )}
    </>
  )
}
