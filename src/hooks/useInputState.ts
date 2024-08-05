import { type ChangeEvent, useState } from 'react'

export const useInputState = <T extends string | number>(initialValue: T) => {
  const [value, setValue] = useState(initialValue)
  const isNumber = typeof initialValue === 'number'

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const inputValue = e.currentTarget.value
    const value = isNumber ? Number(inputValue) : inputValue
    setValue(value as T)
  }

  return [value, onChange] as const
}
