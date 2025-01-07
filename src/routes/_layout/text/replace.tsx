import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/text/replace')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_layout/text/replace"!</div>
}
