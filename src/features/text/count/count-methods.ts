const countMethod = [
  'characters',
  'charactersWithoutSpaces',
  'charactersForTwitter',
  'words',
  'sentences',
  'lines',
  'linesWithoutEmpty',
  'stringLength',
  'stringLengthWithoutSpaces',
  'bytes',
] as const satisfies string[]

export type CountMethod = (typeof countMethod)[number]

export const countMethodLabel = {
  characters: '文字数',
  charactersWithoutSpaces: '文字数 (空白,改行抜き)',
  charactersForTwitter: '文字数 (Twitter方式)',
  words: '単語数',
  sentences: '文章数',
  lines: '行数',
  linesWithoutEmpty: '行数 (空行抜き)',
  stringLength: '文字列長',
  stringLengthWithoutSpaces: '文字列長 (空白抜き)',
  bytes: 'バイト数',
} as const satisfies Record<CountMethod, string>

export const isCountMethod = (value: string): value is CountMethod => {
  return countMethod.includes(value as CountMethod)
}
