// biome-ignore lint: this file is auto-generated by TanStack Router

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './../../routes/__root'
import { Route as LayoutImport } from './../../routes/_layout'
import { Route as LayoutIndexImport } from './../../routes/_layout/index'
import { Route as LayoutTextReplaceImport } from './../../routes/_layout/text/replace'
import { Route as LayoutTextRepeatImport } from './../../routes/_layout/text/repeat'
import { Route as LayoutTextCountImport } from './../../routes/_layout/text/count'
import { Route as LayoutIniadLockerImport } from './../../routes/_layout/iniad/locker'
import { Route as LayoutFormatterZigImport } from './../../routes/_layout/formatter/zig'
import { Route as LayoutFormatterYamlImport } from './../../routes/_layout/formatter/yaml'
import { Route as LayoutFormatterTypescriptImport } from './../../routes/_layout/formatter/typescript'
import { Route as LayoutFormatterSqlImport } from './../../routes/_layout/formatter/sql'
import { Route as LayoutFormatterPythonImport } from './../../routes/_layout/formatter/python'
import { Route as LayoutFormatterLuaImport } from './../../routes/_layout/formatter/lua'
import { Route as LayoutFormatterJsonImport } from './../../routes/_layout/formatter/json'
import { Route as LayoutFormatterJavaImport } from './../../routes/_layout/formatter/java'
import { Route as LayoutFormatterHtmlImport } from './../../routes/_layout/formatter/html'
import { Route as LayoutFormatterGoImport } from './../../routes/_layout/formatter/go'
import { Route as LayoutFormatterDartImport } from './../../routes/_layout/formatter/dart'
import { Route as LayoutFormatterCssImport } from './../../routes/_layout/formatter/css'
import { Route as LayoutFormatterCImport } from './../../routes/_layout/formatter/c'
import { Route as LayoutDevelopWhoisImport } from './../../routes/_layout/develop/whois'
import { Route as LayoutDevelopMarkdownImport } from './../../routes/_layout/develop/markdown'
import { Route as LayoutDevelopKeyEventImport } from './../../routes/_layout/develop/keyEvent'
import { Route as LayoutDevelopCursorImport } from './../../routes/_layout/develop/cursor'
import { Route as LayoutDevelopClipboardImport } from './../../routes/_layout/develop/clipboard'
import { Route as LayoutConvertQrcodeImport } from './../../routes/_layout/convert/qrcode'
import { Route as LayoutConvertPunycodeImport } from './../../routes/_layout/convert/punycode'
import { Route as LayoutConvertJsonSchemaToZodImport } from './../../routes/_layout/convert/jsonSchemaToZod'
import { Route as LayoutConvertCjpImport } from './../../routes/_layout/convert/cjp'

// Create/Update Routes

const LayoutRoute = LayoutImport.update({
  id: '/_layout',
  getParentRoute: () => rootRoute,
} as any)

