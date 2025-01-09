import { useEffect, useState } from 'react'

export const useAwaited = <T>(promise: Promise<T>) => {
  const [state, setState] = useState<T>()

  useEffect(() => {
    let isMounted = true

    promise.then((value) => {
      if (isMounted) setState(value)
    })

    return () => {
      isMounted = false
    }
  }, [promise])

  return state
}
