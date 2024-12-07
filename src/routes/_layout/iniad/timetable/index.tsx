import { Head } from '@/components/shared/Head'
import { Dialog } from '@/components/ui/dialog'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import {
  type CellPosition,
  type Timetable as TimetableType,
  emptyTimetable,
  updateTimetable,
} from '@/routes/_layout/iniad/timetable/.timetable'
import { createFileRoute } from '@tanstack/react-router'
import { useCallback, useState } from 'react'
import { EditDialogContent } from './.edit-dialog'
import { Timetable } from './.table'

export const Route = createFileRoute('/_layout/iniad/timetable/')({
  component: () => <TimeTable />,
})

const TimeTable = () => {
  const [timeTable, setTimeTable] = useLocalStorage<TimetableType>(
    'iniad-timetable',
    emptyTimetable(),
  )
  const [editingCell, setEditingCell] = useState<CellPosition | null>(null)

  const handleUpdateClass = useCallback(
    (title: string, teacher: string, classroom: string, absenceCount: number) => {
      if (editingCell === null) return

      const isEmptyInputs = [title, teacher, classroom, absenceCount].every(
        (input) => input === '' || input === 0,
      )

      if (isEmptyInputs) {
        setTimeTable(updateTimetable(timeTable, editingCell, null))
      } else {
        const updatedCellInfo = { title, teacher, classroom, absenceCount }
        setTimeTable(updateTimetable(timeTable, editingCell, updatedCellInfo))
      }

      setEditingCell(null)
    },
    [timeTable, editingCell, setTimeTable],
  )

  return (
    <>
      <Head title="時間割" />
      <div className="flex flex-col gap-y-4">
        <h1 className="font-bold text-lg">時間割</h1>
        <Dialog>
          <Timetable timetable={timeTable} setEditingCell={setEditingCell} />
          {editingCell !== null && (
            <EditDialogContent
              key={`${editingCell.day}-${editingCell.timeIndex}`}
              editingCell={editingCell}
              editingCellInfo={timeTable[editingCell.day][editingCell.timeIndex]}
              onUpdate={handleUpdateClass}
            />
          )}
        </Dialog>
      </div>
    </>
  )
}
