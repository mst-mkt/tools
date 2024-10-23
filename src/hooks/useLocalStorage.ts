import { useCallback, useMemo, useSyncExternalStore } from 'react'

const subscribe = (callback: () => void) => {
  window.addEventListener('storage', callback)
  return () => window.removeEventListener('storage', callback)
}

export const getStorageItem = <T>(key: string, initialValue: T) => {
  const value = window.localStorage.getItem(key)
  return value === null ? JSON.stringify(initialValue) : value
}

const setStorageItem = <T>(key: string, value: T) => {
  window.localStorage.setItem(key, JSON.stringify(value))
  window.dispatchEvent(new Event('storage'))
}

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const value = useSyncExternalStore(subscribe, () => getStorageItem(key, initialValue))
  const setItem = useCallback(
    (value: T) => {
      setStorageItem(key, value)
    },
    [key],
  )

  const parsedValue = useMemo<T>(() => {
    try {
      return JSON.parse(value)
    } catch {
      return initialValue
    }
  }, [initialValue, value])

  return [parsedValue, setItem] as const
}
