import { createFileRoute } from '@tanstack/react-router'
import { object, optional, parse, string } from 'valibot'
import { Head } from '../../../components/shared/Head'
import { QrCode } from '../../../features/convert/qrcode/page'

const searchParamsSchema = object({
  text: optional(string()),
})

export const Route = createFileRoute('/_layout/convert/qrcode')({
  validateSearch: (search) => parse(searchParamsSchema, search),
  component: RouteComponent,
})

function RouteComponent() {
  const { text } = Route.useSearch()

  return (
    <>
      <Head title="QRコード生成" />
      <QrCode initialText={text ?? ''} />
    </>
  )
}
