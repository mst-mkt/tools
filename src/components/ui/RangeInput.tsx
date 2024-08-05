import { clsx } from 'clsx'
import type { FC, JSX } from 'react'
import { twMerge } from 'tailwind-merge'

type RangeInputProps = Omit<JSX.IntrinsicElements['input'], 'type'>

export const RangeInput: FC<RangeInputProps> = (props) => {
  return (
    <div className="flex w-full items-center rounded-lg border border-background-100 p-4 ring-accent ring-offset-2 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-offset-background">
      <input
        {...props}
        className={twMerge(
          clsx(
            'h-2 w-full cursor-pointer appearance-none rounded-lg bg-accent/40 outline-0',
            '[&::-moz-range-thumb]:appearance-none [&::-webkit-slider-thumb]:appearance-none',
            '[&::-moz-range-thumb]:size-2 [&::-webkit-slider-thumb]:size-2',
            '[&::-moz-range-thumb]:bg-white [&::-webkit-slider-thumb]:bg-white',
            '[&::-moz-focus-outer]:border-0 [&::-moz-range-thumb]:border-background-100',
            '[&::-moz-range-thumb]:rounded-full [&::-webkit-slider-thumb]:rounded-full',
            '[&::-moz-range-thumb]:ring-4 [&::-moz-range-thumb]:ring-accent [&::-webkit-slider-thumb]:ring-4 [&::-webkit-slider-thumb]:ring-accent',
          ),
          props.className,
        )}
        type="range"
      />
    </div>
  )
}
