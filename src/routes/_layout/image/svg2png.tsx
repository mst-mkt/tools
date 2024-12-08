import { Head } from '@/components/shared/Head'
import { Button } from '@/components/ui/button'
import { FileInput } from '@/components/ui/fileInput'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { svg2Png } from '@/utils/image/svg2png'
import { createFileRoute } from '@tanstack/react-router'
import { Download, FileIcon, Loader } from 'lucide-react'
import { type ChangeEvent, useCallback, useState } from 'react'

export const Route = createFileRoute('/_layout/image/svg2png')({
  component: () => <SvgToPng />,
})

const SvgToPng = () => {
  const [inputFile, setInputFile] = useState<File | null>(null)
  const [outputFile, setOutputFile] = useState<File | null>(null)
  const [scale, setScale] = useState(512)
  const [isConverting, setIsConverting] = useState(false)

  const handleFileInput = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const { files } = e.currentTarget
      if (files === null) return

      const [file] = files
      if (file === undefined) return

      setInputFile(file)

      setIsConverting(true)
      const output = await svg2Png(file, scale)
      setOutputFile(output)

      setIsConverting(false)
    },
    [scale],
  )

  const handleDownload = useCallback(() => {
    if (outputFile === null) return

    const url = URL.createObjectURL(outputFile)
    const a = document.createElement('a')
    a.href = url
    a.download = outputFile.name
    a.click()
    URL.revokeObjectURL(url)
  }, [outputFile])

  const handleSizeChange = useCallback(
    async (size: number) => {
      setScale(size)

      if (inputFile === null) return

      setIsConverting(true)
      const output = await svg2Png(inputFile, size)
      setOutputFile(output)
      setIsConverting(false)
    },
    [inputFile],
  )

  return (
    <>
      <Head title="SVG to PNG Converter" />
      <div className="flex flex-col gap-y-4">
        <h1 className="font-bold text-lg">SVG to PNG Converter</h1>
        <FileInput file={inputFile} onChange={handleFileInput} />
        <div>
          <span className="font-bold">Size</span>
          <div className="flex items-center gap-x-4">
            <div className="w-full rounded-lg border p-4 shadow-sm">
              <Slider
                value={[scale]}
                onValueChange={([scale]) => scale !== undefined && handleSizeChange(scale)}
                min={16}
                max={1024}
              />
            </div>
            <div className="flex h-full items-center gap-x-2">
              <Input
                value={scale}
                onChange={(e) => handleSizeChange(Number.parseFloat(e.currentTarget.value))}
              />
              <span>px</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-y-2">
          {inputFile !== null && (
            <>
              <div className="flex w-full items-center gap-x-2 rounded-md border p-4">
                {isConverting ? (
                  <div className="flex w-full items-center justify-center">
                    <Loader className="animate-spin" size={36} />
                  </div>
                ) : (
                  <>
                    <FileIcon className="shrink-0" size={36} />
                    <div className="flex shrink flex-col items-start overflow-hidden">
                      <span className="truncate whitespace-nowrap font-bold text-accent">
                        {outputFile?.name ?? `${inputFile.name}.png`}
                      </span>
                      <span className="text-sm">{outputFile?.size} bytes</span>
                    </div>
                  </>
                )}
              </div>
              {!isConverting && outputFile !== null && (
                <Button onClick={handleDownload}>
                  <Download />
                  Download
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </>
  )
}
