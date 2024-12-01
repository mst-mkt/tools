import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { createFileRoute } from '@tanstack/react-router'
import init, { format } from '@wasm-fmt/web_fmt/vite'
import jsonSchemaToZod from 'json-schema-to-zod'
import { Code as CodeIcon, Copy, Share } from 'lucide-react'
import { useCallback, useMemo } from 'react'
import { z } from 'zod'
import { Code } from '../../../components/shared/Code'
import { Head } from '../../../components/shared/Head'
import { useCopyLink } from '../../../hooks/useCopyLocation'
import { useInputState } from '../../../hooks/useInputState'
import { copy } from '../../../utils/clipboard/copy'

const MODULE_TYPES = ['esm', 'cjs', 'none'] as const
type ModuleType = (typeof MODULE_TYPES)[number]

const searchParamsValidator = z.object({
  text: z.string().optional(),
  name: z.string().optional(),
  module: z.union([z.literal('esm'), z.literal('cjs'), z.literal('none')]).optional(),
})

export const Route = createFileRoute('/_layout/convert/jsonSchemaToZod')({
  validateSearch: (search) => searchParamsValidator.parse(search),
  loader: async () => await init(),
  component: () => <JsonSchemaToZod />,
})

const JsonSchemaToZod = () => {
  const { text: initialText, name: initialName, module: initialModule } = Route.useSearch()

  const handleFormat = useCallback((text: string) => {
    try {
      return format(text, 'schema.json')
    } catch {
      return text
    }
  }, [])

  const [text, onSetText, setText] = useInputState(handleFormat(initialText ?? ''))
  const [schemaName, setSchemaName] = useInputState(initialName ?? '')
  const [moduleType, _, setModuleType] = useInputState(initialModule ?? 'esm')
  const { copyLink } = useCopyLink(Route.id)

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
          <Input
            value={schemaName}
            onChange={setSchemaName}
            placeholder="Schema Name"
            className="grow"
          />
          <Select value={moduleType} onValueChange={(value: ModuleType) => setModuleType(value)}>
            <SelectTrigger className="w-fit grow-0 p-4">
              <SelectValue defaultValue="esm" />
            </SelectTrigger>
            <SelectContent>
              {MODULE_TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Textarea value={text} onChange={onSetText} placeholder="Paste JSON Schema here" />
        <Button onClick={() => setText(handleFormat(text))} className="w-fit">
          <CodeIcon />
          Format JSON Schema
        </Button>
        <div className="overflow-y-hidden overflow-x-scroll rounded-md border border-background-100 p-4 text-sm">
          <Code code={convertedCode} />
        </div>
        <div className="flex gap-x-2">
          <Button
            onClick={() =>
              copyLink({ text: minifiedText, name: schemaName !== '' ? schemaName : undefined })
            }
            disabled={minifiedText.trim() === ''}
          >
            <Share />
            Share Link
          </Button>
          <Button onClick={() => copy(convertedCode)} disabled={convertedCode.trim() === ''}>
            <Copy />
            Copy Result
          </Button>
        </div>
      </div>
    </>
  )
}
