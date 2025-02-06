export const Days = ['月', '火', '水', '木', '金'] as const
export type Day = (typeof Days)[number]

export type TimeIndex = 0 | 1 | 2 | 3 | 4 | 5
export type TimeRange = { index: number; from: string; to: string }
export const TimeRanges = [
  { index: 0, from: '09:00', to: '10:30' },
  { index: 1, from: '10:40', to: '12:10' },
  { index: 2, from: '13:00', to: '14:30' },
  { index: 3, from: '14:45', to: '16:15' },
  { index: 4, from: '16:30', to: '18:00' },
  { index: 5, from: '18:15', to: '19:45' },
] as const satisfies TimeRange[]

export type CellPosition = { day: Day; timeIndex: TimeIndex }

export type ClassInfo = {
  title: string
  teacher: string
  classroom: string
  absenceCount: number
}

export type Timetable = {
  [key in Day]: {
    [key in TimeIndex]: ClassInfo | null
  }
}

export const isTimeIndex = (value: number): value is TimeIndex => {
  return [0, 1, 2, 3, 4, 5].includes(value)
}

export const emptyTimetable = () => {
  return {
    月: { 0: null, 1: null, 2: null, 3: null, 4: null, 5: null },
    火: { 0: null, 1: null, 2: null, 3: null, 4: null, 5: null },
    水: { 0: null, 1: null, 2: null, 3: null, 4: null, 5: null },
    木: { 0: null, 1: null, 2: null, 3: null, 4: null, 5: null },
    金: { 0: null, 1: null, 2: null, 3: null, 4: null, 5: null },
  } as const satisfies Timetable
}

export const updateTimetable = (
  timeTable: Timetable,
  { day, timeIndex }: CellPosition,
  cell: Partial<ClassInfo> | null,
) => {
  return {
    ...timeTable,
    [day]: {
      ...timeTable[day],
      [timeIndex]: cell === null ? null : { ...timeTable[day][timeIndex], ...cell },
    },
  } as const satisfies Timetable
}
