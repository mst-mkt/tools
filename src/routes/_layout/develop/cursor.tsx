import { createFileRoute } from '@tanstack/react-router'
import { object, optional, parse, picklist } from 'valibot'
import { Head } from '../../../components/shared/Head'
import { CURSORS } from '../../../features/develop/cursor/constants'
import { Cursor } from '../../../features/develop/cursor/page'

const searchParamsSchema = object({
  cursor: optional(picklist(CURSORS)),
})

export const Route = createFileRoute('/_layout/develop/cursor')({
  component: RouteComponent,
  validateSearch: (search) => parse(searchParamsSchema, search),
})

function RouteComponent() {
  const { cursor } = Route.useSearch()

  return (
    <>
      <Head title="カーソル スタイルプレビュー" />
      <Cursor initialSelectedCursor={cursor ?? 'auto'} />
    </>
  )
}
