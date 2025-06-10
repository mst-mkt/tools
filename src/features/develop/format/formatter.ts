import init_c, { format as format_c } from '@wasm-fmt/clang-format/vite'
import init_dart, { format as format_dart } from '@wasm-fmt/dart_fmt/vite'
import init_go, { format as format_go } from '@wasm-fmt/gofmt/vite'
import init_lua, { format as format_lua } from '@wasm-fmt/lua_fmt/vite'
import init_ruff, { format as format_ruff } from '@wasm-fmt/ruff_fmt/vite'
import init_sql, { format as format_sql } from '@wasm-fmt/sql_fmt/vite'
import init_web, { format as format_web } from '@wasm-fmt/web_fmt/vite'
import init_yaml, { format as format_yam } from '@wasm-fmt/yamlfmt/vite'
import init_zig, { format as format_zig } from '@wasm-fmt/zig_fmt'

export const SUPPORTED_LANGUAGES = [
  'c',
  'cpp',
  'java',
  'dart',
  'go',
  'lua',
  'py',
  'sql',
  'js',
  'ts',
  'html',
  'css',
  'json',
  'yaml',
  'zig',
] as const

export type Language = (typeof SUPPORTED_LANGUAGES)[number]

export const languageLabels = [
  { label: 'C', value: 'c' },
  { label: 'C++', value: 'cpp' },
  { label: 'Java', value: 'java' },
  { label: 'Dart', value: 'dart' },
  { label: 'Go', value: 'go' },
  { label: 'Lua', value: 'lua' },
  { label: 'Python', value: 'py' },
  { label: 'SQL', value: 'sql' },
  { label: 'JavaScript', value: 'js' },
  { label: 'TypeScript', value: 'ts' },
  { label: 'HTML', value: 'html' },
  { label: 'CSS', value: 'css' },
  { label: 'JSON', value: 'json' },
  { label: 'YAML', value: 'yaml' },
  { label: 'Zig', value: 'zig' },
] as const satisfies { label: string; value: Language }[]

export const init = {
  c: init_c,
  cpp: init_c,
  java: init_c,
  dart: init_dart,
  go: init_go,
  lua: init_lua,
  py: init_ruff,
  sql: init_sql,
  js: init_web,
  ts: init_web,
  html: init_web,
  css: init_web,
  json: init_web,
  yaml: init_yaml,
  zig: init_zig,
} as const satisfies Record<Language, () => Promise<unknown>>

export const format = {
  c: format_c,
  cpp: format_c,
  java: format_c,
  dart: format_dart,
  go: format_go,
  lua: format_lua,
  py: format_ruff,
  sql: format_sql,
  js: format_web,
  ts: format_web,
  html: format_web,
  css: format_web,
  json: format_web,
  yaml: format_yam,
  zig: format_zig,
} as const satisfies Record<Language, (code: string, filename: string) => string>

export const noInputComment = {
  c: '// no input',
  cpp: '// no input',
  java: '// no input',
  dart: '// no input',
  go: '// no input',
  lua: '-- no input',
  py: '# no input',
  sql: '-- no input',
  js: '// no input',
  ts: '// no input',
  html: '<!-- no input -->',
  css: '/* no input */',
  json: '// no input',
  yaml: '# no input',
  zig: '// no input',
} as const satisfies Record<Language, string>
