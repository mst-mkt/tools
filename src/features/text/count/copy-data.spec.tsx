import { renderToString } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { generateCopyResultHtml, generateCopyResultText } from './copy-data'
import { count } from './count'

describe('カウント結果のデータ整形', () => {
  it('カウント結果をテキストに整形できる', () => {
    const text = 'こんにちは'
    const result = count(text)

    const data = generateCopyResultText(result)

    expect(data).toBe(`文字数: 5
文字数 (空白,改行抜き): 5
文字数 (Twitter方式): 5
単語数: 1
行数: 1
行数 (空行抜き): 1
文章数: 1
文字列長: 5
文字列長 (空白抜き): 5
バイト数: 15`)
  })

  it('カウント結果をHTML (JSX.Element) に整形できる', () => {
    const text = 'こんにちは'
    const result = count(text)

    const data = generateCopyResultHtml(result)
    const dataString = renderToString(data)

    const expected = (
      <table>
        <tbody>
          <tr key="文字数">
            <td>文字数</td>
            <td>5</td>
          </tr>
          <tr key="文字数 (空白,改行抜き)">
            <td>文字数 (空白,改行抜き)</td>
            <td>5</td>
          </tr>
          <tr key="文字数 (Twitter方式)">
            <td>文字数 (Twitter方式)</td>
            <td>5</td>
          </tr>
          <tr key="単語数">
            <td>単語数</td>
            <td>1</td>
          </tr>
          <tr key="行数">
            <td>行数</td>
            <td>1</td>
          </tr>
          <tr key="行数 (空行抜き)">
            <td>行数 (空行抜き)</td>
            <td>1</td>
          </tr>
          <tr key="文章数">
            <td>文章数</td>
            <td>1</td>
          </tr>
          <tr key="文字列長">
            <td>文字列長</td>
            <td>5</td>
          </tr>
          <tr key="文字列長 (空白抜き)">
            <td>文字列長 (空白抜き)</td>
            <td>5</td>
          </tr>
          <tr key="バイト数">
            <td>バイト数</td>
            <td>15</td>
          </tr>
        </tbody>
      </table>
    )
    const expectedString = renderToString(expected)

    expect(dataString).toBe(expectedString)
  })
})
