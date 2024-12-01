import { createFileRoute } from '@tanstack/react-router'
import { Copy } from 'lucide-react'
import { type JSX, useMemo, useState } from 'react'
import { Head } from '../../../components/shared/Head'
import { IconButton } from '../../../components/ui/IconButton'
import { useDocumentEvent } from '../../../hooks/useDocumentEvent'
import { copy } from '../../../utils/clipboard/copy'

export const Route = createFileRoute('/_layout/develop/keyEvent')({
  component: () => <KeyEvent />,
})

const KeyEvent = () => {
  const [keyEvent, setKeyEvent] = useState<KeyboardEvent>()
  const [history, setHistory] = useState<KeyboardEvent[]>([])

  useDocumentEvent('keydown', (event) => {
    event.preventDefault()
    setKeyEvent(event)
    setHistory((prev) => [event, ...prev].slice(0, 4))
  })

  const keyEventInfo = useMemo(
    () =>
      keyEvent !== undefined
        ? {
            key: keyEvent.key,
            keyCode: keyEvent.keyCode,
            charCode: keyEvent.charCode,
            code: keyEvent.code,
            which: keyEvent.which,
            location: keyEvent.location,
            ctrlKey: keyEvent.ctrlKey,
            shiftKey: keyEvent.shiftKey,
            altKey: keyEvent.altKey,
            metaKey: keyEvent.metaKey,
            isComposing: keyEvent.isComposing,
            repeat: keyEvent.repeat,
          }
        : undefined,
    [keyEvent],
  )

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

  return (
    <>
      <Head title="Keyboard Event Checker" />
      <div className="flex flex-col gap-y-8">
        <h1 className="font-bold text-lg">キーボードイベントチェッカー</h1>
        <div className="flex flex-col gap-y-2">
          {keyEventInfo !== undefined ? (
            <>
              <h2 className="font-bold">キー情報</h2>
              <table className="block w-full">
                <tbody className="block w-full">
                  {Object.entries(keyEventInfo).map(([key, value]) => (
                    <tr
                      key={key}
                      className="flex w-full items-center justify-between border-background-100 border-b px-2 py-1 last:border-0"
                    >
                      <td className="text-sm">{key}</td>
                      <td>{`${value}`}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <div className="flex items-center justify-center rounded-md border border-background-100 p-8">
              何かしらのキーを押してください
            </div>
          )}
        </div>
        <div className="flex gap-x-2">
          <IconButton
            icon={Copy}
            label="Copy Result"
            onClick={() => copyData !== null && copy(...copyData)}
            disabled={copyData === null}
          />
        </div>
        {history.length > 0 && (
          <div className="flex flex-col gap-y-2">
            <h2 className="font-bold">履歴</h2>
            <table className="block w-full">
              <tbody className="block w-full">
                {history.map((event, index) => (
                  <tr
                    key={`${index}-${event.key}`}
                    className="flex w-full items-center justify-between border-background-100 border-b px-2 py-1 last:border-0"
                  >
                    <td className="text-sm">
                      <span className="rounded-sm border border-background-100 bg-background-50 p-1">
                        {event.key}
                      </span>
                    </td>
                    <td>{`${event.code} (${event.keyCode})`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  )
}
