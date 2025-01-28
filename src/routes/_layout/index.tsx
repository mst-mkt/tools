import {
  IconAlignLeft,
  IconChevronDown,
  IconClipboardCheck,
  IconCode,
  IconFileDigit,
  IconForms,
  IconLanguage,
  IconLink,
  IconMath,
  IconNotes,
  IconPhoto,
  IconQrcode,
  IconRepeat,
  IconReplace,
  IconSort09,
  IconSvg,
  IconTransform,
} from '@tabler/icons-react'
import { Link, createFileRoute } from '@tanstack/react-router'
import { Accordion } from 'rizzui/accordion'
import { Flex } from 'rizzui/flex'
import { Text, Title } from 'rizzui/typography'
import { twJoin } from 'tailwind-merge'
import { PROJECT_NAME } from '../../constants/project'

export const Route = createFileRoute('/_layout/')({
  component: () => <Home />,
})

const Home = () => {
  return (
    <>
      <Flex direction="col" as="hgroup">
        <Title>{PROJECT_NAME}</Title>
        <Text className="text-muted-foreground">A collection of various tools for myself.</Text>
      </Flex>
      <Flex direction="col" align="stretch" justify="between" gap="8">
        <Accordion defaultOpen={true} className="flex flex-col gap-y-2">
          <Accordion.Header className="cursor-pointer rounded-lg py-4 transition-colors focus-visible:outline-0">
            {({ open }) => (
              <Flex align="center" justify="between">
                <IconNotes size={24} />
                <Title as="h2" id="text" className="text-left text-lg">
                  Text
                </Title>
                <div className="h-[1px] grow bg-foreground opacity-50" />
                <IconChevronDown
                  size={24}
                  className={twJoin('transition-[rotate]', open ? 'rotate-180' : 'rotate-0')}
                />
              </Flex>
            )}
          </Accordion.Header>
          <Accordion.Body>
            <Flex direction="col" align="stretch" justify="between" gap="2">
              <Link
                to="/text/count"
                className="flex items-center justify-between gap-x-4 rounded-lg border border-muted p-4 shadow-xs transition-colors hover:bg-background-50"
              >
                <IconAlignLeft size={24} />
                <Title as="h3" className="grow text-base">
                  文字数カウント
                </Title>
              </Link>
              <Link
                to="/text/replace"
                className="flex items-center justify-between gap-x-4 rounded-lg border border-muted p-4 shadow-xs transition-colors hover:bg-background-50"
              >
                <IconReplace size={24} />
                <Title as="h3" className="grow text-base">
                  文字置換
                </Title>
              </Link>
              <Link
                to="/text/repeat"
                className="flex items-center justify-between gap-x-4 rounded-lg border border-muted p-4 shadow-xs transition-colors hover:bg-background-50"
              >
                <IconRepeat size={24} />
                <Title as="h3" className="grow text-base">
                  文字列反復
                </Title>
              </Link>
              <Link
                to="/text/cjp"
                className="flex items-center justify-between gap-x-4 rounded-lg border border-muted p-4 shadow-xs transition-colors hover:bg-background-50"
              >
                <IconLanguage size={24} />
                <Title as="h3" className="grow text-base">
                  怪レい日本语変換
                </Title>
              </Link>
            </Flex>
          </Accordion.Body>
        </Accordion>
        <Accordion defaultOpen={true} className="flex flex-col gap-y-2">
          <Accordion.Header className="cursor-pointer rounded-lg py-4 transition-colors focus-visible:outline-0">
            {({ open }) => (
              <Flex align="center" justify="between">
                <IconTransform size={24} />
                <Title as="h2" id="convert" className="text-left text-lg">
                  Convert
                </Title>
                <div className="h-[1px] grow bg-foreground opacity-50" />
                <IconChevronDown
                  size={24}
                  className={twJoin('transition-[rotate]', open ? 'rotate-180' : 'rotate-0')}
                />
              </Flex>
            )}
          </Accordion.Header>
          <Accordion.Body>
            <Flex direction="col" align="stretch" justify="between" gap="2">
              <Link
                to="/convert/qrcode"
                className="flex items-center justify-between gap-x-4 rounded-lg border border-muted p-4 shadow-xs transition-colors hover:bg-background-50"
              >
                <IconQrcode size={24} />
                <Title as="h3" className="grow text-base">
                  QR Code 生成
                </Title>
              </Link>
              <Link
                to="/convert/url"
                className="flex items-center justify-between gap-x-4 rounded-lg border border-muted p-4 shadow-xs transition-colors hover:bg-background-50"
              >
                <IconLink size={24} />
                <Title as="h3" className="grow text-base">
                  URL エンコード/デコード
                </Title>
              </Link>
              <Link
                to="/convert/base64"
                className="flex items-center justify-between gap-x-4 rounded-lg border border-muted p-4 shadow-xs transition-colors hover:bg-background-50"
              >
                <IconFileDigit size={24} />
                <Title as="h3" className="grow text-base">
                  Base64 エンコード/デコード
                </Title>
              </Link>
              <Link
                to="/convert/punycode"
                className="flex items-center justify-between gap-x-4 rounded-lg border border-muted p-4 shadow-xs transition-colors hover:bg-background-50"
              >
                <IconForms size={24} />
                <Title as="h3" className="grow text-base">
                  Punycode エンコード/デコード
                </Title>
              </Link>
            </Flex>
          </Accordion.Body>
        </Accordion>
        <Accordion defaultOpen={true} className="flex flex-col gap-y-2">
          <Accordion.Header className="cursor-pointer rounded-lg py-4 transition-colors focus-visible:outline-0">
            {({ open }) => (
              <Flex align="center" justify="between">
                <IconPhoto size={24} />
                <Title as="h2" id="image" className="text-left text-lg">
                  Image
                </Title>
                <div className="h-[1px] grow bg-foreground opacity-50" />
                <IconChevronDown
                  size={24}
                  className={twJoin('transition-[rotate]', open ? 'rotate-180' : 'rotate-0')}
                />
              </Flex>
            )}
          </Accordion.Header>
          <Accordion.Body>
            <Flex direction="col" align="stretch" justify="between" gap="2">
              <Link
                to="/image/svg2png"
                className="flex items-center justify-between gap-x-4 rounded-lg border border-muted p-4 shadow-xs transition-colors hover:bg-background-50"
              >
                <IconSvg size={24} />
                <Title as="h3" className="grow text-base">
                  SVG - PNG 変換
                </Title>
              </Link>
            </Flex>
          </Accordion.Body>
        </Accordion>
        <Accordion defaultOpen={true} className="flex flex-col gap-y-2">
          <Accordion.Header className="cursor-pointer rounded-lg py-4 transition-colors focus-visible:outline-0">
            {({ open }) => (
              <Flex align="center" justify="between">
                <IconMath size={24} />
                <Title as="h2" id="math" className="text-left text-lg">
                  Math
                </Title>
                <div className="h-[1px] grow bg-foreground opacity-50" />
                <IconChevronDown
                  size={24}
                  className={twJoin('transition-[rotate]', open ? 'rotate-180' : 'rotate-0')}
                />
              </Flex>
            )}
          </Accordion.Header>
          <Accordion.Body>
            <Flex direction="col" align="stretch" justify="between" gap="2">
              <Link
                to="/math/radix"
                className="flex items-center justify-between gap-x-4 rounded-lg border border-muted p-4 shadow-xs transition-colors hover:bg-background-50"
              >
                <IconSort09 size={24} />
                <Title as="h3" className="grow text-base">
                  基数変換
                </Title>
              </Link>
            </Flex>
          </Accordion.Body>
        </Accordion>
        <Accordion defaultOpen={true} className="flex flex-col gap-y-2">
          <Accordion.Header className="cursor-pointer rounded-lg py-4 transition-colors focus-visible:outline-0">
            {({ open }) => (
              <Flex align="center" justify="between">
                <IconCode size={24} />
                <Title as="h2" id="develop" className="text-left text-lg">
                  Develop
                </Title>
                <div className="h-[1px] grow bg-foreground opacity-50" />
                <IconChevronDown
                  size={24}
                  className={twJoin('transition-[rotate]', open ? 'rotate-180' : 'rotate-0')}
                />
              </Flex>
            )}
          </Accordion.Header>
          <Accordion.Body>
            <Flex direction="col" align="stretch" justify="between" gap="2">
              <Link
                to="/develop/clipboard"
                className="flex items-center justify-between gap-x-4 rounded-lg border border-muted p-4 shadow-xs transition-colors hover:bg-background-50"
              >
                <IconClipboardCheck size={24} />
                <Title as="h3" className="grow text-base">
                  クリップボードデータ確認
                </Title>
              </Link>
            </Flex>
          </Accordion.Body>
        </Accordion>
      </Flex>
    </>
  )
}
