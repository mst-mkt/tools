import { Head } from '@/components/shared/Head'
import { Button } from '@/components/ui/button'
import { ChartContainer } from '@/components/ui/chart'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { EDU_IOT_API_ENDPOINT, INIAD_ROOMS } from '@/constants/api/iniad'
import { useInputState } from '@/hooks/useInputState'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { createFileRoute } from '@tanstack/react-router'
import { EduIotApiClient, type RoomStatus } from 'iniad-api-client'
import { Loader, Save, Thermometer } from 'lucide-react'
import { useCallback, useState } from 'react'
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts'

export const Route = createFileRoute('/_layout/iniad/sensor')({
  component: () => <Sensor />,
})

const Sensor = () => {
  const [auth, setAuth] = useLocalStorage('iniad-locker-auth', { id: '', password: '' })
  const [id, onSetId] = useInputState(auth.id)
  const [password, onSetPassword] = useInputState(auth.password)
  const [isLoading, setIsLoading] = useState(false)
  const [roomStatuses, setRoomStatuses] = useState<RoomStatus[]>()
  const [showLabels, setShowLabels] = useState({
    temperature: true,
    humidity: true,
    illuminance: true,
    airPressure: true,
  })

  const handleGetSensors = useCallback(async () => {
    const apiClient = new EduIotApiClient(id, password, EDU_IOT_API_ENDPOINT)
    setIsLoading(true)

    const statuses = await Promise.all(
      INIAD_ROOMS.map(async (room) => apiClient.getRoomStatus(room)),
    )

    setRoomStatuses(
      statuses.map((status, index) => ({ ...status, roomNumber: INIAD_ROOMS[index] ?? 1234 })),
    )
    setIsLoading(false)
  }, [id, password])

  return (
    <>
      <Head title="INIAD Sensor" />
      <div className="flex flex-col gap-y-8">
        <h1 className="font-bold text-lg">INIAD Sensor</h1>
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
          <Button type="button" onClick={handleGetSensors} disabled={isLoading}>
            {isLoading ? <Loader className="animate-spin" /> : <Thermometer />}
            Open
          </Button>
          <Button type="button" onClick={() => setAuth({ id, password })}>
            <Save />
            Save
          </Button>
        </div>
        {roomStatuses !== undefined && roomStatuses.length > 0 && (
          <>
            <div className="rounded-md border border-background-100 px-2 py-4 shadow-sm">
              <ChartContainer config={{}} className="min-h-[200px] w-full">
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
                    label={{ value: 'Values', angle: -90, position: 'insideLeft' }}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    label={{ value: 'Air Pressure', angle: -90, position: 'insideRight' }}
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
                      name="Temperature (°C)"
                    />
                  )}
                  {showLabels.humidity && (
                    <Line
                      key="humidity"
                      yAxisId="left"
                      type="monotone"
                      dataKey="humidity"
                      stroke="#1166aa"
                      name="Humidity (%)"
                    />
                  )}
                  {showLabels.illuminance && (
                    <Line
                      key="illuminance"
                      yAxisId="left"
                      type="monotone"
                      dataKey="illuminance"
                      stroke="#996600"
                      name="Illuminance (lx)"
                    />
                  )}
                  {showLabels.airPressure && (
                    <Line
                      key="airPressure"
                      yAxisId="right"
                      type="monotone"
                      dataKey="airPressure"
                      stroke="#600C22"
                      name="Air Pressure (hPa)"
                    />
                  )}
                </LineChart>
              </ChartContainer>
            </div>
            <div className="flex items-center gap-x-4">
              <Label className="flex items-center gap-x-2">
                <Checkbox
                  checked={showLabels.temperature}
                  onCheckedChange={() =>
                    setShowLabels((prev) => ({ ...prev, temperature: !prev.temperature }))
                  }
                />
                <span>Temperature</span>
              </Label>
              <Label className="flex items-center gap-x-2">
                <Checkbox
                  checked={showLabels.humidity}
                  onCheckedChange={() =>
                    setShowLabels((prev) => ({ ...prev, humidity: !prev.humidity }))
                  }
                />
                <span>Humidity</span>
              </Label>
              <Label className="flex items-center gap-x-2">
                <Checkbox
                  checked={showLabels.illuminance}
                  onCheckedChange={() =>
                    setShowLabels((prev) => ({ ...prev, illuminance: !prev.illuminance }))
                  }
                />
                <span>Illuminance</span>
              </Label>
              <Label className="flex items-center gap-x-2">
                <Checkbox
                  checked={showLabels.airPressure}
                  onCheckedChange={() =>
                    setShowLabels((prev) => ({ ...prev, airPressure: !prev.airPressure }))
                  }
                />
                <span>Air Pressure</span>
              </Label>
            </div>
          </>
        )}
      </div>
    </>
  )
}
