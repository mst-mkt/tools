import { type CountMethod, countMethodLabel } from './count-methods'

export const generateCopyResultText = (result: Record<CountMethod, number>) => {
  return Object.entries(result)
    .map(([key, value]) => `${countMethodLabel[key as CountMethod]}: ${value}`)
    .join('\n')
}

export const generateCopyResultHtml = (result: Record<CountMethod, number>) => (
  <table>
    <tbody>
      {Object.entries(result).map(([key, value]) => (
        <tr key={key}>
          <td>{countMethodLabel[key as CountMethod]}</td>
          <td>{value}</td>
        </tr>
      ))}
    </tbody>
  </table>
)

export const generateCopyResult = (result: Record<CountMethod, number>) => {
  return [generateCopyResultText(result), generateCopyResultHtml(result)] as const
}
