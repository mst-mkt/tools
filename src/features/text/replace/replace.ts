export type ReplaceRule = {
  from: string
  to: string
}

export type ReplaceRuleWithId = ReplaceRule & {
  id: string
}

export const emptyRules = (): ReplaceRule[] => [...Array(3)].map(() => ({ from: '', to: '' }))

export const withId = (rules: ReplaceRule[]): ReplaceRuleWithId[] => {
  return rules.map((rule, i) => ({ ...rule, id: `${Date.now()}-${i}` }))
}

export const withoutId = (rules: ReplaceRuleWithId[]): ReplaceRule[] => {
  return rules.map(({ id, ...rule }) => rule)
}

export const ruleControl = {
  add: (rules: ReplaceRuleWithId[]): ReplaceRuleWithId[] => {
    return [...rules, { from: '', to: '', id: `${Date.now()}` }]
  },
  remove: (rules: ReplaceRuleWithId[], id: string): ReplaceRuleWithId[] => {
    return rules.filter((rule) => rule.id !== id)
  },
  update: (
    rules: ReplaceRuleWithId[],
    id: string,
    which: keyof ReplaceRule,
    value: string,
  ): ReplaceRuleWithId[] => {
    return rules.map((rule) => (rule.id === id ? { ...rule, [which]: value } : rule))
  },
}

export const replaceText = (text: string, rules: ReplaceRule[]) => {
  return rules.reduce((acc, rule) => acc.replaceAll(rule.from, rule.to), text)
}
