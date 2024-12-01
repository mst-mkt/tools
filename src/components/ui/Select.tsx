import { clsx } from 'clsx'
import { ChevronDown } from 'lucide-react'
import { type FC, type JSX, useMemo } from 'react'
import { twMerge } from 'tailwind-merge'

type SelectProps = {
  options: (string | { value: string; label?: string })[]
  selectClassName?: string
} & JSX.IntrinsicElements['select']

export const Select: FC<SelectProps> = ({
  value,
  onChange,
  options,
  className,
  selectClassName,
  ...props
}) => {
  const formattedOption = useMemo(
    () => options.map((option) => (typeof option === 'string' ? { value: option } : option)),
    [options],
  )

  return (
    <div className={twMerge('relative flex w-fit items-center justify-center gap-x-2', className)}>
      <select
        value={value}
        onChange={onChange}
        className={twMerge(
          clsx(
            'w-full cursor-pointer appearance-none rounded-md border-none bg-background-50 py-2 pr-10 pl-4 transition-colors',
            'hover:bg-background-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          ),
          selectClassName,
        )}
        {...props}
      >
        {formattedOption.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label ?? option.value}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute right-2">
        <ChevronDown size={20} role="presentation" focusable={false} aria-hidden={true} />
      </div>
    </div>
  )
}
