import { createFileRoute } from '@tanstack/react-router'
import { array, minLength, object, optional, parse, pipe, string } from 'valibot'
import { Head } from '../../../components/shared/Head'
import { TextReplace } from '../../../features/text/replace/page'

const searchParamsSchema = object({
  text: optional(string()),
  rules: optional(pipe(array(object({ from: string(), to: string() })), minLength(1))),
})

export const Route = createFileRoute('/_layout/text/replace')({
  validateSearch: (search) => parse(searchParamsSchema, search),
  component: RouteComponent,
})

function RouteComponent() {
  const { text, rules } = Route.useSearch()

  return (
    <>
      <Head title="文字列置換" />
      <TextReplace initialText={text ?? ''} initialRules={rules} />
    </>
  )
}
