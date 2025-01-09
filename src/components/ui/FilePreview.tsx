import { IconFile } from '@tabler/icons-react'
import type { FC } from 'react'
import { Flex, Text } from 'rizzui'
import { twMerge } from 'tailwind-merge'

type FilePreviewProps = {
  file: File
  filename: string
  classname?: string
}

export const FilePreview: FC<FilePreviewProps> = ({ file, filename, classname }) => (
  <Flex
    align="center"
    justify="between"
    className={twMerge('max-w-full gap-x-2 rounded-md border border-primary p-4', classname)}
  >
    <IconFile className="shrink-0 text-primary" size={36} />
    <Flex direction="col" align="start" justify="center" gap="0" className="shrink overflow-hidden">
      <Text fontWeight="bold" className="w-full truncate whitespace-nowrap text-primary">
        {filename.trim() === '' ? 'Unnamed file' : filename}
      </Text>
      <Text className="text-sm">{file.size} bytes</Text>
    </Flex>
    {file.type.startsWith('image/') && (
      <img
        src={URL.createObjectURL(file)}
        alt={filename}
        className="h-16 w-16 rounded-sm object-cover"
      />
    )}
  </Flex>
)
