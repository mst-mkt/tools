import aspectRatio from '@tailwindcss/aspect-ratio'
import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'
import scrollbar from 'tailwind-scrollbar'
import type { Config } from 'tailwindcss'

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
          DEFAULT: "oklch(var(--background))",
          50: "color-mix(in srgb, oklch(var(--background)), oklch(var(--foreground)) 5%)",
          100: "color-mix(in srgb, oklch(var(--background)), oklch(var(--foreground)) 10%)",
          200: "color-mix(in srgb, oklch(var(--background)), oklch(var(--foreground)) 20%)",
          300: "color-mix(in srgb, oklch(var(--background)), oklch(var(--foreground)) 30%)",
          400: "color-mix(in srgb, oklch(var(--background)), oklch(var(--foreground)) 40%)",
          500: "color-mix(in srgb, oklch(var(--background)), oklch(var(--foreground)) 50%)",
          600: "color-mix(in srgb, oklch(var(--background)), oklch(var(--foreground)) 60%)",
          700: "color-mix(in srgb, oklch(var(--background)), oklch(var(--foreground)) 70%)",
          800: "color-mix(in srgb, oklch(var(--background)), oklch(var(--foreground)) 80%)",
          900: "color-mix(in srgb, oklch(var(--background)), oklch(var(--foreground)) 90%)",
        },
        foreground: {
          DEFAULT: "oklch(var(--foreground))",
          50: "color-mix(in srgb, oklch(var(--foreground)), oklch(var(--background)) 5%)",
          100: "color-mix(in srgb, oklch(var(--foreground)), oklch(var(--background)) 10%)",
          200: "color-mix(in srgb, oklch(var(--foreground)), oklch(var(--background)) 20%)",
          300: "color-mix(in srgb, oklch(var(--foreground)), oklch(var(--background)) 30%)",
          400: "color-mix(in srgb, oklch(var(--foreground)), oklch(var(--background)) 40%)",
          500: "color-mix(in srgb, oklch(var(--foreground)), oklch(var(--background)) 50%)",
          600: "color-mix(in srgb, oklch(var(--foreground)), oklch(var(--background)) 60%)",
          700: "color-mix(in srgb, oklch(var(--foreground)), oklch(var(--background)) 70%)",
          800: "color-mix(in srgb, oklch(var(--foreground)), oklch(var(--background)) 80%)",
          900: "color-mix(in srgb, oklch(var(--foreground)), oklch(var(--background)) 90%)",
        },
        accent: {
          DEFAULT: "oklch(var(--accent))",
          50: "color-mix(in srgb, oklch(var(--accent)), oklch(var(--background)) 70%)",
          100: "color-mix(in srgb, oklch(var(--accent)), oklch(var(--background)) 50%)",
          200: "color-mix(in srgb, oklch(var(--accent)), oklch(var(--background)) 30%)",
          300: "color-mix(in srgb, oklch(var(--accent)), oklch(var(--background)) 10%)",
          400: "color-mix(in srgb, oklch(var(--accent)), oklch(var(--background)) 5%)",
          500: "oklch(var(--accent))",
          600: "color-mix(in srgb, oklch(var(--accent)), oklch(var(--foreground)) 10%)",
          700: "color-mix(in srgb, oklch(var(--accent)), oklch(var(--foreground)) 30%)",
          800: "color-mix(in srgb, oklch(var(--accent)), oklch(var(--foreground)) 50%)",
          900: "color-mix(in srgb, oklch(var(--accent)), oklch(var(--foreground)) 70%)",
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
