import { useState } from 'react'
import { Title } from 'rizzui/typography'
import { Breadcrumb } from '../../../components/ui/Breadcrumb'
import { useLocalStorage } from '../../../hooks/useLocalStorage'
import { EditingModal } from './editing-modal'
import { TimetableTable } from './table'
import { type CellPosition, type Timetable as TimetableType, emptyTimetable } from './timetable'

export const TimeTable = () => {
  const [timetable, setTimeTable] = useLocalStorage<TimetableType>(
    'iniad-timetable',
    emptyTimetable(),
  )
  const [editingCell, setEditingCell] = useState<CellPosition | null>(null)
  const [isEditingModalOpen, setIsEditingModalOpen] = useState(false)

  return (
    <>
      <Breadcrumb
        items={[
          { label: 'tools', toOptions: { to: '/' } },
          { label: 'iniad', toOptions: { to: '/', hash: 'iniad' } },
          'timetable',
        ]}
      />
      <Title className="text-xl">時間割</Title>
      <TimetableTable
        timetable={timetable}
        setEditingCell={setEditingCell}
        setEditingModalOpen={setIsEditingModalOpen}
      />
      {editingCell !== null && (
        <EditingModal
          key={`${editingCell.day}-${editingCell.timeIndex}`}
          isOpen={isEditingModalOpen}
          onClose={() => setIsEditingModalOpen(false)}
          editingCell={editingCell}
          editingCellInfo={timetable[editingCell?.day][editingCell?.timeIndex]}
          timetable={timetable}
          setTimeTable={setTimeTable}
        />
      )}
    </>
  )
}
