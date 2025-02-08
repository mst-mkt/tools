import { useLayoutEffect, useState } from 'react'

export const useElementSize = (element: HTMLElement | null) => {
  const [size, setSize] = useState({ width: 0, height: 0 })

  useLayoutEffect(() => {
    if (element === null) return

    const handleResize = () => {
      setSize({
        width: element.clientWidth,
        height: element.clientHeight,
      })
    }

    const observer = new ResizeObserver(handleResize)
    observer.observe(element)

    handleResize()

    return () => {
      observer.disconnect()
    }
  }, [element])

  return size
}
