import { createFileRoute } from '@tanstack/react-router'
import { Head } from '../../../components/shared/Head'
import { Keyboard } from '../../../features/develop/keyboard/page'

export const Route = createFileRoute('/_layout/develop/keyboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <Head title="キーボードイベント確認" />
      <Keyboard />
    </>
  )
}
