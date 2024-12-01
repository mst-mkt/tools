import twitterText from 'twitter-text'

export const countCharacters = (text: string) => {
  const segmenter = new Intl.Segmenter('ja', { granularity: 'grapheme' })
  const segments = segmenter.segment(text)
  return [...segments].length
}

export const countCharactersWithoutSpaces = (text: string) => {
  return countCharacters(text.replace(/\s/g, ''))
}

export const countCharactersForTwitter = (text: string) => {
  return twitterText.getTweetLength(text) / 2
}

export const countWords = (text: string) => {
  const segmenter = new Intl.Segmenter('ja', { granularity: 'word' })
  const segments = segmenter.segment(text)
  return [...segments].length
}

export const sentences = (text: string) => {
  const segmenter = new Intl.Segmenter('ja', { granularity: 'sentence' })
  const segments = segmenter.segment(text)
  return [...segments].length
}

export const countLines = (text: string) => {
  return text.split('\n').length
}

export const countLinesWithoutEmpty = (text: string) => {
  return text.split('\n').filter((line) => line.trim() !== '').length
}

export const countStringLength = (text: string) => {
  return text.length
}

export const countStringLengthWithoutSpaces = (text: string) => {
  return text.replace(/\s/g, '').length
}

export const countBytes = (text: string) => {
  return new TextEncoder().encode(text).length
}

export const count = (text: string) => ({
  characters: countCharacters(text),
  charactersWithoutSpaces: countCharactersWithoutSpaces(text),
  charactersForTwitter: countCharactersForTwitter(text),
  words: countWords(text),
  lines: countLines(text),
  linesWithoutEmpty: countLinesWithoutEmpty(text),
  sentences: sentences(text),
  stringLength: countStringLength(text),
  stringLengthWithoutSpaces: countStringLengthWithoutSpaces(text),
  bytes: countBytes(text),
})
