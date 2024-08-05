import type { FileRoutesByPath } from '@tanstack/react-router'
import { useRouter, useSearch } from '@tanstack/react-router'
import { copy } from '../utils/clipboard/copy'

export const useCopyLink = (path: keyof FileRoutesByPath) => {
  const router = useRouter()
  const searchParam = useSearch({
    from: path,
  })

  const basePath = window.location.origin

  return {
    copyLink: async (searchParams: typeof searchParam) => {
      const link = router.buildLocation({
        to: router.parseLocation().pathname,
        search: searchParams,
      })

      const url = `${basePath}${link.href}`
      await copy(url)
    },
  }
}
