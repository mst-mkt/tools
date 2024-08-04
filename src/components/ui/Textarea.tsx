import type { TextareaHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>

export const Textarea = (props: TextareaProps) => (
  <textarea
    {...props}
    className={twMerge(
      props.className,
      'min-h-32 w-full resize-y rounded-lg border border-background-100 p-2 text-sm outline-0 focus-visible:ring-2 focus-visible:ring-offset-2',
    )}
  />
)
