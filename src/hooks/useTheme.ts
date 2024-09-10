import { useCallback, useEffect } from 'react'
import { THEMES } from '../constants/theme'
import { useLocalStorage } from './useLocalStorage'

type Theme = (typeof THEMES)[number]

const isDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches

export const useTheme = () => {
  const [theme, setTheme] = useLocalStorage<Theme>('theme', isDarkTheme ? 'dark' : 'light')

  useEffect(() => {
    document.body.classList.remove(...THEMES)
    document.body.classList.add(theme)
  }, [theme])

  return {
    theme,
    setTheme: useCallback((theme: Theme) => setTheme(theme), [setTheme]),
    toggleTheme: useCallback(
      () => setTheme(theme === 'light' ? 'dark' : 'light'),
      [setTheme, theme],
    ),
  }
}
