import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/convert/')({
  loader: () => redirect({ to: '/', hash: 'convert' }),
})
