import { IconBrightness } from '@tabler/icons-react'
import { Link } from '@tanstack/react-router'
import { Button } from 'rizzui/button'
import { Flex } from 'rizzui/flex'
import { Tooltip } from 'rizzui/tooltip'
import { PROJECT_NAME } from '../../constants/project'
import { useTheme } from '../../hooks/useTheme'

export const Header = () => {
  const { toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-[1000] border-background-100 border-b bg-background/16 backdrop-blur-md">
      <Flex
        align="center"
        justify="between"
        gap="4"
        className="mx-auto max-w-max-content px-6 py-4 font-bold text-2xl"
      >
        <Link to="/">{PROJECT_NAME}</Link>
        <Tooltip content="テーマを切り替える" size="sm">
          <Button
            variant="flat"
            onClick={toggleTheme}
            className="aspect-1 cursor-pointer bg-transparent p-2"
          >
            <IconBrightness size={20} />
          </Button>
        </Tooltip>
      </Flex>
    </header>
  )
}
