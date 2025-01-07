import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/develop/clipboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_layout/develop/clipboard"!</div>
}
