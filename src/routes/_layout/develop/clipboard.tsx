import { createFileRoute } from '@tanstack/react-router'
import { Clipboard } from '../../../features/develop/clipboard/page'

export const Route = createFileRoute('/_layout/develop/clipboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Clipboard />
}
