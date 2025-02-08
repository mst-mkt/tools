import type { FC } from 'react'
import { Flex } from 'rizzui/flex'
import { Select } from 'rizzui/select'

const options = [
  { label: 'パスカルケース (PascalCase)', value: 'pascal', example: 'HelloWorld' },
  { label: 'キャメルケース (CamelCase)', value: 'camel', example: 'helloWorld' },
  { label: 'ケバブケース (KebabCase)', value: 'kebab', example: 'hello-world' },
  { label: 'スネークケース (SnakeCase)', value: 'snake', example: 'hello_world' },
  { label: 'フラットケース (FlatCase)', value: 'flat', example: 'helloworld' },
  { label: 'トレインケース (TrainCase)', value: 'train', example: 'Hello-World' },
  { label: 'タイトルケース (TitleCase)', value: 'title', example: 'Hello World' },
] as const satisfies { label: string; value: string; example: string }[]

export type Case = (typeof options)[number]['value']

type CaseSelectProps = {
  value: Case
  onChange: (value: Case) => void
}

export const CaseSelect: FC<CaseSelectProps> = ({ value, onChange }) => (
  <Select
    options={options}
    value={value}
    onChange={({ value }) => onChange(value)}
    displayValue={(value) => options.find((option) => option.value === value)?.label}
    getOptionDisplayValue={({ label, example }) => (
      <Flex align="center" gap="4" className="w-full [:has(>&)]:w-full">
        <span className="grow">{label}</span>
        <span className="rounded-sm border border-background-100 bg-background-50 px-1 font-bold text-muted-foreground">
          {example}
        </span>
      </Flex>
    )}
  />
)
