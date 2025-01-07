import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/develop/markdown')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_layout/develop/markdown"!</div>
}
