import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/iniad/')({
  loader: () => redirect({ to: '/', hash: 'iniad' }),
})
