import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createFileRoute } from '@tanstack/react-router'
import { clsx } from 'clsx'
import { Copy, Download, Share } from 'lucide-react'
import { useCallback, useMemo } from 'react'
import { encode, renderANSI, renderSVG, renderUnicode, renderUnicodeCompact } from 'uqr'
import { z } from 'zod'
import { Head } from '../../../components/shared/Head'
import { useCopyLink } from '../../../hooks/useCopyLocation'
import { useInputState } from '../../../hooks/useInputState'

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
        <Input
          value={text}
          onChange={setText}
          placeholder="QRコードに変換するテキストを入力"
          aria-label="QRコードに変換するテキストを入力"
        />
        <div className="rounded-lg border border-background-200 p-4">
          <div
            className="mx-auto grid aspect-square max-h-[36svh]"
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
          <Button onClick={downloadAsImage} disabled={text.trim() === ''}>
            <Download />
            Download as PNG
          </Button>
          <Button onClick={downloadAsSvg} disabled={text.trim() === ''}>
            <Download />
            Download as SVG
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button disabled={text.trim() === ''} onClick={() => copyLink(renderUnicode(text))}>
            <Copy />
            Copy as Text
          </Button>
          <Button
            disabled={text.trim() === ''}
            onClick={() => copyLink(renderUnicodeCompact(text))}
          >
            <Copy />
            Copy as Text(Compact)
          </Button>
          <Button disabled={text.trim() === ''} onClick={() => copyLink(renderANSI(text))}>
            <Copy />
            Copy as ANSI
          </Button>
          <Button disabled={text.trim() === ''} onClick={copyAsImage}>
            <Copy />
            Copy as Image
          </Button>
        </div>
        <div className="flex gap-x-2">
          <Button onClick={() => copyLink({ text })} disabled={text.trim() === ''}>
            <Share />
            Share Link
          </Button>
        </div>
      </div>
    </>
  )
}
