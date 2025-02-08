import {
  IconAlignLeft,
  IconAppWindow,
  IconBrandGithub,
  IconCalendarEvent,
  IconChevronDown,
  IconClipboardCheck,
  IconCode,
  IconCodeDots,
  IconFileDigit,
  IconForms,
  IconJson,
  IconKeyboard,
  IconLanguage,
  IconLink,
  IconLockOpen,
  IconMath,
  IconNotes,
  IconPhoto,
  IconPointer,
  IconQrcode,
  IconRepeat,
  IconReplace,
  IconSchool,
  IconSort09,
  IconSvg,
  IconTemperatureSun,
  IconTransform,
  IconTypography,
} from '@tabler/icons-react'
import { Link, createFileRoute } from '@tanstack/react-router'
import { Accordion } from 'rizzui/accordion'
import { Flex } from 'rizzui/flex'
import { Text, Title } from 'rizzui/typography'
import { twJoin } from 'tailwind-merge'
import { Head } from '../../components/shared/Head'
import { PROJECT_NAME } from '../../constants/project'

export const Route = createFileRoute('/_layout/')({
  component: () => <Home />,
})

const Home = () => {
  return (
    <>
      <Head title={PROJECT_NAME} />
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
              <Link
                to="/develop/iframe"
                className="flex items-center justify-between gap-x-4 rounded-lg border border-muted p-4 shadow-xs transition-colors hover:bg-background-50"
              >
                <IconAppWindow size={24} />
                <Title as="h3" className="grow text-base">
                  iframe プレビュー
                </Title>
              </Link>
              <Link
                to="/develop/jsonschema2zod"
                className="flex items-center justify-between gap-x-4 rounded-lg border border-muted p-4 shadow-xs transition-colors hover:bg-background-50"
              >
                <IconJson size={24} />
                <Title as="h3" className="grow text-base">
                  JSON Schema / Zod 変換
                </Title>
              </Link>
              <Link
                to="/develop/cursor"
                className="flex items-center justify-between gap-x-4 rounded-lg border border-muted p-4 shadow-xs transition-colors hover:bg-background-50"
              >
                <IconPointer size={24} />
                <Title as="h3" className="grow text-base">
                  カーソル スタイルプレビュー
                </Title>
              </Link>
              <Link
                to="/develop/keyboard"
                className="flex items-center justify-between gap-x-4 rounded-lg border border-muted p-4 shadow-xs transition-colors hover:bg-background-50"
              >
                <IconKeyboard size={24} />
                <Title as="h3" className="grow text-base">
                  キーボードイベント確認
                </Title>
              </Link>
              <Link
                to="/develop/format"
                className="flex items-center justify-between gap-x-4 rounded-lg border border-muted p-4 shadow-xs transition-colors hover:bg-background-50"
              >
                <IconCodeDots size={24} />
                <Title as="h3" className="grow text-base">
                  コードフォーマッター
                </Title>
              </Link>
              <Link
                to="/develop/github-activity"
                className="flex items-center justify-between gap-x-4 rounded-lg border border-muted p-4 shadow-xs transition-colors hover:bg-background-50"
              >
                <IconBrandGithub size={24} />
                <Title as="h3" className="grow text-base">
                  GitHub アクティビティ
                </Title>
              </Link>
              <Link
                to="/develop/unicode"
                className="flex items-center justify-between gap-x-4 rounded-lg border border-muted p-4 shadow-xs transition-colors hover:bg-background-50"
              >
                <IconTypography size={24} />
                <Title as="h3" className="grow text-base">
                  Unicode 一覧表
                </Title>
              </Link>
            </Flex>
          </Accordion.Body>
        </Accordion>
        <Accordion defaultOpen={true} className="flex flex-col gap-y-2">
          <Accordion.Header className="cursor-pointer rounded-lg py-4 transition-colors focus-visible:outline-0">
            {({ open }) => (
              <Flex align="center" justify="between">
                <IconSchool size={24} />
                <Title as="h2" id="iniad" className="text-left text-lg">
                  INIAD
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
                to="/iniad/locker"
                className="flex items-center justify-between gap-x-4 rounded-lg border border-muted p-4 shadow-xs transition-colors hover:bg-background-50"
              >
                <IconLockOpen size={24} />
                <Title as="h3" className="grow text-base">
                  ロッカー解錠
                </Title>
              </Link>
              <Link
                to="/iniad/sensor"
                className="flex items-center justify-between gap-x-4 rounded-lg border border-muted p-4 shadow-xs transition-colors hover:bg-background-50"
              >
                <IconTemperatureSun size={24} />
                <Title as="h3" className="grow text-base">
                  教室センサー情報
                </Title>
              </Link>
              <Link
                to="/iniad/timetable"
                className="flex items-center justify-between gap-x-4 rounded-lg border border-muted p-4 shadow-xs transition-colors hover:bg-background-50"
              >
                <IconCalendarEvent size={24} />
                <Title as="h3" className="grow text-base">
                  時間割
                </Title>
              </Link>
            </Flex>
          </Accordion.Body>
        </Accordion>
      </Flex>
    </>
  )
}
