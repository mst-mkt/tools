import { IconFile, IconNotes } from '@tabler/icons-react'
import type { FC } from 'react'
import { Flex, Select, type SelectOption, Text } from 'rizzui'

export type InputType = 'text' | 'file'
const inputTypeOptions = [
  { label: 'テキスト', value: 'text', icon: IconNotes },
  { label: 'ファイル', value: 'file', icon: IconFile },
] satisfies SelectOption[]

const InputTypeSelectItem = ({ label, icon: Icon }: SelectOption) => (
  <Flex align="center" gap="2">
    <Icon size={20} />
    <Text>{label}</Text>
  </Flex>
)

type InputTypeSelectProps = {
  type: InputType
  setType: (type: InputType) => void
}

export const InputTypeSelect: FC<InputTypeSelectProps> = ({ type, setType }) => (
  <Select
    value={type}
    options={inputTypeOptions}
    onChange={({ value }) => setType(value)}
    displayValue={(value) => {
      const option = inputTypeOptions.find((option) => option.value === value)
      return option && InputTypeSelectItem(option)
    }}
    getOptionDisplayValue={(option) => InputTypeSelectItem(option)}
  />
)
