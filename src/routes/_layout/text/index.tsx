import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/text/')({
  loader: () => redirect({ to: '/', hash: 'text' }),
})
