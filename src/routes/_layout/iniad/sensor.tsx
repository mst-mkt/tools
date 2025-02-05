import { createFileRoute } from '@tanstack/react-router'
import { Head } from '../../../components/shared/Head'
import { Sensor } from '../../../features/iniad/sensor/page'

export const Route = createFileRoute('/_layout/iniad/sensor')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <Head title="INIAD センサー" />
      <Sensor />
    </>
  )
}
