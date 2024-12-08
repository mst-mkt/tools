import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { createFileRoute } from '@tanstack/react-router'
import { ArrowUpDown, Copy, Download, File, Share } from 'lucide-react'
import { type ChangeEvent, useCallback, useMemo, useState } from 'react'
import { match } from 'ts-pattern'
import { z } from 'zod'
import { Head } from '../../../components/shared/Head'
import { FileInput } from '../../../components/ui/fileInput'
import { Textarea } from '../../../components/ui/textarea'
import { useCopyLink } from '../../../hooks/useCopyLocation'
import { useInputState } from '../../../hooks/useInputState'
import { usePromise } from '../../../hooks/usePromise'
import { decodeBase64, decodeBase64ToFile } from '../../../utils/base64/decode'
import { encodeBase64, encodeBase64FromFile } from '../../../utils/base64/encode'
import { copy } from '../../../utils/clipboard/copy'

const searchParamsValidator = z.object({
  text: z.string().optional(),
  type: z.union([z.literal('encode'), z.literal('decode')]).catch('encode'),
  input: z.union([z.literal('text'), z.literal('file')]).catch('text'),
  filename: z.string().optional(),
})

export const Route = createFileRoute('/_layout/convert/base64')({
  validateSearch: (search) => searchParamsValidator.parse(search),
  component: () => <Base64 />,
})

const Base64 = () => {
  const {
    text: initialText,
    type: initialType,
    input: initialInput,
    filename: initialFilename,
  } = Route.useSearch()
  const [text, onSetText, setText] = useInputState(initialText ?? '')
  const [type, setType] = useState(initialType)
  const [input, setInput] = useState(initialInput)
  const [filename, setFilename] = useInputState(initialFilename ?? '')
  const [file, setFile] = useState<File | null>(null)
  const { copyLink } = useCopyLink(Route.id)

  const convertedText = useMemo(() => {
    return match({ type, input })
      .with({ type: 'encode', input: 'text' }, async () => encodeBase64(text))
      .with({ type: 'decode', input: 'text' }, async () => decodeBase64(text))
      .with({ type: 'encode', input: 'file' }, async () => {
        if (file === null) return ''
        return await encodeBase64FromFile(file)
      })
      .with({ type: 'decode', input: 'file' }, async () => text)
      .exhaustive()
  }, [text, type, input, file])

  const { data: awaitedConvertedText } = usePromise(convertedText)

  const convertedFile = useMemo(() => {
    if (input === 'text') return null
    if (type === 'encode') return file
    const converted = decodeBase64ToFile(text, file?.name ?? '')
    return converted
  }, [file, input, text, type])

  const handleReverse = useCallback(() => {
    setType((prevType) => (prevType === 'encode' ? 'decode' : 'encode'))
    setText(awaitedConvertedText ?? '')
  }, [awaitedConvertedText, setText])

  const handleDownload = useCallback(() => {
    if (convertedFile === null) return
    const url = URL.createObjectURL(convertedFile)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }, [convertedFile, filename])

  const handleSetFile = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files?.[0] === undefined) return
    setFile(e.currentTarget.files[0])
  }, [])

  return (
    <>
      <Head title="Base64 converter" />
      <div className="flex flex-col gap-y-8">
        <h1 className="font-bold text-lg">Base64 converter</h1>
        <Select onValueChange={(value: 'text' | 'file') => setInput(value)} value={input}>
          <SelectTrigger>
            <SelectValue defaultValue="text" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="text">Text</SelectItem>
            <SelectItem value="file">File</SelectItem>
          </SelectContent>
        </Select>
        {match({ input, type })
          .with({ input: 'file', type: 'encode' }, () => (
            <FileInput file={file} onChange={handleSetFile} />
          ))
          .otherwise(() => (
            <Textarea value={text} onChange={onSetText} placeholder="Enter text to convert" />
          ))}
        <div className="flex items-center justify-between gap-x-2">
          <Select onValueChange={(value: 'encode' | 'decode') => setType(value)} value={type}>
            <SelectTrigger>
              <SelectValue defaultValue="encode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="encode">Encode</SelectItem>
              <SelectItem value="decode">Decode</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleReverse}>
            <ArrowUpDown />
            Reverse
          </Button>
        </div>
        {match({ input, type })
          .with(
            { input: 'file', type: 'decode' },
            () =>
              convertedFile !== null && (
                <div className="flex flex-col gap-y-2">
                  <div className="flex max-w-full items-center gap-x-2 rounded-md border border-accent p-4">
                    <File className="shrink-0 text-accent" size={36} />
                    <div className="flex shrink flex-col items-start overflow-hidden">
                      <span className="truncate whitespace-nowrap font-bold text-accent">
                        {filename.trim() === '' ? 'Unnamed file' : filename}
                      </span>
                      <span className="text-sm">{convertedFile.size} bytes</span>
                    </div>
                  </div>
                  <div className="flex gap-x-2">
                    <Input
                      type="text"
                      value={filename}
                      onChange={setFilename}
                      placeholder="Download as..."
                    />
                    <Button onClick={handleDownload} disabled={filename.trim() === ''}>
                      <Download />
                      Download
                    </Button>
                  </div>
                </div>
              ),
          )
          .otherwise(() => (
            <Textarea value={awaitedConvertedText} readOnly={true} />
          ))}
        <div className="flex gap-x-2">
          <Button
            onClick={() => copyLink({ text, type, input, filename })}
            disabled={text.trim() === ''}
          >
            <Share />
            Share Link
          </Button>
          <Button
            onClick={() => copy(awaitedConvertedText ?? '')}
            disabled={awaitedConvertedText?.trim() === ''}
          >
            <Copy />
            Copy Result
          </Button>
        </div>
      </div>
    </>
  )
}
