export type ReplaceRule = {
  from: string
  to: string
}

export const createEmptyRules = (count: number) => {
  return [...Array(count)].map(() => ({ from: '', to: '' }))
}

export const replaceText = (text: string, rules: ReplaceRule[]) => {
  return rules.reduce((acc, rule) => acc.replaceAll(rule.from, rule.to), text)
}

export const updateRule = (
  rules: ReplaceRule[],
  index: number,
  key: keyof ReplaceRule,
  value: string,
) => {
  return rules.map((rule, i) => (i === index ? { ...rule, [key]: value } : rule))
}
