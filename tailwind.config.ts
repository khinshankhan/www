import type { Config } from "tailwindcss"
import { overrides } from "./lib/theme/overrides"

function rawHsla(variable: string, alpha: string) {
  return `hsla(var(--${variable}), ${alpha})`
}
function hsla(variable: string) {
  return rawHsla(variable, "<alpha-value>")
}

export default {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    ...overrides,
    extend: {
      colors: {
        primary: {
          foreground: hsla("primary-foreground"),
          background: hsla("primary-background"),
          muted: hsla("primary-muted"),
        },
        secondary: {
          background: hsla("secondary-background"),
        },
      },
    },
  },
  plugins: [],
} satisfies Config
