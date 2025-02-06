import { IconLink } from '@tabler/icons-react'
import 'katex/dist/katex.min.css'
import type { FC } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeKatex from 'rehype-katex'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import { Box } from 'rizzui/box'
import { Button } from 'rizzui/button'
import { Flex } from 'rizzui/flex'
import { Textarea } from 'rizzui/textarea'
import { Title } from 'rizzui/typography'
import { Breadcrumb } from '../../../components/ui/Breadcrumb'
import { useCopyLocation } from '../../../hooks/useCopyLocation'
import { useInputState } from '../../../hooks/useInputState'

type MarkdownProps = {
  initialMarkdown: string
}

export const Markdown: FC<MarkdownProps> = ({ initialMarkdown }) => {
  const [markdown, setMarkdown] = useInputState(initialMarkdown)

  const copyLocation = useCopyLocation()

  return (
    <>
      <Breadcrumb
        items={[
          { label: 'tools', toOptions: { to: '/' } },
          { label: 'develop', toOptions: { to: '/', hash: 'develop' } },
          'markdown',
        ]}
      />
      <Title as="h1" className="text-lg">
        Markdown プレビュー
      </Title>
      <Textarea value={markdown} onChange={setMarkdown} placeholder="Markdown を入力" />
      <Box className="prose dark:prose-invert rounded-md border border-muted px-4 py-3 shadow-xs">
        <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}>
          {markdown === '' ? 'Markdown を入力してください' : markdown}
        </ReactMarkdown>
      </Box>
      <Flex align="center" gap="4">
        <Button
          className="w-fit cursor-pointer gap-x-2 disabled:cursor-not-allowed"
          onClick={() => copyLocation('/develop/markdown', { markdown })}
          disabled={markdown.trim() === ''}
        >
          <IconLink size={16} />
          URLをコピー
        </Button>
      </Flex>
    </>
  )
}
