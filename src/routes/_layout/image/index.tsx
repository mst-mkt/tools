import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/image/')({
  loader: () => redirect({ to: '/', hash: 'image' }),
})
