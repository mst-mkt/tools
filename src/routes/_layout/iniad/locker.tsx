import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { createFileRoute } from '@tanstack/react-router'
import { Loader, LockOpen, Save, Share } from 'lucide-react'
import { useCallback, useState } from 'react'
import { Head } from '../../../components/shared/Head'
import { EDU_IOT_API_ENDPOINT } from '../../../constants/api/iniad'
import { useCopyLink } from '../../../hooks/useCopyLocation'
import { useInputState } from '../../../hooks/useInputState'
import { useLocalStorage } from '../../../hooks/useLocalStorage'
import { basicAuthFetch } from '../../../utils/BasicAuthFetch'

export const Route = createFileRoute('/_layout/iniad/locker')({
  component: () => <LockerOpener />,
})

const LockerOpener = () => {
  const [auth, setAuth] = useLocalStorage('iniad-locker-auth', { id: '', password: '' })
  const [id, onSetId] = useInputState(auth.id)
  const [password, onSetPassword] = useInputState(auth.password)
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { copyLink } = useCopyLink(Route.id)

  const handleOpenLocker = useCallback(async () => {
    if (id.trim() === '' || password.trim() === '') {
      setError('ID and password are required')
      return
    }

    setIsLoading(true)
    const res = await basicAuthFetch(
      `${EDU_IOT_API_ENDPOINT}/locker/open`,
      { username: id, password },
      { method: 'POST' },
    )

    if (res.isSuccess) {
      setError(null)
      setResult(await res.value.json())
      setIsLoading(false)
      return
    }
    setError(res.error)
    setResult(null)
    setIsLoading(false)
  }, [id, password])

  return (
    <>
      <Head title="INIAD Locker Opener" />
      <div className="flex flex-col gap-y-8">
        <h1 className="font-bold text-lg">INIAD Locker Opener</h1>
        <div>
          <Label>
            <span>ID</span>
            <Input value={id} onChange={onSetId} placeholder="ex: s1f102X0XXX" />
          </Label>
        </div>
        <div>
          <Label>
            <span>Password</span>
            <Input type="password" value={password} onChange={onSetPassword} />
          </Label>
        </div>
        <div className="flex justify-between">
          <Button type="button" onClick={handleOpenLocker} disabled={isLoading}>
            {isLoading ? <Loader className="animate-spin" /> : <LockOpen />}
            Open
          </Button>
          <Button type="button" onClick={() => setAuth({ id, password })}>
            <Save />
            Save
          </Button>
        </div>
        {error !== null && <p className="text-red-500">{error}</p>}
        {result !== null && (
          <>
            <h2 className="font-bold">Result</h2>
            <Textarea value={JSON.stringify(result, null, 2)} readOnly={true} />
            <Button onClick={() => copyLink({})}>
              <Share />
              Copy Link
            </Button>
          </>
        )}
      </div>
    </>
  )
}
