import { IconCopy, IconShare } from '@tabler/icons-react'
import { createFileRoute } from '@tanstack/react-router'
import init, { format } from '@wasm-fmt/web_fmt/vite'
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
          <IconButton
            icon={IconShare}
            onClick={() => copyLink({ code })}
            label="Copy link"
            disabled={code.trim() === ''}
          />
          <IconButton
            icon={IconCopy}
            onClick={() => copy(formattedCode)}
            label="Copy formatted code"
            disabled={code.trim() === ''}
          />
        </div>
      </div>
    </>
  )
}
