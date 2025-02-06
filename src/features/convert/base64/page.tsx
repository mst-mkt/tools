import { type FC, useState } from 'react'
import { Title } from 'rizzui'
import { match } from 'ts-pattern'
import { Breadcrumb } from '../../../components/ui/Breadcrumb'
import { useInputState } from '../../../hooks/useInputState'
import { FileConverter } from './components/file-converter'
import { InputTypeSelect } from './components/input-type-select'
import { TextConverter } from './components/text-converter'

type Base64Props = {
  initialText: string
  initialInputType?: 'text' | 'file'
  initialType?: 'encode' | 'decode'
  initialFileName: string
}

export const Base64: FC<Base64Props> = ({
  initialText,
  initialType = 'encode',
  initialInputType = 'text',
  initialFileName,
}) => {
  const [inputText, onChangeInputText, setInputText] = useInputState(initialText)
  const [inputFile, setInputFile] = useState<File>()
  const [inputType, setInputType] = useState(initialInputType)
  const [convertType, setConvertType] = useState(initialType)
  const [filename, onChangeFilename, setFilename] = useInputState(initialFileName)

  return (
    <>
      <Breadcrumb
        items={[
          { label: 'tools', toOptions: { to: '/' } },
          { label: 'convert', toOptions: { to: '/', hash: 'convert' } },
          'base64',
        ]}
      />
      <Title className="text-xl">Bse64 エンコード / デコード</Title>
      <InputTypeSelect type={inputType} setType={setInputType} />
      {match(inputType)
        .with('text', () => (
          <TextConverter
            inputText={inputText}
            onChangeInputText={onChangeInputText}
            setInputText={setInputText}
            type={convertType}
            setType={setConvertType}
          />
        ))
        .with('file', () => (
          <FileConverter
            inputFile={inputFile}
            setInputFile={setInputFile}
            inputText={inputText}
            onChangeInputText={onChangeInputText}
            setInputText={setInputText}
            type={convertType}
            setType={setConvertType}
            filename={filename}
            onChangeFilename={onChangeFilename}
            setFilename={setFilename}
          />
        ))
        .exhaustive()}
    </>
  )
}
