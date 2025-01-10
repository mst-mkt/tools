import type { ReplaceRule } from './rules'

export const replaceText = (text: string, rules: ReplaceRule[]) => {
  return rules
    .filter(({ from }) => !(from === ''))
    .reduce((acc, rule) => acc.replaceAll(rule.from, rule.to), text)
}
