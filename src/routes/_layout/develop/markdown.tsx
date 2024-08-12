import { IconShare } from '@tabler/icons-react'
import { createFileRoute } from '@tanstack/react-router'
import Markdown from 'react-markdown'
import rehypeKatex from 'rehype-katex'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import { z } from 'zod'
import { Head } from '../../../components/shared/Head'
import { IconButton } from '../../../components/ui/IconButton'
import { Textarea } from '../../../components/ui/Textarea'
import { useCopyLink } from '../../../hooks/useCopyLocation'
import { useInputState } from '../../../hooks/useInputState'

const searchParamsValidator = z.object({
  text: z.string().optional(),
})

export const Route = createFileRoute('/_layout/develop/markdown')({
  validateSearch: (search) => searchParamsValidator.parse(search),
  component: () => <MarkdownPreview />,
})

const MarkdownPreview = () => {
  const { text: initialText } = Route.useSearch()
  const [text, setText] = useInputState(initialText ?? '')
  const { copyLink } = useCopyLink(Route.id)

  return (
    <>
      <Head title="Markdown Preview" />
      <div className="flex flex-col gap-y-8">
        <h1 className="font-bold text-lg">Markdown Preview</h1>
        <Textarea value={text} onChange={setText} placeholder="Enter markdown here" />
        <div className="prose rounded-xl border border-background-100 p-8">
          <Markdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}>
            {text.trim() === '' ? 'No Input' : text}
          </Markdown>
        </div>
        <div className="flex gap-x-2">
          <IconButton
            icon={IconShare}
            onClick={() => copyLink({ text })}
            label="Share Link"
            disabled={text.trim() === ''}
          />
        </div>
      </div>
    </>
  )
}
