import { IconDownload } from '@tabler/icons-react'
import { type ChangeEvent, type FC, useCallback, useMemo, useState } from 'react'
import { Button, Checkbox, FileInput, Grid, Input, Text, Title } from 'rizzui'
import { toast } from 'sonner'
import { RangeSlider } from '../../../components/rizzui/slider'
import { Breadcrumb } from '../../../components/ui/Breadcrumb'
import { FilePreview } from '../../../components/ui/FilePreview'
import { useAwaited } from '../../../hooks/useAwaited'
import { play } from '../../../lib/snd'
import { svgToPngFile } from './convert'
import { computeAspectRatio, getNumberValue, getSvgAspectRatio } from './utils'

export const SvgToPng: FC = () => {
  const [file, setFile] = useState<File>()
  const [width, setWidth] = useState(640)
  const [height, setHeight] = useState(360)
  const [isKeepAspectRatio, setIsKeepAspectRatio] = useState(true)
  const [aspectRatio, setAspectRatio] = useState(width / height)

  const convertedPngPromise = useMemo(async () => {
    if (file === undefined) return Promise.resolve(undefined)
    return await svgToPngFile(file, { width, height })
  }, [file, width, height])

  const convertedPng = useAwaited(convertedPngPromise)

  const handleFileChange = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    const [file] = e.target.files ?? []
    if (file == null) return

    setFile(file)

    const svgAspectRatio = await getSvgAspectRatio(file)
    if (svgAspectRatio === undefined) return

    setAspectRatio(svgAspectRatio)
    setHeight(640)
    setWidth(Math.min(4096, Math.round(640 * svgAspectRatio)))
  }, [])

  const handleWidthChange = useCallback(
    (value: number | number[]) => {
      const newWidth = getNumberValue(value)
      setWidth(newWidth)

      if (isKeepAspectRatio) {
        const newHeight = Math.min(4096, Math.round(newWidth / aspectRatio))
        setHeight(newHeight)
      } else {
        const newAspectRatio = computeAspectRatio(height, newWidth) ?? aspectRatio
        setAspectRatio(newAspectRatio)
      }
    },
    [isKeepAspectRatio, height, aspectRatio],
  )

  const handleHeightChange = useCallback(
    (value: number | number[]) => {
      const newHeight = getNumberValue(value)
      setHeight(newHeight)

      if (isKeepAspectRatio) {
        const newWidth = Math.min(4096, Math.round(newHeight * aspectRatio))
        setWidth(newWidth)
      } else {
        const newAspectRatio = computeAspectRatio(newHeight, width) ?? aspectRatio
        setAspectRatio(newAspectRatio)
      }
    },
    [isKeepAspectRatio, width, aspectRatio],
  )

  const handleDownload = useCallback(() => {
    if (convertedPng === undefined) return

    const url = URL.createObjectURL(convertedPng)
    const a = document.createElement('a')
    a.href = url
    a.download = convertedPng.name
    a.click()
    URL.revokeObjectURL(url)
    toast.success('ダウンロードが完了しました')
    play.celebration()
  }, [convertedPng])

  return (
    <>
      <Breadcrumb
        items={[
          { label: 'tools', toOptions: { to: '/' } },
          { label: 'image', toOptions: { to: '/', hash: 'image' } },
          'svg-to-png',
        ]}
      />
      <Title className="text-xl">SVG → PNG 変換</Title>
      <FileInput
        onChange={handleFileChange}
        accept="image/svg+xml"
        placeholder="SVG ファイルを選択"
      />
      <Grid columns="6" align="center" className="gap-x-8">
        <Text>幅</Text>
        <RangeSlider
          value={width}
          onChange={(value) => handleWidthChange(value)}
          min={0}
          max={1024}
          className="col-span-3"
        />
        <Input
          value={width}
          type="number"
          onChange={(e) => handleWidthChange(Number.parseFloat(e.currentTarget.value))}
          min={0}
          max={4096}
          suffix="px"
          className="col-span-2"
        />
        <Text>高さ</Text>
        <RangeSlider
          value={height}
          onChange={(value) => handleHeightChange(value)}
          min={0}
          max={1024}
          className="col-span-3"
        />
        <Input
          value={height}
          type="number"
          onChange={(e) => handleHeightChange(Number.parseFloat(e.currentTarget.value))}
          min={0}
          max={4096}
          suffix="px"
          className="col-span-2"
        />
        <Checkbox
          label="アスペクト比を保持"
          checked={isKeepAspectRatio}
          onChange={(e) => setIsKeepAspectRatio(e.currentTarget.checked)}
          className="col-span-6"
        />
      </Grid>
      {convertedPng !== undefined && (
        <>
          <FilePreview file={convertedPng} filename={convertedPng.name} />
          <Button className="gap-2" onClick={handleDownload}>
            <IconDownload size={16} />
            ダウンロード
          </Button>
        </>
      )}
    </>
  )
}
