import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { createFileRoute } from '@tanstack/react-router'
import init, { format } from '@wasm-fmt/web_fmt/vite'
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

export const Route = createFileRoute('/_layout/formatter/html')({
  validateSearch: (search) => searchParamsValidator.parse(search),
  loader: async () => await init(),
  component: () => <Html />,
})

const Html = () => {
  const { code: initialCode } = Route.useSearch()
  const [code, setCode] = useInputState(initialCode ?? '')
  const { copyLink } = useCopyLink(Route.id)

  const formattedCode = useMemo(() => {
    try {
      const formatted = format(code, 'text.html').trim()
      if (formatted === '') return '<!-- No Input -->'
      return formatted
    } catch (e) {
      console.error(e)
      return code
    }
  }, [code])

  return (
    <>
      <Head title="HTML Formatter" />
      <div className="flex flex-col gap-y-4">
        <h1 className="font-bold text-lg">HTML Formatter</h1>
        <Textarea value={code} onChange={setCode} placeholder="Enter HTML Document..." />
        <div className="scrollbar-thin scrollbar-thumb-background-200 scrollbar-thumb-rounded-full scrollbar-track-transparent overflow-y-hidden overflow-x-scroll rounded-md border border-background-100 p-4 text-sm">
          <Code lang="html" code={formattedCode} />
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
