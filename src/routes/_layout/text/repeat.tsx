import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/text/repeat')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_layout/text/repeat"!</div>
}
