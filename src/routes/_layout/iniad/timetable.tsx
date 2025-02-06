import { createFileRoute } from '@tanstack/react-router'
import { Head } from '../../../components/shared/Head'
import { TimeTable } from '../../../features/iniad/timetable/page'

export const Route = createFileRoute('/_layout/iniad/timetable')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <Head title="時間割" />
      <TimeTable />
    </>
  )
}
