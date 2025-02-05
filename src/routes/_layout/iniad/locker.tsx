import { createFileRoute } from '@tanstack/react-router'
import { Head } from '../../../components/shared/Head'
import { Locker } from '../../../features/iniad/locker/page'

export const Route = createFileRoute('/_layout/iniad/locker')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <Head title="INIAD ロッカー 解錠" />
      <Locker />
    </>
  )
}
