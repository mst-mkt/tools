import type { FC } from 'react'
import { Select } from 'rizzui/select'
import { type Block, Blocks, type GeneralCategoryShort, generalCategory } from './constants'

const displayOptions = [
  { label: 'すべて表示', value: 'all' },
  { label: 'カテゴリで絞る', value: 'category' },
  { label: 'ブロックで絞る', value: 'block' },
  { label: '絵文字のみ表示', value: 'emoji' },
  { label: '検索', value: 'search' },
]

type DisplaySelectProps = {
  value: 'all' | 'category' | 'block' | 'emoji' | 'search'
  onChange: (value: 'all' | 'category' | 'block' | 'emoji' | 'search') => void
}

export const DisplaySelect: FC<DisplaySelectProps> = ({ value, onChange }) => (
  <Select
    options={displayOptions}
    value={value}
    onChange={({ value }) => onChange(value)}
    displayValue={(value) => displayOptions.find((option) => option.value === value)?.label}
  />
)

const categoryOptions = Object.entries(generalCategory).map(([key, value]) => ({
  label: value,
  value: key,
}))

type CategorySelectProps = {
  value: GeneralCategoryShort | 'all'
  onChange: (value: GeneralCategoryShort | 'all') => void
}

export const CategorySelect: FC<CategorySelectProps> = ({ value, onChange }) => (
  <Select
    options={[{ label: 'すべて', value: 'all' }, ...categoryOptions]}
    value={value}
    onChange={({ value }) => onChange(value)}
    displayValue={(value: CategorySelectProps['value']) =>
      value === 'all' ? 'すべて' : generalCategory[value]
    }
  />
)

const blockOptions = Blocks.map((block) => ({ label: block, value: block }))

type BlockSelectProps = {
  value: Block | 'all'
  onChange: (value: Block | 'all') => void
}

export const BlockSelect: FC<BlockSelectProps> = ({ value, onChange }) => (
  <Select
    options={[{ label: 'すべて', value: 'all' }, ...blockOptions]}
    value={value}
    onChange={({ value }) => onChange(value)}
    searchable={true}
    displayValue={(value: BlockSelectProps['value']) => (value === 'all' ? 'すべて' : value)}
  />
)
