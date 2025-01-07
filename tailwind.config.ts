import aspectRatio from '@tailwindcss/aspect-ratio'
import forms from '@tailwindcss/forms'
import type { Config } from 'tailwindcss'

const alphas = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const

const colorMix = (color1: string, color2: string, percentage: number) => {
  return `color-mix(in srgb, ${color1}, ${color2} ${percentage}%)`
}

const oklch = ([color]: TemplateStringsArray) => `oklch(var(--${color}) / <alpha-value>)`

const config = {
  content: ['./index.html', './src/**/*.{ts,tsx}', './src/**/.*.{ts,tsx}', './node_modules/rizzui/dist/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      spacing: {
        "max-content": "var(--content-max-width)",
      },
      colors: {
        background: {
          DEFAULT: oklch`background`,
          ...Object.fromEntries(
            alphas.map((alpha) => [alpha, colorMix(oklch`background`, oklch`foreground`, alpha / 10)]),
          ),
        },
        foreground: {
          DEFAULT: oklch`foreground`,
          ...Object.fromEntries(
            alphas.map((alpha) => [alpha, colorMix(oklch`foreground`, oklch`background`, alpha / 10)]),
          ),
        },
        muted: {
          DEFAULT: oklch`muted`,
          foreground: oklch`muted-foreground`,
        },

        primary: {
          lighter: oklch`primary-lighter`,
          DEFAULT: oklch`primary-default`,
          dark: oklch`primary-dark`,
          foreground: oklch`primary-foreground`,
        },
        secondary: {
          lighter: oklch`secondary-lighter`,
          DEFAULT: oklch`secondary-default`,
          dark: oklch`secondary-dark`,
          foreground: oklch`secondary-foreground`,
        },

        red: {
          lighter: oklch`red-lighter`,
          DEFAULT: oklch`red-default`,
          dark: oklch`red-dark`,
        },
        orange: {
          lighter: oklch`orange-lighter`,
          DEFAULT: oklch`orange-default`,
          dark: oklch`orange-dark`,
        },
        blue: {
          lighter: oklch`blue-lighter`,
          DEFAULT: oklch`blue-default`,
          dark: oklch`blue-dark`,
        },
        green: {
          lighter: oklch`green-lighter`,
          DEFAULT: oklch`green-default`,
          dark: oklch`green-dark`,
        },
      },
    },
  },
  plugins: [
    aspectRatio,
    forms,
  ],
} satisfies Config

export default config
