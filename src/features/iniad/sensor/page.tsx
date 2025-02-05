import { IconDeviceFloppy, IconLoader2, IconTemperatureSun } from '@tabler/icons-react'
import { EduIotApiClient, type RoomStatus } from 'iniad-api-client'
import { useCallback, useState } from 'react'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Button } from 'rizzui/button'
import { Flex } from 'rizzui/flex'
import { Grid } from 'rizzui/grid'
import { Input } from 'rizzui/input'
import { Password } from 'rizzui/password'
import { Switch } from 'rizzui/switch'
import { Title } from 'rizzui/typography'
import { toast } from 'sonner'
import { Breadcrumb } from '../../../components/ui/Breadcrumb'
import { useInputState } from '../../../hooks/useInputState'
import { useLocalStorage } from '../../../hooks/useLocalStorage'
import { sleep } from '../../../utils/sleep'
import { INIAD_API_URL, INIAD_ROOMS } from '../constants'

export const Sensor = () => {
  const [auth, setAuth] = useLocalStorage('tools:iniad-auth', { username: '', password: '' })
  const [username, setUsername] = useInputState(auth.username)
  const [password, setPassword] = useInputState(auth.password)
  const [roomStatuses, setRoomStatuses] = useState<RoomStatus[]>()
  const [isLoading, setIsLoading] = useState(false)
  const [showLabels, setShowLabels] = useState({
    temperature: true,
    humidity: true,
    illuminance: true,
    airPressure: true,
  })

  const handleGetSensors = useCallback(async () => {
    const apiClient = new EduIotApiClient(username, password, INIAD_API_URL)
    setIsLoading(true)

    const statuses = await INIAD_ROOMS.reduce<Promise<RoomStatus[]>>(async (prev, roomNumber) => {
      const acc = await prev
      await sleep(100)
      const result = await apiClient.getRoomStatus(roomNumber)
      return [...acc, result]
    }, Promise.resolve([]))

    if (statuses.some((result) => result.status === 'dummy')) {
      toast.error('INIAD WiFi に接続してください')
      setIsLoading(false)
      return
    }

    setRoomStatuses(
      statuses.map((status, index) => ({ ...status, roomNumber: INIAD_ROOMS[index] ?? 1234 })),
    )
    setIsLoading(false)
  }, [username, password])

  const handleSave = useCallback(() => {
    setAuth({ username, password })
  }, [username, password, setAuth])

  return (
    <>
      <Breadcrumb
        items={[
          { label: 'tools', toOptions: { to: '/' } },
          { label: 'iniad', toOptions: { to: '/', hash: 'iniad' } },
          'sensor',
        ]}
      />
      <Title className="text-xl">INIAD センサー</Title>
      <Input label="統合ID (s1f102XXXXXX)" value={username} onChange={setUsername} />
      <Password label="パスワード" value={password} onChange={setPassword} />
      <Flex justify="between">
        <Button onClick={handleGetSensors} disabled={isLoading} className="gap-x-2">
          {isLoading ? (
            <IconLoader2 size={20} className="animate-spin" />
          ) : (
            <IconTemperatureSun size={20} />
          )}
          取得
        </Button>
        <Button onClick={handleSave} className="gap-x-2">
          <IconDeviceFloppy size={20} />
          保存
        </Button>
      </Flex>
      {roomStatuses !== undefined && roomStatuses.length > 0 && (
        <>
          <div className="rounded-md border border-background-100 px-2 py-4 shadow-sm">
            <ResponsiveContainer height={300} width="100%">
              <LineChart data={roomStatuses}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="roomNumber"
                  interval={0}
                  angle={-45}
                  textAnchor="end"
                  fontSize={10}
                />
                <YAxis
                  yAxisId="left"
                  label={{ value: '室温 / 湿度 / 照度', angle: -90, position: 'insideLeft' }}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  label={{ value: '気圧', angle: -90, position: 'insideRight' }}
                />
                <Tooltip />
                <Legend verticalAlign="top" height={36} />
                {showLabels.temperature && (
                  <Line
                    key="temperature"
                    yAxisId="left"
                    type="monotone"
                    dataKey="temperature"
                    stroke="#aa3311"
                    name="室温 (°C)"
                  />
                )}
                {showLabels.humidity && (
                  <Line
                    key="humidity"
                    yAxisId="left"
                    type="monotone"
                    dataKey="humidity"
                    stroke="#1166aa"
                    name="湿度 (%)"
                  />
                )}
                {showLabels.illuminance && (
                  <Line
                    key="illuminance"
                    yAxisId="left"
                    type="monotone"
                    dataKey="illuminance"
                    stroke="#996600"
                    name="照度 (lx)"
                  />
                )}
                {showLabels.airPressure && (
                  <Line
                    key="airPressure"
                    yAxisId="right"
                    type="monotone"
                    dataKey="airPressure"
                    stroke="#600C22"
                    name="気圧 (hPa)"
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
          <Grid columns="2" gap="2">
            <Switch
              label="室温"
              checked={showLabels.temperature}
              onChange={() =>
                setShowLabels((prev) => ({ ...prev, temperature: !prev.temperature }))
              }
            />
            <Switch
              label="湿度"
              checked={showLabels.humidity}
              onChange={() => setShowLabels((prev) => ({ ...prev, humidity: !prev.humidity }))}
            />
            <Switch
              label="照度"
              checked={showLabels.illuminance}
              onChange={() =>
                setShowLabels((prev) => ({ ...prev, illuminance: !prev.illuminance }))
              }
            />
            <Switch
              label="気圧"
              checked={showLabels.airPressure}
              onChange={() =>
                setShowLabels((prev) => ({ ...prev, airPressure: !prev.airPressure }))
              }
            />
          </Grid>
        </>
      )}
    </>
  )
}
