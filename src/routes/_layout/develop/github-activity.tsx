import { createFileRoute } from '@tanstack/react-router'
import { array, object, optional, parse, string } from 'valibot'
import { Head } from '../../../components/shared/Head'
import { GithubActivity } from '../../../features/develop/github-activity/page'

const searchParamsSchema = object({
  users: optional(array(string())),
})

export const Route = createFileRoute('/_layout/develop/github-activity')({
  validateSearch: (search) => parse(searchParamsSchema, search),
  component: RouteComponent,
})

function RouteComponent() {
  const { users } = Route.useSearch()

  return (
    <>
      <Head title="GitHubアクティビティ" />
      <GithubActivity initialUsers={users ?? []} />
    </>
  )
}
