import { useEffect } from 'react'

document.addEventListener

export const useDocumentEvent = <K extends keyof DocumentEventMap>(
  type: K,
  listener: (ev: DocumentEventMap[K]) => void,
  options?: AddEventListenerOptions,
) => {
  useEffect(() => {
    document.addEventListener(type, listener, options)

    return () => {
      document.removeEventListener(type, listener, { capture: options?.capture })
    }
  }, [type, listener, options])
}
