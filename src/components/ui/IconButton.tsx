import type { Icon } from '@tabler/icons-react'
import clsx from 'clsx'
import type { FC, JSX } from 'react'
import { twMerge } from 'tailwind-merge'

type IconButtonProps = {
  icon: Icon
  label?: string
  iconPosition?: 'left' | 'right'
  size?: number
} & Omit<JSX.IntrinsicElements['button'], 'children'>

export const IconButton: FC<IconButtonProps> = (props) => (
  <button
    type="button"
    {...props}
    className={twMerge(
      props.className,
      clsx(
        props.iconPosition === 'right' && 'flex-row-reverse',
        'flex w-fit items-center justify-center gap-x-2 rounded-md bg-background-50 p-2 transition-colors',
        'hover:bg-background-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
      ),
    )}
  >
    <props.icon size={props.size ?? 20} />
    {props.label}
  </button>
)
