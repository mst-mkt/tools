import type { Dispatch, FC, SetStateAction } from 'react'
import { Select, type SelectOption } from 'rizzui'

export type ConvertType = 'encode' | 'decode'
const convertTypeOptions = [
  { label: 'エンコード', value: 'encode' },
  { label: 'デコード', value: 'decode' },
] as const satisfies SelectOption[]

type ConvertTypeSelectProps = {
  type: ConvertType
  setType: Dispatch<SetStateAction<ConvertType>>
}

export const ConvertTypeSelect: FC<ConvertTypeSelectProps> = ({ type, setType }) => (
  <Select
    value={type}
    options={convertTypeOptions}
    onChange={({ value }) => setType(value)}
    displayValue={(value) => convertTypeOptions.find((option) => option.value === value)?.label}
  />
)
