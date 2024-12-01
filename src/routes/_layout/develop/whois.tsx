import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createFileRoute } from '@tanstack/react-router'
import init, { format } from '@wasm-fmt/web_fmt/vite'
import { Copy, Search, Share } from 'lucide-react'
import { useMemo, useState } from 'react'
import { z } from 'zod'
import { Code } from '../../../components/shared/Code'
import { Head } from '../../../components/shared/Head'
import { WHOIS_API_ENDPOINT } from '../../../constants/api/whois'
import { useCopyLink } from '../../../hooks/useCopyLocation'
import { useInputState } from '../../../hooks/useInputState'
import { copy } from '../../../utils/clipboard/copy'
import { WHOIS_API_KEY } from '../../../utils/envValues'
import { fetch } from '../../../utils/fetchWithResult'

const searchParamsValidator = z.object({
  domain: z.string().optional(),
})

const loader = async (domain: string) => {
  const url = new URL(WHOIS_API_ENDPOINT)
  url.searchParams.set('apiKey', WHOIS_API_KEY)
  url.searchParams.set('domainName', domain)
  url.searchParams.set('outputFormat', 'json')
  const res = await fetch(url)
  if (!res.isSuccess) throw new Error(res.error)
  const json = await res.value.json()
  return JSON.stringify(json, null, 2)
}

export const Route = createFileRoute('/_layout/develop/whois')({
  validateSearch: (search) => searchParamsValidator.parse(search),
  loaderDeps: ({ search: { domain } }) => ({ domain }),
  loader: async ({ deps: { domain } }) => {
    if (domain === undefined) return undefined
    await init()
    return await loader(domain)
  },
  component: () => <Whois />,
})

const Whois = () => {
  const { domain: initialDomain } = Route.useSearch()
  const [result, setResult] = useState<string | undefined>(Route.useLoaderData())

  const [domain, onSetDomain] = useInputState(initialDomain ?? '')
  const { copyLink } = useCopyLink(Route.id)

  const formattedResult = useMemo(() => {
    if (result === undefined) return result

    try {
      return format(result, 'whois.json')
    } catch {
      return result
    }
  }, [result])

  return (
    <>
      <Head title="Whois Lookup" />
      <div className="flex flex-col gap-y-8">
        <h1 className="font-bold text-lg">Whois Lookup</h1>
        <div className="flex gap-x-2">
          <Input
            type="text"
            value={domain}
            onChange={onSetDomain}
            placeholder="Domain"
            onKeyDown={(e) => e.key === 'Enter' && loader(domain).then(setResult)}
          />
          <Button onClick={() => loader(domain).then(setResult)}>
            <Search />
            Search
          </Button>
        </div>
        <div className="overflow-x-scroll rounded-md border border-background-100 p-4 text-sm">
          <Code code={formattedResult ?? ''} lang="json" />
          {result === undefined && <p className="text-foreground-400 text-sm">No data</p>}
        </div>
        <div className="flex gap-x-2">
          <Button onClick={() => copyLink({ domain })} disabled={result === undefined}>
            <Share />
            Share Link
          </Button>
          <Button onClick={() => copy(formattedResult ?? '')} disabled={result === undefined}>
            <Copy />
            Copy Result
          </Button>
        </div>
      </div>
    </>
  )
}
