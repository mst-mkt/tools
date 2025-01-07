import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/iniad/locker')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_layout/iniad/locker"!</div>
}
