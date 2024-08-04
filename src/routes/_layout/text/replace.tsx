import { IconCopy, IconPlus, IconShare, IconTrash } from '@tabler/icons-react'
import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import { z } from 'zod'
import { Head } from '../../../components/shared/Head'
import { IconButton } from '../../../components/ui/IconButton'
import { TextInput } from '../../../components/ui/TextInput'
import { Textarea } from '../../../components/ui/Textarea'
import { useCopyLink } from '../../../hooks/useCopyLocation'
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
  const [text, setText] = useState(initialText ?? '')
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
      <div className="it flex flex-col gap-y-8">
        <h1 className="font-bold text-lg">文字置換</h1>
        <div className="flex flex-col items-center gap-y-4">
          <Textarea
            value={text}
            onChange={(e) => setText(e.currentTarget.value)}
            aria-label="置換前のテキスト"
            placeholder="置換前のテキスト"
          />
          <div className="flex w-full flex-col gap-y-2">
            {rules.map((rule, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: This is a list of rules, and the index is used as a key
              <div key={index} className="flex gap-x-2">
                <TextInput
                  value={rule.from}
                  placeholder="from"
                  aria-label="from"
                  onInput={(e) => handleRuleInput(e.currentTarget.value, index, 'from')}
                />
                <TextInput
                  value={rule.to}
                  placeholder="to"
                  aria-label="to"
                  onInput={(e) => handleRuleInput(e.currentTarget.value, index, 'to')}
                />
                <IconButton
                  icon={IconTrash}
                  aria-label="Delete Rule"
                  className="bg-red-500 text-black hover:bg-red-600"
                  onClick={() => handleRuleDelete(index)}
                />
              </div>
            ))}
          </div>
          <IconButton
            icon={IconPlus}
            label="Add Rule"
            onClick={() => setRules((rules) => [...rules, { from: '', to: '' }])}
            className="bg-accent-200 hover:bg-accent-300"
          />
          <Textarea
            value={replacedText}
            readOnly={true}
            aria-label="置換後のテキスト"
            placeholder="置換後のテキスト"
          />
        </div>
        <div className="flex gap-x-2">
          <IconButton
            icon={IconShare}
            label="Share Link"
            onClick={() =>
              copyLink({
                text,
                rules: rules.filter((rule) => rule.from.length + rule.to.length > 0),
              })
            }
            disabled={
              text.length === 0 || rules.some((rule) => rule.from.length + rule.to.length <= 0)
            }
          />
          <IconButton icon={IconCopy} label="Copy Result" onClick={() => copy(replacedText)} />
        </div>
      </div>
    </>
  )
}
