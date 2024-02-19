import type { Config } from "tailwindcss"
import defaultTheme from "tailwindcss/defaultTheme"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xss: "320px",
      xs: "392px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1325px",
      "2xl": "1536px",

      // usually I think in terms of this for design
      // isMobile to isDesktop should have no gap ergo
      // -1 so it doesn't encompass 768
      isMobile: { max: "767px" },
      isDesktop: "768px",
    },
    fontFamily: {
      heading: ["var(--font-heading)", ...defaultTheme.fontFamily.sans],
      body: ["var(--font-body)", ...defaultTheme.fontFamily.sans],
      mono: ["var(--font-mono)", ...defaultTheme.fontFamily.mono],
    },
  },
  plugins: [],
}

export default config
