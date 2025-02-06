import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/develop/')({
  loader: () => redirect({ to: '/', hash: 'develop' }),
})
