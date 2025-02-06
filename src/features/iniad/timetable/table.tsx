import { IconBackslash } from '@tabler/icons-react'
import { type FC, useCallback } from 'react'
import { Flex } from 'rizzui/flex'
import { Table } from 'rizzui/table'
import { Title } from 'rizzui/typography'
import { match } from 'ts-pattern'
import { type CellPosition, type ClassInfo, Days, TimeRanges, type Timetable } from './timetable'

type TimetableTableProps = {
  timetable: Timetable
  setEditingCell: (cell: CellPosition | null) => void
  setEditingModalOpen: (isOpen: boolean) => void
}

export const TimetableTable: FC<TimetableTableProps> = ({
  timetable,
  setEditingCell,
  setEditingModalOpen,
}) => {
  const handleClick = useCallback(
    (cell: CellPosition) => {
      setEditingCell(cell)
      setEditingModalOpen(true)
    },
    [setEditingCell, setEditingModalOpen],
  )

  return (
    <div className="overflow-x-scroll">
      <Table className="!table-fixed h-full w-full min-w-128 overflow-hidden rounded-lg [&+div]:hidden">
        <Table.Header className="!bg-muted/20">
          <Table.Row>
            <Table.Head className="!text-center">時間</Table.Head>
            {Days.map((day) => (
              <Table.Head key={day} className="!text-center">
                {day}
              </Table.Head>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {TimeRanges.map(({ index, from, to }) => (
            <Table.Row key={`${from}-${to}`} className="!bg-transparent !border-0">
              <Table.Head>
                <div className="flex flex-col items-center justify-center py-2">
                  <span>{from}</span>
                  <span>~</span>
                  <span>{to}</span>
                </div>
              </Table.Head>
              {Days.map((day) => (
                <TimetableCell
                  key={`${day}-${index}`}
                  classInfo={timetable[day][index]}
                  onClick={() => handleClick({ day, timeIndex: index })}
                />
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  )
}

type TimetableCellProps = {
  classInfo: ClassInfo | null
  onClick: () => void
}

const TimetableCell: FC<TimetableCellProps> = ({ classInfo, onClick }) => (
  <Table.Cell onClick={onClick} className="!p-1 cursor-pointer">
    <Flex
      align="center"
      justify="center"
      className="!h-full w-full flex-col gap-y-2 overflow-hidden rounded-md p-2 py-4 text-xs ring-background-500 ring-offset-2 hover:bg-background-50 hover:ring-2"
    >
      {match(classInfo)
        .with(null, () => <IconBackslash className="text-muted" />)
        .when(
          ({ title, classroom }) => title.trim() === '' && classroom.trim() === '',
          () => <IconBackslash className="text-muted" />,
        )
        .otherwise(({ title, classroom, absenceCount }) => (
          <Flex className="w-full flex-wrap" gap="2">
            <Title as="h3" className="line-clamp-2 w-full text-xs md:line-clamp-1">
              {title}
            </Title>
            <span>{classroom}</span>
            <span
              className="text-red"
              style={{ filter: `grayscale(${80 - Math.min(absenceCount, 5) * 16}%)` }}
            >
              {absenceCount}欠席
            </span>
          </Flex>
        ))}
    </Flex>
  </Table.Cell>
)
