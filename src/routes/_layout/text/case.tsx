import { createFileRoute } from '@tanstack/react-router'
import { object, optional, parse, picklist, string } from 'valibot'
import { Head } from '../../../components/shared/Head'
import { Case } from '../../../features/text/case/page'

const searchParamsSchema = object({
  text: optional(string()),
  to: optional(picklist(['pascal', 'camel', 'kebab', 'snake', 'flat', 'train', 'title'])),
})

export const Route = createFileRoute('/_layout/text/case')({
  validateSearch: (search) => parse(searchParamsSchema, search),
  component: RouteComponent,
})

function RouteComponent() {
  const { text, to } = Route.useSearch()

  return (
    <>
      <Head title="文字ケース変換" />
      <Case initialText={text ?? ''} initialTo={to ?? 'pascal'} />
    </>
  )
}
