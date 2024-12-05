import { Head } from '@/components/shared/Head'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useInputState } from '@/hooks/useInputState'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/develop/iframe')({
  component: () => <IFrame />,
})

const IFrame = () => {
  const [url, setUrl] = useInputState('')

  return (
    <>
      <Head title="iframe preview" />
      <div className="flex flex-col gap-y-4">
        <h1 className="font-bold text-lg">iframe preview</h1>
        <div>
          <Label>
            <span>URL</span>
            <Input value={url} onChange={setUrl} />
          </Label>
        </div>
        <div className="rounded-lg border p-4 shadow-sm">
          <iframe src={url} style={{ width: '100%', height: '500px' }} title={url} />
        </div>
      </div>
    </>
  )
}
