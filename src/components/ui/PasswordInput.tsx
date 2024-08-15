import { IconEye, IconEyeOff } from '@tabler/icons-react'
import { clsx } from 'clsx'
import { type FC, type InputHTMLAttributes, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { IconButton } from './IconButton'

type PasswordInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>

export const PasswordInput: FC<PasswordInputProps> = (props) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="flex items-center justify-between gap-x-2">
      <input
        {...props}
        type={showPassword ? 'text' : 'password'}
        className={twMerge(
          clsx(
            'w-full rounded-lg border border-background-100 bg-background-50 p-2 text-sm outline-0',
            'focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          ),
          props.className,
        )}
      />
      <IconButton
        icon={showPassword ? IconEye : IconEyeOff}
        onClick={() => setShowPassword((prev) => !prev)}
      />
    </div>
  )
}
