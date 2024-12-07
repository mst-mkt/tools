import { Button } from '@/components/ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useInputState } from '@/hooks/useInputState'
import type { CellPosition, ClassInfo } from '@/routes/_layout/iniad/timetable/.timetable'
import { Minus, Plus } from 'lucide-react'
import { type FC, useCallback } from 'react'

type EditDialogContentProps = {
  editingCell: CellPosition
  editingCellInfo: ClassInfo | null
  onUpdate: (title: string, teacher: string, classroom: string, absenceCount: number) => void
}

export const EditDialogContent: FC<EditDialogContentProps> = ({
  editingCell,
  editingCellInfo,
  onUpdate,
}) => {
  const [editingTitle, onSetEditingTitle, setEditingTitle] = useInputState(
    editingCellInfo?.title ?? '',
  )
  const [editingTeacher, onSetEditingTeacher, setEditingTeacher] = useInputState(
    editingCellInfo?.teacher ?? '',
  )
  const [editingClassroom, onSetEditingClassroom, setEditingClassroom] = useInputState(
    editingCellInfo?.classroom ?? '',
  )
  const [editingAbsenceCount, onSetEditingAbsenceCount, setEditingAbsenceCount] = useInputState(
    editingCellInfo?.absenceCount ?? 0,
  )

  const resetInputValues = useCallback(() => {
    setEditingTitle('')
    setEditingTeacher('')
    setEditingClassroom('')
    setEditingAbsenceCount(0)
  }, [setEditingTitle, setEditingTeacher, setEditingClassroom, setEditingAbsenceCount])

  const updateClassInfo = useCallback(() => {
    onUpdate(editingTitle, editingTeacher, editingClassroom, editingAbsenceCount)
    resetInputValues()
  }, [
    editingTitle,
    editingTeacher,
    editingClassroom,
    editingAbsenceCount,
    onUpdate,
    resetInputValues,
  ])

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>授業を編集</DialogTitle>
        <DialogDescription>
          {editingCell.day}曜日{editingCell.timeIndex + 1}限目 の情報を編集
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-col gap-y-4">
        <Label className="flex flex-col gap-y-2">
          <span>科目名</span>
          <Input value={editingTitle} onChange={onSetEditingTitle} />
        </Label>
        <Label className="flex flex-col gap-y-2">
          <span>教員名</span>
          <Input value={editingTeacher} onChange={onSetEditingTeacher} />
        </Label>
        <Label className="flex flex-col gap-y-2">
          <span>教室</span>
          <Input value={editingClassroom} onChange={onSetEditingClassroom} />
        </Label>
        <Label className="flex flex-col gap-y-2">
          <span>欠席回数</span>
          <div className="flex gap-x-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setEditingAbsenceCount(editingAbsenceCount - 1)}
            >
              <Minus />
            </Button>
            <Input
              type="number"
              min={0}
              max={14}
              value={editingAbsenceCount}
              onChange={onSetEditingAbsenceCount}
            />
            <Button
              type="button"
              variant="secondary"
              onClick={() => setEditingAbsenceCount(editingAbsenceCount + 1)}
            >
              <Plus />
            </Button>
          </div>
        </Label>
      </div>
      <DialogFooter>
        <DialogClose asChild={true}>
          <Button variant="destructive" onClick={resetInputValues}>
            キャンセル
          </Button>
        </DialogClose>
        <DialogClose asChild={true}>
          <Button onClick={updateClassInfo}>更新</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  )
}
