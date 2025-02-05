import { createFileRoute } from '@tanstack/react-router'
import { object, optional, parse, picklist, string } from 'valibot'
import { Head } from '../../../components/shared/Head'
import { JsonSchemaToZod } from '../../../features/develop/jsonschema2zod/page'

const searchParamsSchema = object({
  schema: optional(string()),
  name: optional(string()),
  module: optional(picklist(['esm', 'cjs', 'none'])),
})

export const Route = createFileRoute('/_layout/develop/jsonschema2zod')({
  validateSearch: (search) => parse(searchParamsSchema, search),
  component: RouteComponent,
})

function RouteComponent() {
  const { schema, name, module } = Route.useSearch()

  return (
    <>
      <Head title="JSON Schema / Zod 変換" />
      <JsonSchemaToZod
        initialSchema={schema ?? ''}
        initialName={name ?? ''}
        initialModule={module ?? 'none'}
      />
    </>
  )
}
