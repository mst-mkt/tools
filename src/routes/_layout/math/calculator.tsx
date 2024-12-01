import { Button } from '@/components/ui/button'
import { type CalcOperator, calculateOperation } from '@/utils/math/calculator'
import { createFileRoute } from '@tanstack/react-router'
import { Divide, Dot, Equal, Minus, Plus, Trash2, X } from 'lucide-react'
import { type MathJsChain, chain } from 'mathjs'
import { useState } from 'react'
import { Head } from '../../../components/shared/Head'

export const Route = createFileRoute('/_layout/math/calculator')({
  component: () => <Calculator />,
})

const Calculator = () => {
  const [formula, setFormula] = useState<MathJsChain<number>>(chain(0))
  const [lastOperator, setLastOperator] = useState<CalcOperator>('add')
  const [input, setInput] = useState<string>()

  const handleNumber = (number: number) => {
    if (input === undefined) return setInput(number.toString())
    setInput((prev) => `${prev}${number}`)
  }

  const handleOperator = (operator: CalcOperator) => {
    if (input === undefined) return
    setFormula((prev) => calculateOperation(lastOperator, prev, Number.parseFloat(input)))
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
    setFormula((prev) => calculateOperation(lastOperator, prev, Number.parseFloat(input)))
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
            <Button variant="secondary" onClick={() => handleNumber(7)}>
              7
            </Button>
            <Button variant="secondary" onClick={() => handleNumber(8)}>
              8
            </Button>
            <Button variant="secondary" onClick={() => handleNumber(9)}>
              9
            </Button>
            <Button onClick={() => handleOperator('divide')}>
              <Divide />
            </Button>
            <Button variant="secondary" onClick={() => handleNumber(4)}>
              4
            </Button>
            <Button variant="secondary" onClick={() => handleNumber(5)}>
              5
            </Button>
            <Button variant="secondary" onClick={() => handleNumber(6)}>
              6
            </Button>
            <Button onClick={() => handleOperator('multiply')}>
              <X />
            </Button>
            <Button variant="secondary" onClick={() => handleNumber(1)}>
              1
            </Button>
            <Button variant="secondary" onClick={() => handleNumber(2)}>
              2
            </Button>
            <Button variant="secondary" onClick={() => handleNumber(3)}>
              3
            </Button>
            <Button onClick={() => handleOperator('subtract')}>
              <Minus />
            </Button>
            <Button variant="secondary" onClick={() => handleNumber(0)}>
              0
            </Button>
            <Button onClick={handleDecimal}>
              <Dot />
            </Button>
            <Button onClick={handleEqual}>
              <Equal />
            </Button>
            <Button onClick={() => handleOperator('add')}>
              <Plus />
            </Button>
            <Button variant="destructive" onClick={handleClear} className="col-span-full">
              <Trash2 />
              Clear
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
