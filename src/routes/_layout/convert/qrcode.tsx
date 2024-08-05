import { IconCopy, IconDownload, IconShare } from '@tabler/icons-react'
import { createFileRoute } from '@tanstack/react-router'
import { clsx } from 'clsx'
import { useCallback, useMemo } from 'react'
import { encode, renderANSI, renderSVG, renderUnicode, renderUnicodeCompact } from 'uqr'
import { z } from 'zod'
import { Head } from '../../../components/shared/Head'
import { IconButton } from '../../../components/ui/IconButton'
import { TextInput } from '../../../components/ui/TextInput'
import { useCopyLink } from '../../../hooks/useCopyLocation'
import { useInputState } from '../../../hooks/useInputState'
import { copy } from '../../../utils/clipboard/copy'

const serachParamsValidator = z.object({
  text: z.string().optional(),
})

export const Route = createFileRoute('/_layout/convert/qrcode')({
  validateSearch: (search) => serachParamsValidator.parse(search),
  component: () => <QrCode />,
})

const QrCode = () => {
  const { text: initialText } = Route.useSearch()
  const [text, setText] = useInputState(initialText ?? '')
  const { copyLink } = useCopyLink(Route.id)

  const qrcodeData = useMemo(() => {
    return encode(text)
  }, [text])

  const qrcodeSvg = useMemo(() => {
    return renderSVG(text)
  }, [text])

  const copyAsImage = useCallback(() => {
    const image = new Image()
    image.src = `data:image/svg+xml;base64,${btoa(qrcodeSvg)}`
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    if (context === null) return
    image.onload = () => {
      canvas.width = image.width
      canvas.height = image.height
      context.drawImage(image, 0, 0)
      canvas.toBlob((blob) => {
        if (blob === null) return
        navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
      })
    }
  }, [qrcodeSvg])

  const downloadAsImage = useCallback(() => {
    const image = new Image()
    image.src = `data:image/svg+xml;base64,${btoa(qrcodeSvg)}`
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    if (context === null) return
    image.onload = () => {
      canvas.width = image.width
      canvas.height = image.height
      context.drawImage(image, 0, 0)
      canvas.toBlob((blob) => {
        if (blob === null) return
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `qrcode-${text}.png`
        a.click()
        URL.revokeObjectURL(url)
      })
    }
  }, [qrcodeSvg, text])

  const downloadAsSvg = useCallback(() => {
    const url = URL.createObjectURL(new Blob([qrcodeSvg], { type: 'image/svg+xml' }))
    const a = document.createElement('a')
    a.href = url
    a.download = `qrcode-${text}.svg`
    a.click()
    URL.revokeObjectURL(url)
  }, [qrcodeSvg, text])

  return (
    <>
      <Head title="QR Code" />
      <div className="it flex flex-col gap-y-8">
        <h1 className="font-bold text-lg">QR Code Generator</h1>
        <TextInput
          value={text}
          onChange={setText}
          placeholder="QRコードに変換するテキストを入力"
          aria-label="QRコードに変換するテキストを入力"
        />
        <div className="rounded-lg border border-background-200 p-4">
          <div
            className="mx-auto grid aspect-1 max-h-[36svh]"
            style={{ gridTemplateColumns: `repeat(${qrcodeData.size}, 1fr)` }}
          >
            {qrcodeData.data.map((row, rowIndex) =>
              row.map((cell, cellIndex) => (
                <div
                  // biome-ignore lint/suspicious/noArrayIndexKey: coordinate of 2d-array is unique
                  key={`${rowIndex}-${cellIndex}`}
                  className={clsx('aspect-1 w-full', cell && 'bg-foreground')}
                />
              )),
            )}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <IconButton
            icon={IconDownload}
            label="Download as PNG"
            disabled={text.trim() === ''}
            onClick={downloadAsImage}
          />
          <IconButton
            icon={IconDownload}
            label="Download as SVG"
            disabled={text.trim() === ''}
            onClick={downloadAsSvg}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <IconButton
            icon={IconCopy}
            label="Copy as Text"
            disabled={text.trim() === ''}
            onClick={() => copy(renderUnicode(text))}
          />
          <IconButton
            icon={IconCopy}
            label="Copy as Text(Compact)"
            disabled={text.trim() === ''}
            onClick={() => copy(renderUnicodeCompact(text))}
          />
          <IconButton
            icon={IconCopy}
            label="Copy as ANSI"
            disabled={text.trim() === ''}
            onClick={() => copy(renderANSI(text))}
          />
          <IconButton
            icon={IconCopy}
            label="Copy as Image"
            disabled={text.trim() === ''}
            onClick={copyAsImage}
          />
        </div>
        <div className="flex gap-x-2">
          <IconButton
            icon={IconShare}
            label="Share Link"
            onClick={() => copyLink({ text })}
            disabled={text.trim() === ''}
          />
        </div>
      </div>
    </>
  )
}
