import { IconDeviceFloppy, IconLoader2, IconLockOpen, IconShare } from '@tabler/icons-react'
import { createFileRoute } from '@tanstack/react-router'
import clsx from 'clsx'
import { useCallback, useEffect, useState } from 'react'
import { Head } from '../../../components/shared/Head'
import { IconButton } from '../../../components/ui/IconButton'
import { PasswordInput } from '../../../components/ui/PasswordInput'
import { TextInput } from '../../../components/ui/TextInput'
import { Textarea } from '../../../components/ui/Textarea'
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
  const [id, onSetId, setId] = useInputState(auth.id)
  const [password, onSetPassword, setPassword] = useInputState(auth.password)
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

  useEffect(() => {
    setId(auth.id)
    setPassword(auth.password)
  }, [auth, setId, setPassword])

  return (
    <>
      <Head title="INIAD Locker Opener" />
      <div className="flex flex-col gap-y-8">
        <h1 className="font-bold text-lg">INIAD Locker Opener</h1>
        <div>
          {/* biome-ignore lint/a11y/noLabelWithoutControl: this label has input element as component */}
          <label className="flex flex-col gap-y-2">
            <span className="w-full text-sm">ID</span>
            <TextInput value={id} onChange={onSetId} placeholder="ex: s1f102X0XXX" />
          </label>
        </div>
        <div>
          {/* biome-ignore lint/a11y/noLabelWithoutControl: this label has input element as component */}
          <label className="flex flex-col gap-y-2">
            <span className="w-full text-sm">Password</span>
            <PasswordInput value={password} onChange={onSetPassword} />
          </label>
        </div>
        <div className="flex justify-between">
          <IconButton
            icon={isLoading ? IconLoader2 : IconLockOpen}
            label="Open"
            className="bg-accent-300 transition-colors hover:bg-accent-500"
            iconClassName={clsx(isLoading && 'animate-spin')}
            onClick={handleOpenLocker}
          />
          <IconButton
            icon={IconDeviceFloppy}
            label="Save ID and password"
            onClick={() => setAuth({ id, password })}
          />
        </div>
        {error !== null && <p className="text-red-500">{error}</p>}
        {result !== null && (
          <>
            <h2 className="font-bold">Result</h2>
            <Textarea value={JSON.stringify(result, null, 2)} readOnly={true} />
            <IconButton icon={IconShare} label="Copy link" onClick={() => copyLink({})} />
          </>
        )}
      </div>
    </>
  )
}
