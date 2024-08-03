import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { Head } from '../../components/shared/Head'
import { PROJECT_NAME } from '../../constants/project'

const validationSearchParams = z.object({
  params: z.union([z.string().transform((value) => [value]), z.array(z.string())]).optional(),
})

export const Route = createFileRoute('/_layout/')({
  validateSearch: (search) => validationSearchParams.parse(search),
  component: () => <Home />,
})

const Home = () => {
  const { params } = Route.useSearch()

  return (
    <div>
      <Head title="Home" description={`Top Page of ${PROJECT_NAME}`} />
      <p>Hello {PROJECT_NAME} !</p>
      {params !== undefined && params.length > 0 && (
        <p>Params: {params.map((param) => param).join(', ')}</p>
      )}
    </div>
  )
}
