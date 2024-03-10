import { type Config } from "tailwindcss";

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Lexend'", "'Zen Kaku Gothic New'", "sans-serif"],
      },
    },
  },
} satisfies Config;
