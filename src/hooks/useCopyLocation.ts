import { useRouter } from '@tanstack/react-router'
import { useCallback, useMemo } from 'react'
import type { FileRoutesByTo } from '../lib/tanstack-router/routeTree.gen'
import { copy } from '../utils/copy'

export const useCopyLocation = () => {
  const router = useRouter()
  const basePath = useMemo(() => window.location.origin, [])

  const copyLocation = useCallback(
    <T extends keyof FileRoutesByTo>(
      to: T,
      params?: FileRoutesByTo[T]['types']['searchSchema'],
      hash?: string,
    ) => {
      const link = router.buildLocation({
        to,
        search: params as Parameters<typeof router.buildLocation>[0]['search'],
        hash,
      })

      const url = new URL(link.href, basePath)
      copy(url.toString())
    },
    [basePath, router],
  )

  return copyLocation
}
