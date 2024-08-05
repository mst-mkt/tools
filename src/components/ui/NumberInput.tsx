import { clsx } from 'clsx'
import type { FC, InputHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

type NumberInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>

export const NumberInput: FC<NumberInputProps> = (props) => (
  <input
    {...props}
    type="number"
    className={twMerge(
      clsx(
        'm-0 w-full appearance-none rounded-lg border border-background-100 bg-background-50 p-2 text-sm outline-0',
        'focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        '[-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
      ),
      props.className,
    )}
  />
)
