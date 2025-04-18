import { type ChangeEvent, useState } from 'react'

type TargetElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement

export const useInputState = <T extends string | number>(initialValue: T) => {
  const [value, setValue] = useState(initialValue)
  const isNumber = typeof initialValue === 'number'

  const onChange = (e: ChangeEvent<TargetElement>) => {
    const inputValue = e.currentTarget.value
    const value = isNumber ? Number(inputValue) : inputValue
    setValue(value as T)
  }

  return [value, onChange, setValue] as const
}
