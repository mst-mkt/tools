import { createFileRoute } from '@tanstack/react-router'
import { object, optional, parse, picklist, string } from 'valibot'
import { Head } from '../../../components/shared/Head'
import { Blocks, generalCategoryShort } from '../../../features/develop/unicode/constants'
import { Unicode } from '../../../features/develop/unicode/page'

const searchParams = object({
  display: optional(picklist(['all', 'block', 'category', 'emoji', 'search'])),
  category: optional(picklist([...generalCategoryShort, 'all'])),
  block: optional(picklist([...Blocks, 'all'])),
  search: optional(string()),
})

export const Route = createFileRoute('/_layout/develop/unicode')({
  validateSearch: (search) => parse(searchParams, search),
  component: RouteComponent,
})

function RouteComponent() {
  const { display, category, block, search } = Route.useSearch()

  return (
    <>
      <Head title="Unicode 一覧表" />
      <Unicode
        initialDisplay={display ?? 'all'}
        initialCategory={category ?? 'all'}
        initialBlock={block ?? 'all'}
        initialSearch={search ?? ''}
      />
    </>
  )
}
