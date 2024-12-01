import { File, type LucideIcon } from 'lucide-react'
import {
  type ChangeEvent,
  type Dispatch,
  type FC,
  type InputHTMLAttributes,
  type SetStateAction,
  useCallback,
} from 'react'
import { twMerge } from 'tailwind-merge'

type FileInputProps = InputHTMLAttributes<HTMLInputElement> & {
  file: File | null
  setFile: Dispatch<SetStateAction<File | null>>
  icon?: LucideIcon
}

export const FileInput: FC<FileInputProps> = ({
  file,
  setFile,
  className,
  icon: Icon = File,
  ...props
}) => {
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.[0] !== undefined) {
        setFile(e.target.files[0])
      }
    },
    [setFile],
  )

  return (
    <label
      className={twMerge(
        'flex w-full cursor-pointer flex-col items-center justify-center gap-y-4 rounded-lg border-2 border-accent-600/50 border-dotted px-4 py-8 transition-colors hover:bg-accent/10 sm:gap-y-8 sm:px-8 sm:py-12',
        className,
      )}
    >
      {file === null ? (
        <>
          <Icon className="text-accent" size={48} />
          <span className="whitespace-nowrap text-center">
            ファイルをドロップするか
            <wbr />
            <b className="text-accent">ここをクリック</b>
          </span>
        </>
      ) : (
        <div className="flex w-full flex-col items-center gap-y-2">
          <span className="max-w-full truncate text-center font-bold text-accent">{file.name}</span>
          <span>{file.size} bytes</span>
        </div>
      )}
      <input
        type="file"
        onChange={handleChange}
        className="absolute m-0 h-0 border-0 p-0 opacity-0"
        {...props}
      />
    </label>
  )
}
