import { useCallback, useSyncExternalStore } from 'react'

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const subscribe = useCallback(
    (callback: () => void) => {
      window.addEventListener('storage', (ev) => {
        if (ev.key === key) callback()
      })
      return () => window.removeEventListener('storage', callback)
    },
    [key],
  )

  const getItem = useCallback(() => {
    const item = localStorage.getItem(key)
    if (item === null) return initialValue

    try {
      return JSON.parse(item) as T
    } catch {
      console.error(`Failed to parse JSON from localStorage: "${key}", "${item}"`)
      return initialValue
    }
  }, [key, initialValue])

  const setValue = useCallback(
    (newValue: T) => {
      const stringifiedValue = JSON.stringify(newValue)
      localStorage.setItem(key, stringifiedValue)
      window.dispatchEvent(new StorageEvent('storage', { key, newValue: stringifiedValue }))
    },
    [key],
  )

  const value = useSyncExternalStore(subscribe, getItem)

  return [value, setValue] as const
}
