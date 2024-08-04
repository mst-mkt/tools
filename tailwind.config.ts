import aspectRatio from '@tailwindcss/aspect-ratio'
import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'
import scrollbar from 'tailwind-scrollbar'
import type { Config } from 'tailwindcss'

const alphas = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const

const colorMix = (color1: string, color2: string, percentage: number) => {
  return `color-mix(in srgb, ${color1}, ${color2} ${percentage}%)`
}
const oklch = (channels: TemplateStringsArray) => `oklch(var(--${channels[0]}))`
const oklchAlpha = (channels: TemplateStringsArray) => `oklch(var(--${channels[0]}) / <alpha-value>)`

const makeColorPalette = (color: string) => ({
  50: colorMix(color, oklch`foreground`, 70),
  100: colorMix(color, oklch`foreground`, 50),
  200: colorMix(color, oklch`foreground`, 30),
  300: colorMix(color, oklch`foreground`, 10),
  400: colorMix(color, oklch`foreground`, 5),
  500: color,
  600: colorMix(color, oklch`foreground`, 10),
  700: colorMix(color, oklch`foreground`, 30),
  800: colorMix(color, oklch`foreground`, 50),
  900: colorMix(color, oklch`foreground`, 70),
})

const config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      spacing: {
        "max-content": "var(--content-max-width)",
      },
      colors: {
        background: {
          DEFAULT: oklchAlpha`background`,
          ...Object.fromEntries(
            alphas.map((alpha) => [alpha, colorMix(oklchAlpha`background`, oklch`foreground`, alpha / 10)]),
          ),
        },
        foreground: {
          DEFAULT: oklchAlpha`foreground`,
          ...Object.fromEntries(
            alphas.map((alpha) => [alpha, colorMix(oklchAlpha`foreground`, oklch`background`, alpha / 10)]),
          ),
        },
        accent: {
          DEFAULT: oklchAlpha`accent`,
          ...makeColorPalette(oklchAlpha`accent`),
        },
      },
    },
  },
  plugins: [
    scrollbar({ nocompatible: true, preferredStrategy: 'pseudoelements' }),
    typography,
    forms({ strategy: 'class' }),
    aspectRatio,
  ],
} satisfies Config

export default config
