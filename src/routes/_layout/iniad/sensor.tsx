import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/iniad/sensor')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_layout/iniad/sensor"!</div>
}
