import { createFileRoute } from '@tanstack/react-router'
import { object, optional, parse, picklist, string } from 'valibot'
import { Head } from '../../../components/shared/Head'
import { Punycode } from '../../../features/convert/punycode/page'

const searchParamsSchema = object({
  text: optional(string()),
  type: optional(picklist(['encode', 'decode'])),
})

export const Route = createFileRoute('/_layout/convert/punycode')({
  validateSearch: (search) => parse(searchParamsSchema, search),
  component: RouteComponent,
})

function RouteComponent() {
  const { text, type } = Route.useSearch()

  return (
    <>
      <Head title="Punycode変換" />
      <Punycode initialText={text ?? ''} initialType={type} />
    </>
  )
}
