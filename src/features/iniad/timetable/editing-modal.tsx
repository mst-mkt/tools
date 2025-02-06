import { IconMinus, IconPlus, IconX } from '@tabler/icons-react'
import { type ChangeEvent, type FC, useCallback, useState } from 'react'
import { Button } from 'rizzui/button'
import { Flex } from 'rizzui/flex'
import { Input } from 'rizzui/input'
import { Modal } from 'rizzui/modal'
import { Text, Title } from 'rizzui/typography'
import { useInputState } from '../../../hooks/useInputState'
import type { CellPosition, ClassInfo, Timetable } from './timetable'

type EditingModalProps = {
  isOpen: boolean
  onClose: () => void
  editingCell: CellPosition
  editingCellInfo: ClassInfo | null
  timetable: Timetable
  setTimeTable: (timetable: Timetable) => void
}

export const EditingModal: FC<EditingModalProps> = ({
  isOpen,
  onClose,
  editingCell,
  editingCellInfo,
  timetable,
  setTimeTable,
}) => {
  const [title, onChangeTitle] = useInputState(editingCellInfo?.title ?? '')
  const [teacher, onChangeTeacher] = useInputState(editingCellInfo?.teacher ?? '')
  const [classroom, onChangeClassroom] = useInputState(editingCellInfo?.classroom ?? '')
  const [absenceCount, setAbsenceCount] = useState(editingCellInfo?.absenceCount ?? 0)

  const handleChangeAbsenceCount = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value === '') return setAbsenceCount(0)
    const value = Number.parseInt(e.currentTarget.value, 10)
    if (Number.isNaN(value)) return
    setAbsenceCount(Math.max(0, Math.min(value, 14)))
  }, [])

  const handleSave = useCallback(() => {
    const newTimetable = {
      ...timetable,
      [editingCell.day]: {
        ...timetable[editingCell.day],
        [editingCell.timeIndex]: [title, teacher, classroom].every((value) => value === '')
          ? null
          : {
              title,
              teacher,
              classroom,
              absenceCount,
            },
      },
    }
    setTimeTable(newTimetable)
    onClose()
  }, [title, teacher, classroom, absenceCount, editingCell, timetable, setTimeTable, onClose])

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="absolute"
      overlayClassName="!outline-none"
      containerClassName="p-6 w-[92svw] max-w-128 flex flex-col gap-y-8"
    >
      <Flex>
        <Flex as="hgroup" direction="col" gap="1">
          <Title as="h3" className="text-lg">
            授業を編集
          </Title>
          <Text className="text-foreground-300 text-sm">月曜日1限目 の授業を編集</Text>
        </Flex>
        <Button
          onClick={onClose}
          variant="flat"
          className="aspect-1 cursor-pointer bg-transparent p-2"
        >
          <IconX size={20} />
        </Button>
      </Flex>
      <Flex direction="col" gap="4">
        <Input label="授業名" value={title} onChange={onChangeTitle} className="w-full" />
        <Input label="教員" value={teacher} onChange={onChangeTeacher} className="w-full" />
        <Input label="教室" value={classroom} onChange={onChangeClassroom} className="w-full" />
        <Flex direction="col" gap="2" className="text-sm">
          <Text>欠席数</Text>
          <Flex justify="between" gap="2">
            <Button
              onClick={() => setAbsenceCount((prev) => Math.max(prev - 1, 0))}
              disabled={absenceCount <= 0}
              className="aspect-1 cursor-pointer p-2"
            >
              <IconMinus size={20} />
            </Button>
            <Input
              type="number"
              value={absenceCount}
              onChange={handleChangeAbsenceCount}
              className="w-full shrink"
            />
            <Button
              onClick={() => setAbsenceCount((prev) => Math.min(prev + 1, 14))}
              disabled={absenceCount >= 14}
              className="aspect-1 cursor-pointer p-2"
            >
              <IconPlus size={20} />
            </Button>
          </Flex>
        </Flex>
      </Flex>
      <Flex justify="end" gap="2">
        <Button onClick={onClose} color="danger" className="w-fit cursor-pointer">
          キャンセル
        </Button>
        <Button onClick={handleSave} className="w-fit cursor-pointer">
          保存
        </Button>
      </Flex>
    </Modal>
  )
}
