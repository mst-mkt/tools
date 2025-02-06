import { describe, expect, it } from 'vitest'
import {
  type CellPosition,
  type ClassInfo,
  Days,
  emptyTimetable,
  isTimeIndex,
  updateTimetable,
} from './timetable'

describe('時間割のテスト', () => {
  it('空の時間割を作成できる', () => {
    const timetable = emptyTimetable()
    // Days.forEach((day) => {
    //   for (let i = 0; i <= 5; i++) {
    //     expect(timetable[day][i]).toBeNull()
    //   }
    // })
    for (const day of Days) {
      for (let i = 0; i <= 5; i++) {
        expect(timetable[day][i as 0 | 1 | 2 | 3 | 4 | 5]).toBeNull()
      }
    }
  })

  it('時間割に授業情報を追加できる', () => {
    const timetable = emptyTimetable()
    const cellPosition: CellPosition = { day: '月', timeIndex: 0 }
    const classInfo: Partial<ClassInfo> = {
      title: '情報連携学概論',
      teacher: '坂村健',
      classroom: 'INIADホール',
      absenceCount: 0,
    }
    const updatedTimetable = updateTimetable(timetable, cellPosition, classInfo)
    expect(updatedTimetable.月[0]).toEqual(classInfo)
  })

  it('時間割の授業情報をnullに更新できる', () => {
    const timetable = emptyTimetable()
    const cellPosition: CellPosition = { day: '月', timeIndex: 0 }
    const updatedTimetable = updateTimetable(timetable, cellPosition, null)
    expect(updatedTimetable.月[0]).toBeNull()
  })

  it('値が有効なTimeIndexかどうかをチェックできる', () => {
    expect(isTimeIndex(0)).toBe(true)
    expect(isTimeIndex(5)).toBe(true)
    expect(isTimeIndex(6)).toBe(false)
    expect(isTimeIndex(-1)).toBe(false)
  })
})
