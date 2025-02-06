import { IconCopy, IconLink, IconPlus, IconTrash } from '@tabler/icons-react'
import { type FC, useMemo, useState } from 'react'
import { Button } from 'rizzui/button'
import { Flex } from 'rizzui/flex'
import { Input } from 'rizzui/input'
import { Textarea } from 'rizzui/textarea'
import { Title } from 'rizzui/typography'
import { Breadcrumb } from '../../../components/ui/Breadcrumb'
import { useCopyLocation } from '../../../hooks/useCopyLocation'
import { useInputState } from '../../../hooks/useInputState'
import { copy } from '../../../utils/copy'
import { replaceText } from './replace'
import {
  type ReplaceRule,
  type ReplaceRuleWithId,
  emptyRules,
  ruleControl,
  withId,
  withoutId,
} from './rules'

type TextReplaceProps = {
  initialText: string
  initialRules?: ReplaceRule[]
}

export const TextReplace: FC<TextReplaceProps> = ({ initialText, initialRules = emptyRules() }) => {
  const [inputText, onChangeInputText] = useInputState(initialText)
  const [rules, setRules] = useState<ReplaceRuleWithId[]>(withId(initialRules))

  const replacedText = useMemo(() => replaceText(inputText, rules), [inputText, rules])

  const copyLocation = useCopyLocation()

  return (
    <>
      <Breadcrumb
        items={[
          { label: 'tools', toOptions: { to: '/' } },
          { label: 'text', toOptions: { to: '/', hash: 'text' } },
          'replace',
        ]}
      />
      <Title className="text-xl">文字列置換</Title>
      <Textarea value={inputText} onChange={onChangeInputText} placeholder="置換する文字列を入力" />
      <Flex direction="col" align="stretch" gap="4">
        <Title as="h3" className="text-base">
          反復回数
        </Title>
        <Flex direction="col" align="center" gap="4">
          {rules.map(({ from, to, id }) => (
            <Flex key={id} align="center" gap="4">
              <Input
                value={from}
                onChange={(v) =>
                  setRules((rules) => ruleControl.update(rules, id, 'from', v.target.value))
                }
                placeholder="検索する文字列"
                className="w-full shrink"
              />
              <Input
                value={to}
                onChange={(v) =>
                  setRules((rules) => ruleControl.update(rules, id, 'to', v.target.value))
                }
                placeholder="置換する文字列"
                className="w-full shrink"
              />
              <Button
                color="danger"
                className="aspect-1 w-fit cursor-pointer gap-x-2 p-2 disabled:cursor-not-allowed"
                onClick={() => setRules((rules) => ruleControl.remove(rules, id))}
                disabled={rules.length <= 1}
              >
                <IconTrash size={16} />
              </Button>
            </Flex>
          ))}
          <Button
            onClick={() => setRules(ruleControl.add)}
            className="w-fit cursor-pointer gap-x-2"
          >
            <IconPlus size={16} />
            追加
          </Button>
        </Flex>
      </Flex>
      <Textarea value={replacedText} readOnly={true} placeholder="置換結果" />
      <Flex align="center" gap="4">
        <Button
          className="w-fit cursor-pointer gap-x-2 disabled:cursor-not-allowed"
          onClick={() =>
            copyLocation('/text/replace', { text: inputText, rules: withoutId(rules) })
          }
          disabled={
            inputText.trim() === '' && rules.every(({ from, to }) => from.trim() + to.trim() === '')
          }
        >
          <IconLink size={16} />
          URLをコピー
        </Button>
        <Button
          className="w-fit cursor-pointer gap-x-2 disabled:cursor-not-allowed"
          onClick={() => copy(replacedText)}
          disabled={replacedText.trim() === ''}
        >
          <IconCopy size={16} />
          結果をコピー
        </Button>
      </Flex>
    </>
  )
}
