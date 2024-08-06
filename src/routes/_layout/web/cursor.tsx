import { createFileRoute } from '@tanstack/react-router'
import { Head } from '../../../components/shared/Head'
import { CURSORS } from '../../../constants/css/cursor'

export const Route = createFileRoute('/_layout/web/cursor')({
  component: () => <Cursor />,
})

const Cursor = () => (
  <>
    <Head title="Cursor viewer" />
    <div className="flex flex-col gap-y-8">
      <h1 className="font-bold text-lg">Cursor viewer</h1>
      <div className="grid grid-cols-2 gap-4">
        {CURSORS.map((cursor) => (
          <div
            key={cursor}
            className="flex items-center justify-center gap-x-2 rounded-md border border-background-100 p-4 transition-colors hover:bg-accent/10"
            style={{ cursor }}
          >
            {cursor}
          </div>
        ))}
      </div>
    </div>
  </>
)
