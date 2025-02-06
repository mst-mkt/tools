import { IconDeviceFloppy, IconLoader2, IconLockOpen } from '@tabler/icons-react'
import { EduIotApiClient } from 'iniad-api-client'
import { useCallback, useState } from 'react'
import { Button } from 'rizzui/button'
import { Flex } from 'rizzui/flex'
import { Input } from 'rizzui/input'
import { Password } from 'rizzui/password'
import { Title } from 'rizzui/typography'
import { toast } from 'sonner'
import { Breadcrumb } from '../../../components/ui/Breadcrumb'
import { useInputState } from '../../../hooks/useInputState'
import { useLocalStorage } from '../../../hooks/useLocalStorage'
import { play } from '../../../lib/snd'
import { INIAD_API_URL } from '../constants'

export const Locker = () => {
  const [auth, setAuth] = useLocalStorage('tools:iniad-auth', { username: '', password: '' })
  const [username, setUsername] = useInputState(auth.username)
  const [password, setPassword] = useInputState(auth.password)
  const [isOpening, setIsOpening] = useState(false)

  const handleSave = () => {
    setAuth({ username, password })
  }

  const handlerOpen = useCallback(() => {
    const apiClient = new EduIotApiClient(username, password, INIAD_API_URL)
    setIsOpening(true)
    apiClient
      .openLocker()
      .then((res) => {
        if (res.status === 'dummy') {
          play.caution()
          toast.error('INIAD WiFi に接続してください')
        } else {
          play.celebration()
          toast.success(`ロッカーが解錠されました (${res.lockerFloor}${res.lockerAddress})`)
        }
      })
      .catch((e) => {
        play.caution()
        toast.error(`ロッカーの解錠に失敗しました: ${e.message}`)
      })
      .finally(() => setIsOpening(false))
  }, [username, password])

  return (
    <>
      <Breadcrumb
        items={[
          { label: 'tools', toOptions: { to: '/' } },
          { label: 'iniad', toOptions: { to: '/', hash: 'iniad' } },
          'locker',
        ]}
      />
      <Title className="text-xl">INIAD ロッカー 解錠</Title>
      <Input label="統合ID (s1f102XXXXXX)" value={username} onChange={setUsername} />
      <Password label="パスワード" value={password} onChange={setPassword} />
      <Flex justify="between">
        <Button onClick={handlerOpen} disabled={isOpening} className="gap-x-2">
          {isOpening ? (
            <IconLoader2 size={20} className="animate-spin" />
          ) : (
            <IconLockOpen size={20} />
          )}
          解錠
        </Button>
        <Button onClick={handleSave} className="gap-x-2">
          <IconDeviceFloppy size={20} />
          保存
        </Button>
      </Flex>
    </>
  )
}
