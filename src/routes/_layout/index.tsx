import { Link, createFileRoute } from '@tanstack/react-router'
import { Head } from '../../components/shared/Head'
import { PROJECT_NAME } from '../../constants/project'
import { toPascalCase } from '../../utils/text/case'

const links = {
  text: [
    { label: '文字数カウント', id: 'count' },
    { label: '文字置換', id: 'replace' },
    { label: '文字列反復', id: 'repeat' },
  ],
  convert: [
    { label: '怪レい日本语', id: 'cjp' },
    { label: 'QRCode', id: 'qrcode' },
    { label: 'Punycode', id: 'punycode' },
    { label: 'JSON Schema to Zod', id: 'jsonSchemaToZod' },
  ],
  web: [
    { label: 'Clipboard Data Checker', id: 'clipboard' },
    { label: 'Keyboard Event Checker', id: 'keyEvent' },
    { label: 'Cursor Preview', id: 'cursor' },
    { label: 'Whois Lookup', id: 'whois' },
  ],
  formatter: [
    { label: 'TypeScript, JavaScript', id: 'typescript' },
    { label: 'JSON', id: 'json' },
    { label: 'YAML', id: 'yaml' },
    { label: 'HTML', id: 'html' },
    { label: 'CSS', id: 'css' },
    { label: 'Python', id: 'python' },
    { label: 'Go', id: 'go' },
    { label: 'C', id: 'c' },
    { label: 'Java', id: 'java' },
    { label: 'Lua', id: 'lua' },
    { label: 'SQL', id: 'sql' },
  ],
} as const satisfies { [category: string]: { label: string; id: string }[] }

export const Route = createFileRoute('/_layout/')({
  component: () => <Home />,
})

const Home = () => (
  <>
    <Head title="Home" description={`Top Page of ${PROJECT_NAME}`} />
    <div className="flex flex-col gap-y-8">
      {Object.entries(links).map(([category, items]) => (
        <div key={category} className="flex flex-col gap-y-4">
          <h2 className="font-bold text-lg">{toPascalCase(category)}</h2>
          <div className="flex flex-col gap-y-2">
            {items.map(({ label, id }) => (
              <Link
                key={id}
                to={`/${category}/${id}`}
                className="rounded-md border border-background-100 p-4 transition-colors hover:bg-background-50"
              >
                <p>{label}</p>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  </>
)
