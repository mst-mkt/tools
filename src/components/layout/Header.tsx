import { Link } from '@tanstack/react-router'
import { Sun } from 'lucide-react'
import { PROJECT_NAME } from '../../constants/project'
import { useTheme } from '../../hooks/useTheme'
import { Button } from '../ui/button'

export const Header = () => {
  const { toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 border-background-100 border-b bg-background/16 backdrop-blur-md">
      <div className="mx-auto flex max-w-max-content items-center justify-between gap-y-4 px-6 py-4 font-bold text-2xl">
        <Link to="/" className="transition-colors hover:text-accent-400">
          {PROJECT_NAME}
        </Link>
        <Button variant="ghost" onClick={toggleTheme} aria-label="toggle theme">
          <Sun />
        </Button>
      </div>
    </header>
  )
}
