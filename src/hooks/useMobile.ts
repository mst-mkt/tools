import { useCallback, useMemo, useSyncExternalStore } from 'react'

const mediaQuery = '(max-width: 640px)'

export const useMobile = (initialState = false) => {
  const matchMediaList = useMemo(
    () => (typeof window === 'undefined' ? undefined : window.matchMedia(mediaQuery)),
    [],
  )

  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      matchMediaList?.addEventListener('change', onStoreChange)
      return () => matchMediaList?.removeEventListener('change', onStoreChange)
    },
    [matchMediaList],
  )

  return useSyncExternalStore(
    subscribe,
    () => matchMediaList?.matches ?? initialState,
    () => initialState,
  )
}
