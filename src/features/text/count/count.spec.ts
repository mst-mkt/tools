import { describe, expect, it } from 'vitest'
import {
  countBytes,
  countCharacters,
  countCharactersWithoutSpaces,
  countLines,
  countLinesWithoutEmpty,
  countSentences,
  countStringLength,
  countStringLengthWithoutSpaces,
  countWords,
} from './count'

describe('文字数のカウント', () => {
  describe('文字数', () => {
    // 絵文字等の文字数が1文字としてカウントされるテストも含む
    it('文字数をカウントできる', () => {
      const text = 'hello world'
      const count = countCharacters(text)
      expect(count).toBe(11)
    })

    it('空文字列の文字数は0', () => {
      const text = ''
      const count = countCharacters(text)
      expect(count).toBe(0)
    })

    it('複数のコードユニットを含む文字列の文字数', () => {
      const text = '🧶🧵'
      const count = countCharacters(text)
      expect(count).toBe(2)
    })

    it('複数のコードポイントを含む文字列の文字数', () => {
      const text = '👨🏻‍💻'
      const count = countCharacters(text)
      expect(count).toBe(1)
    })
  })

  describe('文字数 (空白,改行を除く)', () => {
    it('文字数をカウントできる', () => {
      const text = 'hello world'
      const count = countCharactersWithoutSpaces(text)
      expect(count).toBe(10)
    })

    it('空白を除いた文字数をカウントできる', () => {
      const text = 'hello world'
      const count = countCharactersWithoutSpaces(text)
      expect(count).toBe(10)
    })

    it('改行を除いた文字数をカウントできる', () => {
      const text = 'hello\nworld'
      const count = countCharactersWithoutSpaces(text)
      expect(count).toBe(10)
    })

    it('空文字列の文字数は0', () => {
      const text = ''
      const count = countCharactersWithoutSpaces(text)
      expect(count).toBe(0)
    })

    it('空白のみの文字列の文字数は0', () => {
      const text = ' '
      const count = countCharactersWithoutSpaces(text)
      expect(count).toBe(0)
    })

    it('改行のみの文字列の文字数は0', () => {
      const text = '\n'
      const count = countCharactersWithoutSpaces(text)
      expect(count).toBe(0)
    })

    it('空白と改行のみの文字列の文字数は0', () => {
      const text = ' \n'
      const count = countCharactersWithoutSpaces(text)
      expect(count).toBe(0)
    })
  })

  describe('単語数', () => {
    it('単語数をカウントできる', () => {
      const text = '春はあけぼの'
      const count = countWords(text)
      expect(count).toBe(3)
    })

    it('空文字列の単語数は0', () => {
      const text = ''
      const count = countWords(text)
      expect(count).toBe(0)
    })
  })

  describe('文章数', () => {
    it('文章数をカウントできる', () => {
      const text = `俺は高校生探偵・工藤新一。
幼馴染で同級生の毛利蘭と遊園地に遊びに行って、黒ずくめの男の怪しげな取引現場を目撃した。
取引を見るのに夢中になっていた俺は、背後から近づいてくるもう一人の仲間に気づかなかった。`
      const count = countSentences(text)
      expect(count).toBe(3)
    })

    it('空文字列の文章数は0', () => {
      const text = ''
      const count = countSentences(text)
      expect(count).toBe(0)
    })
  })

  describe('行数', () => {
    it('行数をカウントできる', () => {
      const text = 'hello\nworld\n'
      const count = countLines(text)
      expect(count).toBe(3)
    })

    it('空文字列の行数は0', () => {
      const text = ''
      const count = countLines(text)
      expect(count).toBe(0)
    })

    it('空白のみの行数は1', () => {
      const text = ' '
      const count = countLines(text)
      expect(count).toBe(1)
    })
  })

  describe('空行を除いた行数', () => {
    it('空行を除いた行数をカウントできる', () => {
      const text = 'hello\n\nworld\n'
      const count = countLinesWithoutEmpty(text)
      expect(count).toBe(2)
    })

    it('空文字列の行数は0', () => {
      const text = ''
      const count = countLinesWithoutEmpty(text)
      expect(count).toBe(0)
    })
  })

  describe('文字列長', () => {
    it('文字列長をカウントできる', () => {
      const text = 'hello world'
      const count = countStringLength(text)
      expect(count).toBe(11)
    })

    it('空文字列の文字列長は0', () => {
      const text = ''
      const count = countStringLength(text)
      expect(count).toBe(0)
    })

    it('複数のコードユニットを含む文字列の文字列長', () => {
      const text = '🧶🧵'
      const count = countStringLength(text)
      expect(count).toBe(4)
    })

    it('複数のコードポイントを含む文字列の文字列長', () => {
      const text = '👨🏻‍💻'
      const count = countStringLength(text)
      expect(count).toBe(7)
    })
  })

  describe('文字列長 (空白,改行を除く)', () => {
    it('文字列長をカウントできる', () => {
      const text = 'hello world'
      const count = countStringLengthWithoutSpaces(text)
      expect(count).toBe(10)
    })

    it('空白を除いた文字列長をカウントできる', () => {
      const text = 'hello world'
      const count = countStringLengthWithoutSpaces(text)
      expect(count).toBe(10)
    })

    it('改行を除いた文字列長をカウントできる', () => {
      const text = 'hello\nworld'
      const count = countStringLengthWithoutSpaces(text)
      expect(count).toBe(10)
    })

    it('空文字列の文字列長は0', () => {
      const text = ''
      const count = countStringLengthWithoutSpaces(text)
      expect(count).toBe(0)
    })

    it('空白のみの文字列の文字列長は0', () => {
      const text = ' '
      const count = countStringLengthWithoutSpaces(text)
      expect(count).toBe(0)
    })

    it('改行のみの文字列の文字列長は0', () => {
      const text = '\n'
      const count = countStringLengthWithoutSpaces(text)
      expect(count).toBe(0)
    })

    it('空白と改行のみの文字列の文字列長は0', () => {
      const text = ' \n'
      const count = countStringLengthWithoutSpaces(text)
      expect(count).toBe(0)
    })
  })

  describe('バイト数', () => {
    it('バイト数をカウントできる', () => {
      const text = 'hello world'
      const count = countBytes(text)
      expect(count).toBe(11)
    })

    it('空文字列のバイト数は0', () => {
      const text = ''
      const count = countBytes(text)
      expect(count).toBe(0)
    })

    it('マルチバイト文字のバイト数', () => {
      const text = 'あ'
      const count = countBytes(text)
      expect(count).toBe(3)
    })

    it('複数のコードユニットを含む文字列のバイト数', () => {
      const text = '🧶'
      const count = countBytes(text)
      expect(count).toBe(4)
    })

    it('複数のコードポイントを含む文字列のバイト数', () => {
      const text = '👨🏻‍💻'
      const count = countBytes(text)
      expect(count).toBe(15)
    })
  })
})
