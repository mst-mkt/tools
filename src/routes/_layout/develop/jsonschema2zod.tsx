import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/develop/jsonschema2zod')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_layout/develop/jsonschema2zod"!</div>
}
