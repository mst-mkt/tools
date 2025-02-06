import { createFileRoute } from '@tanstack/react-router'
import { object, optional, parse, picklist, string } from 'valibot'
import { Head } from '../../../components/shared/Head'
import { SUPPORTED_LANGUAGES, init } from '../../../features/develop/format/formatter'
import { Format } from '../../../features/develop/format/page'

const searchParamsSchema = object({
  language: optional(picklist(SUPPORTED_LANGUAGES)),
  code: optional(string()),
})

export const Route = createFileRoute('/_layout/develop/format')({
  validateSearch: (search) => parse(searchParamsSchema, search),
  loaderDeps: ({ search: { language } }) => ({ language }),
  loader: async ({ deps: { language } }) => await init[language ?? 'ts'](),
  component: RouteComponent,
})

function RouteComponent() {
  const { language, code } = Route.useSearch()

  return (
    <>
      <Head title="コードフォーマッター" />
      <Format initialLanguage={language ?? 'ts'} initialCode={code ?? ''} />
    </>
  )
}
