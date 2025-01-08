import { createFileRoute } from '@tanstack/react-router'
import { object, optional, parse, string } from 'valibot'
import { Head } from '../../../components/shared/Head'
import { Cjp } from '../../../features/text/cjp/page'

const searchParamsSchema = object({
  text: optional(string()),
})

export const Route = createFileRoute('/_layout/text/cjp')({
  validateSearch: (search) => parse(searchParamsSchema, search),
  component: RouteComponent,
})

function RouteComponent() {
  const { text } = Route.useSearch()

  return (
    <>
      <Head title="怪レい日本语 変換" />
      <Cjp initialText={text ?? ''} />
    </>
  )
}
