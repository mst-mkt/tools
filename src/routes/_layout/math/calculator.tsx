import { createFileRoute } from '@tanstack/react-router'
import { Divide, Equal, Minus, Plus, Trash, X } from 'lucide-react'
import { type MathJsChain, chain } from 'mathjs'
import { useState } from 'react'
import { match } from 'ts-pattern'
import { Head } from '../../../components/shared/Head'
import { IconButton } from '../../../components/ui/IconButton'

type Operator = 'add' | 'subtract' | 'multiply' | 'divide'

const operation = (operator: Operator, chain: MathJsChain<number>, input: number) => {
  return match(operator)
    .with('add', () => chain.add(input))
    .with('subtract', () => chain.subtract(input))
    .with('multiply', () => chain.multiply(input))
    .with('divide', () => chain.divide(input))
    .exhaustive()
}

export const Route = createFileRoute('/_layout/math/calculator')({
  component: () => <Calculator />,
})

const Calculator = () => {
  const [formula, setFormula] = useState<MathJsChain<number>>(chain(0))
  const [lastOperator, setLastOperator] = useState<Operator>('add')
  const [input, setInput] = useState<string>()

  const handleNumber = (number: number) => {
    if (input === undefined) return setInput(number.toString())
    setInput((prev) => `${prev}${number}`)
  }

  const handleOperator = (operator: Operator) => {
    if (input === undefined) return
    setFormula((prev) => operation(lastOperator, prev, Number.parseFloat(input)))
    setInput(undefined)
    setLastOperator(operator)
  }

  const handleDecimal = () => {
    if (input === undefined) return setInput('0.')
    const string = input.toString()
    if (string.includes('.')) return
    setInput(`${string}.`)
  }

  const handleEqual = () => {
    if (input === undefined) return
    setFormula((prev) => operation(lastOperator, prev, Number.parseFloat(input)))
    setInput(undefined)
    setLastOperator('add')
  }

  const handleClear = () => {
    setFormula(chain(0))
    setLastOperator('add')
    setInput(undefined)
  }

  return (
    <>
      <Head title="Calculator" />
      <div className="flex flex-col gap-y-8">
        <h1 className="font-bold text-lg">Calculator</h1>
        <div className="flex flex-col gap-y-4">
          <p className="grow truncate rounded-md border border-background-100 p-4 text-right font-bold text-xl">
            {input ?? formula.done()}
          </p>
          <div className="grid grid-cols-4 gap-4">
            <IconButton className="w-full p-4 text-lg" label="7" onClick={() => handleNumber(7)} />
            <IconButton className="w-full p-4 text-lg" label="8" onClick={() => handleNumber(8)} />
            <IconButton className="w-full p-4 text-lg" label="9" onClick={() => handleNumber(9)} />
            <IconButton
              className="w-full p-4 text-lg"
              icon={Divide}
              onClick={() => handleOperator('divide')}
            />
            <IconButton className="w-full p-4 text-lg" label="4" onClick={() => handleNumber(4)} />
            <IconButton className="w-full p-4 text-lg" label="5" onClick={() => handleNumber(5)} />
            <IconButton className="w-full p-4 text-lg" label="6" onClick={() => handleNumber(6)} />
            <IconButton
              className="w-full p-4 text-lg"
              icon={X}
              onClick={() => handleOperator('multiply')}
            />
            <IconButton className="w-full p-4 text-lg" label="1" onClick={() => handleNumber(1)} />
            <IconButton className="w-full p-4 text-lg" label="2" onClick={() => handleNumber(2)} />
            <IconButton className="w-full p-4 text-lg" label="3" onClick={() => handleNumber(3)} />
            <IconButton
              className="w-full p-4 text-lg"
              icon={Minus}
              onClick={() => handleOperator('subtract')}
            />
            <IconButton className="w-full p-4 text-lg" label="0" onClick={() => handleNumber(0)} />
            <IconButton className="w-full p-4 text-lg" icon={Minus} onClick={handleDecimal} />
            <IconButton className="w-full p-4 text-lg" icon={Equal} onClick={handleEqual} />
            <IconButton
              className="w-full p-4 text-lg"
              icon={Plus}
              onClick={() => handleOperator('add')}
            />
            <IconButton
              label="Clear"
              className="col-span-full w-full bg-red-500/10 p-4 text-lg hover:bg-red-500/20"
              icon={Trash}
              onClick={handleClear}
            />
          </div>
        </div>
      </div>
    </>
  )
}
