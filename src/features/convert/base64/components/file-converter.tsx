import { IconArrowsUpDown, IconCopy, IconDownload, IconLink } from '@tabler/icons-react'
import mime from 'mime/lite'
import {
  type ChangeEvent,
  type Dispatch,
  type FC,
  type SetStateAction,
  useCallback,
  useMemo,
} from 'react'
import { Alert, Button, FileInput, Flex, Grid, Input, Textarea } from 'rizzui'
import { P, match } from 'ts-pattern'
import { FilePreview } from '../../../../components/ui/FilePreview'
import { useAwaited } from '../../../../hooks/useAwaited'
import { useCopyLocation } from '../../../../hooks/useCopyLocation'
import { copy, copyFile } from '../../../../utils/copy'
import { decodeBase64ToFile } from '../decode'
import { encodeBase64FromFile } from '../encode'
import { type ConvertType, ConvertTypeSelect } from './convert-type-select'

type FileConverterProps = {
  inputFile: File | undefined
  setInputFile: Dispatch<SetStateAction<File | undefined>>
  inputText: string
  onChangeInputText: (e: ChangeEvent<HTMLTextAreaElement>) => void
  setInputText: Dispatch<SetStateAction<string>>
  type: ConvertType
  setType: Dispatch<SetStateAction<ConvertType>>
  filename: string
  onChangeFilename: (e: ChangeEvent<HTMLInputElement>) => void
  setFilename: Dispatch<SetStateAction<string>>
}

export const FileConverter: FC<FileConverterProps> = ({
  inputFile,
  setInputFile,
  inputText,
  onChangeInputText,
  setInputText,
  type,
  setType,
  filename,
  onChangeFilename,
  setFilename,
}) => {
  const convertedResult = useMemo(() => {
    try {
      return {
        type: 'success',
        value: match({ type, inputFile })
          .with(
            { type: 'encode', inputFile: P.instanceOf(File) },
            async ({ inputFile }) => await encodeBase64FromFile(inputFile),
          )
          .with({ type: 'encode' }, () => '')
          .with({ type: 'decode' }, () => decodeBase64ToFile(inputText, filename))
          .exhaustive(),
      } as const
    } catch {
      return { type: 'error', message: '変換に失敗しました' } as const
    }
  }, [inputFile, inputText, filename, type])

  const awaitedConvertedResult = useAwaited(
    match(convertedResult)
      .with({ type: 'success', value: P.instanceOf(Promise) }, ({ value }) => value)
      .otherwise(() => Promise.resolve(null)),
  )

  const handleChangeInputFile = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const [file] = e.target.files ?? []
      if (file == null) return

      setInputFile(file)
      setFilename(file.name)
    },
    [setInputFile, setFilename],
  )

  const handleReverse = useCallback(() => {
    if (convertedResult.type === 'success') {
      const newInputText = match(convertedResult.value)
        .with(P.string, (value) => value)
        .with(P.instanceOf(Promise), () => awaitedConvertedResult ?? '')
        .otherwise(() => inputText)
      setInputText(newInputText)
    }

    setType((prev) => (prev === 'encode' ? 'decode' : 'encode'))
  }, [convertedResult, setInputText, setType, inputText, awaitedConvertedResult])

  const handleDownload = useCallback(() => {
    if (!(convertedResult.type === 'success' && convertedResult.value instanceof File)) return

    const url = URL.createObjectURL(convertedResult.value)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }, [convertedResult, filename])

  const copyLocation = useCopyLocation()

  return (
    <>
      {match(type)
        .with('encode', () => (
          <FileInput onChange={handleChangeInputFile} placeholder="変換するファイルを選択" />
        ))
        .with('decode', () => (
          <Textarea
            value={inputText}
            onChange={onChangeInputText}
            placeholder="変換するBase64を入力"
          />
        ))
        .exhaustive()}
      <Flex align="center" gap="4">
        <ConvertTypeSelect type={type} setType={setType} />
        <Button className="w-fit shrink-0 cursor-pointer gap-x-2" onClick={handleReverse}>
          <IconArrowsUpDown size={16} />
          逆変換
        </Button>
      </Flex>
      {match(convertedResult)
        .with({ type: 'success', value: P.instanceOf(File) }, ({ value }) => (
          <Grid columns="3">
            <FilePreview file={value} filename={filename} classname="col-span-3" />
            <Input
              value={filename}
              onChange={onChangeFilename}
              placeholder="ファイル名"
              className="col-span-2"
            />
            <Button className="gap-2" onClick={handleDownload}>
              <IconDownload size={16} />
              ダウンロード
            </Button>
          </Grid>
        ))
        .with({ type: 'success' }, () => (
          <Textarea value={awaitedConvertedResult ?? ''} readOnly={true} placeholder="変換結果" />
        ))
        .with({ type: 'error' }, ({ message }) => <Alert color="danger">{message}</Alert>)
        .exhaustive()}
      <Flex align="center" gap="4">
        <Button
          className="w-fit cursor-pointer gap-x-2 disabled:cursor-not-allowed"
          onClick={() =>
            copyLocation('/convert/base64', {
              text: type === 'decode' ? inputText : undefined,
              type,
              input: 'file',
              filename: type === 'decode' ? filename : undefined,
            })
          }
          disabled={inputText.trim() === ''}
        >
          <IconLink size={16} />
          URLをコピー
        </Button>
        <Button
          className="w-fit cursor-pointer gap-x-2 disabled:cursor-not-allowed"
          onClick={() =>
            match(convertedResult)
              .with(
                { value: P.instanceOf(File) },
                () =>
                  inputFile !== undefined &&
                  copyFile(inputFile, mime.getType(filename) ?? 'text/plain'),
              )
              .with({ value: P.string }, ({ value }) => copy(value))
          }
          disabled={inputText.trim() === '' || convertedResult.type !== 'success'}
        >
          <IconCopy size={16} />
          {type === 'decode' ? 'ファイル' : '結果'}をコピー
        </Button>
      </Flex>
    </>
  )
}
