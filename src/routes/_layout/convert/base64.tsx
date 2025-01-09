import { createFileRoute } from '@tanstack/react-router'
import { object, optional, parse, picklist, string } from 'valibot'
import { Head } from '../../../components/shared/Head'
import { Base64 } from '../../../features/convert/base64/page'

const searchParamsSchema = object({
  text: optional(string()),
  type: optional(picklist(['encode', 'decode'])),
  input: optional(picklist(['text', 'file'])),
  filename: optional(string()),
})

export const Route = createFileRoute('/_layout/convert/base64')({
  validateSearch: (search) => parse(searchParamsSchema, search),
  component: RouteComponent,
})

function RouteComponent() {
  const { text, type, input, filename } = Route.useSearch()

  return (
    <>
      <Head title="Base64 エンコード / デコード" />
      <Base64
        initialText={text ?? ''}
        initialType={type}
        initialInputType={input}
        initialFileName={filename ?? ''}
      />
    </>
  )
}
