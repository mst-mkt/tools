import { createFileRoute } from '@tanstack/react-router'
import init, { format } from '@wasm-fmt/web_fmt/vite'
import { Copy, Share } from 'lucide-react'
import { useMemo } from 'react'
import { z } from 'zod'
import { Code } from '../../../components/shared/Code'
import { Head } from '../../../components/shared/Head'
import { IconButton } from '../../../components/ui/IconButton'
import { Textarea } from '../../../components/ui/Textarea'
import { useCopyLink } from '../../../hooks/useCopyLocation'
import { useInputState } from '../../../hooks/useInputState'
import { copy } from '../../../utils/clipboard/copy'

const searchParamsValidator = z.object({
  code: z.string().optional(),
})

export const Route = createFileRoute('/_layout/formatter/typescript')({
  validateSearch: (search) => searchParamsValidator.parse(search),
  loader: async () => await init(),
  component: () => <Typescript />,
})

const Typescript = () => {
  const { code: initialCode } = Route.useSearch()
  const [code, setCode] = useInputState(initialCode ?? '')
  const { copyLink } = useCopyLink(Route.id)

  const formattedCode = useMemo(() => {
    try {
      const formatted = format(code, 'text.tsx').trim()
      if (formatted === '') return '// No Input'
      return formatted
    } catch (e) {
      console.error(e)
      return code
    }
  }, [code])

  return (
    <>
      <Head title="TypeScript Formatter" />
      <div className="flex flex-col gap-y-4">
        <h1 className="font-bold text-lg">TypeScript Formatter</h1>
        <Textarea value={code} onChange={setCode} placeholder="Enter TypeScript code..." />
        <div className="scrollbar-thin scrollbar-thumb-background-200 scrollbar-thumb-rounded-full scrollbar-track-transparent overflow-y-hidden overflow-x-scroll rounded-md border border-background-100 p-4 text-sm">
          <Code lang="tsx" code={formattedCode} />
        </div>
        <div className="flex gap-x-2">
          <IconButton
            icon={Share}
            onClick={() => copyLink({ code })}
            label="Copy link"
            disabled={code.trim() === ''}
          />
          <IconButton
            icon={Copy}
            onClick={() => copy(formattedCode)}
            label="Copy formatted code"
            disabled={code.trim() === ''}
          />
        </div>
      </div>
    </>
  )
}
