import { Textarea } from '@/components/ui/textarea'
import { createFileRoute } from '@tanstack/react-router'
import init, { format } from '@wasm-fmt/web_fmt/vite'
import { type ClipboardEvent, type KeyboardEvent, useEffect, useState } from 'react'
import { P, match } from 'ts-pattern'
import { Head } from '../../../components/shared/Head'

export const Route = createFileRoute('/_layout/develop/clipboard')({
  component: () => <ClipboardChecker />,
})

const ClipboardChecker = () => {
  const [clipboardData, setClipboardData] = useState<Record<string, string | File | null>>({})

  const handlePaste = (e: ClipboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault()
    const clipboardData = e.clipboardData
    const data = Object.fromEntries(
      [...clipboardData.items].map((item) => [
        item.type,
        match(item.type)
          .with('Files', () => item.getAsFile())
          .when(
            (type) => type.startsWith('image'),
            () => item.getAsFile(),
          )
          .otherwise(() => clipboardData.getData(item.type)),
      ]),
    )
    setClipboardData(data)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    const isDeleteTriggered = ['backspace', 'delete', 'escape'].includes(e.key.toLowerCase())
    if (isDeleteTriggered) {
      e.preventDefault()
      setClipboardData({})
    }
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <>
      <Head title="Clipboard Checker" />
      <div className="flex flex-col gap-y-8">
        <h1 className="font-bold text-lg">クリップボード チェッカー</h1>
        <div className="flex flex-col gap-y-2">
          <p className="text-sm">Ctrl+V でペーストしてください</p>
          <Textarea
            onPaste={handlePaste}
            onKeyDown={handleKeyDown}
            readOnly={true}
            value={
              (clipboardData['text/plain'] ??
                clipboardData.text ??
                Object.values(clipboardData).find((data) => typeof data === 'string') ??
                '') as string
            }
          />
        </div>
        {Object.keys(clipboardData).length > 0 && (
          <div className="flex flex-col gap-y-4">
            <h2 className="font-bold text-lg">
              クリップボード内のデータ ({Object.keys(clipboardData).length} 件)
            </h2>
            {Object.entries(clipboardData).map(([key, value]) => (
              <div key={key} className="flex flex-col gap-y-1">
                <h3 className="text-sm">
                  {key}
                  {value instanceof File && ` - ${value.name} (${value.size} bytes)`}
                </h3>
                {match(value)
                  .with(P.string, (value) => (
                    <Textarea
                      value={match(key)
                        .when(
                          (type) => type.includes('html'),
                          () => format(value, 'index.html'),
                        )
                        .when(
                          (type) => type.includes('json'),
                          () => format(value, 'index.json'),
                        )
                        .otherwise(() => value)}
                      readOnly={true}
                      aria-label={key}
                    />
                  ))
                  .with(P.instanceOf(File), (v) => (
                    <div className="flex justify-center rounded-md border border-background-100 p-4">
                      <img src={URL.createObjectURL(v)} alt="clipboard" className="max-h-32" />
                    </div>
                  ))
                  .otherwise(() => (
                    <p>不明なデータ</p>
                  ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
