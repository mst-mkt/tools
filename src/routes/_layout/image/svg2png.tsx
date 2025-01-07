import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/image/svg2png')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_layout/image/svg2png"!</div>
}
