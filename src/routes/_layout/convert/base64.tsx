import { IconArrowsUpDown, IconCopy, IconDownload, IconFile, IconShare } from '@tabler/icons-react'
import { createFileRoute } from '@tanstack/react-router'
import { useCallback, useMemo, useState } from 'react'
import { match } from 'ts-pattern'
import { z } from 'zod'
import { Head } from '../../../components/shared/Head'
import { FileInput } from '../../../components/ui/FileInput'
import { IconButton } from '../../../components/ui/IconButton'
import { Select } from '../../../components/ui/Select'
import { TextInput } from '../../../components/ui/TextInput'
import { Textarea } from '../../../components/ui/Textarea'
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
  const [type, onSetType, setType] = useInputState(initialType)
  const [input, setInput] = useInputState(initialInput)
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
  }, [setType, awaitedConvertedText, setText])

  const handleDownload = useCallback(() => {
    if (convertedFile === null) return
    const url = URL.createObjectURL(convertedFile)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }, [convertedFile, filename])

  return (
    <>
      <Head title="Base64 converter" />
      <div className="flex flex-col gap-y-8">
        <h1 className="font-bold text-lg">Base64 converter</h1>
        <Select value={input} onChange={setInput} options={['text', 'file']} />
        {match({ input, type })
          .with({ input: 'file', type: 'encode' }, () => (
            <FileInput file={file} setFile={setFile} />
          ))
          .otherwise(() => (
            <Textarea value={text} onChange={onSetText} placeholder="Enter text to convert" />
          ))}
        <div className="flex items-center justify-between">
          <Select value={type} onChange={onSetType} options={['encode', 'decode']} />
          <IconButton icon={IconArrowsUpDown} label="Reverse" onClick={handleReverse} />
        </div>
        {match({ input, type })
          .with(
            { input: 'file', type: 'decode' },
            () =>
              convertedFile !== null && (
                <div className="flex flex-col gap-y-2">
                  <div className="flex max-w-full items-center gap-x-2 rounded-md border border-accent p-4">
                    <IconFile className="shrink-0 text-accent" size={36} />
                    <div className="flex shrink flex-col items-start overflow-hidden">
                      <span className="truncate whitespace-nowrap font-bold text-accent">
                        {filename.trim() === '' ? 'Unnamed file' : filename}
                      </span>
                      <span className="text-sm">{convertedFile.size} bytes</span>
                    </div>
                  </div>
                  <div className="flex gap-x-2">
                    <TextInput
                      value={filename}
                      onChange={setFilename}
                      placeholder="Download as..."
                    />
                    <IconButton
                      icon={IconDownload}
                      label="Download"
                      onClick={handleDownload}
                      disabled={filename.trim() === ''}
                    />
                  </div>
                </div>
              ),
          )
          .otherwise(() => (
            <Textarea value={awaitedConvertedText} readOnly={true} />
          ))}
        <div className="flex gap-x-2">
          <IconButton
            icon={IconShare}
            label="Copy link"
            disabled={text.trim() === ''}
            onClick={() => copyLink({ text, type, input, filename })}
          />
          <IconButton
            icon={IconCopy}
            label="Copy Result"
            onClick={() => copy(awaitedConvertedText ?? '')}
            disabled={awaitedConvertedText?.trim() === ''}
          />
        </div>
      </div>
    </>
  )
}
