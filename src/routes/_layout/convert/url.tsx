import { createFileRoute } from '@tanstack/react-router'
import { object, optional, parse, picklist, string } from 'valibot'
import { Head } from '../../../components/shared/Head'
import { Url } from '../../../features/convert/url/page'

const searchParamsSchema = object({
  text: optional(string()),
  type: optional(picklist(['encode', 'decode'])),
})

export const Route = createFileRoute('/_layout/convert/url')({
  validateSearch: (search) => parse(searchParamsSchema, search),
  component: RouteComponent,
})

function RouteComponent() {
  const { text, type } = Route.useSearch()

  return (
    <>
      <Head title="URL エンコード / デコード" />
      <Url initialText={text ?? ''} initialType={type} />
    </>
  )
}
