// biome-ignore lint: this file is auto-generated by TanStack Router

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './../../routes/__root'
import { Route as LayoutImport } from './../../routes/_layout'
import { Route as LayoutConvertCjpImport } from './../../routes/_layout/convert/cjp'
import { Route as LayoutConvertJsonSchemaToZodImport } from './../../routes/_layout/convert/jsonSchemaToZod'
import { Route as LayoutConvertPunycodeImport } from './../../routes/_layout/convert/punycode'
import { Route as LayoutConvertQrcodeImport } from './../../routes/_layout/convert/qrcode'
import { Route as LayoutFormatterCssImport } from './../../routes/_layout/formatter/css'
import { Route as LayoutFormatterJsonImport } from './../../routes/_layout/formatter/json'
import { Route as LayoutFormatterTypescriptImport } from './../../routes/_layout/formatter/typescript'
import { Route as LayoutIndexImport } from './../../routes/_layout/index'
import { Route as LayoutTextCountImport } from './../../routes/_layout/text/count'
import { Route as LayoutTextRepeatImport } from './../../routes/_layout/text/repeat'
import { Route as LayoutTextReplaceImport } from './../../routes/_layout/text/replace'
import { Route as LayoutWebClipboardImport } from './../../routes/_layout/web/clipboard'
import { Route as LayoutWebCursorImport } from './../../routes/_layout/web/cursor'
import { Route as LayoutWebKeyEventImport } from './../../routes/_layout/web/keyEvent'
import { Route as LayoutWebWhoisImport } from './../../routes/_layout/web/whois'

// Create/Update Routes

const LayoutRoute = LayoutImport.update({
  id: '/_layout',
  getParentRoute: () => rootRoute,
} as any)

