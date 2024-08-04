import { type ChangeEvent, useState } from 'react'

export const useInputState = (initialValue: string) => {
  const [value, setValue] = useState(initialValue)

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.currentTarget.value)
  }

  return [value, onChange] as const
}
