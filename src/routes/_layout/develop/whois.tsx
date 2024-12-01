import { createFileRoute } from '@tanstack/react-router'
import init, { format } from '@wasm-fmt/web_fmt/vite'
import { Copy, Search, Share } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { z } from 'zod'
import { Code } from '../../../components/shared/Code'
import { Head } from '../../../components/shared/Head'
import { IconButton } from '../../../components/ui/IconButton'
import { TextInput } from '../../../components/ui/TextInput'
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
    return await loader(domain)
  },
  component: () => <Whois />,
})

const Whois = () => {
  const { domain: initialDomain } = Route.useSearch()
  const [result, setResult] = useState<string | undefined>(Route.useLoaderData())
  const [wasmInitialized, setWasmInitialized] = useState(false)
  const [domain, onSetDomain] = useInputState(initialDomain ?? '')
  const { copyLink } = useCopyLink(Route.id)

  useEffect(() => {
    init().then(() => setWasmInitialized(true))
  }, [])

  const formattedResult = useMemo(() => {
    if (!wasmInitialized || result === undefined) return result

    try {
      const formatted = format(result, 'whois.json')
      return formatted
    } catch (e) {
      console.error(e)
      return result
    }
  }, [result, wasmInitialized])

  return (
    <>
      <Head title="Whois Lookup" />
      <div className="flex flex-col gap-y-8">
        <h1 className="font-bold text-lg">Whois Lookup</h1>
        <div className="flex gap-x-2">
          <TextInput
            value={domain}
            onChange={onSetDomain}
            placeholder="Domain"
            onKeyDown={(e) => e.key === 'Enter' && loader(domain).then(setResult)}
          />
          <IconButton icon={Search} label="Search" onClick={() => loader(domain).then(setResult)} />
        </div>
        <div className="scrollbar-thin scrollbar-thumb-background-200 scrollbar-thumb-rounded-full scrollbar-track-transparent overflow-y-hidden overflow-x-scroll rounded-md border border-background-100 p-4 text-sm">
          <Code code={formattedResult ?? ''} lang="json" />
          {result === undefined && <p className="text-foreground-400 text-sm">No data</p>}
        </div>
        <div className="flex gap-x-2">
          <IconButton
            icon={Share}
            label="Share Link"
            onClick={() => copyLink({ domain })}
            disabled={result === undefined}
          />
          <IconButton
            icon={Copy}
            label="Copy Result"
            onClick={() => copy(formattedResult ?? '')}
            disabled={result === undefined}
          />
        </div>
      </div>
    </>
  )
}
