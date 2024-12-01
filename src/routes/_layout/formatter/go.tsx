import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { createFileRoute } from '@tanstack/react-router'
import init, { format } from '@wasm-fmt/gofmt/vite'
import { Copy, Share } from 'lucide-react'
import { useMemo } from 'react'
import { z } from 'zod'
import { Code } from '../../../components/shared/Code'
import { Head } from '../../../components/shared/Head'
import { useCopyLink } from '../../../hooks/useCopyLocation'
import { useInputState } from '../../../hooks/useInputState'
import { copy } from '../../../utils/clipboard/copy'

const searchParamsValidator = z.object({
  code: z.string().optional(),
})

export const Route = createFileRoute('/_layout/formatter/go')({
  validateSearch: (search) => searchParamsValidator.parse(search),
  loader: async () => await init(),
  component: () => <Go />,
})

const Go = () => {
  const { code: initialCode } = Route.useSearch()
  const [code, setCode] = useInputState(initialCode ?? '')
  const { copyLink } = useCopyLink(Route.id)

  const formattedCode = useMemo(() => {
    try {
      const formatted = format(code).trim()
      if (formatted === '') return '// No Input'
      return formatted
    } catch (e) {
      console.error(e)
      return code
    }
  }, [code])

  return (
    <>
      <Head title="Go Formatter" />
      <div className="flex flex-col gap-y-4">
        <h1 className="font-bold text-lg">Go Formatter</h1>
        <Textarea value={code} onChange={setCode} placeholder="Enter Go Code..." />
        <div className="scrollbar-thin scrollbar-thumb-background-200 scrollbar-thumb-rounded-full scrollbar-track-transparent overflow-y-hidden overflow-x-scroll rounded-md border border-background-100 p-4 text-sm">
          <Code lang="go" code={formattedCode} />
        </div>
        <div className="flex gap-x-2">
          <Button onClick={() => copyLink({ code })} disabled={code.trim() === ''}>
            <Share />
            Share Link
          </Button>
          <Button onClick={() => copy(formattedCode)} disabled={code.trim() === ''}>
            <Copy />
            Copy Result
          </Button>
        </div>
      </div>
    </>
  )
}
