// biome-ignore lint: this file is auto-generated by TanStack Router

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './../../routes/__root'
import { Route as LayoutImport } from './../../routes/_layout'
import { Route as LayoutIndexImport } from './../../routes/_layout/index'
import { Route as LayoutTextIndexImport } from './../../routes/_layout/text/index'
import { Route as LayoutMathIndexImport } from './../../routes/_layout/math/index'
import { Route as LayoutIniadIndexImport } from './../../routes/_layout/iniad/index'
import { Route as LayoutImageIndexImport } from './../../routes/_layout/image/index'
import { Route as LayoutDevelopIndexImport } from './../../routes/_layout/develop/index'
import { Route as LayoutConvertIndexImport } from './../../routes/_layout/convert/index'
import { Route as LayoutTextReplaceImport } from './../../routes/_layout/text/replace'
import { Route as LayoutTextRepeatImport } from './../../routes/_layout/text/repeat'
import { Route as LayoutTextCountImport } from './../../routes/_layout/text/count'
import { Route as LayoutTextCjpImport } from './../../routes/_layout/text/cjp'
import { Route as LayoutMathRadixImport } from './../../routes/_layout/math/radix'
import { Route as LayoutMathCalculatorImport } from './../../routes/_layout/math/calculator'
import { Route as LayoutIniadTimetableImport } from './../../routes/_layout/iniad/timetable'
import { Route as LayoutIniadSensorImport } from './../../routes/_layout/iniad/sensor'
import { Route as LayoutIniadLockerImport } from './../../routes/_layout/iniad/locker'
import { Route as LayoutImageSvg2pngImport } from './../../routes/_layout/image/svg2png'
import { Route as LayoutDevelopMarkdownImport } from './../../routes/_layout/develop/markdown'
import { Route as LayoutDevelopKeyboardImport } from './../../routes/_layout/develop/keyboard'
import { Route as LayoutDevelopJsonschema2zodImport } from './../../routes/_layout/develop/jsonschema2zod'
import { Route as LayoutDevelopIframeImport } from './../../routes/_layout/develop/iframe'
import { Route as LayoutDevelopGithubActivityImport } from './../../routes/_layout/develop/github-activity'
import { Route as LayoutDevelopFormatImport } from './../../routes/_layout/develop/format'
import { Route as LayoutDevelopCursorImport } from './../../routes/_layout/develop/cursor'
import { Route as LayoutDevelopClipboardImport } from './../../routes/_layout/develop/clipboard'
import { Route as LayoutConvertUrlImport } from './../../routes/_layout/convert/url'
import { Route as LayoutConvertQrcodeImport } from './../../routes/_layout/convert/qrcode'
import { Route as LayoutConvertPunycodeImport } from './../../routes/_layout/convert/punycode'
import { Route as LayoutConvertBase64Import } from './../../routes/_layout/convert/base64'

// Create/Update Routes

const LayoutRoute = LayoutImport.update({
  id: '/_layout',
  getParentRoute: () => rootRoute,
} as any)

