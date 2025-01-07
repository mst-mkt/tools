import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/convert/base64')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_layout/convert/base64"!</div>
}
