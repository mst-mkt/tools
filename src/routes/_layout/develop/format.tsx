import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/develop/format')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_layout/develop/format"!</div>
}
