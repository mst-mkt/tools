import type { MathJsChain } from 'mathjs'
import { match } from 'ts-pattern'

export type CalcOperator = 'add' | 'subtract' | 'multiply' | 'divide'

export const calculateOperation = (
  operator: CalcOperator,
  chain: MathJsChain<number>,
  input: number,
) => {
  return match(operator)
    .with('add', () => chain.add(input))
    .with('subtract', () => chain.subtract(input))
    .with('multiply', () => chain.multiply(input))
    .with('divide', () => chain.divide(input))
    .exhaustive()
}
