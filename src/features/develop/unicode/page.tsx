import { IconChevronUp, IconSearch, IconShare } from '@tabler/icons-react'
import { useLocation } from '@tanstack/react-router'
import { useWindowVirtualizer } from '@tanstack/react-virtual'
import { type FC, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Button } from 'rizzui/button'
import { Input } from 'rizzui/input'
import { Title } from 'rizzui/typography'
import { twJoin } from 'tailwind-merge'
import { match } from 'ts-pattern'
import {
  find_unicode_by_name_contains,
  get_all_emojis_list,
  get_all_unicodes_list,
  get_unicodes_list_by_block,
  get_unicodes_list_by_gc,
} from 'unicode-information'
import { Breadcrumb } from '../../../components/ui/Breadcrumb'
import { useCopyLocation } from '../../../hooks/useCopyLocation'
import { useElementSize } from '../../../hooks/useElementSize'
import { useInputState } from '../../../hooks/useInputState'
import type { Block, GeneralCategoryShort } from './constants'
import { UnicodeModal } from './modal'
import { BlockSelect, CategorySelect, DisplaySelect } from './select'

type UnicodeProps = {
  initialDisplay: 'all' | 'category' | 'block' | 'emoji' | 'search'
  initialCategory: GeneralCategoryShort | 'all'
  initialBlock: Block | 'all'
  initialSearch: string
}

export const Unicode: FC<UnicodeProps> = ({
  initialDisplay,
  initialCategory,
  initialBlock,
  initialSearch,
}) => {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const { width } = useElementSize(scrollerRef.current)
  const { hash } = useLocation()

  const [selectedCode, setSelectedCode] = useState<string | null>(
    hash === '' ? null : hash.toUpperCase(),
  )
  const [display, setDisplay] = useState<'all' | 'block' | 'category' | 'emoji' | 'search'>(
    initialDisplay,
  )
  const [displayCategory, setDisplayCategory] = useState<GeneralCategoryShort | 'all'>(
    initialCategory,
  )
  const [displayBlock, setDisplayBlock] = useState<Block | 'all'>(initialBlock)
  const [search, onChnageSearch] = useInputState(initialSearch)

  const unicodes = useMemo(() => {
    const sortMethod = ({ cp: a }: { cp: string }, { cp: b }: { cp: string }) => {
      return Number.parseInt(a, 16) - Number.parseInt(b, 16)
    }

    const all = get_all_unicodes_list()

    return match(display)
      .with('all', () => all)
      .with('category', () =>
        displayCategory === 'all' ? all : get_unicodes_list_by_gc(displayCategory),
      )
      .with('block', () =>
        displayBlock === 'all' ? all : get_unicodes_list_by_block(displayBlock),
      )
      .with('emoji', () => get_all_emojis_list())
      .with('search', () => find_unicode_by_name_contains(search))
      .exhaustive()
      .toSorted(sortMethod)
  }, [displayCategory, displayBlock, display, search])

  const countPerRow = Math.max(1, Math.floor(width / 80))
  const rowCount = Math.ceil(unicodes.length / countPerRow)

  const hashPosition = useMemo(() => {
    if (hash === '') return 0
    const index = unicodes.findIndex((unicode) => unicode.cp.toUpperCase() === hash.toUpperCase())
    return Math.floor(index / countPerRow)
  }, [hash, countPerRow, unicodes])

  const virtualizer = useWindowVirtualizer({
    count: rowCount,
    estimateSize: () => 100,
    gap: 8,
    overscan: 8,
    scrollMargin: 0,
  })

  useLayoutEffect(() => {
    if (hashPosition !== 0) {
      virtualizer.scrollToOffset(hashPosition * 100 + 8 * (hashPosition - 1))
    }
  }, [hashPosition, virtualizer.scrollToOffset])

  const copyLocation = useCopyLocation()

  return (
    <div ref={scrollerRef} className="relative flex flex-col gap-y-8">
      <Breadcrumb
        items={[
          { label: 'tools', toOptions: { to: '/' } },
          { label: 'develop', toOptions: { to: '/', hash: 'develop' } },
          'unicode',
        ]}
      />
      <UnicodeModal selected={selectedCode} onClose={() => setSelectedCode(null)} />
      <Title className="text-xl">Unicode一覧表</Title>
      <div className="sticky top-24 left-0 z-10 flex gap-x-2 bg-background">
        <DisplaySelect value={display} onChange={setDisplay} />
        {display === 'category' && (
          <CategorySelect value={displayCategory} onChange={setDisplayCategory} />
        )}
        {display === 'block' && <BlockSelect value={displayBlock} onChange={setDisplayBlock} />}
        {display === 'search' && (
          <Input
            value={search}
            onChange={onChnageSearch}
            className="w-full"
            prefix={<IconSearch size={16} />}
          />
        )}
        {display !== 'all' && (
          <Button
            onClick={() =>
              copyLocation('/develop/unicode', {
                display: display,
                category: displayCategory,
                block: displayBlock,
                search: search,
              })
            }
            className="cursor-pointer gap-x-2 p-2"
          >
            <IconShare size={20} />
          </Button>
        )}
      </div>
      <div style={{ height: virtualizer.getTotalSize() }} className="relative w-full">
        {virtualizer.getVirtualItems().map((virtualRow) => (
          <div
            key={virtualRow.index}
            data-index={virtualRow.index}
            ref={virtualizer.measureElement}
            className="absolute top-0 left-0 grid w-full gap-x-2 overflow-hidden"
            style={{
              height: virtualRow.size,
              transform: `translateY(${virtualRow.start}px)`,
              gridTemplateColumns: `repeat(${countPerRow}, 1fr)`,
            }}
          >
            {unicodes
              .slice(virtualRow.index * countPerRow, (virtualRow.index + 1) * countPerRow)
              .map((unicode) => (
                <div
                  key={unicode.cp}
                  onClick={() => setSelectedCode(unicode.cp)}
                  onKeyDown={(e) => e.key === 'Enter' && setSelectedCode(unicode.cp)}
                  className={twJoin(
                    hash.toUpperCase() === unicode.cp.toUpperCase() &&
                      'bg-cyan-100 font-bold hover:bg-cyan-200',
                    'flex w-full cursor-pointer flex-col items-center justify-center rounded-md bg-background-50/50 p-2 transition-colors hover:bg-background-100',
                  )}
                >
                  <div className="h-[1lh] font-bold text-lg">
                    {String.fromCodePoint(Number.parseInt(unicode.cp, 16))}
                  </div>
                  <div className="">{unicode.cp}</div>
                </div>
              ))}
          </div>
        ))}
      </div>
      <Button
        onClick={() => virtualizer.scrollToOffset(0)}
        className="fixed right-4 bottom-4 block aspect-1 h-fit cursor-pointer bg-muted/30 p-2 md:p-4"
        rounded="pill"
        variant="flat"
      >
        <IconChevronUp size={20} className="aspect-1" />
      </Button>
    </div>
  )
}
