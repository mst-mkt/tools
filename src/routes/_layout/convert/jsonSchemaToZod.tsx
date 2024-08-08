import { IconCode, IconCopy, IconShare } from '@tabler/icons-react'
import { createFileRoute } from '@tanstack/react-router'
import init, { format } from '@wasm-fmt/web_fmt/vite'
import jsonSchemaToZod from 'json-schema-to-zod'
import { useCallback, useEffect, useMemo } from 'react'
import { z } from 'zod'
import { Code } from '../../../components/shared/Code'
import { Head } from '../../../components/shared/Head'
import { IconButton } from '../../../components/ui/IconButton'
import { Select } from '../../../components/ui/Select'
import { TextInput } from '../../../components/ui/TextInput'
import { Textarea } from '../../../components/ui/Textarea'
import { useCopyLink } from '../../../hooks/useCopyLocation'
import { useInputState } from '../../../hooks/useInputState'
import { copy } from '../../../utils/clipboard/copy'

const MODULE_TYPES = ['esm', 'cjs', 'none']

const searchParamsValidator = z.object({
  text: z.string().optional(),
  name: z.string().optional(),
  module: z.union([z.literal('esm'), z.literal('cjs'), z.literal('none')]).optional(),
})

export const Route = createFileRoute('/_layout/convert/jsonSchemaToZod')({
  validateSearch: (search) => searchParamsValidator.parse(search),
  component: () => <JsonSchemaToZod />,
})

const JsonSchemaToZod = () => {
  const { text: initialText, name: initialName, module: initialModule } = Route.useSearch()
  const [text, onSetText, setText] = useInputState(initialText ?? '')
  const [schemaName, setSchemaName] = useInputState(initialName ?? '')
  const [moduleType, setModuleType] = useInputState(initialModule ?? 'esm')
  const { copyLink } = useCopyLink(Route.id)

  const handleFormat = useCallback(() => {
    try {
      const formatted = format(text, 'schema.json')
      setText(formatted)
    } catch (e) {
      console.error(e)
    }
  }, [setText, text])

  useEffect(() => {
    init().then(() => text !== '' && handleFormat())
  }, [handleFormat, text])

  const convertedCode = useMemo(() => {
    try {
      const converted = jsonSchemaToZod(JSON.parse(text), { module: moduleType, name: schemaName })
      const formatted = format(converted, 'schema.ts')
      return formatted
    } catch (e) {
      console.error(e)
      return ''
    }
  }, [text, schemaName, moduleType])

  const minifiedText = useMemo(() => {
    try {
      return JSON.stringify(JSON.parse(text), null, 0)
    } catch (e) {
      console.error(e)
      return text
    }
  }, [text])

  return (
    <>
      <Head title="JSON Schema to Zod" />
      <div className="flex flex-col gap-y-8">
        <h1 className="font-bold text-lg">JSON Schema to Zod</h1>
        <div className="flex gap-x-2">
          <TextInput
            value={schemaName}
            onChange={setSchemaName}
            placeholder="Schema Name"
            className="flex-shrink"
          />
          <Select
            value={moduleType}
            onChange={setModuleType}
            options={MODULE_TYPES}
            className="flex-shrink-0"
          />
        </div>
        <Textarea value={text} onChange={onSetText} placeholder="Paste JSON Schema here" />
        <IconButton icon={IconCode} label="Format JSON Schema" onClick={handleFormat} />
        <div className="scrollbar-thin scrollbar-thumb-background-200 scrollbar-thumb-rounded-full scrollbar-track-transparent overflow-y-hidden overflow-x-scroll rounded-md border border-background-100 p-4 text-sm">
          <Code code={convertedCode} />
        </div>
        <div className="flex gap-x-2">
          <IconButton
            icon={IconShare}
            label="Share Link"
            onClick={() =>
              copyLink({
                text: minifiedText,
                name: schemaName !== '' ? schemaName : undefined,
                module: moduleType,
              })
            }
            disabled={text.trim() === ''}
          />
          <IconButton
            icon={IconCopy}
            label="Copy Result"
            onClick={() => copy(convertedCode)}
            disabled={convertedCode.trim() === ''}
          />
        </div>
      </div>
    </>
  )
}
