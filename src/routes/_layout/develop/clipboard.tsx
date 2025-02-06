import { createFileRoute } from '@tanstack/react-router'
import { Head } from '../../../components/shared/Head'
import { Clipboard } from '../../../features/develop/clipboard/page'

export const Route = createFileRoute('/_layout/develop/clipboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <Head title="クリップボードデータ確認" />
      <Clipboard />
    </>
  )
}
