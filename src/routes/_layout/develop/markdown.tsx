import { createFileRoute } from '@tanstack/react-router'
import { object, optional, parse, string } from 'valibot'
import { Head } from '../../../components/shared/Head'
import { Markdown } from '../../../features/develop/markdown/page'

const searchParamsSchema = object({
  markdown: optional(string()),
})

export const Route = createFileRoute('/_layout/develop/markdown')({
  validateSearch: (search) => parse(searchParamsSchema, search),
  component: RouteComponent,
})

function RouteComponent() {
  const { markdown } = Route.useSearch()

  return (
    <>
      <Head title="Markdown プレビュー" />
      <Markdown initialMarkdown={markdown ?? ''} />
    </>
  )
}