const LayoutIndexRoute = LayoutIndexImport.update({
  path: '/',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutWebWhoisRoute = LayoutWebWhoisImport.update({
  path: '/web/whois',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutWebKeyEventRoute = LayoutWebKeyEventImport.update({
  path: '/web/keyEvent',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutWebCursorRoute = LayoutWebCursorImport.update({
  path: '/web/cursor',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutWebClipboardRoute = LayoutWebClipboardImport.update({
  path: '/web/clipboard',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutTextReplaceRoute = LayoutTextReplaceImport.update({
  path: '/text/replace',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutTextRepeatRoute = LayoutTextRepeatImport.update({
  path: '/text/repeat',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutTextCountRoute = LayoutTextCountImport.update({
  path: '/text/count',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutFormatterTypescriptRoute = LayoutFormatterTypescriptImport.update({
  path: '/formatter/typescript',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutFormatterJsonRoute = LayoutFormatterJsonImport.update({
  path: '/formatter/json',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutFormatterCssRoute = LayoutFormatterCssImport.update({
  path: '/formatter/css',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutConvertQrcodeRoute = LayoutConvertQrcodeImport.update({
  path: '/convert/qrcode',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutConvertPunycodeRoute = LayoutConvertPunycodeImport.update({
  path: '/convert/punycode',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutConvertJsonSchemaToZodRoute = LayoutConvertJsonSchemaToZodImport.update({
  path: '/convert/jsonSchemaToZod',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutConvertCjpRoute = LayoutConvertCjpImport.update({
  path: '/convert/cjp',
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
    '/_layout/convert/cjp': {
      id: '/_layout/convert/cjp'
      path: '/convert/cjp'
      fullPath: '/convert/cjp'
      preLoaderRoute: typeof LayoutConvertCjpImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/convert/jsonSchemaToZod': {
      id: '/_layout/convert/jsonSchemaToZod'
      path: '/convert/jsonSchemaToZod'
      fullPath: '/convert/jsonSchemaToZod'
      preLoaderRoute: typeof LayoutConvertJsonSchemaToZodImport
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
    '/_layout/formatter/css': {
      id: '/_layout/formatter/css'
      path: '/formatter/css'
      fullPath: '/formatter/css'
      preLoaderRoute: typeof LayoutFormatterCssImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/formatter/json': {
      id: '/_layout/formatter/json'
      path: '/formatter/json'
      fullPath: '/formatter/json'
      preLoaderRoute: typeof LayoutFormatterJsonImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/formatter/typescript': {
      id: '/_layout/formatter/typescript'
      path: '/formatter/typescript'
      fullPath: '/formatter/typescript'
      preLoaderRoute: typeof LayoutFormatterTypescriptImport
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
    '/_layout/web/clipboard': {
      id: '/_layout/web/clipboard'
      path: '/web/clipboard'
      fullPath: '/web/clipboard'
      preLoaderRoute: typeof LayoutWebClipboardImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/web/cursor': {
      id: '/_layout/web/cursor'
      path: '/web/cursor'
      fullPath: '/web/cursor'
      preLoaderRoute: typeof LayoutWebCursorImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/web/keyEvent': {
      id: '/_layout/web/keyEvent'
      path: '/web/keyEvent'
      fullPath: '/web/keyEvent'
      preLoaderRoute: typeof LayoutWebKeyEventImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/web/whois': {
      id: '/_layout/web/whois'
      path: '/web/whois'
      fullPath: '/web/whois'
      preLoaderRoute: typeof LayoutWebWhoisImport
      parentRoute: typeof LayoutImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  LayoutRoute: LayoutRoute.addChildren({
    LayoutIndexRoute,
    LayoutConvertCjpRoute,
    LayoutConvertJsonSchemaToZodRoute,
    LayoutConvertPunycodeRoute,
    LayoutConvertQrcodeRoute,
    LayoutFormatterCssRoute,
    LayoutFormatterJsonRoute,
    LayoutFormatterTypescriptRoute,
    LayoutTextCountRoute,
    LayoutTextRepeatRoute,
    LayoutTextReplaceRoute,
    LayoutWebClipboardRoute,
    LayoutWebCursorRoute,
    LayoutWebKeyEventRoute,
    LayoutWebWhoisRoute,
  }),
})

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
        "/_layout/convert/cjp",
        "/_layout/convert/jsonSchemaToZod",
        "/_layout/convert/punycode",
        "/_layout/convert/qrcode",
        "/_layout/formatter/css",
        "/_layout/formatter/json",
        "/_layout/formatter/typescript",
        "/_layout/text/count",
        "/_layout/text/repeat",
        "/_layout/text/replace",
        "/_layout/web/clipboard",
        "/_layout/web/cursor",
        "/_layout/web/keyEvent",
        "/_layout/web/whois"
      ]
    },
    "/_layout/": {
      "filePath": "_layout/index.tsx",
      "parent": "/_layout"
    },
    "/_layout/convert/cjp": {
      "filePath": "_layout/convert/cjp.tsx",
      "parent": "/_layout"
    },
    "/_layout/convert/jsonSchemaToZod": {
      "filePath": "_layout/convert/jsonSchemaToZod.tsx",
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
    "/_layout/formatter/css": {
      "filePath": "_layout/formatter/css.tsx",
      "parent": "/_layout"
    },
    "/_layout/formatter/json": {
      "filePath": "_layout/formatter/json.tsx",
      "parent": "/_layout"
    },
    "/_layout/formatter/typescript": {
      "filePath": "_layout/formatter/typescript.tsx",
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
    "/_layout/web/clipboard": {
      "filePath": "_layout/web/clipboard.tsx",
      "parent": "/_layout"
    },
    "/_layout/web/cursor": {
      "filePath": "_layout/web/cursor.tsx",
      "parent": "/_layout"
    },
    "/_layout/web/keyEvent": {
      "filePath": "_layout/web/keyEvent.tsx",
      "parent": "/_layout"
    },
    "/_layout/web/whois": {
      "filePath": "_layout/web/whois.tsx",
      "parent": "/_layout"
    }
  }
}
ROUTE_MANIFEST_END */
