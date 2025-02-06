import { IconLink } from '@tabler/icons-react'
import { type FC, useMemo, useState } from 'react'
import { Button } from 'rizzui/button'
import { Flex } from 'rizzui/flex'
import { Grid } from 'rizzui/grid'
import { Text, Title } from 'rizzui/typography'
import { twJoin } from 'tailwind-merge'
import { Breadcrumb } from '../../../components/ui/Breadcrumb'
import { useCopyLocation } from '../../../hooks/useCopyLocation'
import { CURSORS } from './constants'

type CursorProps = {
  initialSelectedCursor: (typeof CURSORS)[number]
}

export const Cursor: FC<CursorProps> = ({ initialSelectedCursor }) => {
  const [selectedCursor, setSelectedCursor] = useState(initialSelectedCursor)

  const sampleCode = useMemo(
    () => `.cursor {
  cursor: ${selectedCursor};
}`,
    [selectedCursor],
  )

  const copyLocation = useCopyLocation()

  return (
    <>
      <Breadcrumb
        items={[
          { label: 'tools', toOptions: { to: '/' } },
          { label: 'develop', toOptions: { to: '/', hash: 'develop' } },
          'cursor',
        ]}
      />
      <Title className="text-xl">カーソル スタイルプレビュー</Title>
      <pre className="rounded-md border border-muted p-4 shadow-xs">
        <code>{sampleCode}</code>
      </pre>
      <Grid columns="2">
        {CURSORS.map((cursor) => (
          <Flex
            justify="center"
            key={cursor}
            style={{ cursor }}
            onClick={() => setSelectedCursor(cursor)}
            className={twJoin(
              'w-full rounded-md border border-muted py-6 transition-colors hover:bg-background-50',
              selectedCursor === cursor && 'ring-2 ring-offset-2',
            )}
          >
            <Text>{cursor}</Text>
          </Flex>
        ))}
      </Grid>
      <Button
        className="w-fit cursor-pointer gap-x-2"
        onClick={() => copyLocation('/develop/cursor', { cursor: selectedCursor })}
      >
        <IconLink size={16} />
        URLをコピー
      </Button>
    </>
  )
}
