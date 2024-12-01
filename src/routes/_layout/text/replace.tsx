import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { createFileRoute } from '@tanstack/react-router'
import { Copy, Plus, Share, Trash2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import { z } from 'zod'
import { Head } from '../../../components/shared/Head'
import { useCopyLink } from '../../../hooks/useCopyLocation'
import { useInputState } from '../../../hooks/useInputState'
import { copy } from '../../../utils/clipboard/copy'

const searchParamsValidator = z.object({
  text: z.string().optional(),
  rules: z
    .array(
      z.object({
        from: z.string(),
        to: z.string(),
      }),
    )
    .min(1)
    .optional(),
})

type Rule = NonNullable<z.infer<typeof searchParamsValidator>['rules']>[number]

export const Route = createFileRoute('/_layout/text/replace')({
  validateSearch: (search) => searchParamsValidator.parse(search),
  component: () => <Replacer />,
})

const Replacer = () => {
  const { text: initialText, rules: initialRules } = Route.useSearch()
  const { copyLink } = useCopyLink(Route.id)
  const [text, setText] = useInputState(initialText ?? '')
  const [rules, setRules] = useState<Rule[]>(
    initialRules ?? [...Array(3)].map(() => ({ from: '', to: '' })),
  )

  const replacedText = useMemo(() => {
    return rules.reduce((acc, rule) => acc.replaceAll(rule.from, rule.to), text)
  }, [rules, text])

  const handleRuleInput = (value: string, index: number, key: keyof Rule) => {
    setRules((rules) => rules.map((rule, i) => (i === index ? { ...rule, [key]: value } : rule)))
  }

  const handleRuleDelete = (index: number) => {
    if (rules.length === 1) return setRules([{ from: '', to: '' }])
    setRules((rules) => rules.filter((_, i) => i !== index))
  }

  return (
    <>
      <Head title="Text Replacer" />
      <div className="flex flex-col gap-y-8">
        <h1 className="font-bold text-lg">文字置換</h1>
        <div className="flex flex-col items-center gap-y-4">
          <Textarea
            value={text}
            onChange={setText}
            aria-label="置換前のテキスト"
            placeholder="置換前のテキスト"
          />
          <div className="flex w-full flex-col gap-y-2">
            {rules.map((rule, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: This is a list of rules, and the index is used as a key
              <div key={index} className="flex gap-x-2">
                <Input
                  type="text"
                  value={rule.from}
                  placeholder="from"
                  aria-label="from"
                  onInput={(e) => handleRuleInput(e.currentTarget.value, index, 'from')}
                />
                <Input
                  type="text"
                  value={rule.to}
                  placeholder="to"
                  aria-label="to"
                  onInput={(e) => handleRuleInput(e.currentTarget.value, index, 'to')}
                />
                <Button
                  variant="destructive"
                  aria-label="Delete Rule"
                  onClick={() => handleRuleDelete(index)}
                >
                  <Trash2 />
                </Button>
              </div>
            ))}
          </div>
          <Button onClick={() => setRules((rules) => [...rules, { from: '', to: '' }])}>
            <Plus />
            Add Rule
          </Button>
          <Textarea
            value={replacedText}
            readOnly={true}
            aria-label="置換後のテキスト"
            placeholder="置換後のテキスト"
          />
        </div>
        <div className="flex gap-x-2">
          <Button
            onClick={() =>
              copyLink({
                text,
                rules: rules.filter((rule) => rule.from.length + rule.to.length > 0),
              })
            }
            disabled={
              text.length === 0 || rules.every((rule) => rule.from.length + rule.to.length <= 0)
            }
          >
            <Share />
            Share Link
          </Button>
          <Button onClick={() => copy(replacedText)}>
            <Copy />
            Copy Result
          </Button>
        </div>
      </div>
    </>
  )
}
