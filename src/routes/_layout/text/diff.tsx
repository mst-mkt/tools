import { createFileRoute } from '@tanstack/react-router'
import { object, optional, parse, string } from 'valibot'
import { Head } from '../../../components/shared/Head'
import { Diff } from '../../../features/text/diff/page'

const searchParamasSchema = object({
  before: optional(string()),
  after: optional(string()),
})

export const Route = createFileRoute('/_layout/text/diff')({
  validateSearch: (search) => parse(searchParamasSchema, search),
  component: RouteComponent,
})

function RouteComponent() {
  const { before, after } = Route.useSearch()

  return (
    <>
      <Head title="文字列差分" />
      <Diff initialBefore={before ?? ''} initialAfter={after ?? ''} />
    </>
  )
}
