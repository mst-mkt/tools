import { describe, expect, it } from 'vitest'
import { emptyRules, ruleControl, withId, withoutId } from './rules'

describe('文字列置換のルール操作', () => {
  it('空のルール(初期値)の作成', () => {
    const expected = [
      { from: '', to: '' },
      { from: '', to: '' },
      { from: '', to: '' },
    ]
    const rules = emptyRules()

    expect(rules).toEqual(expected)
  })

  it('IDを持つルールの作成', () => {
    const rules = [
      { from: 'a', to: 'b' },
      { from: 'c', to: 'd' },
    ]
    const expected = [
      { from: 'a', to: 'b', id: expect.any(String) },
      { from: 'c', to: 'd', id: expect.any(String) },
    ]

    const rulesWithId = withId(rules)

    expect(rulesWithId).toEqual(expected)
  })

  it('IDを持つルールからIDを削除', () => {
    const rulesWithId = [
      { from: 'a', to: 'b', id: '1' },
      { from: 'c', to: 'd', id: '2' },
    ]
    const expected = [
      { from: 'a', to: 'b' },
      { from: 'c', to: 'd' },
    ]

    const rules = withoutId(rulesWithId)

    expect(rules).toEqual(expected)
  })

  it('新しいルールを追加', () => {
    const rulesWithId = [
      { from: 'a', to: 'b', id: '1' },
      { from: 'c', to: 'd', id: '2' },
    ]
    const expected = [
      { from: 'a', to: 'b', id: '1' },
      { from: 'c', to: 'd', id: '2' },
      { from: '', to: '', id: expect.any(String) },
    ]

    const rules = ruleControl.add(rulesWithId)

    expect(rules).toEqual(expected)
  })

  it('ルールを削除', () => {
    const rulesWithId = [
      { from: 'a', to: 'b', id: '1' },
      { from: 'c', to: 'd', id: '2' },
    ]
    const expected = [{ from: 'a', to: 'b', id: '1' }]

    const rules = ruleControl.remove(rulesWithId, '2')

    expect(rules).toEqual(expected)
  })

  it('ルールを更新', () => {
    const rulesWithId = [
      { from: 'a', to: 'b', id: '1' },
      { from: 'c', to: 'd', id: '2' },
    ]
    const expected = [
      { from: 'a', to: 'b', id: '1' },
      { from: 'c', to: 'e', id: '2' },
    ]

    const rules = ruleControl.update(rulesWithId, '2', 'to', 'e')

    expect(rules).toEqual(expected)
  })
})
