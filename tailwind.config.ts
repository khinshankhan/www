import type { Config } from "tailwindcss"

function rawHsla(variable: string, alpha: string) {
  return `hsla(var(--${variable}), ${alpha})`
}
function hsla(variable: string) {
  return rawHsla(variable, "<alpha-value>")
}

function hslaN({ variable = "", n = 1, scale = 1 }) {
  return Array.from({ length: n }, (_, index) => index + 1).reduce((stored, num) => {
    const key = num * scale
    return {
      ...stored,
      [key]: hsla(`${variable}${key}`),
    }
  }, {})
}

export default {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          foreground: hsla("primary-foreground"),
          background: hsla("primary-background"),
        },
        secondary: {
          background: hsla("secondary-background"),
        },
      },
    },
  },
  plugins: [],
} satisfies Config
