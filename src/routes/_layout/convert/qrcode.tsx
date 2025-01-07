import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/convert/qrcode')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_layout/convert/qrcode"!</div>
}