const LayoutIndexRoute = LayoutIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutTextIndexRoute = LayoutTextIndexImport.update({
  id: '/text/',
  path: '/text/',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutMathIndexRoute = LayoutMathIndexImport.update({
  id: '/math/',
  path: '/math/',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutIniadIndexRoute = LayoutIniadIndexImport.update({
  id: '/iniad/',
  path: '/iniad/',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutImageIndexRoute = LayoutImageIndexImport.update({
  id: '/image/',
  path: '/image/',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutDevelopIndexRoute = LayoutDevelopIndexImport.update({
  id: '/develop/',
  path: '/develop/',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutConvertIndexRoute = LayoutConvertIndexImport.update({
  id: '/convert/',
  path: '/convert/',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutTextReplaceRoute = LayoutTextReplaceImport.update({
  id: '/text/replace',
  path: '/text/replace',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutTextRepeatRoute = LayoutTextRepeatImport.update({
  id: '/text/repeat',
  path: '/text/repeat',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutTextCountRoute = LayoutTextCountImport.update({
  id: '/text/count',
  path: '/text/count',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutTextCjpRoute = LayoutTextCjpImport.update({
  id: '/text/cjp',
  path: '/text/cjp',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutMathRadixRoute = LayoutMathRadixImport.update({
  id: '/math/radix',
  path: '/math/radix',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutMathCalculatorRoute = LayoutMathCalculatorImport.update({
  id: '/math/calculator',
  path: '/math/calculator',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutIniadTimetableRoute = LayoutIniadTimetableImport.update({
  id: '/iniad/timetable',
  path: '/iniad/timetable',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutIniadSensorRoute = LayoutIniadSensorImport.update({
  id: '/iniad/sensor',
  path: '/iniad/sensor',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutIniadLockerRoute = LayoutIniadLockerImport.update({
  id: '/iniad/locker',
  path: '/iniad/locker',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutImageSvg2pngRoute = LayoutImageSvg2pngImport.update({
  id: '/image/svg2png',
  path: '/image/svg2png',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutDevelopMarkdownRoute = LayoutDevelopMarkdownImport.update({
  id: '/develop/markdown',
  path: '/develop/markdown',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutDevelopKeyboardRoute = LayoutDevelopKeyboardImport.update({
  id: '/develop/keyboard',
  path: '/develop/keyboard',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutDevelopJsonschema2zodRoute =
  LayoutDevelopJsonschema2zodImport.update({
    id: '/develop/jsonschema2zod',
    path: '/develop/jsonschema2zod',
    getParentRoute: () => LayoutRoute,
  } as any)

const LayoutDevelopIframeRoute = LayoutDevelopIframeImport.update({
  id: '/develop/iframe',
  path: '/develop/iframe',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutDevelopGithubActivityRoute =
  LayoutDevelopGithubActivityImport.update({
    id: '/develop/github-activity',
    path: '/develop/github-activity',
    getParentRoute: () => LayoutRoute,
  } as any)

const LayoutDevelopFormatRoute = LayoutDevelopFormatImport.update({
  id: '/develop/format',
  path: '/develop/format',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutDevelopCursorRoute = LayoutDevelopCursorImport.update({
  id: '/develop/cursor',
  path: '/develop/cursor',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutDevelopClipboardRoute = LayoutDevelopClipboardImport.update({
  id: '/develop/clipboard',
  path: '/develop/clipboard',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutConvertUrlRoute = LayoutConvertUrlImport.update({
  id: '/convert/url',
  path: '/convert/url',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutConvertQrcodeRoute = LayoutConvertQrcodeImport.update({
  id: '/convert/qrcode',
  path: '/convert/qrcode',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutConvertPunycodeRoute = LayoutConvertPunycodeImport.update({
  id: '/convert/punycode',
  path: '/convert/punycode',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutConvertBase64Route = LayoutConvertBase64Import.update({
  id: '/convert/base64',
  path: '/convert/base64',
  getParentRoute: () => LayoutRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_layout': {
      id: '/_layout'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof LayoutImport
      parentRoute: typeof rootRoute
    }
    '/_layout/': {
      id: '/_layout/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof LayoutIndexImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/convert/base64': {
      id: '/_layout/convert/base64'
      path: '/convert/base64'
      fullPath: '/convert/base64'
      preLoaderRoute: typeof LayoutConvertBase64Import
      parentRoute: typeof LayoutImport
    }
    '/_layout/convert/punycode': {
      id: '/_layout/convert/punycode'
      path: '/convert/punycode'
      fullPath: '/convert/punycode'
      preLoaderRoute: typeof LayoutConvertPunycodeImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/convert/qrcode': {
      id: '/_layout/convert/qrcode'
      path: '/convert/qrcode'
      fullPath: '/convert/qrcode'
      preLoaderRoute: typeof LayoutConvertQrcodeImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/convert/url': {
      id: '/_layout/convert/url'
      path: '/convert/url'
      fullPath: '/convert/url'
      preLoaderRoute: typeof LayoutConvertUrlImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/develop/clipboard': {
      id: '/_layout/develop/clipboard'
      path: '/develop/clipboard'
      fullPath: '/develop/clipboard'
      preLoaderRoute: typeof LayoutDevelopClipboardImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/develop/cursor': {
      id: '/_layout/develop/cursor'
      path: '/develop/cursor'
      fullPath: '/develop/cursor'
      preLoaderRoute: typeof LayoutDevelopCursorImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/develop/format': {
      id: '/_layout/develop/format'
      path: '/develop/format'
      fullPath: '/develop/format'
      preLoaderRoute: typeof LayoutDevelopFormatImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/develop/github-activity': {
      id: '/_layout/develop/github-activity'
      path: '/develop/github-activity'
      fullPath: '/develop/github-activity'
      preLoaderRoute: typeof LayoutDevelopGithubActivityImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/develop/iframe': {
      id: '/_layout/develop/iframe'
      path: '/develop/iframe'
      fullPath: '/develop/iframe'
      preLoaderRoute: typeof LayoutDevelopIframeImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/develop/jsonschema2zod': {
      id: '/_layout/develop/jsonschema2zod'
      path: '/develop/jsonschema2zod'
      fullPath: '/develop/jsonschema2zod'
      preLoaderRoute: typeof LayoutDevelopJsonschema2zodImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/develop/keyboard': {
      id: '/_layout/develop/keyboard'
      path: '/develop/keyboard'
      fullPath: '/develop/keyboard'
      preLoaderRoute: typeof LayoutDevelopKeyboardImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/develop/markdown': {
      id: '/_layout/develop/markdown'
      path: '/develop/markdown'
      fullPath: '/develop/markdown'
      preLoaderRoute: typeof LayoutDevelopMarkdownImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/image/svg2png': {
      id: '/_layout/image/svg2png'
      path: '/image/svg2png'
      fullPath: '/image/svg2png'
      preLoaderRoute: typeof LayoutImageSvg2pngImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/iniad/locker': {
      id: '/_layout/iniad/locker'
      path: '/iniad/locker'
      fullPath: '/iniad/locker'
      preLoaderRoute: typeof LayoutIniadLockerImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/iniad/sensor': {
      id: '/_layout/iniad/sensor'
      path: '/iniad/sensor'
      fullPath: '/iniad/sensor'
      preLoaderRoute: typeof LayoutIniadSensorImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/iniad/timetable': {
      id: '/_layout/iniad/timetable'
      path: '/iniad/timetable'
      fullPath: '/iniad/timetable'
      preLoaderRoute: typeof LayoutIniadTimetableImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/math/calculator': {
      id: '/_layout/math/calculator'
      path: '/math/calculator'
      fullPath: '/math/calculator'
      preLoaderRoute: typeof LayoutMathCalculatorImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/math/radix': {
      id: '/_layout/math/radix'
      path: '/math/radix'
      fullPath: '/math/radix'
      preLoaderRoute: typeof LayoutMathRadixImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/text/cjp': {
      id: '/_layout/text/cjp'
      path: '/text/cjp'
      fullPath: '/text/cjp'
      preLoaderRoute: typeof LayoutTextCjpImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/text/count': {
      id: '/_layout/text/count'
      path: '/text/count'
      fullPath: '/text/count'
      preLoaderRoute: typeof LayoutTextCountImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/text/repeat': {
      id: '/_layout/text/repeat'
      path: '/text/repeat'
      fullPath: '/text/repeat'
      preLoaderRoute: typeof LayoutTextRepeatImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/text/replace': {
      id: '/_layout/text/replace'
      path: '/text/replace'
      fullPath: '/text/replace'
      preLoaderRoute: typeof LayoutTextReplaceImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/convert/': {
      id: '/_layout/convert/'
      path: '/convert'
      fullPath: '/convert'
      preLoaderRoute: typeof LayoutConvertIndexImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/develop/': {
      id: '/_layout/develop/'
      path: '/develop'
      fullPath: '/develop'
      preLoaderRoute: typeof LayoutDevelopIndexImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/image/': {
      id: '/_layout/image/'
      path: '/image'
      fullPath: '/image'
      preLoaderRoute: typeof LayoutImageIndexImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/iniad/': {
      id: '/_layout/iniad/'
      path: '/iniad'
      fullPath: '/iniad'
      preLoaderRoute: typeof LayoutIniadIndexImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/math/': {
      id: '/_layout/math/'
      path: '/math'
      fullPath: '/math'
      preLoaderRoute: typeof LayoutMathIndexImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/text/': {
      id: '/_layout/text/'
      path: '/text'
      fullPath: '/text'
      preLoaderRoute: typeof LayoutTextIndexImport
      parentRoute: typeof LayoutImport
    }
  }
}

// Create and export the route tree

interface LayoutRouteChildren {
  LayoutIndexRoute: typeof LayoutIndexRoute
  LayoutConvertBase64Route: typeof LayoutConvertBase64Route
  LayoutConvertPunycodeRoute: typeof LayoutConvertPunycodeRoute
  LayoutConvertQrcodeRoute: typeof LayoutConvertQrcodeRoute
  LayoutConvertUrlRoute: typeof LayoutConvertUrlRoute
  LayoutDevelopClipboardRoute: typeof LayoutDevelopClipboardRoute
  LayoutDevelopCursorRoute: typeof LayoutDevelopCursorRoute
  LayoutDevelopFormatRoute: typeof LayoutDevelopFormatRoute
  LayoutDevelopGithubActivityRoute: typeof LayoutDevelopGithubActivityRoute
  LayoutDevelopIframeRoute: typeof LayoutDevelopIframeRoute
  LayoutDevelopJsonschema2zodRoute: typeof LayoutDevelopJsonschema2zodRoute
  LayoutDevelopKeyboardRoute: typeof LayoutDevelopKeyboardRoute
  LayoutDevelopMarkdownRoute: typeof LayoutDevelopMarkdownRoute
  LayoutImageSvg2pngRoute: typeof LayoutImageSvg2pngRoute
  LayoutIniadLockerRoute: typeof LayoutIniadLockerRoute
  LayoutIniadSensorRoute: typeof LayoutIniadSensorRoute
  LayoutIniadTimetableRoute: typeof LayoutIniadTimetableRoute
  LayoutMathCalculatorRoute: typeof LayoutMathCalculatorRoute
  LayoutMathRadixRoute: typeof LayoutMathRadixRoute
  LayoutTextCjpRoute: typeof LayoutTextCjpRoute
  LayoutTextCountRoute: typeof LayoutTextCountRoute
  LayoutTextRepeatRoute: typeof LayoutTextRepeatRoute
  LayoutTextReplaceRoute: typeof LayoutTextReplaceRoute
  LayoutConvertIndexRoute: typeof LayoutConvertIndexRoute
  LayoutDevelopIndexRoute: typeof LayoutDevelopIndexRoute
  LayoutImageIndexRoute: typeof LayoutImageIndexRoute
  LayoutIniadIndexRoute: typeof LayoutIniadIndexRoute
  LayoutMathIndexRoute: typeof LayoutMathIndexRoute
  LayoutTextIndexRoute: typeof LayoutTextIndexRoute
}

const LayoutRouteChildren: LayoutRouteChildren = {
  LayoutIndexRoute: LayoutIndexRoute,
  LayoutConvertBase64Route: LayoutConvertBase64Route,
  LayoutConvertPunycodeRoute: LayoutConvertPunycodeRoute,
  LayoutConvertQrcodeRoute: LayoutConvertQrcodeRoute,
  LayoutConvertUrlRoute: LayoutConvertUrlRoute,
  LayoutDevelopClipboardRoute: LayoutDevelopClipboardRoute,
  LayoutDevelopCursorRoute: LayoutDevelopCursorRoute,
  LayoutDevelopFormatRoute: LayoutDevelopFormatRoute,
  LayoutDevelopGithubActivityRoute: LayoutDevelopGithubActivityRoute,
  LayoutDevelopIframeRoute: LayoutDevelopIframeRoute,
  LayoutDevelopJsonschema2zodRoute: LayoutDevelopJsonschema2zodRoute,
  LayoutDevelopKeyboardRoute: LayoutDevelopKeyboardRoute,
  LayoutDevelopMarkdownRoute: LayoutDevelopMarkdownRoute,
  LayoutImageSvg2pngRoute: LayoutImageSvg2pngRoute,
  LayoutIniadLockerRoute: LayoutIniadLockerRoute,
  LayoutIniadSensorRoute: LayoutIniadSensorRoute,
  LayoutIniadTimetableRoute: LayoutIniadTimetableRoute,
  LayoutMathCalculatorRoute: LayoutMathCalculatorRoute,
  LayoutMathRadixRoute: LayoutMathRadixRoute,
  LayoutTextCjpRoute: LayoutTextCjpRoute,
  LayoutTextCountRoute: LayoutTextCountRoute,
  LayoutTextRepeatRoute: LayoutTextRepeatRoute,
  LayoutTextReplaceRoute: LayoutTextReplaceRoute,
  LayoutConvertIndexRoute: LayoutConvertIndexRoute,
  LayoutDevelopIndexRoute: LayoutDevelopIndexRoute,
  LayoutImageIndexRoute: LayoutImageIndexRoute,
  LayoutIniadIndexRoute: LayoutIniadIndexRoute,
  LayoutMathIndexRoute: LayoutMathIndexRoute,
  LayoutTextIndexRoute: LayoutTextIndexRoute,
}

const LayoutRouteWithChildren =
  LayoutRoute._addFileChildren(LayoutRouteChildren)

export interface FileRoutesByFullPath {
  '': typeof LayoutRouteWithChildren
  '/': typeof LayoutIndexRoute
  '/convert/base64': typeof LayoutConvertBase64Route
  '/convert/punycode': typeof LayoutConvertPunycodeRoute
  '/convert/qrcode': typeof LayoutConvertQrcodeRoute
  '/convert/url': typeof LayoutConvertUrlRoute
  '/develop/clipboard': typeof LayoutDevelopClipboardRoute
  '/develop/cursor': typeof LayoutDevelopCursorRoute
  '/develop/format': typeof LayoutDevelopFormatRoute
  '/develop/github-activity': typeof LayoutDevelopGithubActivityRoute
  '/develop/iframe': typeof LayoutDevelopIframeRoute
  '/develop/jsonschema2zod': typeof LayoutDevelopJsonschema2zodRoute
  '/develop/keyboard': typeof LayoutDevelopKeyboardRoute
  '/develop/markdown': typeof LayoutDevelopMarkdownRoute
  '/image/svg2png': typeof LayoutImageSvg2pngRoute
  '/iniad/locker': typeof LayoutIniadLockerRoute
  '/iniad/sensor': typeof LayoutIniadSensorRoute
  '/iniad/timetable': typeof LayoutIniadTimetableRoute
  '/math/calculator': typeof LayoutMathCalculatorRoute
  '/math/radix': typeof LayoutMathRadixRoute
  '/text/cjp': typeof LayoutTextCjpRoute
  '/text/count': typeof LayoutTextCountRoute
  '/text/repeat': typeof LayoutTextRepeatRoute
  '/text/replace': typeof LayoutTextReplaceRoute
  '/convert': typeof LayoutConvertIndexRoute
  '/develop': typeof LayoutDevelopIndexRoute
  '/image': typeof LayoutImageIndexRoute
  '/iniad': typeof LayoutIniadIndexRoute
  '/math': typeof LayoutMathIndexRoute
  '/text': typeof LayoutTextIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof LayoutIndexRoute
  '/convert/base64': typeof LayoutConvertBase64Route
  '/convert/punycode': typeof LayoutConvertPunycodeRoute
  '/convert/qrcode': typeof LayoutConvertQrcodeRoute
  '/convert/url': typeof LayoutConvertUrlRoute
  '/develop/clipboard': typeof LayoutDevelopClipboardRoute
  '/develop/cursor': typeof LayoutDevelopCursorRoute
  '/develop/format': typeof LayoutDevelopFormatRoute
  '/develop/github-activity': typeof LayoutDevelopGithubActivityRoute
  '/develop/iframe': typeof LayoutDevelopIframeRoute
  '/develop/jsonschema2zod': typeof LayoutDevelopJsonschema2zodRoute
  '/develop/keyboard': typeof LayoutDevelopKeyboardRoute
  '/develop/markdown': typeof LayoutDevelopMarkdownRoute
  '/image/svg2png': typeof LayoutImageSvg2pngRoute
  '/iniad/locker': typeof LayoutIniadLockerRoute
  '/iniad/sensor': typeof LayoutIniadSensorRoute
  '/iniad/timetable': typeof LayoutIniadTimetableRoute
  '/math/calculator': typeof LayoutMathCalculatorRoute
  '/math/radix': typeof LayoutMathRadixRoute
  '/text/cjp': typeof LayoutTextCjpRoute
  '/text/count': typeof LayoutTextCountRoute
  '/text/repeat': typeof LayoutTextRepeatRoute
  '/text/replace': typeof LayoutTextReplaceRoute
  '/convert': typeof LayoutConvertIndexRoute
  '/develop': typeof LayoutDevelopIndexRoute
  '/image': typeof LayoutImageIndexRoute
  '/iniad': typeof LayoutIniadIndexRoute
  '/math': typeof LayoutMathIndexRoute
  '/text': typeof LayoutTextIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_layout': typeof LayoutRouteWithChildren
  '/_layout/': typeof LayoutIndexRoute
  '/_layout/convert/base64': typeof LayoutConvertBase64Route
  '/_layout/convert/punycode': typeof LayoutConvertPunycodeRoute
  '/_layout/convert/qrcode': typeof LayoutConvertQrcodeRoute
  '/_layout/convert/url': typeof LayoutConvertUrlRoute
  '/_layout/develop/clipboard': typeof LayoutDevelopClipboardRoute
  '/_layout/develop/cursor': typeof LayoutDevelopCursorRoute
  '/_layout/develop/format': typeof LayoutDevelopFormatRoute
  '/_layout/develop/github-activity': typeof LayoutDevelopGithubActivityRoute
  '/_layout/develop/iframe': typeof LayoutDevelopIframeRoute
  '/_layout/develop/jsonschema2zod': typeof LayoutDevelopJsonschema2zodRoute
  '/_layout/develop/keyboard': typeof LayoutDevelopKeyboardRoute
  '/_layout/develop/markdown': typeof LayoutDevelopMarkdownRoute
  '/_layout/image/svg2png': typeof LayoutImageSvg2pngRoute
  '/_layout/iniad/locker': typeof LayoutIniadLockerRoute
  '/_layout/iniad/sensor': typeof LayoutIniadSensorRoute
  '/_layout/iniad/timetable': typeof LayoutIniadTimetableRoute
  '/_layout/math/calculator': typeof LayoutMathCalculatorRoute
  '/_layout/math/radix': typeof LayoutMathRadixRoute
  '/_layout/text/cjp': typeof LayoutTextCjpRoute
  '/_layout/text/count': typeof LayoutTextCountRoute
  '/_layout/text/repeat': typeof LayoutTextRepeatRoute
  '/_layout/text/replace': typeof LayoutTextReplaceRoute
  '/_layout/convert/': typeof LayoutConvertIndexRoute
  '/_layout/develop/': typeof LayoutDevelopIndexRoute
  '/_layout/image/': typeof LayoutImageIndexRoute
  '/_layout/iniad/': typeof LayoutIniadIndexRoute
  '/_layout/math/': typeof LayoutMathIndexRoute
  '/_layout/text/': typeof LayoutTextIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | ''
    | '/'
    | '/convert/base64'
    | '/convert/punycode'
    | '/convert/qrcode'
    | '/convert/url'
    | '/develop/clipboard'
    | '/develop/cursor'
    | '/develop/format'
    | '/develop/github-activity'
    | '/develop/iframe'
    | '/develop/jsonschema2zod'
    | '/develop/keyboard'
    | '/develop/markdown'
    | '/image/svg2png'
    | '/iniad/locker'
    | '/iniad/sensor'
    | '/iniad/timetable'
    | '/math/calculator'
    | '/math/radix'
    | '/text/cjp'
    | '/text/count'
    | '/text/repeat'
    | '/text/replace'
    | '/convert'
    | '/develop'
    | '/image'
    | '/iniad'
    | '/math'
    | '/text'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/convert/base64'
    | '/convert/punycode'
    | '/convert/qrcode'
    | '/convert/url'
    | '/develop/clipboard'
    | '/develop/cursor'
    | '/develop/format'
    | '/develop/github-activity'
    | '/develop/iframe'
    | '/develop/jsonschema2zod'
    | '/develop/keyboard'
    | '/develop/markdown'
    | '/image/svg2png'
    | '/iniad/locker'
    | '/iniad/sensor'
    | '/iniad/timetable'
    | '/math/calculator'
    | '/math/radix'
    | '/text/cjp'
    | '/text/count'
    | '/text/repeat'
    | '/text/replace'
    | '/convert'
    | '/develop'
    | '/image'
    | '/iniad'
    | '/math'
    | '/text'
  id:
    | '__root__'
    | '/_layout'
    | '/_layout/'
    | '/_layout/convert/base64'
    | '/_layout/convert/punycode'
    | '/_layout/convert/qrcode'
    | '/_layout/convert/url'
    | '/_layout/develop/clipboard'
    | '/_layout/develop/cursor'
    | '/_layout/develop/format'
    | '/_layout/develop/github-activity'
    | '/_layout/develop/iframe'
    | '/_layout/develop/jsonschema2zod'
    | '/_layout/develop/keyboard'
    | '/_layout/develop/markdown'
    | '/_layout/image/svg2png'
    | '/_layout/iniad/locker'
    | '/_layout/iniad/sensor'
    | '/_layout/iniad/timetable'
    | '/_layout/math/calculator'
    | '/_layout/math/radix'
    | '/_layout/text/cjp'
    | '/_layout/text/count'
    | '/_layout/text/repeat'
    | '/_layout/text/replace'
    | '/_layout/convert/'
    | '/_layout/develop/'
    | '/_layout/image/'
    | '/_layout/iniad/'
    | '/_layout/math/'
    | '/_layout/text/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  LayoutRoute: typeof LayoutRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  LayoutRoute: LayoutRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_layout"
      ]
    },
    "/_layout": {
      "filePath": "_layout.tsx",
      "children": [
        "/_layout/",
        "/_layout/convert/base64",
        "/_layout/convert/punycode",
        "/_layout/convert/qrcode",
        "/_layout/convert/url",
        "/_layout/develop/clipboard",
        "/_layout/develop/cursor",
        "/_layout/develop/format",
        "/_layout/develop/github-activity",
        "/_layout/develop/iframe",
        "/_layout/develop/jsonschema2zod",
        "/_layout/develop/keyboard",
        "/_layout/develop/markdown",
        "/_layout/image/svg2png",
        "/_layout/iniad/locker",
        "/_layout/iniad/sensor",
        "/_layout/iniad/timetable",
        "/_layout/math/calculator",
        "/_layout/math/radix",
        "/_layout/text/cjp",
        "/_layout/text/count",
        "/_layout/text/repeat",
        "/_layout/text/replace",
        "/_layout/convert/",
        "/_layout/develop/",
        "/_layout/image/",
        "/_layout/iniad/",
        "/_layout/math/",
        "/_layout/text/"
      ]
    },
    "/_layout/": {
      "filePath": "_layout/index.tsx",
      "parent": "/_layout"
    },
    "/_layout/convert/base64": {
      "filePath": "_layout/convert/base64.tsx",
      "parent": "/_layout"
    },
    "/_layout/convert/punycode": {
      "filePath": "_layout/convert/punycode.tsx",
      "parent": "/_layout"
    },
    "/_layout/convert/qrcode": {
      "filePath": "_layout/convert/qrcode.tsx",
      "parent": "/_layout"
    },
    "/_layout/convert/url": {
      "filePath": "_layout/convert/url.tsx",
      "parent": "/_layout"
    },
    "/_layout/develop/clipboard": {
      "filePath": "_layout/develop/clipboard.tsx",
      "parent": "/_layout"
    },
    "/_layout/develop/cursor": {
      "filePath": "_layout/develop/cursor.tsx",
      "parent": "/_layout"
    },
    "/_layout/develop/format": {
      "filePath": "_layout/develop/format.tsx",
      "parent": "/_layout"
    },
    "/_layout/develop/github-activity": {
      "filePath": "_layout/develop/github-activity.tsx",
      "parent": "/_layout"
    },
    "/_layout/develop/iframe": {
      "filePath": "_layout/develop/iframe.tsx",
      "parent": "/_layout"
    },
    "/_layout/develop/jsonschema2zod": {
      "filePath": "_layout/develop/jsonschema2zod.tsx",
      "parent": "/_layout"
    },
    "/_layout/develop/keyboard": {
      "filePath": "_layout/develop/keyboard.tsx",
      "parent": "/_layout"
    },
    "/_layout/develop/markdown": {
      "filePath": "_layout/develop/markdown.tsx",
      "parent": "/_layout"
    },
    "/_layout/image/svg2png": {
      "filePath": "_layout/image/svg2png.tsx",
      "parent": "/_layout"
    },
    "/_layout/iniad/locker": {
      "filePath": "_layout/iniad/locker.tsx",
      "parent": "/_layout"
    },
    "/_layout/iniad/sensor": {
      "filePath": "_layout/iniad/sensor.tsx",
      "parent": "/_layout"
    },
    "/_layout/iniad/timetable": {
      "filePath": "_layout/iniad/timetable.tsx",
      "parent": "/_layout"
    },
    "/_layout/math/calculator": {
      "filePath": "_layout/math/calculator.tsx",
      "parent": "/_layout"
    },
    "/_layout/math/radix": {
      "filePath": "_layout/math/radix.tsx",
      "parent": "/_layout"
    },
    "/_layout/text/cjp": {
      "filePath": "_layout/text/cjp.tsx",
      "parent": "/_layout"
    },
    "/_layout/text/count": {
      "filePath": "_layout/text/count.tsx",
      "parent": "/_layout"
    },
    "/_layout/text/repeat": {
      "filePath": "_layout/text/repeat.tsx",
      "parent": "/_layout"
    },
    "/_layout/text/replace": {
      "filePath": "_layout/text/replace.tsx",
      "parent": "/_layout"
    },
    "/_layout/convert/": {
      "filePath": "_layout/convert/index.tsx",
      "parent": "/_layout"
    },
    "/_layout/develop/": {
      "filePath": "_layout/develop/index.tsx",
      "parent": "/_layout"
    },
    "/_layout/image/": {
      "filePath": "_layout/image/index.tsx",
      "parent": "/_layout"
    },
    "/_layout/iniad/": {
      "filePath": "_layout/iniad/index.tsx",
      "parent": "/_layout"
    },
    "/_layout/math/": {
      "filePath": "_layout/math/index.tsx",
      "parent": "/_layout"
    },
    "/_layout/text/": {
      "filePath": "_layout/text/index.tsx",
      "parent": "/_layout"
    }
  }
}
ROUTE_MANIFEST_END */
