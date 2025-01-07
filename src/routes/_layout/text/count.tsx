import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/text/count')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_layout/text/count"!</div>
}
