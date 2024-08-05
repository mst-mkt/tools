import { clsx } from 'clsx'
import type { TextareaHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>

export const Textarea = (props: TextareaProps) => (
  <textarea
    {...props}
    className={twMerge(
      props.className,
      clsx(
        'min-h-32 w-full resize-y overflow-x-hidden overflow-y-scroll rounded-lg border border-background-100 bg-background-50 p-2 text-sm outline-0',
        'scrollbar-thin scrollbar-thumb-background-200 scrollbar-thumb-rounded-full scrollbar-track-transparent',
        'focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background',
      ),
    )}
  />
)
