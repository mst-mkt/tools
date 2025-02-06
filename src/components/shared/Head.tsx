import { useMemo } from 'react'
import { PROJECT_NAME } from '../../constants/project'

type HeadProps = {
  title: string
  description?: string
}

export const Head = ({ title, description }: HeadProps) => {
  const titleTemplate = useMemo(
    () => (title === PROJECT_NAME ? PROJECT_NAME : `${title} | ${PROJECT_NAME}`),
    [title],
  )
  const descriptionTemplate = useMemo(
    () => description ?? `This is ${title ?? PROJECT_NAME} page`,
    [description, title],
  )

  return (
    <>
      <title>{titleTemplate}</title>
      <meta name="description" content={descriptionTemplate} />
      <meta property="og:title" content={titleTemplate} />
      <meta property="og:description" content={descriptionTemplate} />
    </>
  )
}
