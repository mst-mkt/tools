import { createFileRoute } from '@tanstack/react-router'
import { object, optional, parse, string } from 'valibot'
import { Head } from '../../../components/shared/Head'
import { TextCount } from '../../../features/text/count/page'

const searchParamsSchema = object({
  text: optional(string()),
})

export const Route = createFileRoute('/_layout/text/count')({
  validateSearch: (search) => parse(searchParamsSchema, search),
  component: RouteComponent,
})

function RouteComponent() {
  const { text } = Route.useSearch()

  return (
    <>
      <Head title="文字数カウント" />
      <TextCount initialText={text ?? ''} />
    </>
  )
}
