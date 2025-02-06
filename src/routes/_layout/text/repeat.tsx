import { createFileRoute } from '@tanstack/react-router'
import { integer, number, object, optional, parse, pipe, string } from 'valibot'
import { Head } from '../../../components/shared/Head'
import { TextRpeat } from '../../../features/text/repeat/page'

const searchParamsSchema = object({
  text: optional(string()),
  count: optional(pipe(number(), integer())),
})

export const Route = createFileRoute('/_layout/text/repeat')({
  validateSearch: (search) => parse(searchParamsSchema, search),
  component: RouteComponent,
})

function RouteComponent() {
  const { text, count } = Route.useSearch()

  return (
    <>
      <Head title="文字列反復" />
      <TextRpeat initialText={text ?? ''} initialCount={count ?? 0} />
    </>
  )
}
