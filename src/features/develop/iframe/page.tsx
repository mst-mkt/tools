import { IconLink } from '@tabler/icons-react'
import type { FC } from 'react'
import { Box, Button, Flex, Input, Title } from 'rizzui'
import { Breadcrumb } from '../../../components/ui/Breadcrumb'
import { useCopyLocation } from '../../../hooks/useCopyLocation'
import { useInputState } from '../../../hooks/useInputState'

type IframeProps = {
  initialSrc: string
}

export const Iframe: FC<IframeProps> = ({ initialSrc }) => {
  const [src, onChangeSrc] = useInputState(initialSrc)

  const copyLocation = useCopyLocation()

  return (
    <>
      <Breadcrumb
        items={[
          { label: 'tools', toOptions: { to: '/' } },
          { label: 'develop', toOptions: { to: '/', hash: 'develop' } },
          'clipboard',
        ]}
      />
      <Title className="text-xl">iframe プレビュー</Title>
      <Title as="h2" className="text-base">
        URL
      </Title>
      <Input value={src} onChange={onChangeSrc} placeholder="表示するURLを入力" />
      <Title as="h2" className="text-base">
        プレビュー
      </Title>
      <Box className="h-64 min-h-32 resize-y overflow-hidden rounded-md border border-muted p-2 shadow-xs">
        <iframe
          src={src}
          className="h-full w-full"
          style={{ border: 'none' }}
          title={`iframe プレビュー: ${src}`}
        />
      </Box>
      <Flex align="center" gap="4">
        <Button
          className="w-fit cursor-pointer gap-x-2 disabled:cursor-not-allowed"
          onClick={() => copyLocation('/develop/iframe', { src })}
          disabled={src.trim() === ''}
        >
          <IconLink size={16} />
          URLをコピー
        </Button>
      </Flex>
    </>
  )
}
