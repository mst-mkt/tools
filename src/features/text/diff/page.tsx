import { IconLink } from '@tabler/icons-react'
import { type FC, useEffect, useRef } from 'react'
import DiffViewer from 'react-diff-viewer-continued'
import { Button } from 'rizzui/button'
import { Flex } from 'rizzui/flex'
import { Textarea } from 'rizzui/textarea'
import { Title } from 'rizzui/typography'
import { Breadcrumb } from '../../../components/ui/Breadcrumb'
import { useCopyLocation } from '../../../hooks/useCopyLocation'
import { useInputState } from '../../../hooks/useInputState'

type DiffProps = {
  initialBefore: string
  initialAfter: string
}

export const Diff: FC<DiffProps> = ({ initialBefore, initialAfter }) => {
  const [before, onChangeBefore] = useInputState(initialBefore)
  const [after, onChangeAfter] = useInputState(initialAfter)

  const beforeTextareaRef = useRef<HTMLTextAreaElement>(null)
  const afterTextareaRef = useRef<HTMLTextAreaElement>(null)

  const copyLocation = useCopyLocation()

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (beforeTextareaRef.current === null || afterTextareaRef.current === null) return
      const height = beforeTextareaRef.current.getBoundingClientRect().height
      afterTextareaRef.current.style.height = `${height}px`
    })

    if (beforeTextareaRef.current !== null) observer.observe(beforeTextareaRef.current)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (beforeTextareaRef.current === null || afterTextareaRef.current === null) return
      const height = afterTextareaRef.current.getBoundingClientRect().height
      beforeTextareaRef.current.style.height = `${height}px`
    })

    if (afterTextareaRef.current !== null) observer.observe(afterTextareaRef.current)

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Breadcrumb
        items={[
          { label: 'tools', toOptions: { to: '/' } },
          { label: 'text', toOptions: { to: '/', hash: 'text' } },
          'diff',
        ]}
      />
      <Title className="text-xl">文字列差分</Title>
      <Flex gap="2" className="flex-col md:flex-row">
        <Textarea
          ref={beforeTextareaRef}
          label="Before"
          value={before}
          onChange={onChangeBefore}
          className="w-full"
          textareaClassName="min-h-20"
        />
        <Textarea
          ref={afterTextareaRef}
          label="After"
          value={after}
          onChange={onChangeAfter}
          className="w-full"
          textareaClassName="min-h-20"
        />
      </Flex>
      {after.length + before.length > 0 && (
        <>
          <div className="overflow-hidden rounded-lg">
            <DiffViewer
              oldValue={before}
              newValue={after}
              splitView={false}
              styles={{
                diffContainer: { minWidth: 'auto', tableLayout: 'auto' },
                gutter: { minWidth: 'auto' },
              }}
            />
          </div>
          <Button
            onClick={() => copyLocation('/text/diff', { before, after })}
            className="w-fit cursor-pointer gap-x-2"
          >
            <IconLink size={20} />
            URLをコピー
          </Button>
        </>
      )}
    </>
  )
}
