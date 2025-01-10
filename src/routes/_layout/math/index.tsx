import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/math/')({
  loader: () => redirect({ to: '/', hash: 'math' }),
})
