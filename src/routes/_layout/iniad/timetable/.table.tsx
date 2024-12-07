import { DialogTrigger } from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { FC } from 'react'
import { match } from 'ts-pattern'
import {
  type CellPosition,
  type ClassInfo,
  type Day,
  Days,
  type TimeIndex,
  TimeRanges,
  type Timetable as TimetableType,
} from './.timetable'

type TimetableProps = {
  timetable: TimetableType
  setEditingCell: (cell: CellPosition | null) => void
}

export const Timetable: FC<TimetableProps> = ({ timetable, setEditingCell }) => (
  <Table className="h-full table-fixed overflow-hidden rounded-lg">
    <TableHeader>
      <TableRow>
        <TableHead className="text-center">
          <span>時間</span>
        </TableHead>
        {Days.map((day) => (
          <TableHead key={day} className="text-center">
            <span>{day}</span>
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
    <TableBody>
      {TimeRanges.map(({ index, from, to }) => (
        <TableRow key={`${from}-${to}`}>
          <TableHead>
            <div className="flex flex-col items-center justify-center py-2">
              <span>{from}</span>
              <span>~</span>
              <span>{to}</span>
            </div>
          </TableHead>
          {Days.map((day) => (
            <TimetableCell
              key={`${day}-${index}`}
              classInfo={timetable[day][index]}
              day={day}
              timeIndex={index}
              setEditingCell={setEditingCell}
            />
          ))}
        </TableRow>
      ))}
    </TableBody>
  </Table>
)

type TimetableCellProps = {
  classInfo: ClassInfo | null
  day: Day
  timeIndex: TimeIndex
  setEditingCell: (cell: CellPosition | null) => void
}

const TimetableCell = ({ classInfo, day, timeIndex, setEditingCell }: TimetableCellProps) => (
  <TableCell className="h-full p-1">
    <DialogTrigger
      onClick={() => setEditingCell({ day, timeIndex })}
      className="block h-full w-full rounded-md p-2 hover:ring-2 hover:ring-ring/20 focus:outline-none focus:ring-2 focus:ring-ring/40"
    >
      <div className="flex flex-col items-start gap-y-2 overflow-hidden text-xs">
        {classInfo === null ? (
          <span className="text-center text-muted-foreground">...</span>
        ) : (
          <>
            <span className="line-clamp-3 w-full text-left">{classInfo.title}</span>
            <div className="flex flex-wrap gap-x-2">
              <span className="truncate text-left text-muted-foreground">
                {classInfo.classroom}
              </span>
              <span
                className="truncate text-left text-muted-foreground opacity-40"
                style={{
                  color: match(classInfo.absenceCount ?? 0)
                    .with(0, () => '#000')
                    .with(1, () => '#200')
                    .with(2, () => '#500')
                    .with(3, () => '#900')
                    .with(4, () => '#f00')
                    .otherwise(() => '#f00'),
                }}
              >
                {classInfo.absenceCount ?? 0}欠席
              </span>
            </div>
          </>
        )}
      </div>
    </DialogTrigger>
  </TableCell>
)
