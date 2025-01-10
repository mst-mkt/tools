import { IconChevronDown, IconCopy, IconDownload, IconLink } from '@tabler/icons-react'
import { type FC, useCallback, useMemo } from 'react'
import { Box, Button, Dropdown, Flex, Grid, Input, Title } from 'rizzui'
import { twMerge } from 'tailwind-merge'
import { encode, renderANSI, renderSVG, renderUnicode, renderUnicodeCompact } from 'uqr'
import { Breadcrumb } from '../../../components/ui/Breadcrumb'
import { useCopyLocation } from '../../../hooks/useCopyLocation'
import { useInputState } from '../../../hooks/useInputState'
import { copy, copyFile } from '../../../utils/copy'
import { svgToPngFile } from '../../image/svg2png/convert'

type QrCodeProps = {
  initialText: string
}

export const QrCode: FC<QrCodeProps> = ({ initialText }) => {
  const [inputText, onChangeInputText] = useInputState(initialText)
  const { data, size } = useMemo(() => encode(inputText), [inputText])

  const renderSvgAsFile = useCallback((text: string) => {
    const svg = renderSVG(text)
    return new File([svg], 'qrcode.svg', { type: 'image/svg+xml' })
  }, [])

  const renderPngAsFile = useCallback(async (text: string) => {
    const svg = renderSVG(text)
    return await svgToPngFile(svg, { width: 256, height: 256 })
  }, [])

  const handleDownload = useCallback((file: File) => {
    const url = URL.createObjectURL(file)
    const a = document.createElement('a')
    a.href = url
    a.download = file.name
    a.click()
    URL.revokeObjectURL(url)
  }, [])

  const copyLocation = useCopyLocation()

  return (
    <>
      <Breadcrumb
        items={[
          { label: 'tools', toOptions: { to: '/' } },
          { label: 'convert', toOptions: { to: '/', hash: 'convert' } },
          'qrcode',
        ]}
      />
      <Title className="text-xl">QRコード生成</Title>
      <Input
        value={inputText}
        onChange={onChangeInputText}
        placeholder="QRコードに変換する文字列を入力"
      />
      <Box className="rounded-lg border border-muted p-4 shadow-xs">
        <Grid
          style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
          gap="0"
          className="mx-auto max-w-[50svmin]"
        >
          {data.map((row, y) =>
            row.map((cell, x) => (
              <Box
                // biome-ignore lint/suspicious/noArrayIndexKey: 2D array is not a list of items
                key={`${x}-${y}`}
                className={twMerge('aspect-1 h-full w-full', cell && 'bg-foreground')}
              />
            )),
          )}
        </Grid>
      </Box>
      <Flex align="center" justify="start" gap="4">
        <Button
          className="w-fit cursor-pointer gap-x-2 disabled:cursor-not-allowed"
          onClick={() => copyLocation('/convert/qrcode', { text: inputText })}
          disabled={inputText.trim() === ''}
        >
          <IconLink size={16} />
          URLをコピー
        </Button>
        <Dropdown>
          <Dropdown.Trigger>
            <Button className="w-fit shrink-0 cursor-pointer gap-x-2">
              <IconCopy size={16} />
              コピー
              <IconChevronDown size={16} />
            </Button>
          </Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => copy(renderUnicode(inputText))}>文字列</Dropdown.Item>
            <Dropdown.Item onClick={() => copy(renderUnicodeCompact(inputText))}>
              文字列 (コンパクト)
            </Dropdown.Item>
            <Dropdown.Item onClick={() => copy(renderANSI(inputText))}>
              文字列 (ANSIカラー)
            </Dropdown.Item>
            <Dropdown.Item onClick={() => copy(renderSVG(inputText))}>文字列 (SVG)</Dropdown.Item>
            <Dropdown.Item onClick={() => copyFile(renderSvgAsFile(inputText))}>
              ファイル (SVG)
            </Dropdown.Item>
            <Dropdown.Item onClick={async () => copyFile(await renderPngAsFile(inputText))}>
              画像 (PNG)
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown>
          <Dropdown.Trigger>
            <Button className="w-fit shrink-0 cursor-pointer gap-x-2">
              <IconDownload size={16} />
              ダウンロード
              <IconChevronDown size={16} />
            </Button>
          </Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleDownload(renderSvgAsFile(inputText))}>
              画像 (SVG)
            </Dropdown.Item>
            <Dropdown.Item onClick={async () => handleDownload(await renderPngAsFile(inputText))}>
              画像 (PNG)
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Flex>
    </>
  )
}
