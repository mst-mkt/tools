import { clsx } from 'clsx'
import type { FC, InputHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

type TextInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>

export const TextInput: FC<TextInputProps> = (props) => (
  <input
    {...props}
    type="text"
    className={twMerge(
      clsx(
        'w-full rounded-lg border border-background-100 bg-background-50 p-2 text-sm outline-0',
        'focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background',
      ),
      props.className,
    )}
  />
)
