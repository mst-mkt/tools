import {
  type ClipboardEvent,
  type Dispatch,
  type FC,
  type KeyboardEvent,
  type SetStateAction,
  useCallback,
} from 'react'
import { Flex } from 'rizzui/flex'
import { twJoin } from 'tailwind-merge'
import { match } from 'ts-pattern'
import { FilePreview } from '../../../components/ui/FilePreview'
import type { ClipboardDataType } from './types'

type DataBaseProps = {
  data: ClipboardDataType | null
  setDatum?: Dispatch<SetStateAction<ClipboardDataType[] | undefined>>
}

type DataProps = DataBaseProps &
  (
    | {
        contentEditable?: false
        placeholderShow?: never
        onPaste?: never
      }
    | {
        contentEditable: true
        placeholderShow: boolean
        onPaste: (e: ClipboardEvent<HTMLDivElement>) => void
      }
  )

export const ClipboardData: FC<DataProps> = ({
  data,
  setDatum,
  contentEditable = false,
  placeholderShow = true,
  onPaste,
}) => {
  const handleKeydown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      const isPaste = (e.ctrlKey || e.metaKey) && e.key === 'v'
      const isDelete = e.key === 'Backspace' || e.key === 'Delete'

      if (!isPaste) e.preventDefault()
      if (isDelete && setDatum !== undefined) setDatum(undefined)
    },
    [setDatum],
  )

  return (
    <div
      contentEditable={contentEditable}
      suppressContentEditableWarning={contentEditable}
      onPaste={onPaste}
      onKeyDown={handleKeydown}
      style={{ scrollbarWidth: 'thin' }}
      className={twJoin(
        'h-32 w-full overflow-y-auto break-all rounded-md border border-muted p-4 caret-transparent shadow-xs outline-0',
        'focus-visible:ring focus-visible:ring-primary',
        contentEditable && placeholderShow && 'text-muted-foreground',
      )}
    >
      {match(data)
        .with(null, () => (placeholderShow ? 'ここに Ctrl + V で貼り付け' : 'データがありません'))
        .with({ datatype: 'text' }, ({ data }) => data)
        .with(
          { datatype: 'image' },
          ({ data }) =>
            data !== null && (
              <Flex justify="center" className="h-full rounded-sm bg-background-50">
                <img
                  src={URL.createObjectURL(new Blob([data], { type: data.type }))}
                  alt={data.name}
                  className="h-full object-contain"
                />
              </Flex>
            ),
        )
        .with(
          { datatype: 'file' },
          ({ data }) => data !== null && <FilePreview file={data} filename={data.name} />,
        )
        .exhaustive()}
    </div>
  )
}
