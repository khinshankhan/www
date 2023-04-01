import type { Config } from "tailwindcss"

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./data/**/*.{md,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config
