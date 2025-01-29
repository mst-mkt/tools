import { createFileRoute } from '@tanstack/react-router'
import { url, object, optional, parse, pipe, string } from 'valibot'
import { Head } from '../../../components/shared/Head'
import { Iframe } from '../../../features/develop/iframe/page'

const searchParamsSchema = object({
  src: optional(pipe(string(), url())),
})

export const Route = createFileRoute('/_layout/develop/iframe')({
  validateSearch: (search) => parse(searchParamsSchema, search),
  component: RouteComponent,
})

function RouteComponent() {
  const { src } = Route.useSearch()

  return (
    <>
      <Head title="iframe プレビュー" />
      <Iframe initialSrc={src ?? ''} />
    </>
  )
}
