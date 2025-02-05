import { IconCopy, IconLink } from '@tabler/icons-react'
import { jsonSchemaToZod } from 'json-schema-to-zod'
import { type FC, useMemo, useState } from 'react'
import { Alert } from 'rizzui/alert'
import { Button } from 'rizzui/button'
import { Flex } from 'rizzui/flex'
import { Input } from 'rizzui/input'
import { Select } from 'rizzui/select'
import { Textarea } from 'rizzui/textarea'
import { Title } from 'rizzui/typography'
import { Breadcrumb } from '../../../components/ui/Breadcrumb'
import { useCopyLocation } from '../../../hooks/useCopyLocation'
import { useInputState } from '../../../hooks/useInputState'
import { copy } from '../../../utils/copy'

type JsonSchemaToZodProps = {
  initialSchema: string
  initialName: string
  initialModule: 'esm' | 'cjs' | 'none'
}

export const JsonSchemaToZod: FC<JsonSchemaToZodProps> = ({
  initialSchema,
  initialName,
  initialModule,
}) => {
  const [schema, onChangeSchema] = useInputState(initialSchema)
  const [name, onChangeName] = useInputState(initialName)
  const [module, setModule] = useState(initialModule)

  const convertedSchema = useMemo(() => {
    try {
      const converted = jsonSchemaToZod(JSON.parse(schema), { name, module })
      return { success: true, value: converted } as const
    } catch {
      return { success: false } as const
    }
  }, [schema, name, module])

  const copyLocation = useCopyLocation()

  return (
    <>
      <Breadcrumb
        items={[
          { label: 'tools', toOptions: { to: '/' } },
          { label: 'develop', toOptions: { to: '/', hash: 'develop' } },
          'json-schema-to-zod',
        ]}
      />
      <Title as="h2" className="text-lg">
        JSON Schema
      </Title>
      <Textarea value={schema} onChange={onChangeSchema} placeholder="JSON Schema を入力" />
      <Flex>
        <Input
          label="ファイル名"
          value={name}
          onChange={onChangeName}
          placeholder="ファイル名"
          className="w-full"
        />
        <Select
          label="モジュール形式"
          options={[
            {
              label: 'ESM',
              value: 'esm',
            },
            {
              label: 'CJS',
              value: 'cjs',
            },
            {
              label: 'None',
              value: 'none',
            },
          ]}
          value={module}
          onChange={({ value }) => setModule(value)}
          className="w-48"
        />
      </Flex>
      {schema.trim() !== '' && (
        <>
          <Title as="h2" className="text-lg">
            Zod Schema
          </Title>
          {convertedSchema.success ? (
            <Textarea value={convertedSchema.value} readOnly={true} />
          ) : (
            <Alert color="danger">変換に失敗しました。正しいJSON Schemaを入力してください。</Alert>
          )}
        </>
      )}
      <Flex align="center" gap="4">
        <Button
          className="w-fit cursor-pointer gap-x-2 disabled:cursor-not-allowed"
          onClick={() => copyLocation('/develop/jsonschema2zod', { schema, name, module })}
          disabled={schema.trim() === ''}
        >
          <IconLink size={16} />
          URLをコピー
        </Button>
        <Button
          className="w-fit cursor-pointer gap-x-2 disabled:cursor-not-allowed"
          onClick={() => copy(convertedSchema.success ? convertedSchema.value : '')}
          disabled={schema.trim() === '' || !convertedSchema.success}
        >
          <IconCopy size={16} />
          結果をコピー
        </Button>
      </Flex>
    </>
  )
}
