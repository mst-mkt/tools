import { createFileRoute } from '@tanstack/react-router'
import { maxValue, minValue, number, object, optional, parse, pipe, string } from 'valibot'
import { Head } from '../../../components/shared/Head'
import { Radix } from '../../../features/math/radix/page'

const searchParamsSchema = object({
  text: optional(string()),
  from: optional(pipe(number(), minValue(2), maxValue(36))),
  to: optional(pipe(number(), minValue(2), maxValue(36))),
})

export const Route = createFileRoute('/_layout/math/radix')({
  validateSearch: (search) => parse(searchParamsSchema, search),
  component: RouteComponent,
})

function RouteComponent() {
  const { text, from, to } = Route.useSearch()

  return (
    <>
      <Head title="基数変換" />
      <Radix initialText={text ?? ''} initialFrom={from} initialTo={to} />
    </>
  )
}
