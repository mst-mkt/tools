import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/develop/iframe')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_layout/develop/iframe"!</div>
}
