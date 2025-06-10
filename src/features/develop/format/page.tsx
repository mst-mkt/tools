import { type FC, useCallback, useMemo, useState } from 'react'
import { Alert } from 'rizzui/alert'
import { Select } from 'rizzui/select'
import { Textarea } from 'rizzui/textarea'
import { Title } from 'rizzui/typography'
import { match } from 'ts-pattern'
import { Breadcrumb } from '../../../components/ui/Breadcrumb'
import { useInputState } from '../../../hooks/useInputState'
import { type Language, format, init, languageLabels, noInputComment } from './formatter'

type FormatProps = {
  initialLanguage: Language
  initialCode: string
}

export const Format: FC<FormatProps> = ({ initialLanguage, initialCode }) => {
  const [language, setLanguage] = useState(initialLanguage)
  const [code, onChangeCode] = useInputState(initialCode)

  const formattedResult = useMemo(() => {
    const input = code.trim().length === 0 ? noInputComment[language] : code
    try {
      const formatted = format[language](input, `main.${language}`)
      return { success: true, formatted } as const
    } catch {
      return { success: false } as const
    }
  }, [code, language])

  const handleLanguageSelect = useCallback(async ({ value }: { value: Language }) => {
    await init[value]()
    setLanguage(value)
  }, [])

  return (
    <>
      <Breadcrumb
        items={[
          { label: 'tools', toOptions: { to: '/' } },
          { label: 'develop', toOptions: { to: '/', hash: 'develop' } },
          'format',
        ]}
      />
      <Title className="text-xl">コードフォーマッター</Title>
      <Select
        options={languageLabels}
        value={language}
        onChange={handleLanguageSelect}
        displayValue={(value: string) => languageLabels.find((l) => l.value === value)?.label ?? ''}
      />
      <Textarea value={code} onChange={onChangeCode} placeholder="コードを入力" />
      <Title as="h2" className="text-base">
        フォーマット結果
      </Title>
      {match(formattedResult)
        .with({ success: true }, ({ formatted }) => (
          <pre className="overflow-x-auto rounded-md border border-muted p-4 shadow-xs">
            <code className="w-full">{formatted}</code>
          </pre>
        ))
        .with({ success: false }, () => (
          <Alert color="danger">フォーマットに失敗しました。入力内容を確認してください。</Alert>
        ))
        .otherwise(() => null)}
    </>
  )
}
