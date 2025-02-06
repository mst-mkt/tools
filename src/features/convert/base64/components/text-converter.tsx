import { IconArrowsUpDown, IconCopy, IconLink } from '@tabler/icons-react'
import {
  type ChangeEvent,
  type Dispatch,
  type FC,
  type SetStateAction,
  useCallback,
  useMemo,
} from 'react'
import { Alert, Button, Flex, Textarea } from 'rizzui'
import { match } from 'ts-pattern'
import { useCopyLocation } from '../../../../hooks/useCopyLocation'
import { copy } from '../../../../utils/copy'
import { decodeBase64 } from '../decode'
import { encodeBase64 } from '../encode'
import { type ConvertType, ConvertTypeSelect } from './convert-type-select'

type TextConverterProps = {
  inputText: string
  onChangeInputText: (e: ChangeEvent<HTMLTextAreaElement>) => void
  setInputText: Dispatch<SetStateAction<string>>
  type: ConvertType
  setType: Dispatch<SetStateAction<ConvertType>>
}

export const TextConverter: FC<TextConverterProps> = ({
  inputText,
  onChangeInputText,
  setInputText,
  type,
  setType,
}) => {
  const convertedResult = useMemo(() => {
    try {
      return {
        type: 'success',
        value: match(type)
          .with('encode', () => encodeBase64(inputText))
          .with('decode', () => decodeBase64(inputText))
          .exhaustive(),
      } as const
    } catch {
      return { type: 'error', message: '変換に失敗しました' } as const
    }
  }, [inputText, type])

  const handleReverse = useCallback(() => {
    setInputText(convertedResult.type === 'success' ? convertedResult.value : '')
    setType((prev) => (prev === 'encode' ? 'decode' : 'encode'))
  }, [convertedResult, setInputText, setType])

  const copyLocation = useCopyLocation()

  return (
    <>
      <Textarea value={inputText} onChange={onChangeInputText} placeholder="変換する文字列を入力" />
      <Flex align="center" gap="4">
        <ConvertTypeSelect type={type} setType={setType} />
        <Button className="w-fit shrink-0 cursor-pointer gap-x-2" onClick={handleReverse}>
          <IconArrowsUpDown size={16} />
          逆変換
        </Button>
      </Flex>
      {match(convertedResult)
        .with({ type: 'success' }, ({ value }) => (
          <Textarea value={value} readOnly={true} placeholder="変換結果" />
        ))
        .with({ type: 'error' }, ({ message }) => <Alert color="danger">{message}</Alert>)
        .otherwise(() => null)}
      <Flex align="center" gap="4">
        <Button
          className="w-fit cursor-pointer gap-x-2 disabled:cursor-not-allowed"
          onClick={() =>
            copyLocation('/convert/base64', {
              text: inputText,
              type: type,
              input: 'text',
            })
          }
          disabled={inputText.trim() === ''}
        >
          <IconLink size={16} />
          URLをコピー
        </Button>
        <Button
          className="w-fit cursor-pointer gap-x-2 disabled:cursor-not-allowed"
          onClick={() => copy(inputText)}
          disabled={inputText.trim() === ''}
        >
          <IconCopy size={16} />
          結果をコピー
        </Button>
      </Flex>
    </>
  )
}
