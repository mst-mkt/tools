import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/text/cjp')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_layout/text/cjp"!</div>
}