const LayoutIndexRoute = LayoutIndexImport.update({
  path: '/',
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

const LayoutIniadLockerRoute = LayoutIniadLockerImport.update({
  path: '/iniad/locker',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutFormatterZigRoute = LayoutFormatterZigImport.update({
  path: '/formatter/zig',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutFormatterYamlRoute = LayoutFormatterYamlImport.update({
  path: '/formatter/yaml',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutFormatterTypescriptRoute = LayoutFormatterTypescriptImport.update({
  path: '/formatter/typescript',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutFormatterSqlRoute = LayoutFormatterSqlImport.update({
  path: '/formatter/sql',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutFormatterPythonRoute = LayoutFormatterPythonImport.update({
  path: '/formatter/python',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutFormatterLuaRoute = LayoutFormatterLuaImport.update({
  path: '/formatter/lua',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutFormatterJsonRoute = LayoutFormatterJsonImport.update({
  path: '/formatter/json',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutFormatterJavaRoute = LayoutFormatterJavaImport.update({
  path: '/formatter/java',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutFormatterHtmlRoute = LayoutFormatterHtmlImport.update({
  path: '/formatter/html',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutFormatterGoRoute = LayoutFormatterGoImport.update({
  path: '/formatter/go',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutFormatterDartRoute = LayoutFormatterDartImport.update({
  path: '/formatter/dart',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutFormatterCssRoute = LayoutFormatterCssImport.update({
  path: '/formatter/css',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutFormatterCRoute = LayoutFormatterCImport.update({
  path: '/formatter/c',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutDevelopWhoisRoute = LayoutDevelopWhoisImport.update({
  path: '/develop/whois',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutDevelopMarkdownRoute = LayoutDevelopMarkdownImport.update({
  path: '/develop/markdown',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutDevelopKeyEventRoute = LayoutDevelopKeyEventImport.update({
  path: '/develop/keyEvent',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutDevelopCursorRoute = LayoutDevelopCursorImport.update({
  path: '/develop/cursor',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutDevelopClipboardRoute = LayoutDevelopClipboardImport.update({
  path: '/develop/clipboard',
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

const LayoutConvertJsonSchemaToZodRoute =
  LayoutConvertJsonSchemaToZodImport.update({
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
    '/_layout/develop/keyEvent': {
      id: '/_layout/develop/keyEvent'
      path: '/develop/keyEvent'
      fullPath: '/develop/keyEvent'
      preLoaderRoute: typeof LayoutDevelopKeyEventImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/develop/markdown': {
      id: '/_layout/develop/markdown'
      path: '/develop/markdown'
      fullPath: '/develop/markdown'
      preLoaderRoute: typeof LayoutDevelopMarkdownImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/develop/whois': {
      id: '/_layout/develop/whois'
      path: '/develop/whois'
      fullPath: '/develop/whois'
      preLoaderRoute: typeof LayoutDevelopWhoisImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/formatter/c': {
      id: '/_layout/formatter/c'
      path: '/formatter/c'
      fullPath: '/formatter/c'
      preLoaderRoute: typeof LayoutFormatterCImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/formatter/css': {
      id: '/_layout/formatter/css'
      path: '/formatter/css'
      fullPath: '/formatter/css'
      preLoaderRoute: typeof LayoutFormatterCssImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/formatter/dart': {
      id: '/_layout/formatter/dart'
      path: '/formatter/dart'
      fullPath: '/formatter/dart'
      preLoaderRoute: typeof LayoutFormatterDartImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/formatter/go': {
      id: '/_layout/formatter/go'
      path: '/formatter/go'
      fullPath: '/formatter/go'
      preLoaderRoute: typeof LayoutFormatterGoImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/formatter/html': {
      id: '/_layout/formatter/html'
      path: '/formatter/html'
      fullPath: '/formatter/html'
      preLoaderRoute: typeof LayoutFormatterHtmlImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/formatter/java': {
      id: '/_layout/formatter/java'
      path: '/formatter/java'
      fullPath: '/formatter/java'
      preLoaderRoute: typeof LayoutFormatterJavaImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/formatter/json': {
      id: '/_layout/formatter/json'
      path: '/formatter/json'
      fullPath: '/formatter/json'
      preLoaderRoute: typeof LayoutFormatterJsonImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/formatter/lua': {
      id: '/_layout/formatter/lua'
      path: '/formatter/lua'
      fullPath: '/formatter/lua'
      preLoaderRoute: typeof LayoutFormatterLuaImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/formatter/python': {
      id: '/_layout/formatter/python'
      path: '/formatter/python'
      fullPath: '/formatter/python'
      preLoaderRoute: typeof LayoutFormatterPythonImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/formatter/sql': {
      id: '/_layout/formatter/sql'
      path: '/formatter/sql'
      fullPath: '/formatter/sql'
      preLoaderRoute: typeof LayoutFormatterSqlImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/formatter/typescript': {
      id: '/_layout/formatter/typescript'
      path: '/formatter/typescript'
      fullPath: '/formatter/typescript'
      preLoaderRoute: typeof LayoutFormatterTypescriptImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/formatter/yaml': {
      id: '/_layout/formatter/yaml'
      path: '/formatter/yaml'
      fullPath: '/formatter/yaml'
      preLoaderRoute: typeof LayoutFormatterYamlImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/formatter/zig': {
      id: '/_layout/formatter/zig'
      path: '/formatter/zig'
      fullPath: '/formatter/zig'
      preLoaderRoute: typeof LayoutFormatterZigImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/iniad/locker': {
      id: '/_layout/iniad/locker'
      path: '/iniad/locker'
      fullPath: '/iniad/locker'
      preLoaderRoute: typeof LayoutIniadLockerImport
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
    LayoutDevelopClipboardRoute,
    LayoutDevelopCursorRoute,
    LayoutDevelopKeyEventRoute,
    LayoutDevelopMarkdownRoute,
    LayoutDevelopWhoisRoute,
    LayoutFormatterCRoute,
    LayoutFormatterCssRoute,
    LayoutFormatterDartRoute,
    LayoutFormatterGoRoute,
    LayoutFormatterHtmlRoute,
    LayoutFormatterJavaRoute,
    LayoutFormatterJsonRoute,
    LayoutFormatterLuaRoute,
    LayoutFormatterPythonRoute,
    LayoutFormatterSqlRoute,
    LayoutFormatterTypescriptRoute,
    LayoutFormatterYamlRoute,
    LayoutFormatterZigRoute,
    LayoutIniadLockerRoute,
    LayoutTextCountRoute,
    LayoutTextRepeatRoute,
    LayoutTextReplaceRoute,
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
        "/_layout/develop/clipboard",
        "/_layout/develop/cursor",
        "/_layout/develop/keyEvent",
        "/_layout/develop/markdown",
        "/_layout/develop/whois",
        "/_layout/formatter/c",
        "/_layout/formatter/css",
        "/_layout/formatter/dart",
        "/_layout/formatter/go",
        "/_layout/formatter/html",
        "/_layout/formatter/java",
        "/_layout/formatter/json",
        "/_layout/formatter/lua",
        "/_layout/formatter/python",
        "/_layout/formatter/sql",
        "/_layout/formatter/typescript",
        "/_layout/formatter/yaml",
        "/_layout/formatter/zig",
        "/_layout/iniad/locker",
        "/_layout/text/count",
        "/_layout/text/repeat",
        "/_layout/text/replace"
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
    "/_layout/develop/clipboard": {
      "filePath": "_layout/develop/clipboard.tsx",
      "parent": "/_layout"
    },
    "/_layout/develop/cursor": {
      "filePath": "_layout/develop/cursor.tsx",
      "parent": "/_layout"
    },
    "/_layout/develop/keyEvent": {
      "filePath": "_layout/develop/keyEvent.tsx",
      "parent": "/_layout"
    },
    "/_layout/develop/markdown": {
      "filePath": "_layout/develop/markdown.tsx",
      "parent": "/_layout"
    },
    "/_layout/develop/whois": {
      "filePath": "_layout/develop/whois.tsx",
      "parent": "/_layout"
    },
    "/_layout/formatter/c": {
      "filePath": "_layout/formatter/c.tsx",
      "parent": "/_layout"
    },
    "/_layout/formatter/css": {
      "filePath": "_layout/formatter/css.tsx",
      "parent": "/_layout"
    },
    "/_layout/formatter/dart": {
      "filePath": "_layout/formatter/dart.tsx",
      "parent": "/_layout"
    },
    "/_layout/formatter/go": {
      "filePath": "_layout/formatter/go.tsx",
      "parent": "/_layout"
    },
    "/_layout/formatter/html": {
      "filePath": "_layout/formatter/html.tsx",
      "parent": "/_layout"
    },
    "/_layout/formatter/java": {
      "filePath": "_layout/formatter/java.tsx",
      "parent": "/_layout"
    },
    "/_layout/formatter/json": {
      "filePath": "_layout/formatter/json.tsx",
      "parent": "/_layout"
    },
    "/_layout/formatter/lua": {
      "filePath": "_layout/formatter/lua.tsx",
      "parent": "/_layout"
    },
    "/_layout/formatter/python": {
      "filePath": "_layout/formatter/python.tsx",
      "parent": "/_layout"
    },
    "/_layout/formatter/sql": {
      "filePath": "_layout/formatter/sql.tsx",
      "parent": "/_layout"
    },
    "/_layout/formatter/typescript": {
      "filePath": "_layout/formatter/typescript.tsx",
      "parent": "/_layout"
    },
    "/_layout/formatter/yaml": {
      "filePath": "_layout/formatter/yaml.tsx",
      "parent": "/_layout"
    },
    "/_layout/formatter/zig": {
      "filePath": "_layout/formatter/zig.tsx",
      "parent": "/_layout"
    },
    "/_layout/iniad/locker": {
      "filePath": "_layout/iniad/locker.tsx",
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
    }
  }
}
ROUTE_MANIFEST_END */
