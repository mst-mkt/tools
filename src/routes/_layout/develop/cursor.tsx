import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'
import { clsx } from 'clsx'
import { Copy } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Code } from '../../../components/shared/Code'
import { Head } from '../../../components/shared/Head'
import { CURSORS } from '../../../constants/css/cursor'
import { useDocumentEvent } from '../../../hooks/useDocumentEvent'
import { copy } from '../../../utils/clipboard/copy'

export const Route = createFileRoute('/_layout/develop/cursor')({
  component: () => <Cursor />,
})

const Cursor = () => {
  const [selectedCursor, setSelectedCursor] = useState<string>()
  const [hoveredCursor, setHoveredCursor] = useState<string>()

  const handleMouseEnter = (cursor: string) => {
    setHoveredCursor(cursor)
    if (selectedCursor === undefined) {
      setSelectedCursor(cursor)
    }
  }

  const handleMouseLeave = () => {
    setHoveredCursor(undefined)
  }

  const handleClick = (cursor: string) => {
    setSelectedCursor(cursor)
  }

  useDocumentEvent('click', () => setSelectedCursor(undefined), { capture: true })

  const sampleCode = useMemo(
    () =>
      `
.cursor {
    cursor: ${hoveredCursor ?? selectedCursor ?? CURSORS[0]};
}
`.trim(),
    [hoveredCursor, selectedCursor],
  )

  return (
    <>
      <Head title="Cursor Preview" />
      <div className="flex flex-col gap-y-8">
        <h1 className="font-bold text-lg">Cursor Preview</h1>
        <div className="grid grid-cols-2 gap-4">
          {CURSORS.map((cursor) => (
            <Button
              variant="outline"
              type="button"
              key={cursor}
              onMouseEnter={() => handleMouseEnter(cursor)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick(cursor)}
              onKeyDown={(e) => e.key === 'Enter' && handleClick(cursor)}
              tabIndex={0}
              className={clsx(
                'h-16',
                selectedCursor === cursor &&
                  'ring-2 ring-ring ring-offset-2 ring-offset-background',
              )}
              style={{ cursor }}
            >
              {cursor}
            </Button>
          ))}
        </div>
        <div className="rounded-md border border-background-100 p-4">
          <Code code={sampleCode} />
        </div>
        <div className="flex gap-x-2">
          <Button onClick={() => copy(sampleCode)}>
            <Copy />
            Copy Sample CSS
          </Button>
        </div>
      </div>
    </>
  )
}
