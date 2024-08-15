import { type DependencyList, useEffect, useState } from 'react'

export const usePromise = <T>(
  promise: (() => Promise<T>) | Promise<T>,
  deps: DependencyList = [],
) => {
  const [data, setData] = useState<T>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error>()

  useEffect(() => {
    setLoading(true)
    if (typeof promise !== 'function') {
      promise
        .then(setData)
        .catch(setError)
        .finally(() => setLoading(false))
      setLoading(false)
      return
    }

    promise()
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [...deps, promise])

  return {
    data,
    loading,
    error,
  }
}
