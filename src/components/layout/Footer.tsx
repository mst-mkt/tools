import {
  type Icon,
  IconBrandGithub,
  IconBrandTwitter,
  IconBrandX,
  IconLink,
} from '@tabler/icons-react'
import { Flex } from 'rizzui/flex'
import { Text } from 'rizzui/typography'
import { match } from 'ts-pattern'
import { PROJECT_AUTHOR, PROJECT_LINKS, PROJECT_NAME } from '../../constants/project'

type UrlInfo = {
  icon: Icon
  label: string
  url: string
}

const getLinkIcon = (url: string) => {
  return match(url)
    .returnType<UrlInfo>()
    .when(
      (url) => url.startsWith('https://github.com/'),
      (url) => ({ icon: IconBrandGithub, label: 'GitHub', url }),
    )
    .when(
      (url) => url.startsWith('https://x.com/'),
      (url) => ({ icon: IconBrandX, label: 'X', url }),
    )
    .when(
      (url) => url.startsWith('https://twitter.com/'),
      (url) => ({ icon: IconBrandTwitter, label: 'Twitter', url }),
    )
    .otherwise((url) => ({ icon: IconLink, label: url, url }))
}

export const Footer = () => (
  <footer className="mx-auto flex w-full max-w-max-content flex-col gap-y-2 px-6 py-4">
    <Flex gap="4" align="center" className="w-full">
      <Text fontWeight="bold" className="text-lg">
        {PROJECT_NAME}
      </Text>
      <div className="h-[1px] grow bg-gray-400" />
    </Flex>
    <ul>
      <li>
        {PROJECT_LINKS.map(getLinkIcon).map((url) => (
          <a
            key={url.label}
            href={url.url}
            className="flex items-center gap-x-1 transition-colors hover:underline"
          >
            <url.icon size={16} />
            <Text>{url.label}</Text>
          </a>
        ))}
      </li>
    </ul>
    <Text className="text-foreground-300 text-sm">
      {/* biome-ignore lint/correctness/noUndeclaredVariables: its declared in `src/types/vite-defined.d.ts` */}
      &copy; {__UPDATED_YEAR__}{' '}
      {PROJECT_AUTHOR.map((author) => (
        <a key={author} href={`https://github.com/${author}`} className="hover:underline">
          {author}
        </a>
      ))}
    </Text>
  </footer>
)
