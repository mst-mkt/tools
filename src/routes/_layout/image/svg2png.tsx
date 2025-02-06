import { createFileRoute } from '@tanstack/react-router'
import { Head } from '../../../components/shared/Head'
import { SvgToPng } from '../../../features/image/svg2png/page'

export const Route = createFileRoute('/_layout/image/svg2png')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <Head title="SVG/PNG 変換" />
      <SvgToPng />
    </>
  )
}
