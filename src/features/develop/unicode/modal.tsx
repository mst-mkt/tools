import { IconCopy, IconLink } from '@tabler/icons-react'
import { type FC, useMemo } from 'react'
import { Button } from 'rizzui/button'
import { Input } from 'rizzui/input'
import { Modal } from 'rizzui/modal'
import { get_unicode_by_cp } from 'unicode-information'
import { useCopyLocation } from '../../../hooks/useCopyLocation'
import { copy } from '../../../utils/copy'
import { type GeneralCategoryShort, generalCategory } from './constants'

type UnicodeModalProps = {
  selected: string | null
  onClose: () => void
}

export const UnicodeModal: FC<UnicodeModalProps> = ({ selected, onClose }) => {
  const selectedInfo = useMemo(() => {
    if (selected === null) return null

    return get_unicode_by_cp(selected) ?? null
  }, [selected])

  const copyLocation = useCopyLocation()

  if (selectedInfo === null || selected === null) return null

  return (
    <Modal
      isOpen={selected !== null}
      onClose={onClose}
      containerClassName="w-[92svw] max-w-max-content p-8 flex gap-y-6 items-center flex-col"
    >
      <p className="h-fit w-fit border border-muted border-dashed p-6 font-bold text-5xl">
        {String.fromCodePoint(Number.parseInt(selected, 16))}
      </p>
      <Button size="sm" onClick={() => copy(String.fromCodePoint(Number.parseInt(selected, 16)))}>
        コピーする
      </Button>
      <div className="contents w-full gap-x-8 md:flex">
        <div className="flex w-full flex-col gap-y-4">
          <div className="flex items-end gap-x-2">
            <Input
              label="名前"
              value={selectedInfo.name}
              readOnly={true}
              className="w-full shrink"
            />
            <Button
              onClick={() => copy(selectedInfo.name)}
              variant="flat"
              className="w-fit cursor-pointer p-2"
            >
              <IconCopy />
            </Button>
          </div>
          <div className="flex items-end gap-x-2">
            <Input
              label="カテゴリ"
              value={generalCategory[selectedInfo.gc as GeneralCategoryShort]}
              readOnly={true}
              className="w-full shrink"
            />
            <Button
              onClick={() => copy(selectedInfo.gc)}
              variant="flat"
              className="w-fit cursor-pointer p-2"
            >
              <IconCopy />
            </Button>
          </div>
          <div className="flex items-end gap-x-2">
            <Input
              label="ブロック"
              value={selectedInfo.blk}
              readOnly={true}
              className="w-full shrink"
            />
            <Button
              onClick={() => copy(selectedInfo.blk)}
              variant="flat"
              className="w-fit cursor-pointer p-2"
            >
              <IconCopy />
            </Button>
          </div>
        </div>
        <div className="flex w-full flex-col gap-y-4">
          <div className="flex items-end gap-x-2">
            <Input
              label="コードポイント"
              value={`U+${selectedInfo.cp}`}
              readOnly={true}
              className="w-full shrink"
            />
            <Button
              onClick={() => copy(`U+${selectedInfo.cp}`)}
              variant="flat"
              className="w-fit cursor-pointer p-2"
            >
              <IconCopy />
            </Button>
          </div>
          <div className="flex items-end gap-x-2">
            <Input
              label="HTMLエンティティ"
              value={`&#x${selectedInfo.cp};`}
              readOnly={true}
              className="w-full shrink"
            />
            <Button
              onClick={() => copy(selectedInfo.cp)}
              variant="flat"
              className="w-fit cursor-pointer p-2"
            >
              <IconCopy />
            </Button>
          </div>
          <div className="flex items-end gap-x-2">
            <Input
              label="CSSエスケープ"
              value={`\\${selectedInfo.cp}`}
              readOnly={true}
              className="w-full shrink"
            />
            <Button
              onClick={() => copy(`\\${selectedInfo.cp}`)}
              variant="flat"
              className="w-fit cursor-pointer p-2"
            >
              <IconCopy />
            </Button>
          </div>
        </div>
      </div>
      <pre className="p-2 text-sm">isEmoji: {`${selectedInfo.emoji}`}</pre>
      <Button
        onClick={() => copyLocation('/develop/unicode', {}, selected)}
        className="cursor-pointer gap-x-2"
      >
        <IconLink size={20} />
        リンクをコピー
      </Button>
    </Modal>
  )
}
