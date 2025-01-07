import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/math/calculator')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_layout/math/calcrator"!</div>
}
